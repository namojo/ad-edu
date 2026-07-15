const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

// ---------- Design System ----------
const NAVY = "1E293B";
const NAVY2 = "0F172A";
const CORAL = "FF6B4A";
const TEAL = "2DD4BF";
const PAPER = "F8FAFC";
const MIST = "E2E8F0";
const SLATE = "64748B";
const WHITE = "FFFFFF";
const INK = "1E293B";

const PATTERN = {
  pipeline: "3B82F6",
  fanout: "8B5CF6",
  expert: "14B8A6",
  gencheck: "FF6B4A",
  supervisor: "F59E0B",
  hierarch: "EC4899",
};

const FONT = "Pretendard";
const FONT_FALLBACK = "Apple SD Gothic Neo";
const IMG = "/Users/andy/Work/ad-edu/harness-ad-academy/course1-basics/images";

const shadow = () => ({ type: "outer", color: "1E293B", blur: 9, offset: 3, angle: 90, opacity: 0.14 });

// ---------- Icon rasterizer ----------
async function icon(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

async function build() {
  const p = new pptxgen();
  p.layout = "LAYOUT_16x9"; // 10 x 5.625
  p.author = "Harness Ad Academy";
  p.title = "C1 하네스 첫걸음";
  const W = 10, H = 5.625;

  // pre-render icons
  const ic = {
    users: await icon(fa.FaUsers, "#FFFFFF"),
    magic: await icon(fa.FaMagic, "#FFFFFF"),
    search: await icon(fa.FaSearch, "#FFFFFF"),
    pen: await icon(fa.FaPenNib, "#FFFFFF"),
    palette: await icon(fa.FaPalette, "#FFFFFF"),
    chart: await icon(fa.FaChartBar, "#FFFFFF"),
    shield: await icon(fa.FaShieldAlt, "#FFFFFF"),
    conductor: await icon(fa.FaUserTie, "#FFFFFF"),
    cube: await icon(fa.FaCube, "#FFFFFF"),
    book: await icon(fa.FaBook, "#FFFFFF"),
    bolt: await icon(fa.FaBolt, "#FFFFFF"),
    check: await icon(fa.FaCheckCircle, "#FFFFFF"),
    seedling: await icon(fa.FaSeedling, "#FFFFFF"),
    flask: await icon(fa.FaFlask, "#FFFFFF"),
    arrow: await icon(fa.FaArrowRight, "#FF6B4A"),
    warn: await icon(fa.FaExclamationTriangle, "#FFFFFF"),
    play: await icon(fa.FaPlayCircle, "#FFFFFF"),
    laptop: await icon(fa.FaLaptopCode, "#FFFFFF"),
    layer: await icon(fa.FaLayerGroup, "#FFFFFF"),
    sitemap: await icon(fa.FaSitemap, "#FFFFFF"),
    stream: await icon(fa.FaStream, "#FFFFFF"),
    crown: await icon(fa.FaCrown, "#FFFFFF"),
    graduationDark: await icon(fa.FaGraduationCap, "#1E293B"),
    checkGreen: await icon(fa.FaCheckCircle, "#0D9488"),
    checkTeal: await icon(fa.FaCheckCircle, "#2DD4BF"),
    lightbulb: await icon(fa.FaLightbulb, "#D97706"),
  };

  // ---------- helpers ----------
  function kicker(slide, text, x, y, color = CORAL) {
    slide.addText(text.toUpperCase(), {
      x, y, w: 6, h: 0.3, fontFace: FONT, fontSize: 12, bold: true,
      color, charSpacing: 3, align: "left", margin: 0,
    });
  }
  function pageNum(slide, n) {
    slide.addText(String(n).padStart(2, "0"), {
      x: 9.3, y: 5.15, w: 0.5, h: 0.3, fontFace: FONT, fontSize: 10,
      color: SLATE, align: "right", margin: 0,
    });
    slide.addText("Harness Ad Academy · C1", {
      x: 0.5, y: 5.15, w: 4, h: 0.3, fontFace: FONT, fontSize: 9,
      color: SLATE, align: "left", margin: 0,
    });
  }
  function iconCircle(slide, data, x, y, d, fill) {
    slide.addShape(p.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, shadow: shadow() });
    const pad = d * 0.26;
    slide.addImage({ data, x: x + pad, y: y + pad, w: d - pad * 2, h: d - pad * 2 });
  }
  function card(slide, x, y, w, h, fill = WHITE) {
    slide.addShape(p.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h, fill: { color: fill }, line: { color: MIST, width: 1 },
      rectRadius: 0.09, shadow: shadow(),
    });
  }

  // ============================================================
  // SLIDE 1 — COVER
  // ============================================================
  let s = p.addSlide();
  s.background = { color: NAVY2 };
  // subtle top band
  s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.12, fill: { color: CORAL } });
  // hero image framed in a white rounded card on the RIGHT (never crosses the text column)
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 5.35, y: 1.5, w: 4.15, h: 2.62, fill: { color: WHITE }, rectRadius: 0.1, shadow: shadow() });
  s.addImage({ path: `${IMG}/01-cover-hero.png`, x: 5.47, y: 1.71, w: 3.91, h: 2.2 });
  s.addText("HARNESS AD ACADEMY", {
    x: 0.7, y: 0.85, w: 4.5, h: 0.35, fontFace: FONT, fontSize: 13, bold: true,
    color: TEAL, charSpacing: 4, margin: 0,
  });
  s.addText("과정 1 · 기초", {
    x: 0.7, y: 1.35, w: 4, h: 0.4, fontFace: FONT, fontSize: 16, color: "94A3B8", margin: 0,
  });
  s.addText("하네스 첫걸음", {
    x: 0.68, y: 1.82, w: 4.5, h: 1.0, fontFace: FONT, fontSize: 46, bold: true, color: WHITE, margin: 0,
  });
  s.addText("한 문장으로 나만의 AI 팀 만들기", {
    x: 0.7, y: 2.9, w: 4.5, h: 0.5, fontFace: FONT, fontSize: 19, color: "CBD5E1", margin: 0,
  });
  s.addShape(p.shapes.RECTANGLE, { x: 0.72, y: 3.62, w: 0.5, h: 0.05, fill: { color: CORAL } });
  s.addText("광고 실무자를 위한 revfactory/harness 활용 · 120분", {
    x: 0.7, y: 3.82, w: 4.6, h: 0.4, fontFace: FONT, fontSize: 12.5, color: "94A3B8", margin: 0,
  });

  // ============================================================
  // SLIDE 2 — AGENDA / OBJECTIVES
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "오늘의 목표", 0.6, 0.5);
  s.addText("이 시간에 여러분은", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 32, bold: true, color: INK, margin: 0,
  });
  const objs = [
    [ic.magic, "하네스가 무엇인지", "\"왜 팀으로 일하면 결과가 좋아지는지\"를 내 말로 설명한다", TEAL],
    [ic.laptop, "설치하고 켠다", "Claude Code에 harness를 설치하고 에이전트 팀 기능을 활성화한다", PATTERN.pipeline],
    [ic.play, "첫 팀을 만든다", "\"하네스 구성해줘\" 한 문장으로 첫 에이전트 팀을 만들고 결과물을 받는다", CORAL],
    [ic.sitemap, "6가지 협업 패턴", "6가지 아키텍처 패턴을 광고 업무 비유로 매칭한다", PATTERN.supervisor],
    [ic.check, "좋은 요청문 3요소", "도메인·역할·산출물 — 좋은 하네스 요청문의 뼈대를 구분한다", PATTERN.hierarch],
  ];
  let oy = 1.62;
  objs.forEach((o, i) => {
    const yy = oy + i * 0.68;
    card(s, 0.55, yy, 8.9, 0.62);
    iconCircle(s, o[0], 0.72, yy + 0.11, 0.4, o[3]);
    s.addText(o[1], { x: 1.3, y: yy + 0.06, w: 2.6, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(o[2], { x: 3.95, y: yy + 0.06, w: 5.35, h: 0.5, fontFace: FONT, fontSize: 12, color: SLATE, valign: "middle", margin: 0 });
  });
  pageNum(s, 2);

  // ============================================================
  // SLIDE 3 — WHY (before/after)
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "왜 하네스인가", 0.6, 0.5);
  s.addText("혼자 다 하던 일을, 팀에게 맡긴다", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  s.addImage({ path: `${IMG}/03-before-after.png`, x: 0.55, y: 1.7, w: 5.85, h: 3.29, sizing: { type: "contain", w: 5.85, h: 3.29 } });
  // right callouts
  card(s, 6.65, 1.72, 2.85, 1.5, WHITE);
  s.addShape(p.shapes.RECTANGLE, { x: 6.65, y: 1.72, w: 0.09, h: 1.5, fill: { color: SLATE } });
  s.addText("BEFORE", { x: 6.9, y: 1.85, w: 2.4, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: SLATE, charSpacing: 2, margin: 0 });
  s.addText("혼자 리서치·카피·기획·정리를 다 떠안고, 시간에 쫓긴다", {
    x: 6.9, y: 2.2, w: 2.45, h: 0.9, fontFace: FONT, fontSize: 13, color: INK, margin: 0, valign: "top",
  });
  card(s, 6.65, 3.42, 2.85, 1.55, WHITE);
  s.addShape(p.shapes.RECTANGLE, { x: 6.65, y: 3.42, w: 0.09, h: 1.55, fill: { color: TEAL } });
  s.addText("AFTER", { x: 6.9, y: 3.55, w: 2.4, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: "0D9488", charSpacing: 2, margin: 0 });
  s.addText("전문 에이전트 팀이 나눠서 처리하고, 나는 지휘·검수에 집중한다", {
    x: 6.9, y: 3.9, w: 2.45, h: 1.0, fontFace: FONT, fontSize: 13, color: INK, margin: 0, valign: "top",
  });
  pageNum(s, 3);

  // ============================================================
  // SLIDE 4 — WHAT IS HARNESS
  // ============================================================
  s = p.addSlide();
  s.background = { color: NAVY };
  kicker(s, "정의", 0.6, 0.55, CORAL);
  s.addText("하네스 = 팀 아키텍처 팩토리", {
    x: 0.55, y: 0.9, w: 9, h: 0.7, fontFace: FONT, fontSize: 34, bold: true, color: WHITE, margin: 0,
  });
  s.addText([
    { text: "\"하네스 구성해줘\"", options: { color: TEAL, bold: true } },
    { text: " 한 문장이면, 여러분이 설명한 업무를", options: { color: "CBD5E1" } },
  ], { x: 0.55, y: 1.75, w: 9, h: 0.5, fontFace: FONT, fontSize: 19, margin: 0 });
  s.addText([
    { text: "전문 AI 에이전트 팀", options: { color: WHITE, bold: true } },
    { text: " + ", options: { color: "64748B" } },
    { text: "그들이 쓸 스킬(업무 매뉴얼)", options: { color: WHITE, bold: true } },
    { text: "로 자동 변환합니다.", options: { color: "CBD5E1" } },
  ], { x: 0.55, y: 2.25, w: 9, h: 0.5, fontFace: FONT, fontSize: 19, margin: 0 });

  const facts = [
    [ic.sitemap, "6가지 패턴", "협업 방식 6종을\n상황에 맞게 자동 선택", PATTERN.supervisor],
    [ic.bolt, "코드 불필요", "자연어로 지시\n비개발자도 바로 사용", CORAL],
    [ic.seedling, "진화하는 시스템", "쓸수록 피드백 반영\n점점 더 똑똑해짐", TEAL],
  ];
  facts.forEach((f, i) => {
    const x = 0.55 + i * 3.02;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 3.15, w: 2.85, h: 1.75, fill: { color: NAVY2 }, line: { color: "334155", width: 1 }, rectRadius: 0.09 });
    iconCircle(s, f[0], x + 0.28, 3.4, 0.55, f[3]);
    s.addText(f[1], { x: x + 0.28, y: 4.05, w: 2.4, h: 0.35, fontFace: FONT, fontSize: 16, bold: true, color: WHITE, margin: 0 });
    s.addText(f[2], { x: x + 0.28, y: 4.42, w: 2.45, h: 0.5, fontFace: FONT, fontSize: 12, color: "94A3B8", margin: 0 });
  });
  pageNum(s, 4);

  // ============================================================
  // SLIDE 5 — 3-LAYER STRUCTURE
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "핵심 개념", 0.6, 0.5);
  s.addText("3층 구조 — 광고팀에 그대로 대응됩니다", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  const layers = [
    [ic.conductor, "오케스트레이터", "= 팀장", "누가 언제 어떤 순서로 협업할지 지휘하고, 결과를 종합한다", CORAL],
    [ic.users, "에이전트", "= 팀원", "각자 전문 영역(리서치·카피·비주얼…)을 맡아 실제 작업을 한다", PATTERN.pipeline],
    [ic.book, "스킬", "= 업무 매뉴얼", "\"이 일은 이렇게 한다\"는 방법을 담아, 에이전트가 참고한다", TEAL],
  ];
  layers.forEach((l, i) => {
    const yy = 1.75 + i * 1.12;
    card(s, 0.55, yy, 8.9, 0.98);
    iconCircle(s, l[0], 0.78, yy + 0.24, 0.5, l[4]);
    s.addText([
      { text: l[1] + "  ", options: { bold: true, color: INK, fontSize: 18 } },
      { text: l[2], options: { bold: true, color: l[4], fontSize: 15 } },
    ], { x: 1.5, y: yy + 0.14, w: 4.2, h: 0.4, fontFace: FONT, margin: 0, valign: "middle" });
    s.addText(l[3], { x: 1.5, y: yy + 0.5, w: 7.7, h: 0.4, fontFace: FONT, fontSize: 13, color: SLATE, margin: 0 });
  });
  pageNum(s, 5);

  // ============================================================
  // SLIDE 6 — ONE SENTENCE → TEAM
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "작동 방식", 0.6, 0.5);
  s.addText("한 문장이 팀이 됩니다", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  s.addImage({ path: `${IMG}/04-one-sentence.png`, x: 4.75, y: 1.75, w: 4.9, h: 2.76 });
  // prompt box
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.55, y: 1.85, w: 3.55, h: 1.5, fill: { color: NAVY }, rectRadius: 0.08, shadow: shadow() });
  s.addText("입력 프롬프트", { x: 0.75, y: 2.0, w: 3, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: TEAL, charSpacing: 2, margin: 0 });
  s.addText("\"하네스 구성해줘. 신제품을 조사하는 리서처와 헤드라인을 뽑는 카피라이터 팀이 필요해…\"", {
    x: 0.75, y: 2.35, w: 3.2, h: 0.95, fontFace: FONT, fontSize: 12.5, color: "E2E8F0", margin: 0, valign: "top",
  });
  const flow = ["도메인 분석", "팀 설계", "팀 자동 생성", "실행·산출물"];
  flow.forEach((f, i) => {
    const yy = 3.55 + i * 0.0; // horizontal
    const x = 0.55 + i * 1.02;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 3.65, w: 0.92, h: 0.7, fill: { color: WHITE }, line: { color: MIST, width: 1 }, rectRadius: 0.07 });
    s.addText(String(i + 1), { x, y: 3.72, w: 0.92, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: CORAL, align: "center", margin: 0 });
    s.addText(f, { x: x - 0.02, y: 3.98, w: 0.96, h: 0.35, fontFace: FONT, fontSize: 9.5, color: INK, align: "center", margin: 0 });
  });
  pageNum(s, 6);

  // ============================================================
  // SLIDE 7 — AD TEAM = AGENT TEAM (org chart)
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "익숙한 비유", 0.6, 0.5);
  s.addText("여러분의 광고팀 = AI 에이전트 팀", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  s.addImage({ path: `${IMG}/02-team-metaphor.png`, x: 0.35, y: 1.55, w: 6.1, h: 3.43, sizing: { type: "contain", w: 6.1, h: 3.43 } });
  const roles = [
    ["팀장(오케스트레이터)", "브리프를 주고 결과를 리뷰"],
    ["리서처", "시장·소비자·경쟁 조사"],
    ["카피라이터", "메시지·헤드라인"],
    ["아트/비주얼", "키비주얼·썸네일 컨셉"],
    ["미디어 플래너", "채널·예산·성과"],
    ["QA 리뷰어", "품질·톤 검수"],
  ];
  card(s, 6.55, 1.6, 2.95, 3.35);
  s.addText("팀원 = 전문 에이전트", { x: 6.75, y: 1.75, w: 2.6, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: CORAL, margin: 0 });
  roles.forEach((r, i) => {
    const yy = 2.15 + i * 0.46;
    s.addShape(p.shapes.OVAL, { x: 6.78, y: yy + 0.03, w: 0.12, h: 0.12, fill: { color: TEAL } });
    s.addText([
      { text: r[0] + "  ", options: { bold: true, color: INK, fontSize: 11.5 } },
      { text: r[1], options: { color: SLATE, fontSize: 10 } },
    ], { x: 7.0, y: yy - 0.05, w: 2.45, h: 0.4, fontFace: FONT, margin: 0, valign: "middle" });
  });
  pageNum(s, 7);

  // ============================================================
  // SLIDE 8 — 6 PATTERNS
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "협업 방식", 0.6, 0.45);
  s.addText("6가지 팀 협업 패턴", {
    x: 0.55, y: 0.76, w: 6, h: 0.6, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  s.addText("과정 전체를 거치며 6가지를 모두 실무로 익힙니다", {
    x: 0.57, y: 1.32, w: 9, h: 0.35, fontFace: FONT, fontSize: 13, color: SLATE, margin: 0,
  });
  const pats = [
    [ic.stream, "파이프라인", "순차 의존 — 조사→카피→썸네일", PATTERN.pipeline, "C1·C5"],
    [ic.sitemap, "팬아웃 / 팬인", "병렬 조사 후 하나로 종합", PATTERN.fanout, "C2"],
    [ic.users, "전문가 풀", "상황별 필요한 전문가만 호출", PATTERN.expert, "심화"],
    [ic.check, "생성 – 검증", "만들고, 다른 에이전트가 검수", PATTERN.gencheck, "C3"],
    [ic.crown, "감독자", "중앙 지휘자가 태스크 동적 배분", PATTERN.supervisor, "C4"],
    [ic.layer, "계층적 위임", "상위→하위로 재귀 분해 위임", PATTERN.hierarch, "C6"],
  ];
  pats.forEach((pt, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.55 + col * 3.02, yy = 1.8 + row * 1.62;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: yy, w: 2.85, h: 1.5, fill: { color: WHITE }, line: { color: MIST, width: 1 }, rectRadius: 0.08, shadow: shadow() });
    s.addShape(p.shapes.RECTANGLE, { x, y: yy, w: 2.85, h: 0.09, fill: { color: pt[3] } });
    iconCircle(s, pt[0], x + 0.22, yy + 0.26, 0.46, pt[3]);
    s.addText(pt[4], { x: x + 1.95, y: yy + 0.26, w: 0.78, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: pt[3], align: "right", margin: 0 });
    s.addText(pt[1], { x: x + 0.82, y: yy + 0.28, w: 1.9, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(pt[2], { x: x + 0.24, y: yy + 0.85, w: 2.45, h: 0.55, fontFace: FONT, fontSize: 11.5, color: SLATE, margin: 0 });
  });
  pageNum(s, 8);

  // ============================================================
  // SLIDE 9 — TEAM vs SUBAGENT
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "실행 모드", 0.6, 0.5);
  s.addText("두 가지 방식으로 일한다", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  // team card
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.55, y: 1.75, w: 4.35, h: 3.15, fill: { color: WHITE }, line: { color: CORAL, width: 2 }, rectRadius: 0.1, shadow: shadow() });
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.55, y: 1.75, w: 1.7, h: 0.42, fill: { color: CORAL }, rectRadius: 0.06 });
  s.addText("기본값", { x: 0.55, y: 1.79, w: 1.7, h: 0.34, fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", margin: 0 });
  iconCircle(s, ic.users, 0.8, 2.35, 0.6, CORAL);
  s.addText("에이전트 팀", { x: 1.55, y: 2.42, w: 3, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: INK, margin: 0, valign: "middle" });
  [
    "팀원들이 서로 대화하며 자체 조율",
    "발견을 공유하고 상충을 토론",
    "누락을 서로 보완 → 품질↑",
    "2명 이상 협업이 필요할 때",
  ].forEach((t, i) => {
    s.addText([{ text: t, options: { bullet: { code: "2022", indent: 14 }, color: INK } }], { x: 0.85, y: 3.15 + i * 0.42, w: 3.9, h: 0.4, fontFace: FONT, fontSize: 13, margin: 0 });
  });
  // subagent card
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.75, w: 4.35, h: 3.15, fill: { color: WHITE }, line: { color: MIST, width: 1.5 }, rectRadius: 0.1, shadow: shadow() });
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.75, w: 1.7, h: 0.42, fill: { color: SLATE }, rectRadius: 0.06 });
  s.addText("대안", { x: 5.1, y: 1.79, w: 1.7, h: 0.34, fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", margin: 0 });
  iconCircle(s, ic.cube, 5.35, 2.35, 0.6, SLATE);
  s.addText("서브 에이전트", { x: 6.1, y: 2.42, w: 3, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: INK, margin: 0, valign: "middle" });
  [
    "한 명이 맡아 결과만 돌려줌",
    "팀 통신 없이 단발성 처리",
    "여러 개를 병렬로 돌리기 좋음",
    "협업 오버헤드가 아까울 때",
  ].forEach((t, i) => {
    s.addText([{ text: t, options: { bullet: { code: "2022", indent: 14 }, color: INK } }], { x: 5.4, y: 3.15 + i * 0.42, w: 3.9, h: 0.4, fontFace: FONT, fontSize: 13, margin: 0 });
  });
  pageNum(s, 9);

  // ============================================================
  // SLIDE 10 — 3 ELEMENTS OF A GOOD REQUEST
  // ============================================================
  s = p.addSlide();
  s.background = { color: NAVY };
  kicker(s, "요청문 작성법", 0.6, 0.5, CORAL);
  s.addText("좋은 요청문의 3요소", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 32, bold: true, color: WHITE, margin: 0,
  });
  const three = [
    ["1", "도메인", "무슨 일인가", "\"신제품 음료 런칭\"", TEAL],
    ["2", "역할", "누가 필요한가", "\"리서처 + 카피라이터\"", CORAL],
    ["3", "산출물", "무엇을 받을까", "\"시장요약 1p + 헤드라인 5개\"", PATTERN.supervisor],
  ];
  three.forEach((t, i) => {
    const x = 0.55 + i * 3.02;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 1.85, w: 2.85, h: 2.35, fill: { color: NAVY2 }, line: { color: "334155", width: 1 }, rectRadius: 0.1 });
    s.addShape(p.shapes.OVAL, { x: x + 0.28, y: 2.1, w: 0.62, h: 0.62, fill: { color: t[4] } });
    s.addText(t[0], { x: x + 0.28, y: 2.13, w: 0.62, h: 0.56, fontFace: FONT, fontSize: 26, bold: true, color: NAVY2, align: "center", valign: "middle", margin: 0 });
    s.addText(t[1], { x: x + 1.05, y: 2.18, w: 1.7, h: 0.45, fontFace: FONT, fontSize: 20, bold: true, color: WHITE, margin: 0, valign: "middle" });
    s.addText(t[2], { x: x + 0.28, y: 2.85, w: 2.4, h: 0.35, fontFace: FONT, fontSize: 13, color: "94A3B8", margin: 0 });
    s.addShape(p.shapes.RECTANGLE, { x: x + 0.28, y: 3.28, w: 2.3, h: 0.008, fill: { color: "334155" } });
    s.addText(t[3], { x: x + 0.28, y: 3.4, w: 2.42, h: 0.65, fontFace: FONT, fontSize: 13, italic: true, color: TEAL, margin: 0 });
  });
  s.addText("세 가지를 한 문장에 담으면, 하네스가 헤매지 않습니다.", {
    x: 0.55, y: 4.42, w: 9, h: 0.4, fontFace: FONT, fontSize: 14, color: "CBD5E1", align: "center", margin: 0,
  });
  pageNum(s, 10);

  // ============================================================
  // SLIDE 11 — LAB INTRO
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.55, y: 0.5, w: 2.1, h: 0.5, fill: { color: CORAL }, rectRadius: 0.25 });
  s.addImage({ data: ic.flask, x: 0.72, y: 0.61, w: 0.28, h: 0.28 });
  s.addText("실습 시간", { x: 1.08, y: 0.55, w: 1.5, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, valign: "middle", margin: 0 });
  s.addText("미션: 신제품 음료 \"제로톡\" 런칭 팀 만들기", {
    x: 0.55, y: 1.2, w: 9, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: INK, margin: 0,
  });
  card(s, 0.55, 2.1, 8.9, 1.05, WHITE);
  s.addText("시나리오", { x: 0.8, y: 2.25, w: 2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: CORAL, charSpacing: 2, margin: 0 });
  s.addText("미니 리서치 + 카피 팀을 만들어, 시장 요약 1페이지와 광고 헤드라인 5개를 받는다.", {
    x: 0.8, y: 2.55, w: 8.4, h: 0.5, fontFace: FONT, fontSize: 16, color: INK, margin: 0,
  });
  // prompt block
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.55, y: 3.35, w: 8.9, h: 1.55, fill: { color: NAVY }, rectRadius: 0.08, shadow: shadow() });
  s.addText("복사해서 붙여넣기 →", { x: 0.8, y: 3.5, w: 4, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: TEAL, charSpacing: 1, margin: 0 });
  s.addText("하네스 구성해줘. 신제품 음료 런칭을 돕는 작은 팀이 필요해 — 시장/경쟁 상황을 빠르게 조사하는 리서처와, 그 조사를 바탕으로 광고 헤드라인을 뽑는 카피라이터. 조사 요약 1페이지와 헤드라인 5개를 결과로 줘.", {
    x: 0.8, y: 3.82, w: 8.4, h: 0.95, fontFace: "D2Coding", fontSize: 13.5, color: "E2E8F0", margin: 0, valign: "top",
  });
  pageNum(s, 11);

  // ============================================================
  // SLIDE 12 — LAB STEPS 1-4
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "실습 진행 · 1부", 0.6, 0.5);
  s.addText("설치 확인 → 첫 실행", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  const steps1 = [
    ["1", "설치 점검", "Claude Code 실행 → 플러그인 목록에서 harness 확인", "harness가 목록에 보임"],
    ["2", "팀 활성화", "에이전트 팀 기능이 켜져 있는지 확인", "팀 기능 ON"],
    ["3", "첫 실행", "위 프롬프트를 그대로 입력", "리서처+카피라이터 2인 팀 구성"],
    ["4", "관찰하기", ".claude/agents/ 와 .claude/skills/ 폴더를 눈으로 확인", "\"누가\"와 \"어떻게\"가 파일로 분리됨"],
  ];
  steps1.forEach((st, i) => {
    const yy = 1.72 + i * 0.83;
    card(s, 0.55, yy, 8.9, 0.72);
    s.addShape(p.shapes.OVAL, { x: 0.75, y: yy + 0.16, w: 0.42, h: 0.42, fill: { color: CORAL } });
    s.addText(st[0], { x: 0.75, y: yy + 0.17, w: 0.42, h: 0.4, fontFace: FONT, fontSize: 18, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(st[1], { x: 1.35, y: yy + 0.1, w: 2.0, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(st[2], { x: 3.35, y: yy + 0.1, w: 3.55, h: 0.5, fontFace: FONT, fontSize: 12, color: SLATE, valign: "middle", margin: 0 });
    s.addImage({ data: ic.arrow, x: 6.95, y: yy + 0.28, w: 0.2, h: 0.16 });
    s.addText(st[3], { x: 7.25, y: yy + 0.1, w: 2.1, h: 0.5, fontFace: FONT, fontSize: 11.5, bold: true, color: "0D9488", valign: "middle", margin: 0 });
  });
  pageNum(s, 12);

  // ============================================================
  // SLIDE 13 — LAB STEPS 5-7
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "실습 진행 · 2부", 0.6, 0.5);
  s.addText("산출물 받기 → 패턴 인식 → 개선", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 28, bold: true, color: INK, margin: 0,
  });
  const steps2 = [
    ["5", "산출물 수령", "시장요약 1페이지 + 광고 헤드라인 5개를 확보한다", TEAL],
    ["6", "패턴 인식", "이 흐름이 \"파이프라인(조사→카피)\"임을 함께 라벨링한다", PATTERN.pipeline],
    ["7", "미니 개선", "\"헤드라인을 더 위트있게\"로 재요청 → 같은 팀이 톤만 바꿔 재생성", CORAL],
  ];
  steps2.forEach((st, i) => {
    const yy = 1.75 + i * 0.86;
    card(s, 0.55, yy, 8.9, 0.74);
    s.addShape(p.shapes.OVAL, { x: 0.75, y: yy + 0.17, w: 0.42, h: 0.42, fill: { color: st[3] } });
    s.addText(st[0], { x: 0.75, y: yy + 0.18, w: 0.42, h: 0.4, fontFace: FONT, fontSize: 18, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(st[1], { x: 1.35, y: yy + 0.12, w: 2.1, h: 0.5, fontFace: FONT, fontSize: 15, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(st[2], { x: 3.45, y: yy + 0.12, w: 5.85, h: 0.5, fontFace: FONT, fontSize: 12.5, color: SLATE, valign: "middle", margin: 0 });
  });
  // takeaway
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.55, y: 4.35, w: 8.9, h: 0.62, fill: { color: "FEF3C7" }, rectRadius: 0.08 });
  s.addImage({ data: ic.lightbulb, x: 0.78, y: 4.5, w: 0.32, h: 0.32 });
  s.addText([
    { text: "핵심 체험: ", options: { bold: true, color: "92400E" } },
    { text: "재요청 한 번으로 결과가 바뀐다 — 하네스는 \"쓸수록 진화\"합니다.", options: { color: "92400E" } },
  ], { x: 1.2, y: 4.42, w: 8.1, h: 0.5, fontFace: FONT, fontSize: 13.5, valign: "middle", margin: 0 });
  pageNum(s, 13);

  // ============================================================
  // SLIDE 14 — COMMON PITFALLS
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "자주 하는 실수", 0.6, 0.5);
  s.addText("이것만 피하면 반은 성공", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  const pits = [
    ["산출물을 안 적는다", "\"무엇을 받을지\" 빠지면 팀이 헤맨다", "3요소(도메인·역할·산출물) 체크", "EF4444"],
    ["팀 기능이 꺼져 있다", "팀 대신 단일 응답만 돌아온다", "에이전트 팀 활성화 확인", "F59E0B"],
    ["결과를 그냥 믿는다", "검증 없이 수용하면 오류가 남는다", "\"한 번은 의심하라\"", "3B82F6"],
  ];
  pits.forEach((pt, i) => {
    const yy = 1.8 + i * 1.05;
    card(s, 0.55, yy, 8.9, 0.92);
    iconCircle(s, ic.warn, 0.78, yy + 0.22, 0.48, pt[3]);
    s.addText(pt[0], { x: 1.5, y: yy + 0.13, w: 3.4, h: 0.35, fontFace: FONT, fontSize: 16, bold: true, color: INK, margin: 0 });
    s.addText(pt[1], { x: 1.5, y: yy + 0.5, w: 4.3, h: 0.35, fontFace: FONT, fontSize: 12, color: SLATE, margin: 0 });
    s.addShape(p.shapes.RECTANGLE, { x: 6.0, y: yy + 0.2, w: 0.02, h: 0.52, fill: { color: MIST } });
    s.addImage({ data: ic.checkGreen, x: 6.25, y: yy + 0.34, w: 0.26, h: 0.26 });
    s.addText(pt[2], { x: 6.6, y: yy + 0.13, w: 2.75, h: 0.68, fontFace: FONT, fontSize: 13, bold: true, color: "0D9488", valign: "middle", margin: 0 });
  });
  pageNum(s, 14);

  // ============================================================
  // SLIDE 15 — PROOF (stats)
  // ============================================================
  s = p.addSlide();
  s.background = { color: NAVY };
  kicker(s, "효과", 0.6, 0.5, CORAL);
  s.addText("구조를 갖추면, 결과가 좋아진다", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: WHITE, margin: 0,
  });
  const stats = [
    ["+60%", "평균 품질 향상", "49.5 → 79.3점", TEAL],
    ["15/15", "승률 (전 과제)", "모든 과제에서 우위", CORAL],
    ["-32%", "결과 편차 감소", "더 안정적인 산출물", PATTERN.supervisor],
  ];
  stats.forEach((st, i) => {
    const x = 0.55 + i * 3.02;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 1.85, w: 2.85, h: 1.85, fill: { color: NAVY2 }, line: { color: "334155", width: 1 }, rectRadius: 0.1 });
    s.addText(st[0], { x: x + 0.2, y: 2.05, w: 2.45, h: 0.85, fontFace: FONT, fontSize: 46, bold: true, color: st[3], align: "center", margin: 0 });
    s.addText(st[1], { x: x + 0.2, y: 2.95, w: 2.45, h: 0.35, fontFace: FONT, fontSize: 15, bold: true, color: WHITE, align: "center", margin: 0 });
    s.addText(st[2], { x: x + 0.2, y: 3.3, w: 2.45, h: 0.35, fontFace: FONT, fontSize: 11, color: "94A3B8", align: "center", margin: 0 });
  });
  s.addText("출처: revfactory/claude-code-harness A/B 실험 (n=15, 저자 자체 측정, 제3자 재현 진행 중). 조직 도입 시 2~4주 내부 파일럿으로 자체 수치 측정 권장.", {
    x: 0.55, y: 4.15, w: 8.9, h: 0.7, fontFace: FONT, fontSize: 11, italic: true, color: "94A3B8", align: "center", margin: 0,
  });
  pageNum(s, 15);

  // ============================================================
  // SLIDE 16 — CURRICULUM MAP
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "다음 여정", 0.6, 0.45);
  s.addText("여기서 시작해 6과정으로", {
    x: 0.55, y: 0.76, w: 9, h: 0.6, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  const courses = [
    ["C1", "하네스 첫걸음", "기초 · 지금 여기", CORAL, true],
    ["C2", "리서치·인사이트", "팬아웃/팬인", PATTERN.fanout, false],
    ["C3", "크리에이티브 제작", "생성-검증", PATTERN.gencheck, false],
    ["C4", "미디어·캠페인 플래닝", "감독자", PATTERN.supervisor, false],
    ["C5", "콘텐츠·SNS 제작", "파이프라인", PATTERN.pipeline, false],
    ["C6", "업무 자동화·심화", "계층 위임+커스텀", PATTERN.hierarch, false],
  ];
  courses.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.55 + col * 3.02, yy = 1.5 + row * 1.62;
    const fill = c[4] ? NAVY : WHITE;
    const titleColor = c[4] ? WHITE : INK;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: yy, w: 2.85, h: 1.45, fill: { color: fill }, line: { color: c[4] ? CORAL : MIST, width: c[4] ? 2 : 1 }, rectRadius: 0.09, shadow: shadow() });
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: x + 0.22, y: yy + 0.22, w: 0.72, h: 0.42, fill: { color: c[3] }, rectRadius: 0.05 });
    s.addText(c[0], { x: x + 0.22, y: yy + 0.24, w: 0.72, h: 0.38, fontFace: FONT, fontSize: 16, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(c[1], { x: x + 1.05, y: yy + 0.24, w: 1.68, h: 0.42, fontFace: FONT, fontSize: 13.5, bold: true, color: titleColor, valign: "middle", margin: 0 });
    s.addText(c[2], { x: x + 0.24, y: yy + 0.82, w: 2.45, h: 0.4, fontFace: FONT, fontSize: 11.5, color: c[4] ? "94A3B8" : SLATE, margin: 0 });
  });
  pageNum(s, 16);

  // ============================================================
  // SLIDE 17 — CHECKLIST / WRAP
  // ============================================================
  s = p.addSlide();
  s.background = { color: PAPER };
  kicker(s, "오늘 체크리스트", 0.6, 0.5);
  s.addText("집에 갈 때 이것들을 가져갑니다", {
    x: 0.55, y: 0.82, w: 9, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: INK, margin: 0,
  });
  const checks = [
    "harness 설치 + 에이전트 팀 활성화 완료",
    "\"하네스 구성해줘\"로 첫 팀을 직접 실행했다",
    "오케스트레이터 · 에이전트 · 스킬 3층 구조를 설명할 수 있다",
    "요청문 3요소(도메인·역할·산출물)로 문장을 쓸 수 있다",
    "6가지 협업 패턴의 이름과 쓰임을 안다",
    "재사용 가능한 나의 첫 하네스를 확보했다",
  ];
  checks.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.55 + col * 4.5, yy = 1.8 + row * 0.98;
    card(s, x, yy, 4.3, 0.82);
    s.addImage({ data: ic.checkTeal, x: x + 0.2, y: yy + 0.26, w: 0.32, h: 0.32 });
    s.addText(c, { x: x + 0.65, y: yy + 0.06, w: 3.55, h: 0.72, fontFace: FONT, fontSize: 12.5, color: INK, valign: "middle", margin: 0 });
  });
  pageNum(s, 17);

  // ============================================================
  // SLIDE 18 — CLOSING
  // ============================================================
  s = p.addSlide();
  s.background = { color: NAVY2 };
  s.addShape(p.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.12, fill: { color: CORAL } });
  s.addText("HARNESS AD ACADEMY", { x: 0, y: 1.5, w: W, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: TEAL, charSpacing: 4, align: "center", margin: 0 });
  s.addText("한 문장이면 충분합니다.", { x: 0, y: 2.05, w: W, h: 0.8, fontFace: FONT, fontSize: 40, bold: true, color: WHITE, align: "center", margin: 0 });
  s.addText("이제 여러분의 업무로 하네스를 데려가세요.", { x: 0, y: 3.0, w: W, h: 0.5, fontFace: FONT, fontSize: 18, color: "CBD5E1", align: "center", margin: 0 });
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 3.7, y: 3.85, w: 2.6, h: 0.55, fill: { color: CORAL }, rectRadius: 0.28 });
  s.addText("다음 과정 · C2 리서치 하네스", { x: 3.7, y: 3.9, w: 2.6, h: 0.45, fontFace: FONT, fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });

  await p.writeFile({ fileName: "/Users/andy/Work/ad-edu/harness-ad-academy/course1-basics/deck/C1_하네스_첫걸음_강의덱.pptx" });
  console.log("DECK WRITTEN");
}

build().catch((e) => { console.error(e); process.exit(1); });
