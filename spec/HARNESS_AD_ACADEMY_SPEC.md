<project_specification>

<!-- 2026-07-22 커리큘럼 재편 (현행 구조는 _ssot/conventions.md 와 CLAUDE.md 가 SSOT):
     - 영상·시나리오(대본) 제작(구 Seedance 영상 과정)은 실무 우선순위 낮음 → 선택 학습 E1(elective1-video)로 이동
     - 콘텐츠·SNS 과정은 영상 대본 대신 게시물 카피·캡션 중심으로 개정
     - 신규 퍼포먼스 마케팅 하네스(전문가 풀)와 브랜드 스케일업·커머스 하네스(계층적 위임) 추가
     - 순서 재편: 퍼포먼스=C5(course5-performance), 스케일업=C6(course6-scaleup)으로 앞당기고,
       미디어=C7(course7-media), 콘텐츠=C8(course8-content)은 후순위 배치
     본 스펙의 과정 번호/구성은 초기 설계 시점 기준의 히스토리로 보존한다. -->

<project_name>Harness Ad Academy — 광고 실무자를 위한 harness 활용 교육과정 (기초→심화 8과정 + 선택 학습)</project_name>

<overview>
Harness Ad Academy는 광고 회사의 **비개발자 실무자**(기획/AE, 크리에이티브, 미디어 플래너, 콘텐츠/퍼포먼스 마케터)가 Claude Code용 플러그인 **`harness`**를 자신의 업무에 직접 적용할 수 있도록 설계된 6단계 교육과정이다. harness는 "하네스 구성해줘" 한 문장으로 도메인 설명을 **전문 에이전트 팀 + 스킬**로 변환해 주는 "팀 아키텍처 팩토리"이며, 본 과정은 이 도구를 코드 지식 없이 실무 산출물(리서치 보고서, 크리에이티브, 미디어 플랜, 콘텐츠, 자동화 문서)로 연결하는 것을 목표로 한다.

과정은 기초 1과정(하네스 개념·설치·첫 실행) → 도메인 사례 4과정(리서치, 크리에이티브, 미디어 플래닝, 콘텐츠/SNS) → 심화 1과정(업무 자동화·문서 생성·하네스 진화)의 아크로 구성된다. 각 과정은 (1) 개념 강의, (2) 강사 시연(live demo), (3) 수강생 hands-on 실습, (4) 산출물 리뷰의 4-비트 구조를 따르며, 6과정 전체에 걸쳐 harness의 6가지 아키텍처 패턴(파이프라인·팬아웃/팬인·전문가 풀·생성-검증·감독자·계층적 위임)을 자연스럽게 학습한다.

핵심 교수 철학: **"코드가 아니라 오케스트레이션을 가르친다."** 수강생은 프로그래밍을 배우지 않는다. 대신 (a) 업무를 전문 역할로 분해하는 법, (b) 자연어로 에이전트 팀을 지시·조율하는 법, (c) 산출물을 검증·개선하는 법을 배운다. 광고 대행사의 "팀장이 팀원에게 브리프를 주고 결과를 리뷰하는" 익숙한 멘탈 모델을 AI 에이전트 팀에 그대로 대응시켜 학습 장벽을 낮춘다.

CRITICAL: 본 스펙은 소프트웨어가 아니라 **교육 프로그램 산출물 패키지**를 만들기 위한 빌드 플랜이다. "빌드 대상"은 슬라이드 덱(PPT), 핸드아웃(Word), 실습 워크시트(Excel), 인쇄물(PDF), 개념 이미지, 실습 대본이다. CRITICAL: 수강생은 비개발자이므로 모든 자료에서 전문 용어(assertion, JSON schema, CLI flag 등)는 반드시 풀어서 설명하거나 비유로 대체한다. CRITICAL: 실습 예제는 100% 광고 실무 맥락(브랜드 캠페인, 매체, 크리에이티브)으로 구성하고 소프트웨어 개발 예제는 사용하지 않는다.
</overview>

<scope_boundaries>
  <in_scope>
    - 6개 교육과정의 전체 커리큘럼 설계 (학습목표, 대상, 소요시간, 커리큘럼 맵, 평가 루브릭)
    - 각 과정별 hands-on 실습 시나리오 및 실습 스크립트(강사/수강생용)
    - 각 과정에 매핑되는 harness 아키텍처 패턴과 예시 프롬프트
    - 과정 1(기초)의 완성형 교보재 풀세트: 강의 덱(PPT), 수강생 핸드아웃(Word), 실습 워크시트(Excel), 개념 이미지(codex-image), 인쇄용 PDF
    - 교보재 디자인 시스템(색상·타이포·레이아웃 규격)과 브랜딩
    - 이미지/문서 생성에 사용하는 스킬(codex-image, pptx, docx, xlsx, pdf) 활용 지침
    - 강사 운영 가이드(타임라인, FAQ, 트러블슈팅, 사전 점검 체크리스트)
  </in_scope>
  <out_of_scope>
    - harness 플러그인 자체의 소스코드 수정/개발 (설치·사용법만 다룸)
    - Claude Code / Anthropic 계정·요금제·라이선스 조달 및 IT 인프라 구축
    - 광고 업무 도메인 지식 자체에 대한 교육(카피라이팅 이론, 미디어 바잉 실무 등) — harness 활용법에 집중
    - 과정 2~6의 완성형 교보재 실제 파일 제작(본 빌드에서는 상세 설계·실습 대본까지만; 실제 PPT/Excel 파일은 과정 1만)
    - LMS(학습관리시스템) 구축, 온라인 수강 플랫폼, 수료증 발급 시스템
    - harness와 경쟁/인접 도구(Archon, LangGraph 등) 비교 심화 교육
  </out_of_scope>
  <future_considerations>
    - 과정 2~6 완성형 교보재 풀세트 순차 제작 (Phase 2)
    - 사내 도메인 특화 하네스 라이브러리 구축 및 팀별 배포 (Phase 2)
    - "하네스 사내 인증제" — 수료 후 실무 적용 뱃지/레벨 (Phase 3)
    - 강사 양성 과정(Train-the-Trainer) 및 e-러닝 전환 (Phase 3)
    - 실제 캠페인 데이터 연동 실습(내부 툴/데이터 커넥터) (Phase 3)
  </future_considerations>
</scope_boundaries>

<technology_stack>
  <learning_platform>
    <primary_tool>Claude Code (CLI/데스크톱/IDE 확장) — 실습 실행 환경</primary_tool>
    <core_plugin>harness v1.2.0 (Apache 2.0) — "팀 아키텍처 팩토리" 플러그인</core_plugin>
    <model>Claude Opus (하네스 에이전트 기본 모델), 표준 작업 Sonnet</model>
    <experimental_flag>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 (에이전트 팀 기능 활성화)</experimental_flag>
    <note>CRITICAL: 하네스는 Claude Code 네이티브 전용. 수강생 PC에 Claude Code + harness 플러그인이 사전 설치되어 있어야 실습 가능(대상 환경: 설치·실습 가능).</note>
  </learning_platform>
  <harness_architecture_patterns>
    <pattern name="파이프라인">순차 의존 작업 — 단계별로 앞 결과가 다음 입력. 예: 리서치→대본→썸네일</pattern>
    <pattern name="팬아웃/팬인">병렬 독립 조사 후 통합 — 예: 시장·소비자·경쟁을 동시에 조사 후 종합</pattern>
    <pattern name="전문가 풀">상황별 필요한 전문가만 선택 호출 — 예: 카테고리별 다른 리서처</pattern>
    <pattern name="생성-검증">생성 에이전트 + 검수 에이전트 — 예: 카피 생성 후 아트디렉터 리뷰</pattern>
    <pattern name="감독자">중앙 감독자가 상태 관리·동적 분배 — 예: 캠페인 매니저가 태스크 배분</pattern>
    <pattern name="계층적 위임">상위→하위 재귀 위임 — 예: 통합 캠페인을 채널별로 분해 위임</pattern>
  </harness_architecture_patterns>
  <content_production_skills>
    <skill name="codex-image">개념 이미지·비주얼 컨셉·썸네일 병렬 생성(최대 5장 동시). 이미지가 필요한 모든 교보재/실습</skill>
    <skill name="pptx">강의 덱·발표자료 생성/편집</skill>
    <skill name="docx">수강생 핸드아웃·가이드·용어집 문서</skill>
    <skill name="xlsx">실습 워크시트·체크리스트·예산 시트·평가 루브릭</skill>
    <skill name="pdf">인쇄용 배포물·수료 자료 통합 PDF</skill>
    <skill name="a4-print-design">흑백 A4 인쇄 최적화 핸드아웃/워크시트 레이아웃</skill>
    <skill name="deep-research">과정 2 리서치 실습 심화 연계(다중 소스 검증형 리서치)</skill>
  </content_production_skills>
  <deliverable_formats>
    <format>.pptx — 강의 덱 (16:9, 1920×1080)</format>
    <format>.docx — 핸드아웃/가이드 (A4)</format>
    <format>.xlsx — 실습 워크시트/루브릭</format>
    <format>.pdf — 인쇄용 통합본</format>
    <format>.png — 개념 이미지 (16:9, ~1536×1024 또는 1254×1254)</format>
    <format>.md — 실습 스크립트/강사 노트</format>
  </deliverable_formats>
</technology_stack>

<prerequisites>
  <trainee_environment_setup>
    - Claude Code 설치 완료 (CLI 또는 데스크톱 앱)
    - Anthropic 계정 로그인 및 유효한 사용 요금제
    - harness 플러그인 설치: `/plugin marketplace add harness` → `/plugin install harness-marketplace`
    - 에이전트 팀 기능 활성화: 환경변수 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
    - 실습용 작업 폴더 1개 (예: `~/harness-lab/`)
    - (권장) 문서 생성 스킬 사용 가능 환경 (pptx/docx/xlsx/pdf) — 과정 5~6 실습에서 활용
  </trainee_environment_setup>
  <trainee_knowledge_prerequisites>
    - 코딩 지식 불필요 (본 과정의 핵심 전제)
    - 자신의 담당 광고 업무 프로세스에 대한 실무 이해
    - 파일/폴더 기본 조작, 텍스트 편집기 사용 가능 수준
    - 과정 2 이상은 과정 1(기초) 수료 또는 동등 지식 전제
  </trainee_knowledge_prerequisites>
  <instructor_prerequisites>
    - harness 6패턴 및 워크플로우(Phase 0~7) 숙지
    - Claude Code 에이전트 팀/서브에이전트 실행 모드 차이 이해
    - 각 과정 실습을 사전에 1회 이상 리허설(dry-run) 완료
    - 실습 실패 시 폴백 산출물(사전 생성 결과물) 준비
  </instructor_prerequisites>
  <build_configuration>
    - 교보재 생성 도구: codex-image(이미지), pptx/docx/xlsx/pdf 스킬(문서)
    - 이미지 art direction: 통일 팔레트(navy #1E293B / coral #FF6B4A / teal #2DD4BF / off-white #F8FAFC), 플랫 에디토리얼 벡터, 이미지 내 텍스트 배제
    - 문서 폰트: 본문 Pretendard/맑은 고딕 계열, 제목 동일 계열 Bold
  </build_configuration>
</prerequisites>

<file_structure>
harness-ad-academy/
├── spec/
│   └── HARNESS_AD_ACADEMY_SPEC.md      # 본 마스터 설계서
├── course1-basics/                     # 과정 1 완성형 풀세트
│   ├── deck/
│   │   └── C1_하네스_첫걸음_강의덱.pptx
│   ├── handout/
│   │   ├── C1_수강생_핸드아웃.docx
│   │   └── C1_수강생_핸드아웃.pdf
│   ├── worksheet/
│   │   └── C1_실습_워크시트.xlsx
│   ├── images/
│   │   ├── 01-cover-hero.png
│   │   ├── 02-team-metaphor.png
│   │   ├── 03-before-after.png
│   │   └── 04-one-sentence.png
│   └── scripts/
│       ├── C1_강사노트.md               # 시연 스크립트 + 타임라인
│       └── C1_실습_프롬프트모음.md       # 복붙용 프롬프트
├── course2-research/                   # 과정 2~6: 상세 설계 + 실습 대본 (본 스펙 내)
├── course3-creative/
├── course4-media/
├── course5-content/
├── course6-automation/
└── assets/
    └── brand/                          # 공통 디자인 자산(로고, 팔레트, 아이콘)
</file_structure>

<core_data_entities>

  <entity name="Course (교육과정)">
    - id: string (C1~C6)
    - title: string (과정명)
    - level: enum (기초, 중급, 심화)
    - targetRole: string[] (기획/AE, 크리에이티브, 미디어플래너, 콘텐츠/퍼포먼스, 전체)
    - duration: number (분, 표준 세션 길이)
    - harnessPattern: enum (파이프라인, 팬아웃/팬인, 전문가풀, 생성-검증, 감독자, 계층적위임, 혼합)
    - learningObjectives: string[] (3~5개, 측정가능한 동사로)
    - keyConcepts: string[] (핵심 개념)
    - lab: Lab (실습)
    - deliverables: string[] (수강생 산출물)
    - assessment: Rubric (평가 루브릭 참조)
    - prerequisiteCourseId: string (선수 과정, C1은 없음)
    - [index] level+targetRole (역할별 추천 트랙 조회)
  </entity>

  <entity name="Lab (실습)">
    - courseId: string
    - scenario: string (광고 실무 시나리오 한 줄)
    - harnessPrompt: string (수강생이 입력할 "하네스 구성" 프롬프트 원문)
    - steps: Step[] (실습 단계, 각 단계 = 액션+기대결과)
    - producedArtifact: string[] (생성 산출물 형식)
    - timeboxMinutes: number
    - fallbackAsset: string (실습 실패 시 배포할 사전 생성물 경로)
    - commonPitfalls: string[] (자주 발생하는 실수)
  </entity>

  <entity name="Rubric (평가 루브릭)">
    - courseId: string
    - criteria: Criterion[] (평가 항목)
    - Criterion: { name: string, weight: number(%), levels: enum(미흡/보통/우수, 각 레벨 기술) }
    - passThreshold: number (통과 기준 %, 기본 70)
  </entity>

  <entity name="Deliverable (교보재)">
    - courseId: string
    - type: enum (deck, handout, worksheet, image, pdf, script)
    - format: enum (pptx, docx, xlsx, png, pdf, md)
    - path: string
    - status: enum (설계완료, 제작완료, 검수완료)
    - producedBy: enum (pptx-skill, docx-skill, xlsx-skill, codex-image, pdf-skill, 수작업)
  </entity>

</core_data_entities>

<curriculum_map>
  <program_arc>
    기초(개념·설치·첫 실행) → 도메인 사례 4종(리서치·크리에이티브·미디어·콘텐츠) → 심화(자동화·문서생성·진화)
  </program_arc>
  <pattern_coverage>
    - C1: 개념 소개 + 파이프라인 맛보기 (전체 그림)
    - C2: 팬아웃/팬인 (병렬 조사 → 종합)
    - C3: 생성-검증 (생성 + 아트디렉터 리뷰 게이트)
    - C4: 감독자 (캠페인 매니저가 동적 배분)
    - C5: 파이프라인 심화 (리서치→대본→썸네일 순차)
    - C6: 계층적 위임 + 전문가 풀 + 커스텀 (혼합)
    → 6과정 이수 시 harness 6패턴 전체를 실무 맥락에서 체득
  </pattern_coverage>
  <role_tracks>
    - 기획/AE 트랙: C1 → C2 → C4 → C6
    - 크리에이티브 트랙: C1 → C3 → C5 → C6
    - 미디어/퍼포먼스 트랙: C1 → C4 → C5 → C6
    - 풀코스(추천): C1 → C2 → C3 → C4 → C5 → C6
  </role_tracks>
  <total_duration>표준 6과정 × 약 120~150분 = 총 12~15시간 (2일 집중 or 6주 주1회)</total_duration>
</curriculum_map>

<courses>

  <course id="C1">
    <title>하네스 첫걸음 — "한 문장으로 나만의 AI 팀 만들기"</title>
    <level>기초</level>
    <targetRole>전체 (모든 실무자 공통 필수)</targetRole>
    <duration>120분</duration>
    <harnessPattern>개념 소개 + 파이프라인 맛보기</harnessPattern>
    <learningObjectives>
      1. 하네스가 무엇이고 "왜 팀으로 일하면 결과가 좋아지는지"를 자기 말로 설명할 수 있다
      2. Claude Code에 harness 플러그인을 설치하고 에이전트 팀 기능을 활성화할 수 있다
      3. "하네스 구성해줘"로 첫 에이전트 팀을 생성하고 결과물을 얻을 수 있다
      4. 6가지 아키텍처 패턴의 이름과 쓰임을 광고 업무 비유로 매칭할 수 있다
      5. 좋은 하네스 요청문(도메인·역할·산출물 명시)의 3요소를 구분할 수 있다
    </learningObjectives>
    <keyConcepts>
      - 오케스트레이터(팀장) vs 에이전트(팀원) vs 스킬(업무 매뉴얼)의 3층 구조
      - "하네스 구성해줘" = 도메인 설명 → 에이전트 팀 + 스킬 자동 생성
      - 6패턴 = 6가지 팀 협업 방식(광고 대행사 조직 비유)
      - 에이전트 팀 모드 vs 서브에이전트 모드 (협업 vs 단발)
      - 하네스는 고정물이 아니라 쓸수록 진화하는 시스템
      - 산출물 검증의 중요성(생성-검증 사고방식 씨앗)
    </keyConcepts>
    <lab>
      <scenario>신제품 음료 "제로톡" 런칭을 위한 미니 리서치+카피 팀을 만들어 시장 요약 1페이지와 광고 헤드라인 5개를 받는다</scenario>
      <harnessPrompt>
        하네스 구성해줘. 신제품 음료 런칭을 돕는 작은 팀이 필요해 — 시장/경쟁 상황을 빠르게 조사하는 리서처와, 그 조사를 바탕으로 광고 헤드라인을 뽑는 카피라이터. 조사 요약 1페이지와 헤드라인 5개를 결과로 줘.
      </harnessPrompt>
      <steps>
        1. (설치 점검) Claude Code 실행 → 플러그인 목록에서 harness 확인 → 기대결과: harness가 설치 목록에 보임
        2. (팀 활성화) 에이전트 팀 환경변수 확인 → 기대결과: 팀 기능 on
        3. (첫 실행) 위 harnessPrompt 입력 → 기대결과: 하네스가 도메인 분석 후 리서처+카피라이터 2인 팀 + 스킬 제안
        4. (관찰) 하네스가 생성하는 .claude/agents/ 와 .claude/skills/ 를 눈으로 확인 → 기대결과: "누가(에이전트)"와 "어떻게(스킬)"가 파일로 분리됨을 목격
        5. (산출물 수령) 팀 실행 결과로 시장요약 1p + 헤드라인 5개 확보
        6. (패턴 인식) 이 흐름이 "파이프라인(조사→카피)"임을 강사와 함께 라벨링
        7. (미니 개선) 헤드라인 톤을 "더 위트있게"로 재요청 → 기대결과: 같은 팀이 톤만 바꿔 재생성(진화 체험)
      </steps>
      <producedArtifact>시장요약 1페이지(md), 광고 헤드라인 5개, 생성된 에이전트 팀 파일 구조</producedArtifact>
      <timeboxMinutes>45</timeboxMinutes>
      <fallbackAsset>course1-basics/scripts/C1_실습_프롬프트모음.md 내 사전 생성 결과 캡처</fallbackAsset>
      <commonPitfalls>
        - 프롬프트에 "산출물"을 명시하지 않아 팀이 무엇을 만들지 모호해짐 → 3요소(도메인·역할·산출물) 체크
        - 에이전트 팀 기능 미활성화로 팀 대신 단일 응답 → 환경변수 확인
        - 결과를 그대로 수용(검증 생략) → "한 번은 의심하라" 습관화
      </commonPitfalls>
    </lab>
    <deliverables>첫 에이전트 팀(재사용 가능), 미니 시장요약+헤드라인, 하네스 3요소 요청문 초안</deliverables>
    <assessmentRubricRef>R-C1</assessmentRubricRef>
    <prerequisiteCourseId>없음</prerequisiteCourseId>
    <materialsBuiltInThisPhase>강의덱(PPT), 핸드아웃(Word+PDF), 실습 워크시트(Excel), 개념 이미지 4종, 강사노트, 프롬프트 모음</materialsBuiltInThisPhase>
  </course>

  <course id="C2">
    <title>리서치·인사이트 하네스 — "하루 걸리던 조사를 한 시간에"</title>
    <level>중급</level>
    <targetRole>기획/AE, 전략, 마케터</targetRole>
    <duration>150분</duration>
    <harnessPattern>팬아웃/팬인 (병렬 독립 조사 → 교차검증 → 종합)</harnessPattern>
    <learningObjectives>
      1. 팬아웃/팬인 패턴이 왜 리서치에 최적인지 설명할 수 있다
      2. 시장·소비자·경쟁·트렌드를 병렬 조사하는 리서치 하네스를 구성할 수 있다
      3. 상충하는 정보를 "삭제하지 않고 출처 병기"로 다루는 원칙을 적용할 수 있다
      4. deep-research 스킬과 하네스를 연계해 다중 소스 검증형 조사를 수행할 수 있다
      5. 조사 결과를 인사이트 보고서(요약→근거→시사점)로 종합할 수 있다
    </learningObjectives>
    <keyConcepts>
      - 팬아웃(동시 분산) / 팬인(하나로 통합)
      - 병렬 조사가 속도와 관점 다양성을 동시에 확보하는 원리
      - 교차검증: 여러 소스가 같은 결론이면 신뢰↑, 상충하면 출처 병기
      - 리서치 에이전트 역할 분리(시장/소비자/경쟁/트렌드)
      - 근거 기반 인사이트(주장→근거→시사점) 구조
    </keyConcepts>
    <lab>
      <scenario>실제 담당 브랜드(또는 지정 브랜드)의 카테고리 진단 — 시장규모·소비자 인식·경쟁 포지셔닝·트렌드를 병렬 조사 후 "다음 캠페인 방향" 인사이트 3개 도출</scenario>
      <harnessPrompt>
        리서치 하네스를 구성해줘. 하나의 브랜드/카테고리를 여러 각도에서 동시에 조사하는 팀이 필요해 — 시장 규모와 성장성, 소비자 인식과 페인포인트, 경쟁사 포지셔닝, 최신 트렌드. 각자 조사한 뒤 교차검증하고, 상충하는 정보는 출처를 함께 남겨서 '캠페인 방향 인사이트 3개 + 근거'가 담긴 종합 보고서를 만들어줘.
      </harnessPrompt>
      <steps>
        1. 리서치 하네스 구성 → 4개 병렬 리서처 + 통합 에디터 팀 확인
        2. 담당 브랜드명/카테고리 입력해 실행
        3. 팬아웃 관찰: 4개 조사가 병렬 진행됨을 확인
        4. 팬인 관찰: 통합 에디터가 교차검증·상충 표시하며 종합
        5. deep-research 연계로 특정 주장 심층 재검증(선택)
        6. 인사이트 3개를 "주장→근거→시사점" 형식으로 정리
        7. 보고서를 Word/PDF로 내보내기(문서 스킬 연계)
      </steps>
      <producedArtifact>카테고리 진단 인사이트 보고서(Word/PDF), 근거 출처 목록, 재사용 리서치 하네스</producedArtifact>
      <timeboxMinutes>60</timeboxMinutes>
      <fallbackAsset>사전 생성 샘플 인사이트 보고서</fallbackAsset>
      <commonPitfalls>
        - 조사 범위가 너무 넓어 얕아짐 → 카테고리/기간/지역 스코프 고정
        - 상충 정보를 임의로 하나만 채택 → 출처 병기 원칙 위반
        - 근거 없는 '느낌' 인사이트 → 반드시 조사 근거 링크
      </commonPitfalls>
    </lab>
    <deliverables>카테고리 진단 인사이트 보고서, 리서치 하네스(팀 재사용)</deliverables>
    <assessmentRubricRef>R-C2</assessmentRubricRef>
    <prerequisiteCourseId>C1</prerequisiteCourseId>
    <materialsBuiltInThisPhase>상세 설계 + 실습 대본(본 스펙). 완성형 교보재는 Phase 2</materialsBuiltInThisPhase>
  </course>

  <course id="C3">
    <title>크리에이티브 제작 하네스 — "카피와 비주얼을 팀으로 뽑고, 아트디렉터가 검수한다"</title>
    <level>중급</level>
    <targetRole>크리에이티브(카피/아트), 기획</targetRole>
    <duration>150분</duration>
    <harnessPattern>생성-검증 (생성 에이전트 + 아트디렉터/카피 리뷰 게이트)</harnessPattern>
    <learningObjectives>
      1. 생성-검증 패턴에서 "리뷰 게이트"가 품질을 높이는 원리를 설명할 수 있다
      2. 카피 생성 + 비주얼 컨셉 생성 + 검수로 구성된 크리에이티브 하네스를 만들 수 있다
      3. codex-image로 키비주얼/무드보드 컨셉안을 병렬 생성할 수 있다
      4. 브랜드 톤앤매너를 검증 기준으로 명문화해 리뷰어에 넣을 수 있다
      5. A/B용 카피/비주얼 변형을 체계적으로 산출할 수 있다
    </learningObjectives>
    <keyConcepts>
      - 생성-검증 = 만드는 사람 ≠ 검수하는 사람(같은 맥락 자기검증 금지)
      - 리뷰 게이트: 톤앤매너·브랜드 가이드 위반 시 반려·재생성
      - codex-image 병렬 생성으로 컨셉 다양성 확보(최대 5안)
      - 카피 A/B: 같은 메시지의 서로 다른 앵글(감성/기능/유머)
      - 비주얼 컨셉 브리프 → 이미지 프롬프트 변환
    </keyConcepts>
    <lab>
      <scenario>지정 캠페인의 크리에이티브 패키지 — 헤드라인 A/B 3세트 + 키비주얼 컨셉 4안(codex-image) 생성 후, 아트디렉터 에이전트가 브랜드 톤 기준으로 검수·선별</scenario>
      <harnessPrompt>
        크리에이티브 제작 하네스를 구성해줘. 광고 카피를 감성/기능/유머 세 앵글로 뽑는 카피라이터, 키비주얼 컨셉을 여러 장 생성하는 비주얼 디자이너(codex-image 사용), 그리고 브랜드 톤앤매너 기준으로 결과를 검수하고 반려/재생성을 지시하는 아트디렉터가 필요해. 최종적으로 '추천 카피 3 + 키비주얼 컨셉 4안 + 아트디렉터 코멘트'를 줘.
      </harnessPrompt>
      <steps>
        1. 크리에이티브 하네스 구성 → 카피/비주얼/아트디렉터(검증) 팀 확인
        2. 캠페인 브리프·브랜드 톤 가이드 입력
        3. 카피라이터가 3앵글 × 변형 생성
        4. 비주얼 디자이너가 codex-image로 4안 병렬 생성
        5. 아트디렉터가 톤 기준 검수 → 미달 건 반려·재생성(생성-검증 루프 목격)
        6. 최종 패키지 확정 및 무드보드 정리
      </steps>
      <producedArtifact>키비주얼 컨셉 4안(PNG), 추천 카피 3세트, 아트디렉터 검수 코멘트, 무드보드</producedArtifact>
      <timeboxMinutes>60</timeboxMinutes>
      <fallbackAsset>사전 생성 키비주얼 4안 + 카피 세트</fallbackAsset>
      <commonPitfalls>
        - 검증 기준(톤 가이드) 부재로 리뷰가 무의미 → 기준 먼저 명문화
        - 이미지 프롬프트에 텍스트 요구 → 오탈자 이미지 발생(텍스트 배제 원칙)
        - 첫 결과에 만족해 재생성 루프 생략 → 생성-검증 가치 미체험
      </commonPitfalls>
    </lab>
    <deliverables>캠페인 크리에이티브 패키지(카피+키비주얼), 크리에이티브 하네스</deliverables>
    <assessmentRubricRef>R-C3</assessmentRubricRef>
    <prerequisiteCourseId>C1</prerequisiteCourseId>
    <materialsBuiltInThisPhase>상세 설계 + 실습 대본(본 스펙). 완성형 교보재는 Phase 2</materialsBuiltInThisPhase>
  </course>

  <course id="C4">
    <title>미디어·캠페인 플래닝 하네스 — "감독자 에이전트가 캠페인을 지휘한다"</title>
    <level>중급</level>
    <targetRole>미디어 플래너, 퍼포먼스 마케터, AE</targetRole>
    <duration>150분</duration>
    <harnessPattern>감독자 (중앙 캠페인 매니저가 상태 관리·동적 배분)</harnessPattern>
    <learningObjectives>
      1. 감독자 패턴이 복잡한 다중 태스크 조율에 적합한 이유를 설명할 수 있다
      2. 타겟 정의→채널믹스→예산배분→A/B 계획을 조율하는 미디어 하네스를 만들 수 있다
      3. 예산 배분 결과를 Excel 미디어 플랜 시트로 산출할 수 있다
      4. KPI/측정 계획을 캠페인 브리프에 포함할 수 있다
      5. 채널별 예산 시나리오(보수/공격형)를 비교할 수 있다
    </learningObjectives>
    <keyConcepts>
      - 감독자 = 중앙에서 태스크를 나누고 진행상태를 관리하는 지휘자
      - 미디어 플래닝 태스크 분해(타겟/채널/예산/측정)
      - 채널믹스 로직과 예산 배분 표
      - A/B 테스트 설계(가설·변인·성공지표)
      - Excel 산출: 채널 × 예산 × 예상 KPI 시트
    </keyConcepts>
    <lab>
      <scenario>지정 캠페인 예산(예: 5천만원)을 감독자 하네스가 타겟·채널·예산·A/B로 분해 지휘 → Excel 미디어 플랜 + 캠페인 브리프 산출</scenario>
      <harnessPrompt>
        미디어·캠페인 플래닝 하네스를 구성해줘. 중앙에서 캠페인을 지휘하는 감독자 에이전트가 타겟 정의, 채널 믹스, 예산 배분, A/B 테스트 계획을 각 전문가에게 나눠 맡기고 취합해줘. 총 예산과 목표를 주면 '채널별 예산 배분표(엑셀), 타겟 정의, A/B 테스트 계획'이 담긴 미디어 플랜을 만들어줘.
      </harnessPrompt>
      <steps>
        1. 미디어 하네스 구성 → 감독자 + 타겟/채널/예산/실험 전문가 확인
        2. 예산·목표·기간 입력
        3. 감독자가 태스크 분배·진행 관리하는 흐름 관찰
        4. 채널믹스·예산배분 결과 수령
        5. 예산 배분을 Excel 미디어 플랜 시트로 내보내기(xlsx 스킬)
        6. 보수형/공격형 시나리오 비교 재요청
        7. 캠페인 브리프에 KPI/측정 계획 통합
      </steps>
      <producedArtifact>미디어 플랜 Excel(채널×예산×KPI), 캠페인 브리프, A/B 테스트 계획, 미디어 하네스</producedArtifact>
      <timeboxMinutes>60</timeboxMinutes>
      <fallbackAsset>사전 생성 미디어 플랜 Excel 샘플</fallbackAsset>
      <commonPitfalls>
        - 예산 합계 불일치 → 배분표 합계 검산 습관
        - KPI 없는 채널 배분 → 채널별 목표지표 필수
        - 감독자에게 과도한 세부 지시 → 큰 목표만 주고 위임
      </commonPitfalls>
    </lab>
    <deliverables>미디어 플랜 Excel, 캠페인 브리프, 미디어 하네스</deliverables>
    <assessmentRubricRef>R-C4</assessmentRubricRef>
    <prerequisiteCourseId>C1</prerequisiteCourseId>
    <materialsBuiltInThisPhase>상세 설계 + 실습 대본(본 스펙). 완성형 교보재는 Phase 2</materialsBuiltInThisPhase>
  </course>

  <course id="C5">
    <title>콘텐츠·SNS 제작 하네스 — "기획부터 썸네일까지 한 파이프라인으로"</title>
    <level>중급</level>
    <targetRole>콘텐츠 마케터, SNS 담당, 크리에이티브</targetRole>
    <duration>150분</duration>
    <harnessPattern>파이프라인 심화 (트렌드→기획→대본→썸네일→SEO 순차)</harnessPattern>
    <learningObjectives>
      1. 파이프라인 패턴에서 단계 간 데이터 전달이 어떻게 이뤄지는지 설명할 수 있다
      2. 트렌드 조사→콘텐츠 기획→대본→썸네일→해시태그로 이어지는 콘텐츠 하네스를 만들 수 있다
      3. codex-image로 플랫폼별 썸네일 컨셉을 생성할 수 있다
      4. 1주 콘텐츠 캘린더를 산출하고 플랫폼별로 최적화할 수 있다
      5. 해시태그/제목 SEO 최적화를 파이프라인 마지막 단계로 통합할 수 있다
    </learningObjectives>
    <keyConcepts>
      - 파이프라인 = 앞 단계 산출물이 다음 단계 입력(순차 의존)
      - 플랫폼별 포맷 차이(숏폼/유튜브/인스타/블로그)
      - 대본 구조(훅→본문→CTA)
      - 썸네일 컨셉 생성(codex-image)과 텍스트 오버레이 분리
      - 제목/해시태그 SEO 최적화
    </keyConcepts>
    <lab>
      <scenario>지정 브랜드의 1주 SNS 콘텐츠 — 트렌드 반영 콘텐츠 5개 기획 + 각 대본 + 썸네일 컨셉 + 해시태그 세트를 파이프라인으로 산출</scenario>
      <harnessPrompt>
        콘텐츠·SNS 제작 하네스를 구성해줘. 최신 트렌드를 조사하고, 그걸 바탕으로 한 주치 콘텐츠를 기획하고, 각 콘텐츠의 대본을 쓰고, 썸네일 컨셉을 생성(codex-image)하고, 마지막에 제목/해시태그를 SEO 최적화하는 순차 파이프라인 팀이 필요해. '1주 콘텐츠 캘린더 + 대본 5개 + 썸네일 컨셉 + 해시태그 세트'를 줘.
      </harnessPrompt>
      <steps>
        1. 콘텐츠 하네스 구성 → 트렌드/기획/대본/썸네일/SEO 파이프라인 확인
        2. 브랜드·플랫폼·주제 입력
        3. 파이프라인 단계별 산출물이 다음 단계로 전달되는 흐름 관찰
        4. 대본 5개 + 썸네일 컨셉(codex-image) 수령
        5. 제목/해시태그 SEO 최적화 결과 확인
        6. 1주 콘텐츠 캘린더로 정리(문서/시트)
      </steps>
      <producedArtifact>1주 콘텐츠 캘린더, 대본 5개, 썸네일 컨셉(PNG), 해시태그 세트, 콘텐츠 하네스</producedArtifact>
      <timeboxMinutes>60</timeboxMinutes>
      <fallbackAsset>사전 생성 콘텐츠 캘린더 + 썸네일 샘플</fallbackAsset>
      <commonPitfalls>
        - 플랫폼 특성 무시한 동일 포맷 남발 → 플랫폼별 최적화 지시
        - 썸네일에 텍스트 렌더 요구 → 오탈자, 텍스트는 편집 단계 분리
        - 파이프라인 중간 산출물 검토 생략 → 단계별 확인
      </commonPitfalls>
    </lab>
    <deliverables>1주 콘텐츠 캘린더, 대본, 썸네일 컨셉, 해시태그, 콘텐츠 하네스</deliverables>
    <assessmentRubricRef>R-C5</assessmentRubricRef>
    <prerequisiteCourseId>C1</prerequisiteCourseId>
    <materialsBuiltInThisPhase>상세 설계 + 실습 대본(본 스펙). 완성형 교보재는 Phase 2</materialsBuiltInThisPhase>
  </course>

  <course id="C6">
    <title>업무 자동화로 생산성 향상 — "나만의 하네스를 설계하고, 보고서까지 자동으로"</title>
    <level>심화</level>
    <targetRole>전체 (팀 리드/시니어 권장)</targetRole>
    <duration>180분</duration>
    <harnessPattern>계층적 위임 + 전문가 풀 + 커스텀(혼합) + 문서 자동화</harnessPattern>
    <learningObjectives>
      1. 자기 팀의 반복 업무를 분해해 맞춤 하네스로 설계할 수 있다
      2. 계층적 위임/전문가 풀 패턴을 적절히 선택·조합할 수 있다
      3. 하네스 산출물을 PPT/Word/Excel/PDF로 자동 생성하는 파이프라인을 구성할 수 있다
      4. 하네스 진화(피드백 반영·변경 이력)와 운영/감사를 수행할 수 있다
      5. 사내 배포 가능한 재사용 하네스 + 문서 템플릿을 만들 수 있다
    </learningObjectives>
    <keyConcepts>
      - 계층적 위임: 통합 캠페인을 상위가 하위(채널별)로 재귀 분해
      - 전문가 풀: 상황별로 필요한 전문가만 선택 호출
      - 문서 자동화: 하네스 결과 → pptx/docx/xlsx/pdf 스킬로 산출물화
      - 하네스 진화 메커니즘(초기→사용→개선 되먹임, 변경 이력)
      - 운영/유지보수(감사, drift 감지, 에이전트/스킬 동기화)
      - "1 요청 → 보고서 패키지(덱+문서+시트+PDF)" 자동 생성
    </keyConcepts>
    <lab>
      <scenario>수강생 각자 자기 팀 실제 반복 업무(예: 주간 캠페인 리포트, 경쟁사 모니터링, 신규 RFP 대응)를 골라 맞춤 하네스를 설계 → 결과를 덱+문서+엑셀+PDF로 자동 생성하는 파이프라인까지 구축</scenario>
      <harnessPrompt>
        내 팀의 [주간 캠페인 성과 리포트] 업무를 자동화하는 하네스를 구성해줘. 데이터 요약, 인사이트 도출, 다음 주 액션 제안을 나눠 맡고, 최종 결과를 발표용 PPT 덱, 상세 Word 보고서, 성과 지표 Excel 시트, 그리고 통합 PDF로 자동 생성해줘. 매주 재실행할 수 있게 만들어줘.
      </harnessPrompt>
      <steps>
        1. 자기 업무를 역할로 분해(워크시트 캔버스 사용)
        2. 패턴 선택(계층적 위임/전문가 풀/혼합) 결정
        3. 맞춤 하네스 구성 및 1차 실행
        4. 결과를 pptx/docx/xlsx/pdf 스킬로 자동 문서화(문서 자동화 파이프라인)
        5. 피드백 반영·재실행(하네스 진화 체험)
        6. 변경 이력 기록 및 재사용/배포 형태로 정리
        7. (선택) 운영 감사: drift 점검
      </steps>
      <producedArtifact>팀 맞춤 하네스, 자동 생성 보고서 패키지(PPT+Word+Excel+PDF), 변경 이력, 배포용 템플릿</producedArtifact>
      <timeboxMinutes>90</timeboxMinutes>
      <fallbackAsset>사전 구축한 "주간 리포트 하네스" + 자동 생성 패키지 샘플</fallbackAsset>
      <commonPitfalls>
        - 너무 큰 업무를 한 번에 자동화 시도 → 하나의 반복 업무로 스코프 축소
        - 문서 스킬 남용으로 포맷 난립 → 팀 표준 템플릿 고정
        - 진화 이력 미기록 → 재현·회귀 방지 위해 변경 이력 필수
      </commonPitfalls>
    </lab>
    <deliverables>팀 맞춤 하네스, 자동 보고서 패키지, 배포 템플릿, 변경 이력</deliverables>
    <assessmentRubricRef>R-C6</assessmentRubricRef>
    <prerequisiteCourseId>C1 (+ 최소 1개 도메인 과정 권장)</prerequisiteCourseId>
    <materialsBuiltInThisPhase>상세 설계 + 실습 대본(본 스펙). 완성형 교보재는 Phase 2</materialsBuiltInThisPhase>
  </course>

</courses>

<assessment_rubrics>
  <rubric id="R-C1" passThreshold="70">
    <criterion name="개념 이해" weight="30">
      미흡: 오케스트레이터/에이전트/스킬을 구분 못함 | 보통: 용어는 알되 비유 설명 불가 | 우수: 광고팀 비유로 3층 구조를 자기 말로 설명
    </criterion>
    <criterion name="설치·실행" weight="30">
      미흡: 설치/실행 실패 | 보통: 도움받아 첫 하네스 실행 | 우수: 독립적으로 설치·활성화·실행 완료
    </criterion>
    <criterion name="요청문 품질" weight="25">
      미흡: 도메인만 언급 | 보통: 도메인+역할 | 우수: 도메인+역할+산출물 3요소 명시
    </criterion>
    <criterion name="검증 태도" weight="15">
      미흡: 결과 무비판 수용 | 보통: 오류 인지 | 우수: 재요청으로 개선(진화 체험)
    </criterion>
  </rubric>
  <rubric id="R-C2" passThreshold="70">
    <criterion name="패턴 적용(팬아웃/팬인)" weight="25">병렬 조사→통합을 의도대로 구성</criterion>
    <criterion name="교차검증·출처" weight="30">상충 정보 출처 병기, 근거 링크</criterion>
    <criterion name="인사이트 품질" weight="30">주장→근거→시사점 구조, 실행 가능성</criterion>
    <criterion name="산출물 완성도" weight="15">보고서 가독성·문서화</criterion>
  </rubric>
  <rubric id="R-C3" passThreshold="70">
    <criterion name="생성-검증 루프" weight="30">리뷰 게이트 작동, 반려·재생성 활용</criterion>
    <criterion name="브랜드 톤 기준화" weight="25">검증 기준 명문화</criterion>
    <criterion name="비주얼 컨셉(codex-image)" weight="25">컨셉 다양성·적합성</criterion>
    <criterion name="카피 A/B" weight="20">앵글 구분·완성도</criterion>
  </rubric>
  <rubric id="R-C4" passThreshold="70">
    <criterion name="감독자 조율" weight="25">태스크 분배·취합 이해</criterion>
    <criterion name="예산 배분 정합성" weight="30">합계 일치·논리성</criterion>
    <criterion name="채널믹스·KPI" weight="25">채널별 목표지표</criterion>
    <criterion name="Excel 산출물" weight="20">미디어 플랜 시트 완성도</criterion>
  </rubric>
  <rubric id="R-C5" passThreshold="70">
    <criterion name="파이프라인 구성" weight="25">단계 간 전달 이해</criterion>
    <criterion name="플랫폼 최적화" weight="25">포맷별 차별화</criterion>
    <criterion name="썸네일·대본 품질" weight="30">완성도·매력도</criterion>
    <criterion name="SEO·캘린더" weight="20">해시태그/제목·캘린더 정리</criterion>
  </rubric>
  <rubric id="R-C6" passThreshold="70">
    <criterion name="업무 분해·패턴 선택" weight="25">역할 분해 적절성, 패턴 선택 근거</criterion>
    <criterion name="문서 자동화 파이프라인" weight="30">PPT/Word/Excel/PDF 자동 생성 작동</criterion>
    <criterion name="하네스 진화·운영" weight="25">피드백 반영·변경 이력·감사</criterion>
    <criterion name="재사용·배포성" weight="20">템플릿화·팀 배포 가능성</criterion>
  </rubric>
</assessment_rubrics>

<aesthetic_guidelines>
  <design_philosophy>
    "Confident Clarity" — 광고 대행사다운 세련됨과 비개발자에게 친근한 명료함의 균형. 여백을 넉넉히, 도식은 크게, 텍스트는 짧게. 모든 개념은 광고 실무 비유로 시각화한다.
  </design_philosophy>
  <color_palette>
    <primary>
      - Ink Navy: #1E293B — 제목/본문 강조, 다이어그램 골격
      - Signal Coral: #FF6B4A — 핵심 강조, CTA, 포인트(절제해서)
    </primary>
    <secondary>
      - Fresh Teal: #2DD4BF — 보조 강조, 성공/완료 상태
      - Slate Gray: #64748B — 부가 설명, 캡션
    </secondary>
    <background>
      - Paper White: #F8FAFC — 기본 배경
      - Mist Gray: #E2E8F0 — 카드/구획 배경
    </background>
    <status>
      - Success: #22C55E | Warning: #F59E0B | Error: #EF4444 | Info: #3B82F6
    </status>
    <pattern_colors>
      6패턴 시각 코딩: 파이프라인 #3B82F6 / 팬아웃·팬인 #8B5CF6 / 전문가풀 #14B8A6 / 생성-검증 #FF6B4A / 감독자 #F59E0B / 계층적위임 #EC4899
    </pattern_colors>
  </color_palette>
  <typography>
    <font_families>
      - 본문/제목: Pretendard (fallback: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif)
      - 코드/프롬프트 예시: 'D2Coding', 'SF Mono', monospace
    </font_families>
    <scale>
      - 덱 제목: 40pt Bold | 슬라이드 헤드라인: 28pt Bold | 본문: 18~20pt | 캡션: 14pt
      - 문서 제목: 24pt Bold | 섹션: 16pt Bold | 본문: 11pt | 캡션: 9pt
    </scale>
  </typography>
  <spacing>기본 단위 8px 스케일(8/16/24/32/48). 슬라이드 여백 최소 64px, 문서 여백 A4 상하좌우 20mm.</spacing>
  <imagery>
    - 개념 이미지: 플랫 에디토리얼 벡터, 통일 팔레트, 이미지 내 텍스트 배제(오탈자 방지)
    - codex-image art direction 고정 문구를 모든 이미지 프롬프트에 삽입해 세트 일관성 유지
    - 다이어그램: 노드-엣지, 패턴별 색상 코딩, 아이콘은 단색 라인
  </imagery>
  <print_adaptation>
    핸드아웃/워크시트는 흑백 인쇄 대응(a4-print-design 원칙): 색 대신 명도·굵기·패턴으로 위계 표현, 표는 얇은 회색 괘선.
  </print_adaptation>
</aesthetic_guidelines>

<content_production_workflow>
  <images>
    - 도구: codex-image (병렬, 최대 5장 동시)
    - 프롬프트 규칙: 16:9, 통일 팔레트 명시, "이미지 내 텍스트 배제", 파일명 충돌 방지(각기 다른 출력명)
    - 검증: 생성 후 `file`/`ls`로 0바이트·손상 확인, 실패분만 재시도
  </images>
  <slides>도구: pptx 스킬. 16:9. 마스터 레이아웃(표지/개념/도식/실습/요약) 재사용. 생성 이미지 삽입.</slides>
  <documents>도구: docx 스킬(핸드아웃), pdf 스킬(인쇄 통합본). 목차·헤더·체크박스 포함.</documents>
  <worksheets>도구: xlsx 스킬. 다중 시트(실습 체크·설계 캔버스·평가 루브릭). 드롭다운/조건부 서식.</worksheets>
  <scripts>강사노트·프롬프트 모음은 .md로. 복붙 가능한 프롬프트 블록 명시.</scripts>
</content_production_workflow>

<instructor_operations>
  <session_flow>
    표준 세션 4비트: (1) 개념 강의 20~30분 → (2) 강사 라이브 시연 15~20분 → (3) 수강생 hands-on 45~90분 → (4) 산출물 리뷰·회고 15~20분
  </session_flow>
  <pre_session_checklist>
    - 수강생 환경(Claude Code+harness+팀 활성화) 원격/현장 점검
    - 실습 프롬프트 모음 배포, 워크시트 배포
    - 폴백 산출물(사전 생성물) 준비 — 네트워크/모델 지연 대비
    - 이미지/문서 스킬 사전 동작 확인
  </pre_session_checklist>
  <facilitation_tips>
    - 용어 나오면 즉시 광고 비유로 치환("에이전트=팀원", "스킬=업무 매뉴얼")
    - 첫 실행이 다르게 나와도 정상 — "AI는 매번 조금씩 다르다"를 미리 안내
    - 결과를 무비판 수용하지 않도록 "한 번은 의심하라" 반복
  </facilitation_tips>
  <troubleshooting>
    - 팀이 아니라 단일 응답 → 에이전트 팀 환경변수 확인
    - 하네스가 트리거 안 됨 → "하네스 구성해줘" 정확한 표현 사용
    - 이미지 0바이트 → 해당 생성만 재시도
    - 결과 과도하게 김 → 산출물 형식·분량을 프롬프트에 명시
  </troubleshooting>
</instructor_operations>

<final_integration_test>
  <test_scenario_1>
    <description>기초 과정 수강생이 독립적으로 첫 하네스를 만들어 산출물을 얻는다 (C1 완주 검증)</description>
    <steps>
      1. 수강생 PC에서 Claude Code 실행
      2. 플러그인 목록에 harness 존재 확인
      3. 에이전트 팀 활성화 상태 확인
      4. C1 실습 프롬프트("제로톡" 리서치+카피 팀) 입력
      5. 하네스가 리서처+카피라이터 2인 팀을 구성하는지 확인
      6. .claude/agents/ 와 .claude/skills/ 생성 확인
      7. 시장요약 1페이지 산출 확인
      8. 헤드라인 5개 산출 확인
      9. "더 위트있게" 재요청 → 톤 변경 재생성 확인
      10. 이 흐름이 "파이프라인"임을 라벨링
      11. 워크시트 실습 체크리스트 전 항목 완료 표시
      12. R-C1 루브릭 70% 이상 자기평가
    </steps>
  </test_scenario_1>
  <test_scenario_2>
    <description>교보재 패키지가 강의에 즉시 사용 가능한 완성도인지 검증 (C1 교보재 QA)</description>
    <steps>
      1. C1 강의덱(PPT) 열기 → 표지/개념/도식/실습/요약 슬라이드 존재 확인
      2. 4종 개념 이미지가 덱에 정상 삽입·정렬됐는지 확인
      3. 이미지에 텍스트 오탈자 없음 확인(텍스트 배제 원칙)
      4. 핸드아웃(Word) 열기 → 설치 단계·실습 스텝·용어집·체크리스트 확인
      5. 핸드아웃 PDF 변환본 인쇄 레이아웃 확인(A4, 잘림 없음)
      6. 워크시트(Excel) 3개 시트(실습 체크·설계 캔버스·루브릭) 확인
      7. 프롬프트 모음(.md) 복붙 블록이 실제 harness에서 트리거되는지 확인
      8. 강사노트 타임라인이 120분에 맞는지 검산
      9. 색상·폰트가 디자인 시스템과 일치하는지 확인
      10. 비개발자 관점 리뷰: 전문용어 미설명 구간 없음 확인
    </steps>
  </test_scenario_2>
  <test_scenario_3>
    <description>도메인 과정 실습 대본이 실제 harness로 재현 가능한지 드라이런 (C2~C6 설계 검증)</description>
    <steps>
      1. 각 과정 harnessPrompt를 실제 Claude Code에 입력
      2. 명시된 아키텍처 패턴(팬아웃/생성-검증/감독자/파이프라인/혼합)대로 팀이 구성되는지 확인
      3. 각 과정 producedArtifact가 실제로 생성되는지 확인
      4. C3/C5의 codex-image 연계가 작동하는지 확인
      5. C4의 xlsx, C6의 pptx/docx/xlsx/pdf 문서 자동화가 작동하는지 확인
      6. commonPitfalls가 실제로 재현되고 해결 가이드가 유효한지 확인
      7. timebox 내 완료 가능한지 시간 측정
    </steps>
  </test_scenario_3>
</final_integration_test>

<success_criteria>
  <curriculum_quality>
    - 6과정이 기초→심화로 논리적 난이도 상승, 선수관계 명확
    - harness 6패턴이 6과정에 걸쳐 100% 커버
    - 모든 실습이 광고 실무 맥락(개발 예제 0건)
    - 각 과정 학습목표가 측정가능한 동사로 3~5개
  </curriculum_quality>
  <trainee_outcomes>
    - C1 수료자의 90% 이상이 독립적으로 첫 하네스 실행 성공
    - 각 과정 수료자가 재사용 가능한 하네스 1개 이상 확보
    - 루브릭 통과율(70%+) 과정당 80% 이상 목표
  </trainee_outcomes>
  <materials_quality>
    - C1 교보재 풀세트(PPT/Word/Excel/PDF/이미지) 제작 완료·검수 완료
    - 개념 이미지 4종이 통일 팔레트·텍스트 배제 준수
    - 문서가 디자인 시스템(색상 hex·폰트·스케일) 준수
    - 비개발자 리뷰에서 미설명 전문용어 0건
  </materials_quality>
  <operational_readiness>
    - 강사노트·타임라인·폴백 산출물 완비
    - 사전 점검 체크리스트로 실습 실패율 최소화
    - C2~C6 실습 대본이 드라이런으로 재현 검증됨
  </operational_readiness>
</success_criteria>

<build_output>
  <phase1_deliverables>
    - 본 마스터 설계서 1부 (HARNESS_AD_ACADEMY_SPEC.md)
    - C1 강의덱 (C1_하네스_첫걸음_강의덱.pptx)
    - C1 수강생 핸드아웃 (C1_수강생_핸드아웃.docx + .pdf)
    - C1 실습 워크시트 (C1_실습_워크시트.xlsx)
    - C1 개념 이미지 4종 (01~04 .png)
    - C1 강사노트 + 프롬프트 모음 (.md)
  </phase1_deliverables>
  <build_commands>
    - 이미지: codex exec image_generation (병렬 4장)
    - 덱/문서/시트: pptx / docx / xlsx / pdf 스킬
  </build_commands>
  <deployment_notes>
    산출물은 harness-ad-academy/ 트리에 배치. C1은 즉시 강의 가능. C2~C6은 본 스펙 기반으로 Phase 2에서 동일 프로세스로 제작.
  </deployment_notes>
</build_output>

<key_implementation_notes>
  <critical_paths>
    1. C1 실습 프롬프트가 실제 harness에서 의도한 팀을 만들어내는지 최우선 검증(교육 신뢰도의 핵심)
    2. 개념 이미지의 텍스트 배제·팔레트 일관성(브랜드 완성도)
    3. 비개발자 언어 검수(전문용어 치환)
  </critical_paths>
  <recommended_build_order>
    1. 마스터 설계서 확정(본 문서)
    2. C1 개념 이미지 4종 병렬 생성(codex-image)
    3. C1 강의덱(PPT) — 이미지 삽입
    4. C1 핸드아웃(Word) → PDF 변환
    5. C1 워크시트(Excel)
    6. C1 강사노트·프롬프트 모음
    7. 교보재 QA(test_scenario_2) 및 실습 드라이런(test_scenario_1)
  </recommended_build_order>
  <content_guidelines>
    - 모든 프롬프트 예시는 "복붙 즉시 실행" 가능하게 완결형으로
    - 3요소(도메인·역할·산출물)를 요청문 작성 기본 프레임으로 반복 강조
    - "AI 비결정성" 안내로 재현 편차에 대한 기대치 관리
  </content_guidelines>
  <tool_usage>
    - codex-image: 병렬 5장 이하, 출력명 유일, 텍스트 배제, 생성 후 검증
    - pptx/docx/xlsx/pdf: 각 스킬 트리거로 산출, 디자인 시스템 값 주입
    - deep-research: C2 심층 검증 연계
  </tool_usage>
  <evolution_note>
    하네스는 진화 시스템이므로, 교보재도 매 기수 피드백을 반영해 갱신한다. C1 완성형을 템플릿 삼아 C2~C6를 동일 구조로 확장한다.
  </evolution_note>
</key_implementation_notes>

</project_specification>
