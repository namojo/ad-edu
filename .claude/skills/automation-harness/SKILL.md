---
name: automation-harness
description: "반복 업무를 맞춤 하네스로 자동화하고 PPT/Word/Excel/PDF 보고서 패키지까지 뽑는 자동화 하네스(팀장). '자동화 하네스', '주간 리포트 자동화', '보고서 패키지', '문서 자동 생성', '반복 업무 자동화', 'PPT Word Excel PDF 한번에', '주간 캠페인 성과 리포트' 요청 시 반드시 이 스킬을 사용. 후속 작업도 이 스킬로: 매주 재실행, 이번 주 데이터로 다시, 특정 섹션만 갱신, 문서 포맷만 다시, 액션 제안 보완, 이전 리포트 기반으로 업데이트, 하네스 진화·변경 이력 요청."
---

# Automation Harness — 업무 자동화 하네스 (계층적 위임 + 전문가 풀)

반복 업무(예: 주간 캠페인 성과 리포트)를 **상위에서 하위 태스크로 재귀 분해(계층적 위임)** 하고, 각 하위 태스크에 **필요한 전문가만 풀에서 골라 배정(전문가 풀)** 한 뒤, doc-producer가 **PPT/Word/Excel/PDF 문서 패키지**로 자동 산출하는 오케스트레이터(팀장)입니다.

**실행 모드:** 하이브리드. 성격이 다른 Phase마다 모드를 섞습니다. 모든 에이전트는 `model: opus`로 호출합니다.

| Phase | 모드 | 이유 |
|---|---|---|
| Phase 3 (분석 분해) | 에이전트 팀 | 데이터·인사이트·액션이 서로 참조하며 합의 필요 |
| Phase 4 (문서 패키지) | 서브 에이전트 | doc-producer가 독립적으로 4개 포맷을 순차 산출 |

## 팀 구성 — 전문가 풀에서 상황별 선택

작업 성격에 따라 아래 풀에서 필요한 팀원만 고릅니다(전부 쓰지 않는다).

| 후보 팀원(에이전트) | 언제 배정 | 사용 매뉴얼(스킬) |
|---|---|---|
| researcher | 성과 데이터·외부 벤치마크 수집 | market-research |
| insight-synthesizer | 데이터에서 인사이트 도출 | insight-synthesis |
| media-planner | 다음 주 채널·예산 액션 제안 | media-planning |
| content-creator | 콘텐츠 성과·액션이 콘텐츠 업무일 때 | content-production |
| qa-reviewer | 최종 패키지 수치·논리 검수 | quality-review |
| doc-producer | **필수** — PPT/Word/Excel/PDF 패키지 산출 | doc-automation (pptx/docx/xlsx/pdf) |

> "주간 캠페인 성과 리포트"의 기본 조합: researcher(데이터 요약) + insight-synthesizer(인사이트) + media-planner(다음 주 액션) + doc-producer(패키지) + qa-reviewer(검수). 업무 성격이 다르면 풀에서 다른 조합을 고른다.

## Phase 0: 컨텍스트 확인 (초기/후속/부분 재실행 판별)

1. `_workspace/` 존재 여부 확인.
2. 실행 모드 결정:
   - **없음** → 초기 실행. Phase 1로.
   - **있음 + 정기 재실행**(예: "이번 주 데이터로 다시") → 새 주차 실행. 기존 `_workspace/`를 `_workspace_{YYYYMMDD}/`로 보관하고 새 데이터로 재실행하되, **하네스 구조(팀·문서 템플릿)는 재사용**한다.
   - **있음 + 부분 수정**(예: "액션 제안만 보완", "PPT만 다시") → 부분 재실행. 해당 태스크·해당 포맷만 다시 산출한다.
3. **변경 이력**을 `course2-automation/사례/CHANGELOG.md`에 남긴다(재현·회귀 방지). 진화 요청 시 이 이력을 참조한다.

## Phase 흐름 (계층적 위임 → 전문가 배정 → 문서 패키지)

### Phase 1: 준비 — 업무 분해
1. 사용자 업무를 **역할 단위로 재귀 분해**한다(예: 주간 리포트 = 데이터 요약 / 인사이트 도출 / 다음 주 액션 / 문서화).
2. 각 하위 태스크에 맞는 전문가를 풀에서 선택하고, 패턴(계층적 위임+전문가풀)을 확정한다.
3. 입력 데이터를 `_workspace/00_input/`에 저장하고, 팀 표준 문서 템플릿을 지정한다(포맷 난립 방지).

### Phase 2: 팀 구성
1. Phase 3용 `automation-team`을 만들고 선택한 분석 전문가 + doc-producer 후보를 `model: opus`로 등록.
2. 작업을 계층적으로 등록: 상위 "리포트 생성" 아래 데이터→인사이트→액션 하위 태스크를 `depends_on`으로 연결.

### Phase 3: 분석 분해·실행 (에이전트 팀)
**실행 모드:** 에이전트 팀
1. researcher가 성과 데이터를 요약 → `_workspace/1_researcher_data.md`.
2. insight-synthesizer가 데이터를 Read해 인사이트 도출 → `_workspace/2_insight_findings.md`.
3. media-planner가 인사이트를 Read해 다음 주 액션 제안 → `_workspace/3_mediaplanner_actions.md`.
4. 팀원 간 상충·수치 불일치는 SendMessage로 확인, **삭제하지 말고 출처 병기**로 합의.
5. 팀을 `TeamDelete`로 정리(모드 전환 전 필수).

### Phase 4: 문서 패키지 산출 (서브 에이전트)
**실행 모드:** 서브 에이전트
1. doc-producer를 Agent 도구로 호출해 Phase 3 산출물 3개를 입력으로 준다.
2. 팀 표준 템플릿으로 4개 포맷을 순차 산출한다:
   - 발표용 **PPT** `_workspace/4_deck.pptx` (pptx)
   - 상세 **Word** 보고서 `_workspace/4_report.docx` (docx)
   - 성과 지표 **Excel** `_workspace/4_metrics.xlsx` (xlsx)
   - 통합 **PDF** `_workspace/4_package.pdf` (pdf)
3. 각 산출 후 파일 손상·빈 파일 여부를 확인하고 실패분만 재생성한다.

### Phase 5: 검수·마무리
1. qa-reviewer를 서브 에이전트로 호출해 수치 일관성·논리를 검수(quality-review) → 문제 시 해당 단계 1회 재생성.
2. 최종 패키지를 지정 경로 `course2-automation/사례/주간리포트_패키지/`(4개 문서)로 내보낸다.
3. 변경 이력을 `CHANGELOG.md`에 기록하고, **매주 재실행 가능한 재사용 템플릿**으로 정리한다.
4. `_workspace/` 보존.

## 데이터 전달

- **팀 모드(Phase 3):** 태스크 + 파일 + 메시지. 하위 태스크는 상위 태스크에 `depends_on`으로 연결.
- **서브 모드(Phase 4~5):** Agent 도구로 doc-producer/qa-reviewer 호출, 입력은 `_workspace/` 파일 경로로 전달, 산출도 파일로 회수.
- **파일 규약:** `_workspace/{phase}_{agent}_{artifact}.{ext}`.
- **최종 산출물만** `course2-automation/사례/주간리포트_패키지/`로 내보낸다.
- **모드 전환 규칙:** 팀 → 서브 전환 시 반드시 `TeamDelete` 후 Agent 호출. 서브의 파일 산출물을 이후 단계에 경로로 전달.

## 에러 핸들링

| 상황 | 대응 |
|---|---|
| 업무가 너무 커 한 번에 자동화 시도 | 하나의 반복 업무로 스코프 축소 후 분해 |
| 문서 포맷 난립 | 팀 표준 템플릿 1세트로 고정 |
| 수치 불일치(팀원 간) | 삭제 금지, 출처 병기 후 qa-reviewer가 판단 |
| 문서 1개 포맷 실패 | 해당 포맷만 1회 재생성 → 실패 시 누락 명시하고 나머지 3종 제공 |
| 진화 이력 미기록 | CHANGELOG에 변경 이력 필수 기록(재현·회귀 방지) |
| 팀→서브 전환 누락 | TeamDelete 없이 Agent 호출 금지(세션당 1팀) |

## 팀 크기

**대규모(가변, 4~6명).** 계층적 위임이므로 업무 복잡도에 따라 늘어난다. 분석 전문가 2~4명(풀에서 선택) + doc-producer 1(필수) + qa-reviewer 1(검수)가 상한 가이드. 필요 없는 전문가는 부르지 않는다(전문가 풀 원칙).

## 테스트 시나리오

### 정상 흐름
1. 사용자가 "주간 캠페인 성과 리포트" 자동화를 요청, 이번 주 데이터 제공.
2. Phase 1에서 데이터요약/인사이트/액션/문서화로 분해, 전문가 선택.
3. Phase 3 팀 모드로 데이터→인사이트→액션 산출.
4. TeamDelete 후 Phase 4 서브 모드로 doc-producer가 PPT/Word/Excel/PDF 4종 생성.
5. qa-reviewer 검수 통과 → `course2-automation/사례/주간리포트_패키지/` 내보냄, CHANGELOG 기록.
6. "다음 주 데이터로 다시" 재요청 시 하네스·템플릿 재사용해 재실행.

### 에러 흐름
1. Phase 4에서 PDF 통합본만 생성 실패.
2. PDF만 1회 재생성 시도.
3. 재실패 시 "PDF 미생성" 명시하고 PPT/Word/Excel 3종 제공.
4. qa-reviewer가 3종 검수, 최종 보고에 PDF 누락·재시도 방법 안내.

## 실습 트리거 대표 프롬프트

```text
내 팀의 [주간 캠페인 성과 리포트] 업무를 자동화하는 하네스를 구성해줘. 데이터 요약, 인사이트 도출, 다음 주 액션 제안을 나눠 맡고, 최종 결과를 발표용 PPT 덱, 상세 Word 보고서, 성과 지표 Excel 시트, 그리고 통합 PDF로 자동 생성해줘. 매주 재실행할 수 있게 만들어줘.
```

후속 예: "이번 주 데이터로 다시 돌려줘" · "액션 제안만 보완" · "PPT 덱만 다시" · "지난주 대비 변경 이력 정리".
