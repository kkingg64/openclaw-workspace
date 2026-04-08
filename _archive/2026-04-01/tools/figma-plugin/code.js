// ============================================================
// MADHORSE Design System Generator — Figma Plugin
// Version: 3.1.0 | 2026-03-29
console.log("🐴 MADHORSE Plugin VERSION: 3.1.0 — setCurrentPageAsync at TOP fix");
// Colour foundation: shadcn/ui Zinc Dark (industry standard)
// Brand layer: MADHORSE custom tokens
// ============================================================

const TOKENS = {
  colors: {
    // ── shadcn/ui Zinc Dark — 業界標準語義色 ──────────────
    // Source: shadcn/ui official zinc dark theme (used by 50k+ projects)
    "shadcn/Background":        { hex: "09090B", desc: "頁面背景 (zinc-950)" },
    "shadcn/Foreground":        { hex: "FAFAFA", desc: "主文字 (zinc-50)" },
    "shadcn/Card":              { hex: "09090B", desc: "卡片背景" },
    "shadcn/Card-Foreground":   { hex: "FAFAFA", desc: "卡片文字" },
    "shadcn/Primary":           { hex: "FAFAFA", desc: "主要按鈕背景" },
    "shadcn/Primary-FG":        { hex: "18181B", desc: "主要按鈕文字" },
    "shadcn/Secondary":         { hex: "27272A", desc: "次要元素背景 (zinc-800)" },
    "shadcn/Secondary-FG":      { hex: "FAFAFA", desc: "次要元素文字" },
    "shadcn/Muted":             { hex: "27272A", desc: "靜音背景 (zinc-800)" },
    "shadcn/Muted-FG":          { hex: "A1A1AA", desc: "靜音文字 (zinc-400)" },
    "shadcn/Accent":            { hex: "27272A", desc: "強調背景" },
    "shadcn/Border":            { hex: "27272A", desc: "邊框顏色" },
    "shadcn/Destructive":       { hex: "7F1D1D", desc: "危險/刪除" },
    // ── Tailwind Zinc Scale — 完整灰階 ────────────────────
    "zinc/50":   { hex: "FAFAFA", desc: "最淺" },
    "zinc/100":  { hex: "F4F4F5", desc: "" },
    "zinc/200":  { hex: "E4E4E7", desc: "" },
    "zinc/300":  { hex: "D4D4D8", desc: "" },
    "zinc/400":  { hex: "A1A1AA", desc: "Muted text" },
    "zinc/500":  { hex: "71717A", desc: "" },
    "zinc/600":  { hex: "52525B", desc: "" },
    "zinc/700":  { hex: "3F3F46", desc: "" },
    "zinc/800":  { hex: "27272A", desc: "Secondary / Border" },
    "zinc/900":  { hex: "18181B", desc: "" },
    "zinc/950":  { hex: "09090B", desc: "Background" },
    // ── MADHORSE Brand — 覆蓋層 ───────────────────────────
    "brand/Primary":       { hex: "1A1A2E", desc: "MADHORSE 主色" },
    "brand/Accent":        { hex: "E94560", desc: "MADHORSE 強調紅" },
    "brand/Surface":       { hex: "16213E", desc: "MADHORSE 卡片背景" },
    "brand/DeepBg":        { hex: "0F3460", desc: "MADHORSE 深背景" },
    // ── Status ────────────────────────────────────────────
    "status/Success": { hex: "00B894", desc: "成功" },
    "status/Error":   { hex: "FF6B6B", desc: "錯誤" },
    "status/Warning": { hex: "FDCB6E", desc: "警告" },
    "status/Info":    { hex: "74B9FF", desc: "資訊" },
    // ── 3D / Neon ─────────────────────────────────────────
    "neon/Blue":   { hex: "00D9FF", desc: "霓虹藍 — 3D 科技" },
    "neon/Orange": { hex: "FF6B35", desc: "霓虹橙 — 3D 攻擊" },
    "neon/Green":  { hex: "39FF14", desc: "霓虹綠 — 3D 回血" },
    "neon/Gold":   { hex: "FFD700", desc: "金色 — 3D 勝利" },
    "neon/Purple": { hex: "BF00FF", desc: "霓虹紫 — 3D 魔法" },
    "3d/SceneBG":  { hex: "0A0A0F", desc: "3D 場景極深背景" },
  },
  typography: [
    { name: "H1 — Display",    size: 48, style: "Bold",      usage: "Hero 標題" },
    { name: "H2 — Heading",    size: 36, style: "Bold",      usage: "頁面大標題" },
    { name: "H3 — SubHeading", size: 24, style: "Semi Bold", usage: "區塊標題" },
    { name: "Body — Base",     size: 16, style: "Regular",   usage: "一般文字" },
    { name: "Caption",         size: 12, style: "Regular",   usage: "標籤/時間戳" },
  ],
  spacing: [4, 8, 12, 16, 24, 32, 48, 64],
  radii: [
    { name: "SM",    value: 4,   usage: "Input" },
    { name: "Base",  value: 8,   usage: "Button" },
    { name: "Card",  value: 12,  usage: "Card" },
    { name: "Modal", value: 16,  usage: "Modal" },
    { name: "Pill",  value: 999, usage: "Badge" },
  ],
};

function hexToRgb(hex) {
  const n = parseInt(hex, 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

function txt(parent, chars, x, y, size, style, color) {
  const t = figma.createText();
  t.x = x; t.y = y;
  t.characters = String(chars);
  t.fontSize = size;
  t.fontName = { family: "Inter", style: style || "Regular" };
  t.fills = [{ type: "SOLID", color: color || { r: 1, g: 1, b: 1 } }];
  parent.appendChild(t);
  return t;
}

function sectionTitle(parent, label, x, y) {
  // Accent bar
  const bar = figma.createFrame();
  bar.resize(4, 32); bar.x = x; bar.y = y;
  bar.fills = [{ type: "SOLID", color: hexToRgb("E94560") }];
  parent.appendChild(bar);
  txt(parent, label, x + 16, y + 4, 22, "Bold", { r: 1, g: 1, b: 1 });
}

(async () => {
  figma.notify("⏳ [1/5] Loading fonts...");
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

  const page = figma.root.children[0];
  await figma.setCurrentPageAsync(page);
  page.name = "🐴 MADHORSE Design System";

  // Master frame — full design system
  const CANVAS_W = 1440;
  let Y = 0; // running Y cursor

  const BG = figma.createFrame();
  BG.name = "MADHORSE Design System v1.0";
  BG.resize(CANVAS_W, 100); // will grow
  BG.x = 0; BG.y = 0;
  BG.fills = [{ type: "SOLID", color: hexToRgb("1A1A2E") }];
  page.appendChild(BG);

  // ── HEADER ──────────────────────────────────────────────
  const header = figma.createFrame();
  header.resize(CANVAS_W, 80);
  header.x = 0; header.y = 0;
  header.fills = [{ type: "SOLID", color: hexToRgb("0F3460") }];
  BG.appendChild(header);
  txt(header, "🐴  MADHORSE Design System  v1.0", 48, 24, 28, "Bold");
  txt(header, "2026 — Web + 3D Edition", CANVAS_W - 260, 32, 14, "Regular", hexToRgb("A8A8B3"));
  Y = 100;

  // ── SECTION 1: COLOURS ──────────────────────────────────
  figma.notify("🎨 [2/5] Building Colours...");
  sectionTitle(BG, "Colour System", 48, Y);
  Y += 52;

  const entries = Object.entries(TOKENS.colors);
  const SW = 140, SH = 80, GAP = 16, COLS = 8;
  entries.forEach(([name, { hex, desc }], i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = 48 + col * (SW + GAP);
    const y = Y + row * (SH + 52);

    const sw = figma.createFrame();
    sw.resize(SW, SH); sw.x = x; sw.y = y;
    sw.name = "Color/" + name;
    sw.cornerRadius = 8;
    sw.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
    BG.appendChild(sw);

    txt(BG, name,        x, y + SH + 4,  11, "Semi Bold", { r: 1, g: 1, b: 1 });
    txt(BG, "#" + hex,   x, y + SH + 18, 10, "Regular",   hexToRgb("A8A8B3"));
    txt(BG, desc,        x, y + SH + 30, 10, "Regular",   hexToRgb("A8A8B3"));
  });
  const colourRows = Math.ceil(entries.length / COLS);
  Y += colourRows * (SH + 52) + 48;

  // ── SECTION 2: TYPOGRAPHY ───────────────────────────────
  figma.notify("✏️ [3/5] Building Typography...");
  sectionTitle(BG, "Typography", 48, Y);
  Y += 52;

  for (const { name, size, style, usage } of TOKENS.typography) {
    txt(BG, name, 48, Y, Math.min(size, 40), style, { r: 1, g: 1, b: 1 });
    txt(BG, size + "px · " + style + " · " + usage, 48, Y + Math.min(size, 40) + 4, 11, "Regular", hexToRgb("A8A8B3"));

    const line = figma.createLine();
    line.x = 48; line.y = Y + Math.min(size, 40) + 20;
    line.resize(CANVAS_W - 96, 0);
    line.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.06 }];
    BG.appendChild(line);

    Y += Math.min(size, 40) + 36;
  }
  Y += 32;

  // ── SECTION 3: SPACING & RADIUS ─────────────────────────
  figma.notify("📐 [4/5] Building Spacing & Components...");
  sectionTitle(BG, "Spacing  ·  Border Radius", 48, Y);
  Y += 52;

  // Spacing bars
  let xOff = 48;
  TOKENS.spacing.forEach(sp => {
    const bar = figma.createFrame();
    bar.resize(sp, sp); bar.x = xOff; bar.y = Y;
    bar.fills = [{ type: "SOLID", color: hexToRgb("E94560") }];
    bar.name = sp + "px";
    BG.appendChild(bar);
    txt(BG, sp + "px", xOff, Y + sp + 4, 10, "Regular", hexToRgb("A8A8B3"));
    xOff += sp + 20;
  });
  Y += 80;

  // Radius pills
  xOff = 48;
  TOKENS.radii.forEach(({ name, value, usage }) => {
    const box = figma.createFrame();
    box.resize(110, 56); box.x = xOff; box.y = Y;
    box.cornerRadius = Math.min(value, 28);
    box.fills = [{ type: "SOLID", color: hexToRgb("16213E") }];
    box.strokes = [{ type: "SOLID", color: hexToRgb("E94560") }];
    box.strokeWeight = 2;
    box.name = "Radius/" + name;
    BG.appendChild(box);
    txt(BG, name,  xOff, Y + 60, 12, "Semi Bold", { r: 1, g: 1, b: 1 });
    txt(BG, value === 999 ? "pill" : value + "px", xOff, Y + 74, 10, "Regular", hexToRgb("A8A8B3"));
    txt(BG, usage, xOff, Y + 86, 10, "Regular", hexToRgb("A8A8B3"));
    xOff += 130;
  });
  Y += 120;

  // ── SECTION 4: COMPONENTS ───────────────────────────────
  sectionTitle(BG, "Components", 48, Y);
  Y += 52;

  // Buttons row
  txt(BG, "BUTTONS", 48, Y, 12, "Semi Bold", hexToRgb("E94560"));
  Y += 20;
  const btns = [
    { label: "Primary",   bg: "E94560", fg: "FFFFFF" },
    { label: "Secondary", bg: "16213E", fg: "FFFFFF", border: "E94560" },
    { label: "Ghost",     bg: "00000000", fg: "E94560", border: "E94560" },
    { label: "Success",   bg: "00B894", fg: "FFFFFF" },
    { label: "Error",     bg: "FF6B6B", fg: "FFFFFF" },
    { label: "Disabled",  bg: "A8A8B3", fg: "1A1A2E" },
  ];
  xOff = 48;
  btns.forEach(({ label, bg, fg, border }) => {
    const btn = figma.createFrame();
    btn.resize(150, 44); btn.x = xOff; btn.y = Y;
    btn.cornerRadius = 8; btn.name = "Button/" + label;
    btn.fills = bg === "00000000"
      ? [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 0 }]
      : [{ type: "SOLID", color: hexToRgb(bg) }];
    if (border) { btn.strokes = [{ type: "SOLID", color: hexToRgb(border) }]; btn.strokeWeight = 2; }
    BG.appendChild(btn);
    txt(BG, label, xOff + 12, Y + 14, 13, "Semi Bold", hexToRgb(fg));
    xOff += 170;
  });
  Y += 64;

  // Badges row
  txt(BG, "BADGES", 48, Y, 12, "Semi Bold", hexToRgb("E94560"));
  Y += 20;
  const badges = [
    { label: "New",     bg: "E94560", fg: "FFFFFF" },
    { label: "Success", bg: "00B894", fg: "FFFFFF" },
    { label: "Warning", bg: "FDCB6E", fg: "1A1A2E" },
    { label: "Error",   bg: "FF6B6B", fg: "FFFFFF" },
    { label: "Info",    bg: "74B9FF", fg: "1A1A2E" },
  ];
  xOff = 48;
  badges.forEach(({ label, bg, fg }) => {
    const badge = figma.createFrame();
    badge.resize(80, 28); badge.x = xOff; badge.y = Y;
    badge.cornerRadius = 999; badge.name = "Badge/" + label;
    badge.fills = [{ type: "SOLID", color: hexToRgb(bg) }];
    BG.appendChild(badge);
    txt(BG, label, xOff + 10, Y + 8, 12, "Semi Bold", hexToRgb(fg));
    xOff += 96;
  });
  Y += 52;

  // Cards row
  txt(BG, "CARDS", 48, Y, 12, "Semi Bold", hexToRgb("E94560"));
  Y += 20;

  const card1 = figma.createFrame();
  card1.resize(300, 140); card1.x = 48; card1.y = Y;
  card1.cornerRadius = 12; card1.name = "Card/Default";
  card1.fills = [{ type: "SOLID", color: hexToRgb("16213E") }];
  BG.appendChild(card1);
  txt(BG, "Default Card",         72, Y + 20, 16, "Semi Bold");
  txt(BG, "Card body text here.", 72, Y + 44, 13, "Regular", hexToRgb("A8A8B3"));

  const card2 = figma.createFrame();
  card2.resize(300, 140); card2.x = 372; card2.y = Y;
  card2.cornerRadius = 12; card2.name = "Card/Accent";
  card2.fills = [{ type: "SOLID", color: hexToRgb("16213E") }];
  card2.strokes = [{ type: "SOLID", color: hexToRgb("E94560") }];
  card2.strokeWeight = 1;
  BG.appendChild(card2);
  txt(BG, "Accent Card",          396, Y + 20, 16, "Semi Bold", hexToRgb("E94560"));
  txt(BG, "Featured / highlight", 396, Y + 44, 13, "Regular",   hexToRgb("A8A8B3"));

  // Input
  const inp = figma.createFrame();
  inp.resize(300, 48); inp.x = 720; inp.y = Y + 46;
  inp.cornerRadius = 8; inp.name = "Input/Default";
  inp.fills = [{ type: "SOLID", color: hexToRgb("16213E") }];
  inp.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.1 }];
  inp.strokeWeight = 1;
  BG.appendChild(inp);
  txt(BG, "Placeholder text...", 736, Y + 60, 13, "Regular", hexToRgb("A8A8B3"));
  txt(BG, "INPUT", 720, Y + 28, 12, "Semi Bold", hexToRgb("E94560"));

  Y += 180;

  // ── SECTION 5: 3D SPEC ──────────────────────────────────
  figma.notify("🎮 [5/5] Building 3D Spec...");
  sectionTitle(BG, "3D Design Spec  (AI Arena Type)", 48, Y);
  Y += 52;

  // Dark 3D bg zone
  const zone3d = figma.createFrame();
  zone3d.resize(CANVAS_W - 96, 320);
  zone3d.x = 48; zone3d.y = Y;
  zone3d.cornerRadius = 12;
  zone3d.fills = [{ type: "SOLID", color: hexToRgb("0A0A0F") }];
  zone3d.strokes = [{ type: "SOLID", color: hexToRgb("00D9FF") }];
  zone3d.strokeWeight = 1;
  BG.appendChild(zone3d);

  // Left: neon swatches
  txt(BG, "NEON PALETTE", 72, Y + 20, 12, "Semi Bold", hexToRgb("00D9FF"));
  const neons = [
    { name: "Neon Blue",   hex: "00D9FF" },
    { name: "Neon Orange", hex: "FF6B35" },
    { name: "Neon Green",  hex: "39FF14" },
    { name: "Gold",        hex: "FFD700" },
    { name: "Neon Purple", hex: "BF00FF" },
    { name: "BG",          hex: "0A0A0F" },
  ];
  neons.forEach(({ name, hex }, i) => {
    const sw = figma.createFrame();
    sw.resize(100, 60); sw.x = 72 + i * 116; sw.y = Y + 42;
    sw.cornerRadius = 8; sw.name = "3D/Color/" + name;
    sw.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
    if (hex === "0A0A0F") {
      sw.strokes = [{ type: "SOLID", color: hexToRgb("00D9FF") }];
      sw.strokeWeight = 1;
    }
    BG.appendChild(sw);
    txt(BG, name,        72 + i * 116, Y + 108, 11, "Semi Bold", { r: 1, g: 1, b: 1 });
    txt(BG, "#" + hex,   72 + i * 116, Y + 122, 10, "Regular",   hexToRgb("A8A8B3"));
  });

  // Right: spec table
  const specs = [
    ["Camera FOV",      "60°"],
    ["Camera Pos",      "(0, 5, 10)"],
    ["Scene Size",      "20×20 units"],
    ["Ambient Light",   "#1A0533  intensity: 0.4"],
    ["Directional",     "#00D9FF  intensity: 1.2"],
    ["Point Ground",    "#FF6B35  intensity: 0.6"],
    ["Move anim",       "0.3s easeOut"],
    ["Attack anim",     "0.15s linear"],
    ["Victory anim",    "2.0s easeInOut"],
    ["Font (3D HUD)",   "Orbitron Bold"],
    ["Font (UI)",       "Inter Regular"],
  ];
  txt(BG, "SCENE SPECIFICATIONS", 760, Y + 20, 12, "Semi Bold", hexToRgb("00D9FF"));
  specs.forEach(([key, val], i) => {
    const sy = Y + 42 + i * 24;
    txt(BG, key, 760, sy, 12, "Regular", hexToRgb("A8A8B3"));
    txt(BG, val, 920, sy, 12, "Semi Bold", { r: 1, g: 1, b: 1 });
  });

  Y += 360;

  // ── RESIZE MASTER FRAME ─────────────────────────────────
  BG.resize(CANVAS_W, Y + 48);

  figma.viewport.scrollAndZoomIntoView([BG]);
  figma.notify("✅ Done! MADHORSE Design System — 1 page, all sections.", { timeout: 8000 });
  figma.closePlugin();
})();

