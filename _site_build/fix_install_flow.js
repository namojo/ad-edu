// Keep the marketplace-install block only in C1; in C2..C7 replace it with a
// back-reference to C1 so install is explained once, early in the curriculum.
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const LATER = [
  "course2-research/교재/C2_교재.md",
  "course3-creative/교재/C3_교재.md",
  "course4-media/교재/C4_교재.md",
  "course5-content/교재/C5_교재.md",
  "course6-automation/교재/C6_교재.md",
  "course7-video/교재/C7_교재.md",
];

const START = "**① harness 플러그인 준비";
const END = "**② 이 하네스를 만드는 구성 프롬프트 — 그대로 입력하세요**";
const REPLACEMENT =
  "> harness 플러그인은 **C1(하네스 첫걸음)** 에서 이미 설치했다고 가정합니다. 아직이라면 C1의 설치 안내를 먼저 따르세요(보통 관리자가 미리 설치해 둡니다).\n\n**이 하네스를 만드는 구성 프롬프트 — 그대로 입력하세요**";

let changed = 0;
for (const rel of LATER) {
  const p = path.join(ROOT, rel);
  let md = fs.readFileSync(p, "utf-8");
  const s = md.indexOf(START);
  const e = md.indexOf(END);
  if (s < 0 || e < 0 || e < s) { console.log("!! markers not found:", rel); continue; }
  md = md.slice(0, s) + REPLACEMENT + md.slice(e + END.length);
  // drop the ③ numbering on the "무엇이 만들어지나요" header
  md = md.replace("**③ 무엇이 만들어지나요**", "**무엇이 만들어지나요**");
  fs.writeFileSync(p, md);
  changed++; console.log("updated →", rel);
}

// C1: relabel install block to signal it is a one-time, early step
const c1p = path.join(ROOT, "course1-basics/교재/C1_교재.md");
let c1 = fs.readFileSync(c1p, "utf-8");
c1 = c1.replace(
  "**① harness 플러그인 준비 (최초 1회, 보통 관리자가 미리 설치)**",
  "**① harness 플러그인 설치 (이 과정에서 한 번만 · 보통 관리자가 미리 설치)**"
);
fs.writeFileSync(c1p, c1);
console.log("relabeled C1 install header");
console.log("done, changed:", changed);
