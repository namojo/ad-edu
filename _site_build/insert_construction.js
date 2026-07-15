// Inserts a "이 하네스를 직접 만들기 (/harness 구성)" section into each coursebook,
// right before its "## 4." section. Idempotent: skips if the marker already exists.
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const MARK = "<!-- construction-section -->";

const DATA = {
  "course1-basics/교재/C1_교재.md": {
    name: "starter",
    intro: "지금까지 실습에서 쓴 리서처+카피라이터 팀은 미리 만들어 둔 것입니다. 그런데 이 팀 자체도 harness 플러그인에게 한 문장을 주면 자동으로 만들어집니다.",
    prompt: `하네스 구성해줘. 신제품 광고를 돕는 작은 팀이 필요해. 시장·경쟁을 빠르게 조사하는 리서처와, 그 조사를 바탕으로 광고 헤드라인을 뽑는 카피라이터가 순서대로(조사 → 카피) 일하는 파이프라인 팀이야. 조사 요약과 헤드라인을 결과로 주고, 나중에 다른 제품에도 다시 쓸 수 있게 만들어줘.`,
    agents: "`researcher`(리서처), `copywriter`(카피라이터)",
    skills: "`market-research`, `ad-copywriting`",
    orch: "`starter-harness` — 파이프라인(조사 → 카피)",
  },
  "course2-research/교재/C2_교재.md": {
    name: "research",
    intro: "이 과정에서 쓰는 리서치 하네스도, harness 플러그인에게 아래 한 문장을 주면 리서처 4명과 인사이트 에디터로 이루어진 팀이 통째로 만들어집니다.",
    prompt: `하네스 구성해줘. 하나의 카테고리를 여러 각도에서 동시에 조사하는 리서치 팀이 필요해. 시장·소비자·경쟁·트렌드를 각각 맡는 리서처 네 명이 병렬로 조사(팬아웃)하고, 인사이트 에디터 한 명이 교차검증해 하나의 보고서로 종합(팬인)하는 구조야. 상충하는 정보는 출처를 병기하고, '주장→근거→시사점' 인사이트를 결과로 줘. 매번 다른 브랜드로 다시 실행할 수 있게.`,
    agents: "`researcher`(시장·소비자·경쟁·트렌드 4역할), `insight-synthesizer`(인사이트 에디터)",
    skills: "`market-research`, `insight-synthesis`",
    orch: "`research-harness` — 팬아웃/팬인",
  },
  "course3-creative/교재/C3_교재.md": {
    name: "creative",
    intro: "이 과정의 크리에이티브 하네스도, harness 플러그인에게 아래 한 문장을 주면 '만드는 팀원'과 '검수하는 팀원'이 분리된 생성-검증 팀으로 자동 생성됩니다.",
    prompt: `하네스 구성해줘. 광고 크리에이티브를 만들고 검수까지 하는 팀이 필요해. 카피를 감성·기능·유머로 뽑는 카피라이터와 키비주얼 컨셉을 이미지로 만드는 비주얼 디자이너가 먼저 생성하고, 아트디렉터가 브랜드 톤 기준으로 검수해 미달이면 반려·재생성을 지시하는 '생성-검증' 구조야. 추천 카피와 키비주얼 컨셉, 검수 코멘트를 결과로 줘.`,
    agents: "`copywriter`(카피라이터), `visual-designer`(비주얼 디자이너), `art-director`(아트디렉터·검수)",
    skills: "`ad-copywriting`, `visual-concepting`, `creative-direction`",
    orch: "`creative-harness` — 생성-검증(리뷰 게이트)",
  },
  "course4-media/교재/C4_교재.md": {
    name: "media",
    intro: "이 과정의 미디어 하네스도, harness 플러그인에게 아래 한 문장을 주면 중앙에서 지휘하는 감독자 구조의 팀으로 자동 생성됩니다.",
    prompt: `하네스 구성해줘. 캠페인 미디어 플랜을 짜는 팀이 필요해. 중앙에서 지휘하는 미디어 플래너(감독자)가 타겟·채널·예산·A/B를 나눠 맡기고, 리서처가 근거를 대고, 문서 프로듀서가 결과를 엑셀 미디어 플랜으로 정리하는 구조야. 총예산을 주면 채널별 배분표와 A/B 계획을 결과로 줘.`,
    agents: "`media-planner`(미디어 플래너·감독), `researcher`(리서처), `doc-producer`(문서 프로듀서)",
    skills: "`media-planning`, `market-research`, `doc-automation`",
    orch: "`media-harness` — 감독자(동적 배분)",
  },
  "course5-content/교재/C5_교재.md": {
    name: "content",
    intro: "이 과정의 콘텐츠 하네스도, harness 플러그인에게 아래 한 문장을 주면 기획부터 썸네일까지 순서대로 이어지는 파이프라인 팀으로 자동 생성됩니다.",
    prompt: `하네스 구성해줘. SNS 콘텐츠를 기획부터 썸네일까지 순서대로 만드는 파이프라인 팀이 필요해. 트렌드를 조사하는 리서처 → 대본을 쓰는 콘텐츠 크리에이터 → 썸네일 컨셉을 만드는 비주얼 디자이너 → 제목·해시태그를 SEO로 다듬는 순서야. 1주 콘텐츠 캘린더와 대본, 썸네일 컨셉, 해시태그를 결과로 줘.`,
    agents: "`researcher`(리서처), `content-creator`(콘텐츠 크리에이터), `visual-designer`(비주얼 디자이너)",
    skills: "`market-research`, `content-production`, `visual-concepting`",
    orch: "`content-harness` — 파이프라인(순차 제작)",
  },
  "course6-automation/교재/C6_교재.md": {
    name: "automation",
    intro: "이 과정의 자동화 하네스도, harness 플러그인에게 아래 한 문장을 주면 상황별 전문가를 골라 쓰고 결과를 문서로 뽑는 팀으로 자동 생성됩니다.",
    prompt: `하네스 구성해줘. 우리 팀의 반복 업무(예: 주간 캠페인 성과 리포트)를 자동화하는 하네스가 필요해. 큰 업무를 데이터 요약·인사이트 도출·액션 제안으로 나눠 맡기고(계층적 위임), 상황에 맞는 전문가만 골라 쓰고(전문가 풀), 문서 프로듀서가 결과를 PPT·Word·Excel·PDF로 자동 생성하는 구조야. 매주 다시 실행할 수 있게 만들어줘.`,
    agents: "(상황별 풀) `researcher`, `insight-synthesizer`, `doc-producer` 등",
    skills: "`insight-synthesis`, `doc-automation` 등",
    orch: "`automation-harness` — 계층적 위임 + 전문가 풀",
  },
};

function block(d) {
  return `${MARK}
## 3-B. 이 하네스를 직접 만들기 — \`/harness\` 구성

${d.intro} 팀장(오케스트레이터)·팀원(에이전트)·업무 매뉴얼(스킬)이 한 번에 만들어집니다. 여러분도 아래 방법으로 직접 만들 수 있습니다.

**① harness 플러그인 준비 (최초 1회, 보통 관리자가 미리 설치)**

\`\`\`text
/plugin marketplace add revfactory/harness
/plugin install harness-marketplace
\`\`\`

> 사내 마켓플레이스를 쓰면 그 경로로 바꾸세요.

**② 이 하네스를 만드는 구성 프롬프트 — 그대로 입력하세요**

\`\`\`text
${d.prompt}
\`\`\`

**③ 무엇이 만들어지나요**

| 종류 | 생성물 |
|---|---|
| 팀원(에이전트) | ${d.agents} |
| 업무 매뉴얼(스킬) | ${d.skills} |
| 팀장(오케스트레이터) | ${d.orch} |

> harness는 **6단계**(도메인 분석 → 팀 설계 → 에이전트 생성 → 스킬 생성 → 통합 → 검증)로 팀을 만들고, \`CLAUDE.md\`에 트리거 포인터를 등록합니다. 한 번 만든 뒤에도 "리서처를 하나 더 추가해줘"처럼 피드백을 주면 **계속 진화**합니다. 실제로 이렇게 생성된 결과물이 이 저장소의 \`.claude/agents/\`·\`.claude/skills/\`에 들어 있습니다.

**만든 다음에는** 아래 4장 실습의 트리거 프롬프트로 이 팀을 실행하면 됩니다.

`;
}

let changed = 0;
for (const [rel, d] of Object.entries(DATA)) {
  const p = path.join(ROOT, rel);
  let md = fs.readFileSync(p, "utf-8");
  if (md.includes(MARK)) { console.log("skip (already has):", rel); continue; }
  const idx = md.search(/^## 4\./m);
  if (idx < 0) { console.log("!! no ## 4. in", rel); continue; }
  md = md.slice(0, idx) + block(d) + md.slice(idx);
  fs.writeFileSync(p, md);
  changed++; console.log("inserted →", rel);
}
console.log("done, changed:", changed);
