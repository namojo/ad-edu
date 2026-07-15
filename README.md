---
site_title: Harness Ad Academy
subtitle: 광고 실무자를 위한 harness 활용 교육
audience: 비개발자 광고 실무자 (기획/AE · 크리에이티브 · 미디어 · 콘텐츠)
courses: 6
brand_colors:
  navy: "#1E293B"
  coral: "#FF6B4A"
  teal: "#2DD4BF"
  paper: "#F8FAFC"
---

# Harness Ad Academy

> **"하네스 구성해줘" 한 문장으로, 나만의 AI 팀을 만든다.**
> 코딩 지식 없이 광고 실무(리서치·크리에이티브·미디어·콘텐츠·자동화)를 AI 에이전트 팀으로 처리하는 6단계 교육 프로그램.

이 저장소는 그대로 **웹 강의 사이트**로 렌더링할 수 있도록 설계되었습니다. 각 과정 교재는 동일한 8개 섹션 골격과 상대경로 링크·이전/다음 내비게이션 주석(`<!-- web: nav ... -->`)을 갖습니다.

---

## 커리큘럼 (기초 → 심화)

| # | 과정 | 난이도 | 하네스 패턴 | 교재 | 완성형 사례 |
|---|------|:---:|------|------|------|
| C1 | **하네스 첫걸음** — 한 문장으로 나만의 AI 팀 | 기초 | 파이프라인(소개) | [교재](course1-basics/교재/C1_교재.md) | 교재 내 수록 |
| C2 | **업무 자동화로 생산성 향상** — 반복 업무를 문서까지 자동으로 | 초급 | 계층위임+전문가풀 | [교재](course2-automation/교재/C2_교재.md) | [주간리포트 자동화](course2-automation/사례/C2_주간리포트_자동화.md) |
| C3 | **리서치·인사이트 하네스** — 하루 걸리던 조사를 한 시간에 | 중급 | 팬아웃/팬인 | [교재](course3-research/교재/C3_교재.md) | [인사이트 보고서](course3-research/사례/C3_인사이트보고서.md) |
| C4 | **크리에이티브 제작 하네스** — 카피·비주얼을 팀으로 뽑고 검수 | 중급 | 생성-검증 | [교재](course4-creative/교재/C4_교재.md) | [크리에이티브 패키지](course4-creative/사례/C4_크리에이티브패키지.md) |
| C5 | **미디어·캠페인 플래닝 하네스** — 감독자가 캠페인을 지휘 | 중급 | 감독자 | [교재](course5-media/교재/C5_교재.md) | [미디어 플랜](course5-media/사례/C5_미디어플랜.md) |
| C6 | **콘텐츠·SNS 제작 하네스** — 기획부터 썸네일까지 한 파이프라인 | 중급 | 파이프라인 | [교재](course6-content/교재/C6_교재.md) | [콘텐츠 캘린더](course6-content/사례/C6_콘텐츠캘린더.md) |
| C7 | **Seedance 영상 콘텐츠 하네스** — 대본에서 숏폼 영상까지 | 심화 | 파이프라인(영상) | [교재](course7-video/교재/C7_교재.md) | [Seedance 영상 캠페인](course7-video/사례/C7_시드댄스_영상캠페인.md) |

> C2에서 업무 자동화로 빠른 실전 이득을 본 뒤, C3~C6으로 harness의 아키텍처 패턴을 익히고, C7에서 **최신 Seedance로 영상 콘텐츠**까지 확장합니다.
> 가상 브랜드 **"제로톡"**(제로 슈거 스파클링 음료)이 전 과정을 관통해 학습 몰입도를 높입니다.

---

## 역할별 추천 트랙

| 트랙 | 순서 |
|------|------|
| 기획 / AE | C1 → C2 → C3 → C5 |
| 크리에이티브 / 콘텐츠 | C1 → C2 → C4 → C6 → C7 |
| 미디어 / 퍼포먼스 | C1 → C2 → C5 → C6 |
| 풀코스(권장) | C1 → C2 → C3 → C4 → C5 → C6 → C7 |

---

## 하네스 백엔드 (기술 구성)

이 프로그램이 가르치는 하네스는 실제로 `.claude/` 에 구현되어 있습니다.

- **공유 에이전트 풀** (`.claude/agents/`, 10종): 리서처 · 인사이트 에디터 · 카피라이터 · 아트디렉터 · 비주얼 디자이너 · 미디어 플래너 · 콘텐츠 크리에이터 · 문서 프로듀서 · QA 리뷰어 · **영상 감독**(video-director)
- **방법 스킬** (`.claude/skills/`, 10종): 각 팀원의 "업무 매뉴얼" (Seedance 영상 매뉴얼 `seedance-video` 포함)
- **오케스트레이터 스킬** (7종): 과정별 "팀장" — `starter-harness` · `research-harness` · `creative-harness` · `media-harness` · `content-harness` · `automation-harness` · `video-content-harness`
- 트리거·변경 이력: [`CLAUDE.md`](CLAUDE.md) · 제작 규약: [`_ssot/conventions.md`](_ssot/conventions.md) · 상위 설계: [`spec/HARNESS_AD_ACADEMY_SPEC.md`](spec/HARNESS_AD_ACADEMY_SPEC.md)

## 과정 1 완성형 교보재 (강의 즉시 사용 가능)

C1은 md 교재 외에 실제 강의용 자료 풀세트를 제공합니다.
- 강의 덱: `course1-basics/deck/C1_하네스_첫걸음_강의덱.pptx`
- 수강생 핸드아웃: `course1-basics/handout/C1_수강생_핸드아웃.docx` (+ PDF)
- 실습 워크시트: `course1-basics/worksheet/C1_실습_워크시트.xlsx`
- 강사노트·프롬프트 모음: `course1-basics/scripts/`

---

## 웹사이트 제작 참고

- 각 교재 `.md`는 프론트매터(`course_id`, `title`, `pattern`, `pattern_color`, `prerequisite`)를 가지므로 카드/헤더 자동 생성이 가능합니다.
- 각 교재 하단 `<!-- web: nav prev=… next=… -->` 주석으로 이전/다음 버튼을 연결하세요.
- 이미지는 모두 상대경로(`../images/…`)이며 저장소 안에 포함되어 있습니다.
- 패턴 색상 코드(프론트매터)로 과정별 테마 색을 입히면 6패턴이 시각적으로 구분됩니다.
