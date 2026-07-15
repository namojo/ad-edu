const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
let misses = [];
function rep(file, from, to) {
  const p = path.join(ROOT, file);
  let md = fs.readFileSync(p, "utf-8");
  if (!md.includes(from)) { misses.push(`${file} :: NOT FOUND :: ${from.slice(0, 50)}`); return; }
  fs.writeFileSync(p, md.replace(from, to));
}
function sliceAt8(file, newSection8) { // replace from "## 8." to EOF
  const p = path.join(ROOT, file);
  let md = fs.readFileSync(p, "utf-8");
  const i = md.indexOf("## 8.");
  if (i < 0) { misses.push(`${file} :: no ## 8.`); return; }
  fs.writeFileSync(p, md.slice(0, i) + newSection8);
}

// ---------- C1 ----------
rep("course1-basics/교재/C1_교재.md", "next=course2-research", "next=course2-automation");
rep("course1-basics/교재/C1_교재.md",
  "오늘 여러분은 **파이프라인** 팀 하나로 첫걸음을 뗐습니다. 다음은 여러 명이 **동시에** 조사하는 팀입니다.\n\n**C2 — 리서치·인사이트 하네스 (팬아웃/팬인)**\n> \"하루 걸리던 카테고리 진단을 한 시간에.\" 시장·소비자·경쟁·트렌드를 네 명이 동시에 조사하고(팬아웃), 한 명이 교차검증해 하나의 인사이트 보고서로 종합합니다(팬인).",
  "오늘 여러분은 **파이프라인** 팀 하나로 첫걸음을 뗐습니다. 다음은 배운 걸 바로 써먹는 가장 빠른 실전입니다.\n\n**C2 — 업무 자동화로 생산성 향상 (초급)**\n> \"매주 반복하던 업무, 한 번 요청으로 끝.\" 주간 리포트 같은 반복 작업을 나만의 하네스로 자동화하고, 결과를 PPT·Word·Excel·PDF로 자동 생성합니다.");

// ---------- C2 (was C6 automation) ----------
const A = "course2-automation/교재/C2_교재.md";
rep(A, "course_id: C6", "course_id: C2");
rep(A, "level: 심화", "level: 초급");
rep(A, "duration_min: 180", "duration_min: 120");
rep(A, "prerequisite: C1 (+도메인 과정 1개 권장)", "prerequisite: C1");
rep(A, "# C6 · 업무 자동화로 생산성 향상", "# C2 · 업무 자동화로 생산성 향상");
rep(A, "- **소요 시간:** 180분", "- **소요 시간:** 120분");
rep(A, "- **선수 과정:** C1 필수. 도메인 과정(C2~C5) 중 1개 이상 수료 권장.", "- **선수 과정:** C1만 있으면 됩니다.");
rep(A, "- **패턴:** 계층적 위임 + 전문가 풀 (재귀 분해 + 상황별 선택 호출)",
  "- **패턴:** 계층적 위임 + 전문가 풀 — 어렵게 들리지만, 여러분은 \"자동화해줘\" 한마디면 됩니다(하네스가 알아서 팀을 짭니다).");
rep(A, "이 과정은 우리 여정의 마지막입니다. 지금까지는 하네스가 만들어 준 팀을 \"써 봤다\"면, 이번엔 여러분이 직접 **자기 팀의 업무를 설계**하고, 그 결과를 사람이 손대지 않아도 문서로 마감되게 만듭니다.",
  "이 과정은 하네스를 배운 직후 **가장 빠르게 실전 이득**을 보는 초급 과정입니다. 거창한 준비 없이, 여러분이 매주 반복하는 업무 하나를 골라 자동화하고, 그 결과가 사람 손을 거의 타지 않고 문서로 마감되게 만듭니다.");
rep(A, "../사례/C6_주간리포트_자동화.md", "../사례/C2_주간리포트_자동화.md");
sliceAt8(A, `## 8. 다음 과정

이제 반복 업무를 자동화하는 든든한 도구를 손에 넣었습니다. 다음부터는 실제 광고 실무를 하네스로 하나씩 익힙니다.

**C3 — 리서치·인사이트 하네스 (팬아웃/팬인)**
> "하루 걸리던 카테고리 진단을 한 시간에." 시장·소비자·경쟁·트렌드를 네 명이 동시에 조사하고, 한 명이 교차검증해 하나의 인사이트 보고서로 종합합니다.

> 팁: 여기서 만든 자동화 하네스는 앞으로 배울 리서치·크리에이티브·미디어·콘텐츠의 결과물을 문서로 마감할 때 계속 다시 씁니다.

<!-- web: nav prev=course1-basics next=course3-research -->
`);

// ---------- C3 (was C2 research) ----------
const R = "course3-research/교재/C3_교재.md";
rep(R, "course_id: C2", "course_id: C3");
rep(R, "# C2 · 리서치·인사이트 하네스", "# C3 · 리서치·인사이트 하네스");
rep(R, "prev=course1-basics next=course3-creative", "prev=course2-automation next=course4-creative");
rep(R, "../사례/C2_인사이트보고서.md", "../사례/C3_인사이트보고서.md");
rep(R, "**C3 · 크리에이티브 제작 하네스**에서는", "**C4 · 크리에이티브 제작 하네스**에서는");

// ---------- C4 (was C3 creative) ----------
const CR = "course4-creative/교재/C4_교재.md";
rep(CR, "course_id: C3", "course_id: C4");
rep(CR, "# C3 · 크리에이티브 제작 하네스", "# C4 · 크리에이티브 제작 하네스");
rep(CR, "prev=course2-research next=course4-media", "prev=course3-research next=course5-media");
rep(CR, "../사례/C3_크리에이티브패키지.md", "../사례/C4_크리에이티브패키지.md");
rep(CR, "C4에서는 감독자 패턴으로 미디어 플랜을 지휘합니다.", "C5에서는 감독자 패턴으로 미디어 플랜을 지휘합니다.");
rep(CR, "- **이전:** C2 리서치·인사이트 하네스 (팬아웃/팬인)", "- **이전:** C3 리서치·인사이트 하네스 (팬아웃/팬인)");
rep(CR, "- **다음:** C4 미디어·캠페인 플래닝 하네스 (감독자)", "- **다음:** C5 미디어·캠페인 플래닝 하네스 (감독자)");

// ---------- C5 (was C4 media) ----------
const M = "course5-media/교재/C5_교재.md";
rep(M, "course_id: C4", "course_id: C5");
rep(M, "# C4 · 미디어·캠페인 플래닝 하네스", "# C5 · 미디어·캠페인 플래닝 하네스");
rep(M, "prev=course3-creative next=course5-content", "prev=course4-creative next=course6-content");
rep(M, "../사례/C4_미디어플랜.md", "../사례/C5_미디어플랜.md");
rep(M, "C5 · 콘텐츠·SNS 제작 하네스 — 트렌드", "C6 · 콘텐츠·SNS 제작 하네스 — 트렌드");

// ---------- C6 (was C5 content) ----------
const CO = "course6-content/교재/C6_교재.md";
rep(CO, "course_id: C5", "course_id: C6");
rep(CO, "# C5 · 콘텐츠·SNS 제작 하네스", "# C6 · 콘텐츠·SNS 제작 하네스");
rep(CO, "../사례/C5_콘텐츠캘린더.md", "../사례/C6_콘텐츠캘린더.md");
sliceAt8(CO, `## 8. 다음 과정

정지 이미지 콘텐츠를 파이프라인으로 뽑는 흐름을 익혔다면, 다음은 **영상**입니다. C7에서는 최신 Seedance로 숏폼 광고 영상을 대본부터 스토리보드·샷 프롬프트까지 팀으로 만듭니다.

- **이전 과정:** C5 · 미디어·캠페인 플래닝 하네스
- **다음 과정:** C7 · Seedance 영상 콘텐츠 하네스

<!-- web: nav prev=course5-media next=course7-video -->
`);

// ---------- C7 (video) ----------
const V = "course7-video/교재/C7_교재.md";
rep(V, "prerequisite: C5", "prerequisite: C6");
rep(V, "**선수과정:** C5(콘텐츠·SNS) 권장", "**선수과정:** C6(콘텐츠·SNS) 권장");
rep(V, "prev=course6-automation next=none", "prev=course6-content next=none");
rep(V, "그리고 C6(업무 자동화)와 연결하면", "그리고 C2(업무 자동화)와 연결하면");

// ---------- case files: course_id ----------
rep("course2-automation/사례/C2_주간리포트_자동화.md", "course_id: C6", "course_id: C2");
rep("course3-research/사례/C3_인사이트보고서.md", "course_id: C2", "course_id: C3");
rep("course4-creative/사례/C4_크리에이티브패키지.md", "course_id: C3", "course_id: C4");
rep("course5-media/사례/C5_미디어플랜.md", "course_id: C4", "course_id: C5");
rep("course6-content/사례/C6_콘텐츠캘린더.md", "course_id: C5", "course_id: C6");

console.log("MISSES:", misses.length);
misses.forEach(m => console.log("  ✗", m));
console.log(misses.length ? "⚠️ 확인 필요" : "✅ 모든 교체 완료");
