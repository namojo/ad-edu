const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, ImageRun, VerticalAlign,
} = require("docx");

const NAVY = "1E293B", CORAL = "FF6B4A", TEAL = "0D9488", SLATE = "64748B", MIST = "E2E8F0", PAPER = "F1F5F9", INK = "1E293B";
const FONT = "Pretendard";
const IMG = "/Users/andy/Work/ad-edu/harness-ad-academy/course1-basics/images";
const OUT = "/Users/andy/Work/ad-edu/harness-ad-academy/course1-basics/handout/C1_수강생_핸드아웃.docx";

const A4_W = 11906, MARGIN = 1080; // 0.75"
const CONTENT_W = A4_W - MARGIN * 2; // 9746

// ---- helpers ----
function h1(text, num) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 140 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: CORAL, space: 6 } },
    children: [
      ...(num ? [new TextRun({ text: num + "  ", bold: true, color: CORAL, size: 26, font: FONT })] : []),
      new TextRun({ text, bold: true, color: NAVY, size: 26, font: FONT }),
    ],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 21, font: FONT })],
  });
}
function body(runs, opts = {}) {
  const arr = Array.isArray(runs) ? runs : [new TextRun({ text: runs, size: 20, font: FONT, color: INK })];
  return new Paragraph({ spacing: { after: 100, line: 288 }, children: arr, ...opts });
}
function bullet(text, level = 0) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 20, font: FONT, color: INK })];
  return new Paragraph({ numbering: { reference: "b", level }, spacing: { after: 40, line: 276 }, children: runs });
}
function num(text) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 20, font: FONT, color: INK })];
  return new Paragraph({ numbering: { reference: "n", level: 0 }, spacing: { after: 60, line: 276 }, children: runs });
}
function numRef(ref, text) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 20, font: FONT, color: INK })];
  return new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 60, line: 276 }, children: runs });
}
function t(text, o = {}) { return new TextRun({ text, size: 20, font: FONT, color: INK, ...o }); }

function callout(title, lines, color = CORAL, fill = "FFF1EC") {
  const kids = [
    new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: title, bold: true, color, size: 20, font: FONT })] }),
    ...lines.map((l) => new Paragraph({ spacing: { after: 20, line: 276 }, children: Array.isArray(l) ? l : [new TextRun({ text: l, size: 19, font: FONT, color: INK })] })),
  ];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: fill }, bottom: { style: BorderStyle.SINGLE, size: 2, color: fill },
      right: { style: BorderStyle.SINGLE, size: 2, color: fill }, left: { style: BorderStyle.SINGLE, size: 24, color },
    },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: kids,
    })] })],
  });
}

function promptBox(label, text) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: NAVY, type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 160, left: 220, right: 220 },
      children: [
        new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: label, bold: true, color: "5EEAD4", size: 17, font: FONT })] }),
        new Paragraph({ spacing: { line: 300 }, children: [new TextRun({ text, color: "E2E8F0", size: 20, font: "D2Coding" })] }),
      ],
    })] })],
  });
}

// table builder
function makeTable(headers, rows, widths) {
  const headerCells = headers.map((hdr, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 130, right: 130 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ children: [new TextRun({ text: hdr, bold: true, color: "FFFFFF", size: 19, font: FONT })] })],
  }));
  const bodyRows = rows.map((r, ri) => new TableRow({ children: r.map((cell, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { fill: ri % 2 ? "F8FAFC" : "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 70, bottom: 70, left: 130, right: 130 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ children: Array.isArray(cell) ? cell : [new TextRun({ text: cell, size: 18, font: FONT, color: INK })] })],
  })) }));
  const border = { style: BorderStyle.SINGLE, size: 1, color: MIST };
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border },
    rows: [new TableRow({ tableHeader: true, children: headerCells }), ...bodyRows],
  });
}

function checkItem(text) {
  return new Paragraph({
    spacing: { after: 70, line: 276 },
    children: [new TextRun({ text: "☐  ", size: 22, font: FONT, color: CORAL }), new TextRun({ text, size: 20, font: FONT, color: INK })],
  });
}

// ================= build =================
const children = [];

// Title block
children.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "HARNESS AD ACADEMY", bold: true, color: TEAL, size: 18, font: FONT, characterSpacing: 40 })] }));
children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "과정 1 · 기초 — 수강생 핸드아웃", color: SLATE, size: 20, font: FONT })] }));
children.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "하네스 첫걸음", bold: true, color: NAVY, size: 46, font: FONT })] }));
children.push(new Paragraph({ spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: CORAL, space: 8 } }, children: [new TextRun({ text: "한 문장으로 나만의 AI 팀 만들기", color: SLATE, size: 24, font: FONT })] }));

children.push(body([
  t("이 핸드아웃은 강의 후에도 혼자 복습하고 실습할 수 있도록 만든 안내서입니다. "),
  t("코딩 지식은 필요 없습니다.", { bold: true, color: CORAL }),
  t(" 여러분이 팀장이 되어 AI 팀원에게 일을 맡기는 방법을 배웁니다."),
]));

// 1. 과정 개요
children.push(h1("이 과정에서 배우는 것", "01"));
children.push(body("이 시간이 끝나면 여러분은 다음 다섯 가지를 할 수 있습니다."));
[
  "하네스가 무엇이고, 왜 팀으로 일하면 결과가 좋아지는지 내 말로 설명한다.",
  "Claude Code에 harness 플러그인을 설치하고 에이전트 팀 기능을 활성화한다.",
  "“하네스 구성해줘” 한 문장으로 첫 에이전트 팀을 만들고 결과물을 받는다.",
  "6가지 협업 패턴의 이름과 쓰임을 광고 업무 비유로 매칭한다.",
  "좋은 요청문의 3요소(도메인·역할·산출물)를 구분해 문장을 쓴다.",
].forEach((x) => children.push(num(x)));

// 2. 하네스란
children.push(h1("하네스란 무엇인가", "02"));
children.push(body([
  t("하네스(harness)는 Claude Code용 플러그인으로, "),
  t("“팀 아키텍처 팩토리”", { bold: true, color: NAVY }),
  t("라고 부릅니다. "),
  t("“하네스 구성해줘”", { bold: true, color: CORAL }),
  t(" 한 문장이면, 여러분이 설명한 업무를 "),
  t("전문 AI 에이전트 팀 + 그들이 쓸 스킬(업무 매뉴얼)", { bold: true }),
  t("로 자동으로 만들어 줍니다."),
]));
children.push(callout("한 줄 요약", [
  [t("혼자 리서치·카피·기획·정리를 다 하던 일을, ", {}), t("전문 팀원(에이전트)에게 나눠 맡기고 ", { bold: true }), t("여러분은 지휘와 검수에 집중합니다.")],
], CORAL));

children.push(h2("3층 구조 — 광고팀에 그대로 대응됩니다"));
children.push(makeTable(
  ["구성 요소", "광고팀 비유", "하는 일"],
  [
    ["오케스트레이터", "팀장", "누가 언제 어떤 순서로 협업할지 지휘하고 결과를 종합"],
    ["에이전트", "팀원", "리서치·카피·비주얼 등 전문 영역을 맡아 실제 작업 수행"],
    ["스킬", "업무 매뉴얼", "“이 일은 이렇게 한다”는 방법을 담아 에이전트가 참고"],
  ],
  [2100, 1900, 5746]
));

// concept image
children.push(new Paragraph({ spacing: { before: 200, after: 60 }, alignment: AlignmentType.CENTER, children: [
  new ImageRun({ type: "png", data: fs.readFileSync(`${IMG}/02-team-metaphor.png`), transformation: { width: 460, height: 259 }, altText: { title: "에이전트 팀 조직도", description: "오케스트레이터와 전문 에이전트", name: "team" } }),
] }));
children.push(new Paragraph({ spacing: { after: 160 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "▲ 팀장(오케스트레이터)이 리서치·카피·비주얼·미디어·QA 전문가를 지휘한다", italics: true, color: SLATE, size: 17, font: FONT })] }));

// 3. 6 patterns
children.push(h1("6가지 협업 패턴", "03"));
children.push(body("하네스는 상황에 맞는 6가지 팀 협업 방식 중 하나를 골라 팀을 구성합니다. 6과정을 거치며 모두 실무로 익힙니다."));
children.push(makeTable(
  ["패턴", "이럴 때 쓴다", "배우는 과정"],
  [
    ["파이프라인", "순차 의존 — 조사 → 카피 → 썸네일처럼 앞 결과가 다음 입력", "C1 · C5"],
    ["팬아웃 / 팬인", "여러 각도로 동시에 조사한 뒤 하나로 종합", "C2"],
    ["전문가 풀", "상황별로 필요한 전문가만 골라 호출", "심화"],
    ["생성 – 검증", "만드는 사람과 검수하는 사람을 분리해 품질을 높임", "C3"],
    ["감독자", "중앙 지휘자가 태스크를 동적으로 나눠 맡김", "C4"],
    ["계층적 위임", "큰 일을 상위가 하위로 재귀적으로 쪼개 위임", "C6"],
  ],
  [2100, 5646, 2000]
));

// 4. 사전 준비
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("사전 준비 — 설치와 활성화", "04"));
children.push(body("실습 전에 아래 항목을 준비합니다. 회사 IT 담당 또는 강사의 안내를 함께 참고하세요."));
children.push(h2("설치 단계"));
children.push(numRef("install", [t("Claude Code", { bold: true }), t("가 PC에 설치되어 있고 로그인되어 있는지 확인한다.")]));
children.push(numRef("install", [t("플러그인 마켓플레이스를 추가한다: "), t("/plugin marketplace add revfactory/harness", { font: "D2Coding", size: 18, color: NAVY })]));
children.push(numRef("install", [t("플러그인을 설치한다: "), t("/plugin install harness-marketplace", { font: "D2Coding", size: 18, color: NAVY })]));
children.push(numRef("install", [t("에이전트 팀 기능을 활성화한다 "), t("(환경변수 CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)", { color: SLATE }), t(".")]));
children.push(numRef("install", [t("실습용 폴더를 하나 만든다 "), t("(예: ~/harness-lab/)", { font: "D2Coding", size: 18, color: SLATE }), t(".")]));
children.push(callout("확인 포인트", [
  [t("Claude Code의 플러그인 목록에 "), t("harness", { bold: true }), t("가 보이면 설치 성공입니다. 팀 기능이 켜져 있어야 “단일 응답”이 아니라 “팀”으로 동작합니다.")],
], TEAL, "ECFDF5"));

// 5. 실습 가이드
children.push(h1("실습 가이드 — “제로톡” 런칭 팀 만들기", "05"));
children.push(callout("오늘의 미션", [
  [t("신제품 음료 ", {}), t("“제로톡”", { bold: true, color: CORAL }), t(" 런칭을 위한 미니 리서치+카피 팀을 만들어, "), t("시장 요약 1페이지", { bold: true }), t("와 "), t("광고 헤드라인 5개", { bold: true }), t("를 받는다.")],
], CORAL));

children.push(h2("① 이 프롬프트를 복사해서 붙여넣기"));
children.push(promptBox("입력 프롬프트", "하네스 구성해줘. 신제품 음료 런칭을 돕는 작은 팀이 필요해 — 시장/경쟁 상황을 빠르게 조사하는 리서처와, 그 조사를 바탕으로 광고 헤드라인을 뽑는 카피라이터. 조사 요약 1페이지와 헤드라인 5개를 결과로 줘."));

children.push(h2("② 단계별로 따라 하기"));
children.push(makeTable(
  ["단계", "할 일", "이렇게 되면 성공"],
  [
    ["1", "Claude Code 실행 → 플러그인 목록에서 harness 확인", "harness가 목록에 보임"],
    ["2", "에이전트 팀 기능이 켜져 있는지 확인", "팀 기능 ON"],
    ["3", "위 프롬프트를 그대로 입력", "리서처+카피라이터 2인 팀 구성"],
    ["4", ".claude/agents/ 와 .claude/skills/ 폴더를 눈으로 확인", "“누가”와 “어떻게”가 파일로 분리됨"],
    ["5", "실행 결과 받기", "시장요약 1p + 헤드라인 5개 확보"],
    ["6", "이 흐름을 “파이프라인”으로 라벨링", "조사 → 카피 순서를 이해"],
    ["7", "“헤드라인을 더 위트있게”로 재요청", "같은 팀이 톤만 바꿔 재생성"],
  ],
  [800, 5946, 3000]
));
children.push(callout("핵심 체험", [
  [t("재요청 한 번으로 결과가 바뀝니다. 하네스는 고정물이 아니라 ", {}), t("쓸수록 진화하는 시스템", { bold: true, color: CORAL }), t("입니다.")],
], CORAL));

// 6. 좋은 요청문
children.push(h1("좋은 요청문의 3요소", "06"));
children.push(body("하네스가 헤매지 않으려면, 요청 문장에 다음 세 가지를 담으세요."));
children.push(makeTable(
  ["요소", "질문", "제로톡 예시"],
  [
    [[t("① 도메인", { bold: true, color: TEAL })], "무슨 일인가?", "“신제품 음료 런칭”"],
    [[t("② 역할", { bold: true, color: CORAL })], "누가 필요한가?", "“리서처 + 카피라이터”"],
    [[t("③ 산출물", { bold: true, color: "B45309" })], "무엇을 받을까?", "“시장요약 1p + 헤드라인 5개”"],
  ],
  [2100, 3200, 4446]
));

// 7. 자주 하는 실수
children.push(h1("자주 하는 실수", "07"));
children.push(makeTable(
  ["실수", "이렇게 하세요"],
  [
    ["산출물을 안 적어 팀이 무엇을 만들지 모호해짐", "3요소(도메인·역할·산출물)를 꼭 체크"],
    ["팀 기능이 꺼져 있어 팀 대신 단일 응답만 옴", "에이전트 팀 활성화 여부 확인"],
    ["결과를 검증 없이 그대로 받아들임", "“한 번은 의심하라” — 재요청으로 개선"],
  ],
  [4873, 4873]
));

// 8. 체크리스트
children.push(h1("오늘의 체크리스트", "08"));
children.push(body("집에 가기 전에 아래 항목에 스스로 표시해 보세요."));
[
  "harness 설치 + 에이전트 팀 활성화를 완료했다.",
  "“하네스 구성해줘”로 첫 팀을 직접 실행했다.",
  "오케스트레이터 · 에이전트 · 스킬 3층 구조를 설명할 수 있다.",
  "요청문 3요소(도메인·역할·산출물)로 문장을 쓸 수 있다.",
  "6가지 협업 패턴의 이름과 쓰임을 안다.",
  "재사용 가능한 나의 첫 하네스를 확보했다.",
].forEach((x) => children.push(checkItem(x)));

// 9. 용어집
children.push(h1("용어집 — 딱 이만큼만 알면 됩니다", "09"));
children.push(makeTable(
  ["용어", "쉽게 말하면"],
  [
    ["하네스(Harness)", "한 문장으로 AI 팀을 만들어 주는 도구(플러그인)"],
    ["에이전트(Agent)", "특정 일을 맡는 AI 팀원 (리서처, 카피라이터 등)"],
    ["오케스트레이터", "팀을 지휘하고 결과를 종합하는 AI 팀장"],
    ["스킬(Skill)", "“이 일은 이렇게 한다”를 담은 업무 매뉴얼"],
    ["프롬프트(Prompt)", "AI에게 주는 지시 문장 (요청문)"],
    ["아키텍처 패턴", "팀이 협업하는 방식 (6가지 중 선택)"],
    ["파이프라인", "앞 사람 결과가 다음 사람 입력이 되는 순차 협업"],
  ],
  [3000, 6746]
));

// 다음 과정
children.push(h1("다음 여정", "10"));
children.push(body([
  t("오늘 배운 기초 위에서, 여러분의 실제 업무로 확장합니다. 다음은 "),
  t("C2 — 리서치·인사이트 하네스", { bold: true, color: CORAL }),
  t("입니다. 여러 각도로 동시에 조사하고 교차검증해, 하루 걸리던 카테고리 진단을 한 시간에 끝내는 팀을 만듭니다."),
]));

// ---- doc ----
const doc = new Document({
  creator: "Harness Ad Academy",
  title: "C1 하네스 첫걸음 — 수강생 핸드아웃",
  styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
  numbering: {
    config: [
      { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { run: { color: CORAL }, paragraph: { indent: { left: 460, hanging: 260 } } } }] },
      { reference: "n", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { run: { bold: true, color: CORAL }, paragraph: { indent: { left: 460, hanging: 300 } } } }] },
      { reference: "install", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { run: { bold: true, color: CORAL }, paragraph: { indent: { left: 460, hanging: 300 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: A4_W, height: 16838 }, margin: { top: 1080, right: MARGIN, bottom: 1080, left: MARGIN } } },
    headers: { default: new Header({ children: [new Paragraph({
      tabStops: [{ type: "right", position: CONTENT_W }],
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MIST, space: 4 } },
      children: [new TextRun({ text: "Harness Ad Academy", color: SLATE, size: 16, font: FONT }), new TextRun({ text: "\t과정 1 · 기초", color: SLATE, size: 16, font: FONT })],
    })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "C1 하네스 첫걸음 · 수강생 핸드아웃  —  ", color: SLATE, size: 16, font: FONT }), new TextRun({ children: [PageNumber.CURRENT], color: SLATE, size: 16, font: FONT })],
    })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("HANDOUT WRITTEN", buf.length); });
