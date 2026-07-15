# Harness Ad Academy — 제작 SSOT (단일 진실 원천)

> 모든 하네스 파일·교재·사례를 만드는 사람(사람/서브에이전트)은 이 문서를 먼저 읽고 규약을 따른다.
> 상위 설계는 `spec/HARNESS_AD_ACADEMY_SPEC.md`. 이 문서는 "어떻게 통일되게 만드는가"를 정의한다.

---

## 1. 프로젝트 목적

광고 회사 **비개발자 실무자**가 Claude Code용 플러그인 `revfactory/harness`로 실무를 자동화하도록 가르치는 6단계 교육 프로그램.
- 하네스 = "하네스 구성해줘" 한 문장으로 업무를 **AI 에이전트 팀 + 스킬**로 변환하는 팀 아키텍처 팩토리.
- 우리는 이 프로그램이 가르치는 **6개 도메인 하네스**를 직접 구축하고, 각 과정의 **완성형 사례**와 **웹 대응 md 교재**를 만든다.

## 2. 대상 독자 = 비개발자 (톤 규칙, 필수)

- 코딩 지식 0을 전제한다. 전문 용어는 반드시 광고 실무 비유로 치환한다.
- 치환 사전(항상 이렇게):
  | 기술 용어 | 이렇게 부른다 |
  |---|---|
  | 에이전트(agent) | 팀원 |
  | 오케스트레이터(orchestrator) | 팀장 |
  | 스킬(skill) | 업무 매뉴얼 |
  | 프롬프트(prompt) | 브리프 / 지시 문장 |
  | 파이프라인 | 앞사람 결과를 뒷사람이 받는 순차 협업 |
- 금지: `assertion`, `JSON schema`, `CLI flag`, `SDK`, `regex` 등을 설명 없이 사용.
- 문장은 짧고 능동형. "~합니다/하세요" 존댓말 지시형. 겁주지 말고 안심시킨다.
- "AI는 매번 조금 다르게 답한다(비결정성)"를 각 교재에서 한 번은 안내한다.
- "결과를 그냥 믿지 말고 한 번은 의심하라(검증)"를 반복 강조한다.

## 3. 아키텍처 결정 (확정)

**공유 에이전트 풀 + 과정별 오케스트레이터.** 6과정이 아래 에이전트를 공유하고, 과정마다 오케스트레이터 스킬 1개가 이들을 엮는다.

### 에이전트 풀 (`.claude/agents/`) — 9종
| 파일 | 이름(역할) | 광고팀 비유 | 주 사용 스킬 |
|---|---|---|---|
| researcher.md | 리서처 | 조사 담당 | market-research |
| insight-synthesizer.md | 인사이트 에디터 | 전략 기획 | insight-synthesis |
| copywriter.md | 카피라이터 | 카피라이터 | ad-copywriting |
| art-director.md | 아트디렉터 | 아트디렉터(검수) | creative-direction |
| visual-designer.md | 비주얼 디자이너 | 디자이너 | visual-concepting |
| media-planner.md | 미디어 플래너 | 미디어 플래너 | media-planning |
| content-creator.md | 콘텐츠 크리에이터 | 콘텐츠/SNS | content-production |
| doc-producer.md | 문서 프로듀서 | 산출물 정리 | doc-automation |
| qa-reviewer.md | QA 리뷰어 | 품질 검수 | quality-review |

- 모든 에이전트 정의는 `model: opus` 전제(호출 시 명시). 빌트인 타입이라도 파일로 정의.
- 에이전트 파일 필수 섹션: `## 핵심 역할`, `## 작업 원칙`, `## 입력/출력 프로토콜`, `## 에러 핸들링`, `## 팀 통신 프로토콜`, `## 재호출 지침`.

### 스킬 (`.claude/skills/`)
**방법 스킬 9종** (각 에이전트의 "어떻게"): market-research, insight-synthesis, ad-copywriting, creative-direction, visual-concepting, media-planning, content-production, doc-automation, quality-review.
**오케스트레이터 스킬 6종** (과정별 "누가 언제 협업"):
| 스킬 | 과정 | 패턴 | 팀 구성 |
|---|---|---|---|
| starter-harness | C1 | 파이프라인(소개) | researcher → copywriter |
| research-harness | C2 | 팬아웃/팬인 | researcher×4(병렬) → insight-synthesizer |
| creative-harness | C3 | 생성-검증 | copywriter + visual-designer → art-director(검수) |
| media-harness | C4 | 감독자 | media-planner(감독) + researcher + doc-producer |
| content-harness | C5 | 파이프라인 | researcher → content-creator → visual-designer → (SEO) |
| automation-harness | C6 | 계층적 위임+전문가풀 | 상황별 풀 + doc-producer(문서 자동화) |

- 스킬 frontmatter 필수: `name`, `description`(적극적/pushy, 후속 키워드 "다시/재실행/수정/보완" 포함).
- 오케스트레이터 스킬 본문 필수: 실행 모드 명시, Phase 흐름, 데이터 전달, 에러 핸들링(1회 재시도→누락 명시, 상충은 출처 병기), `## 테스트 시나리오`(정상1+에러1), Phase 1 컨텍스트 확인(초기/후속/부분 재실행).
- 방법 스킬은 500줄 이내, 명령형, Why 설명. 필요시 references/ 분리.

## 4. 문서 생성 스킬 연계
- 이미지: **codex-image**(병렬 최대 5장, 텍스트 배제) — visual-concepting이 사용. C3 키비주얼·C5 썸네일.
- 문서: **pptx/docx/xlsx/pdf** — doc-automation이 사용. C4 Excel·C6 보고서 패키지.
- 리서치 심화: **deep-research** — C2 연계.

## 5. 디자인 시스템 (교재/이미지 공통)
- 색: Ink Navy `#1E293B`, Signal Coral `#FF6B4A`, Fresh Teal `#2DD4BF`, Slate `#64748B`, Paper `#F8FAFC`.
- 패턴 색 코딩: 파이프라인 `#3B82F6` / 팬아웃·팬인 `#8B5CF6` / 전문가풀 `#14B8A6` / 생성-검증 `#FF6B4A` / 감독자 `#F59E0B` / 계층위임 `#EC4899`.
- 이미지 art direction 고정: 16:9, 플랫 에디토리얼 벡터, 위 팔레트, **이미지 내 텍스트 배제**(오탈자 방지), 파일명 유일.

## 6. 교재(md) 구조 — 웹 대응, 모든 과정 동일 골격

파일: `courseN-슬러그/교재/CN_교재.md`. 프론트매터 + 아래 섹션 순서 고정(웹 렌더 시 목차·앵커로 사용).

```markdown
---
course_id: C2
title: 리서치·인사이트 하네스
level: 중급
duration_min: 150
pattern: 팬아웃/팬인
pattern_color: "#8B5CF6"
prerequisite: C1
hero_image: ../images/... (있으면)
---

# C2 · 리서치·인사이트 하네스

> 한 줄 후킹 문구

## 0. 이 과정 한눈에
- 대상 / 소요 / 선수과정 / 사용 하네스 / 얻어가는 것(산출물)

## 1. 왜 이 하네스인가  (실무 문제 → 해결, Before/After)

## 2. 개념 이해  (패턴을 광고 비유로, 그림 설명)

## 3. 사용할 하네스  (팀 구성표: 팀원=에이전트, 각자 역할 / 오케스트레이터 트리거 문장)

## 4. 실습 — 단계별  (복붙 프롬프트 블록 + 각 단계 기대결과 표)

## 5. 완성형 사례  (worked example: 실제 산출물 전문 또는 발췌 + `사례/` 파일 링크)

## 6. 자주 하는 실수  (3~4개, 실수 → 이렇게 하세요)

## 7. 체크리스트 & 자기평가  (완주 체크 + 루브릭 요약)

## 8. 다음 과정
```

- 복붙 프롬프트는 반드시 ```` ```text ```` 코드블록. 3요소(도메인·역할·산출물)를 담는다.
- 웹 이식성: 상대경로 이미지/링크만 사용. 표는 표준 md 표. 이모지 남발 금지(섹션당 0~1).
- 각 교재 끝에 `<!-- web: nav prev/next -->` 주석으로 이전/다음 과정 슬러그 표기.

## 7. 완성형 사례(worked example) 규칙
- "실제로 하네스를 돌렸을 때 나올 법한" 현실적 산출물을 직접 집필한다(가상 브랜드 사용).
- 가상 브랜드/데이터는 명확히 예시임을 표기. 수치는 그럴듯하되 "예시 데이터" 라벨.
- 큰 산출물(리서치 보고서, 미디어플랜, 콘텐츠 캘린더)은 `courseN/사례/`에 별도 md/표로 저장하고 교재 5장에서 링크+핵심 발췌.
- 비주얼 사례(C3 키비주얼 4안, C5 썸네일)는 `courseN/images/`에 실제 생성 이미지, 교재에 삽입.

## 8. 가상 브랜드/시나리오 (과정 간 일관 사용)
- C1: 신제품 음료 **"제로톡"** (제로 슈거 스파클링) 런칭 — 미니 리서치+카피
- C2: **"제로톡"** 카테고리(제로 슈거 음료) 진단 — 시장·소비자·경쟁·트렌드 병렬 조사
- C3: **"제로톡"** 여름 캠페인 크리에이티브 — 카피 A/B + 키비주얼 4안
- C4: **"제로톡"** 런칭 캠페인 미디어 플랜 — 예산 5,000만원
- C5: **"제로톡"** 1주 SNS 콘텐츠 — 숏폼/인스타/블로그
- C6: 대행사 **"주간 캠페인 성과 리포트"** 자동화 — 문서 패키지
> 하나의 브랜드("제로톡")가 6과정을 관통하면 학습 몰입도↑. C6만 대행사 내부 업무.

## 9. 파일 경로 규약
```
harness-ad-academy/
├── .claude/agents/*.md              # 에이전트 풀 9
├── .claude/skills/<skill>/SKILL.md  # 방법9 + 오케스트레이터6
├── CLAUDE.md                        # 하네스 포인터 + 변경이력
├── _ssot/conventions.md             # 본 문서
├── spec/HARNESS_AD_ACADEMY_SPEC.md
├── course1-basics/  (기존 deck/handout/worksheet) + 교재/C1_교재.md
├── course2-research/{교재,사례}/
├── course3-creative/{교재,사례,images}/
├── course4-media/{교재,사례}/
├── course5-content/{교재,사례,images}/
└── course6-automation/{교재,사례}/
```

## 10. 품질 게이트(제작자 자가 점검)
- [ ] 비개발자 용어 치환 준수(미설명 전문용어 0)
- [ ] 복붙 프롬프트가 3요소 포함, 실제 트리거 표현("하네스 구성해줘"/오케스트레이터 트리거)
- [ ] 사례가 구체적(가상 데이터 라벨 포함)
- [ ] 교재 8개 섹션 골격 준수, 상대경로 링크
- [ ] 에이전트/스킬 이름이 본 SSOT 표와 정확히 일치(오케스트레이터가 참조하는 이름 일관)
