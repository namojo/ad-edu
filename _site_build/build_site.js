const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs");
const ASSET_SRC = path.join(__dirname, "assets");

marked.use({ gfm: true, breaks: false, mangle: false, headerIds: false });

// ---------- course registry ----------
const COURSES = [
  { id: "c1", slug: "course1-basics",     book: "course1-basics/교재/C1_교재.md",     imgdir: "course1-basics/images",   caseFile: null },
  { id: "c2", slug: "course2-research",   book: "course2-research/교재/C2_교재.md",   imgdir: "course2-research/images", caseFile: "course2-research/사례/C2_인사이트보고서.md" },
  { id: "c3", slug: "course3-creative",   book: "course3-creative/교재/C3_교재.md",   imgdir: "course3-creative/images", caseFile: "course3-creative/사례/C3_크리에이티브패키지.md" },
  { id: "c4", slug: "course4-media",      book: "course4-media/교재/C4_교재.md",      imgdir: "course4-media/images",    caseFile: "course4-media/사례/C4_미디어플랜.md" },
  { id: "c5", slug: "course5-content",    book: "course5-content/교재/C5_교재.md",    imgdir: "course5-content/images",  caseFile: "course5-content/사례/C5_콘텐츠캘린더.md" },
  { id: "c6", slug: "course6-automation", book: "course6-automation/교재/C6_교재.md", imgdir: "course6-automation/images", caseFile: "course6-automation/사례/C6_주간리포트_자동화.md" },
];
const bySlug = Object.fromEntries(COURSES.map(c => [c.slug, c]));
const byId = Object.fromEntries(COURSES.map(c => [c.id, c]));

// ---------- helpers ----------
function readFM(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: md };
  const fm = {};
  m[1].split("\n").forEach(line => {
    const mm = line.match(/^([\w-]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].replace(/^["']|["']$/g, "").trim();
  });
  return { fm, body: m[2] };
}
function slugify(t) {
  return t.replace(/<[^>]+>/g, "").trim()
    .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣.\- ]/g, "")
    .replace(/[.\s]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "sec";
}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

// process rendered HTML: heading ids+toc, code blocks, images, links
function process(html, ctx) {
  const toc = [];
  const seen = {};
  // task lists -> interactive
  html = html.replace(/<li>\s*<input([^>]*?)type="checkbox"([^>]*?)>\s*([\s\S]*?)<\/li>/g, (m, a, b, content) => {
    const checked = /checked/.test(a + b) ? " checked" : "";
    return `<li class="task-list-item"><input type="checkbox"${checked}><label>${content.trim()}</label></li>`;
  });
  html = html.replace(/<ul>(\s*<li class="task-list-item")/g, '<ul class="contains-task-list">$1');
  // headings h2/h3 -> ids + toc
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
    let id = slugify(inner);
    if (seen[id]) { seen[id]++; id = id + "-" + seen[id]; } else seen[id] = 1;
    toc.push({ lvl: +lvl, id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  // code blocks -> copyable
  html = html.replace(/<pre><code(?: class="language-([\w-]+)")?>([\s\S]*?)<\/code><\/pre>/g, (m, lang, code) => {
    const isPrompt = (lang === "text" || lang === "" || lang == null) && /하네스|구성해줘|줘\.|리서치|팀/.test(code) ;
    const prompt = lang === "text";
    const tag = prompt ? "프롬프트 · 복사해서 사용" : (lang ? lang : "코드");
    return `<div class="codeblock${prompt ? " prompt" : ""}"><span class="cbtag">${tag}</span><button class="copy" type="button">복사</button><pre><code>${code}</code></pre></div>`;
  });
  // images: rewrite ../images/ and add caption from alt
  html = html.replace(/<img src="\.\.\/images\/([^"]+)"(?:\s+alt="([^"]*)")?[^>]*>/g, (m, file, alt) => {
    const cap = alt ? `<span class="imgcap">${alt}</span>` : "";
    return `<img src="assets/img/${ctx.slug}/${file}" alt="${alt || ""}" loading="lazy">${cap}`;
  });
  // case links ../사례/*.md -> case page
  html = html.replace(/<a href="\.\.\/사례\/[^"]+\.md"/g, `<a class="inline" href="${ctx.id}-case.html"`);
  // external / other links get inline class
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a class="inline" target="_blank" rel="noopener" href="$1"');
  // strip web nav comment
  html = html.replace(/<!--\s*web: nav[^>]*-->/g, "");
  return { html, toc };
}

function parseNav(md) {
  const m = md.match(/web:\s*nav\s+prev=([\w-]+)\s+next=([\w-]+)/);
  if (!m) return { prev: null, next: null };
  return { prev: m[1] === "none" ? null : m[1], next: m[2] === "none" ? null : m[2] };
}

// ---------- templates ----------
const HEAD = (title, extra = "") => `<!doctype html><html lang="ko" data-theme="light"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="광고 실무자를 위한 harness 활용 교육 · Harness Ad Academy">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23FF6B4A'/%3E%3Ctext x='16' y='23' font-size='19' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'%3EH%3C/text%3E%3C/svg%3E">
${extra}</head><body>`;

const HEADER = (rel = "") => `<header class="hdr"><div class="hdr-in">
<a class="brand" href="${rel}index.html"><span class="logo"></span><span>Harness Ad Academy<small>광고 실무 × AI 하네스</small></span></a>
<nav class="nav">
<a class="hideSm" href="${rel}index.html#courses">과정</a>
<a class="hideSm" href="${rel}index.html#tracks">추천 트랙</a>
<a class="hideSm" href="https://github.com/namojo/ad-edu" target="_blank" rel="noopener">GitHub</a>
<button class="iconbtn" id="themeBtn" onclick="toggleTheme()" title="테마 전환" type="button">☾</button>
</nav></div></header>`;

const FOOT = () => `<footer class="foot"><div class="wrap">
<span>Harness Ad Academy · 광고 실무자를 위한 <code>harness</code> 활용 교육</span>
<span>© 2026 · 6개 과정 · 비개발자용 실습 중심</span>
</div></footer><script src="assets/app.js"></script></body></html>`;

const courseSidebar = (curId, toc) => `
<aside class="side" id="side">
  <h5>전체 과정</h5>
  <ul class="courselist">
    ${COURSES.map(c => `<li><a class="${c.id === curId ? "cur" : ""}" style="--cdot:${c.pat}" href="${c.id}.html"><span class="dot"></span>${c.id.toUpperCase()} · ${c.title}</a></li>`).join("")}
  </ul>
  <h5>이 과정 목차</h5>
  <nav class="toc">
    ${toc.map(t => `<a class="${t.lvl === 3 ? "lvl3" : ""}" href="#${t.id}">${t.text}</a>`).join("")}
  </nav>
</aside>`;

function coursePage(c) {
  const raw = fs.readFileSync(path.join(ROOT, c.book), "utf-8");
  const { fm, body } = readFM(raw);
  const nav = parseNav(raw);
  // strip first h1 (banner shows title)
  const bodyNoH1 = body.replace(/^\s*#\s+[^\n]*\n/, "");
  const rendered = marked.parse(bodyNoH1);
  const { html, toc } = process(rendered, c);
  c._fm = fm; c._toc = toc;
  const pat = fm.pattern_color || c.pat;
  const meta = [fm.level, fm.pattern, fm.duration_min ? fm.duration_min + "분" : null, fm.prerequisite && fm.prerequisite !== "없음" ? "선수 " + fm.prerequisite : "선수과정 없음"].filter(Boolean);
  const prev = nav.prev && bySlug[nav.prev] ? bySlug[nav.prev] : null;
  const next = nav.next && bySlug[nav.next] ? bySlug[nav.next] : null;
  const caseLink = c.caseFile ? `<a class="chip pat" href="${c.id}-case.html">📄 완성형 사례 보기</a>` : "";
  const pager = `<div class="pager">
    ${prev ? `<a class="prev" href="${prev.id}.html"><div class="dir">← 이전 과정</div><div class="ttl">${prev.id.toUpperCase()} · ${prev._fm ? prev._fm.title : prev.title}</div></a>` : `<a class="prev" href="index.html"><div class="dir">← 홈</div><div class="ttl">과정 목록</div></a>`}
    ${next ? `<a class="next" href="${next.id}.html"><div class="dir">다음 과정 →</div><div class="ttl">${next.id.toUpperCase()} · ${next._fm ? next._fm.title : next.title}</div></a>` : `<a class="next" href="index.html"><div class="dir">완료 🎉</div><div class="ttl">과정 목록으로</div></a>`}
  </div>`;
  return HEAD(`${c.id.toUpperCase()} · ${fm.title} — Harness Ad Academy`, `<style>:root{--pat:${pat}}</style>`)
    + HEADER()
    + `<div class="progwrap"><div class="progbar" id="progbar"></div></div>`
    + `<button class="iconbtn menutoggle" onclick="toggleMenu()" style="position:fixed;left:14px;bottom:16px;z-index:70;width:48px;height:48px;box-shadow:var(--shadow-lg)" type="button">☰</button>`
    + `<div class="scrim"></div>`
    + `<section class="coursebanner"><div class="wrap">
        <span class="cid">${c.id.toUpperCase()}</span>
        <h1>${fm.title}</h1>
        <div class="metarow"><span class="chip pat">${fm.pattern || ""}</span>${[fm.level, fm.duration_min ? fm.duration_min + "분" : null, fm.prerequisite && fm.prerequisite !== "없음" ? "선수 " + fm.prerequisite : "선수과정 없음"].filter(Boolean).map(x => `<span class="chip">${x}</span>`).join("")}${caseLink}</div>
      </div></section>`
    + `<div class="layout" data-course="${c.id}">`
    + courseSidebar(c.id, toc)
    + `<main class="article" data-course="${c.id}">${html}${pager}</main>`
    + `</div>`
    + `<script>document.body.setAttribute('data-course','${c.id}')</script>`
    + FOOT();
}

function casePage(c) {
  if (!c.caseFile) return null;
  const raw = fs.readFileSync(path.join(ROOT, c.caseFile), "utf-8");
  const { fm, body } = readFM(raw);
  const rendered = marked.parse(body);
  const { html, toc } = process(rendered, c);
  const pat = (c._fm && c._fm.pattern_color) || c.pat;
  const title = (c._fm ? c._fm.title : c.title) + " — 완성형 사례";
  return HEAD(`${c.id.toUpperCase()} 사례 — Harness Ad Academy`, `<style>:root{--pat:${pat}}</style>`)
    + HEADER()
    + `<div class="progwrap"><div class="progbar" id="progbar"></div></div>`
    + `<button class="iconbtn menutoggle" onclick="toggleMenu()" style="position:fixed;left:14px;bottom:16px;z-index:70;width:48px;height:48px;box-shadow:var(--shadow-lg)" type="button">☰</button>`
    + `<div class="scrim"></div>`
    + `<section class="coursebanner"><div class="wrap">
        <span class="cid">${c.id.toUpperCase()} · 사례</span>
        <h1>완성형 사례 — ${c._fm ? c._fm.title : ""}</h1>
        <div class="metarow"><span class="chip pat">worked example</span><span class="chip">가상 브랜드 · 예시 데이터</span>
        <a class="chip" href="${c.id}.html">← 교재로 돌아가기</a></div>
      </div></section>`
    + `<div class="layout">`
    + courseSidebar(c.id, toc)
    + `<main class="article">${html}<div class="pager"><a class="prev" href="${c.id}.html"><div class="dir">← 교재</div><div class="ttl">${c._fm ? c._fm.title : ""}</div></a></div></main>`
    + `</div>` + FOOT();
}

function landing() {
  const cards = COURSES.map(c => {
    const fm = c._fm || {};
    const pat = fm.pattern_color || c.pat;
    const hook = (() => {
      // pull the blockquote hook from body
      const raw = fs.readFileSync(path.join(ROOT, c.book), "utf-8");
      const m = raw.match(/\n>\s*(.+)/);
      return m ? m[1].replace(/\*\*/g, "").replace(/[""]/g, "") : "";
    })();
    return `<a class="card" style="--pat:${pat}" href="${c.id}.html">
      <span class="cid">${c.id.toUpperCase()}</span>
      <h3>${fm.title || ""}</h3>
      <p>${hook}</p>
      <div class="meta"><span class="chip pat">${fm.pattern || ""}</span><span class="chip">${fm.level || ""}</span><span class="chip">${fm.duration_min || ""}분</span></div>
      <span class="go">과정 열기 →</span>
    </a>`;
  }).join("");

  const tracks = [
    ["기획 / AE", ["C1", "C2", "C4", "C6"]],
    ["크리에이티브", ["C1", "C3", "C5", "C6"]],
    ["미디어 / 퍼포먼스", ["C1", "C4", "C5", "C6"]],
    ["풀코스 (권장)", ["C1", "C2", "C3", "C4", "C5", "C6"]],
  ].map(([name, steps]) => `<div class="track"><h4>${name}</h4><div class="flow">${steps.map((s, i) => `${i ? '<span class="arr">→</span>' : ''}<a class="step" href="${s.toLowerCase()}.html">${s}</a>`).join("")}</div></div>`).join("");

  return HEAD("Harness Ad Academy — 광고 실무 × AI 하네스 교육")
    + HEADER()
    + `<section class="hero"><div class="wrap">
        <p class="eyebrow">HARNESS AD ACADEMY</p>
        <h1>한 문장으로,<br><span class="hl">나만의 AI 팀</span>을 만든다</h1>
        <p>코딩 지식 없이 광고 실무 — 리서치·크리에이티브·미디어·콘텐츠·자동화 — 를 AI 에이전트 팀으로 처리하는 6단계 실습 교육.</p>
        <div class="cta">
          <a class="btn btn-primary" href="c1.html">C1부터 시작하기 →</a>
          <a class="btn btn-ghost" href="#courses">전체 과정 보기</a>
        </div>
        <div class="stats">
          <div><b>6</b><span>단계 과정 (기초→심화)</span></div>
          <div><b>6</b><span>협업 패턴 마스터</span></div>
          <div><b>100%</b><span>광고 실무 사례</span></div>
        </div>
      </div></section>`
    + `<section class="section" id="courses"><h2 class="st">6개 과정</h2><p class="sub">기초부터 심화까지, 각 과정은 하나의 하네스 패턴과 실무 사례를 다룹니다. 가상 브랜드 “제로톡”이 전 과정을 관통합니다.</p><div class="cards">${cards}</div></section>`
    + `<section class="section" id="tracks" style="padding-top:0"><h2 class="st">역할별 추천 트랙</h2><p class="sub">담당 업무에 맞는 순서로 골라 들으세요.</p><div class="tracks">${tracks}</div></section>`
    + `<section class="section" style="padding-top:0"><div class="track" style="background:linear-gradient(120deg,#0f1a30,#132540);color:#e8eef8;border:none">
        <h4 style="color:#fff;font-size:19px">지금 바로 실습해 보세요</h4>
        <p style="color:#b9c6dc;margin:8px 0 16px">각 교재의 “실습” 섹션에는 복사해서 바로 쓰는 프롬프트가 있습니다. 체크리스트는 진행 상황이 자동 저장됩니다.</p>
        <a class="btn btn-primary" href="c1.html">C1 · 하네스 첫걸음 시작 →</a>
      </div></section>`
    + FOOT();
}

// ---------- build ----------
function rimraf(p){ if(fs.existsSync(p)) fs.rmSync(p,{recursive:true,force:true}); }
function copyDir(src,dst){ fs.mkdirSync(dst,{recursive:true}); for(const f of fs.readdirSync(src)){ const s=path.join(src,f),d=path.join(dst,f); if(fs.statSync(s).isDirectory()) copyDir(s,d); else fs.copyFileSync(s,d); } }

// pre-pass: load all frontmatter/titles so sidebars & pagers resolve for every course
for (const c of COURSES) {
  const raw = fs.readFileSync(path.join(ROOT, c.book), "utf-8");
  const { fm } = readFM(raw);
  c._fm = fm; c.title = fm.title || c.id.toUpperCase();
}

rimraf(OUT); fs.mkdirSync(OUT, { recursive: true });
// assets
copyDir(ASSET_SRC, path.join(OUT, "assets"));
// images per course
for (const c of COURSES) {
  const src = path.join(ROOT, c.imgdir);
  if (fs.existsSync(src)) {
    const dst = path.join(OUT, "assets", "img", c.slug);
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(src)) if (f.endsWith(".png") || f.endsWith(".jpg")) fs.copyFileSync(path.join(src, f), path.join(dst, f));
  }
}
// course pages first (populate _fm)
for (const c of COURSES) fs.writeFileSync(path.join(OUT, `${c.id}.html`), coursePage(c));
// case pages
for (const c of COURSES) { const p = casePage(c); if (p) fs.writeFileSync(path.join(OUT, `${c.id}-case.html`), p); }
// landing (needs _fm populated)
fs.writeFileSync(path.join(OUT, "index.html"), landing());
// .nojekyll so GitHub Pages serves _ files / doesn't run jekyll
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

console.log("SITE BUILT →", OUT);
console.log("pages:", fs.readdirSync(OUT).filter(f => f.endsWith(".html")).join(", "));
