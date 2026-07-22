# Harness Ad Academy

광고 실무자(비개발자)를 위한 `harness` 활용 교육 프로그램. 8개 핵심 과정 + 선택 학습의 도메인 하네스 + md 교재 + 완성형 사례.

제작 규약(SSOT): `_ssot/conventions.md` · 상위 설계: `spec/HARNESS_AD_ACADEMY_SPEC.md`

## 하네스: 광고 대행사 실무 자동화

**목표:** 공유 에이전트 풀(리서처·카피·아트디렉터·비주얼·미디어·콘텐츠·퍼포먼스·커머스·문서·QA·인사이트)을 과정별 오케스트레이터로 엮어, 광고 실무 산출물을 자동 생성한다.

**트리거:** 아래 오케스트레이터 스킬을 상황에 맞게 사용하라. 단순 질문은 직접 응답 가능.
| 오케스트레이터 스킬 | 언제 | 패턴 |
|---|---|---|
| `starter-harness` | (C1) 첫 하네스 실습, 미니 리서치+카피 | 파이프라인 |
| `automation-harness` | (C2) 반복 업무 자동화 + PPT/Word/Excel/PDF 문서 생성 | 계층위임+전문가풀 |
| `research-harness` | (C3) 시장·소비자·경쟁·트렌드 병렬 조사 → 인사이트 | 팬아웃/팬인 |
| `creative-harness` | (C4) 카피 A/B + 키비주얼 컨셉 + 아트디렉터 검수 | 생성-검증 |
| `media-harness` | (C5) 타겟·채널믹스·예산배분·A/B 미디어 플랜 | 감독자 |
| `content-harness` | (C6) 트렌드→기획→카피·캡션→썸네일→SEO 콘텐츠 | 파이프라인 |
| `performance-harness` | (C7) 채널별 성과 진단·예산 재배분·퍼포먼스 리포트 | 전문가 풀 |
| `scaleup-harness` | (C8) 제품 기획→상세페이지→유통→런칭 스케일업 | 계층적 위임 |
| `video-content-harness` | (E1·선택) Seedance 숏폼·광고 영상(대본→스토리보드→샷 프롬프트→배포) | 파이프라인(영상) |

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-07-15 | 초기 구성 (에이전트 9 + 방법스킬 9 + 오케스트레이터 6) | 전체 | 6과정 하네스 신규 구축 |
| 2026-07-15 | C7 추가: video-director 에이전트 + seedance-video·video-content-harness 스킬 | agents/skills | Seedance 최신 버전 영상 콘텐츠 하네스 |
| 2026-07-22 | 커리큘럼 재편: 영상·시나리오(구 C7)를 선택 학습 E1로 이동, C6 카피·캡션 중심 개정 | 과정/스킬/웹 | 영상 제작은 실무 우선순위 낮음 → 선택 학습화 |
| 2026-07-22 | C7 퍼포먼스 마케팅(performance-marketer + performance-marketing·performance-harness), C8 브랜드 스케일업·커머스(commerce-strategist + commerce-strategy·scaleup-harness) 신설 | agents/skills/과정 | 고객사(디렉터스컴퍼니) 사업 영역(퍼포먼스·브랜드 스케일업) 대응 콘텐츠 보강 |
