const http = require('http');
let sessionId = null;

function mcpCall(method, params) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({jsonrpc: "2.0", id: Date.now(), method, params});
    const headers = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"};
    if (sessionId) headers["mcp-session-id"] = sessionId;
    const req = http.request("http://76.13.215.13:4401/mcp", {method: "POST", headers}, res => {
      if (res.headers["mcp-session-id"]) sessionId = res.headers["mcp-session-id"];
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function makeTextSvg(text, width, height, fontSize, fontWeight, fill, x, y) {
  const attrs = `font-family="Inter, sans-serif" font-size="${fontSize}" font-weight="${fontWeight || 400}" fill="${fill}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><text x="${x || 0}" y="${y || fontSize}" ${attrs}>${text}</text></svg>`;
}

async function init() {
  await mcpCall("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: {name: "cdo", version: "1"}
  });
  await mcpCall("notifications/initialized", {});
  console.log("Session:", sessionId);
}

async function createDesktop() {
  console.log("Creating Desktop Dashboard (1920x1080)...");

  const code = `
(function() {
  var colors = {
    primary: "#1A1A2E",
    accent: "#E94560",
    surface: "#16213E",
    bg: "#0F3460",
    text: "#FFFFFF",
    muted: "#A8A8B3",
    success: "#00B894",
  };

  // === DESKTOP BOARD ===
  var desktop = penpot.createBoard();
  desktop.name = "Dashboard - shadcn/ui (Desktop)";
  desktop.resize(1920, 1080);
  desktop.fills = [{fillColor: colors.bg, fillOpacity: 1}];

  // === SIDEBAR (240px) ===
  var sidebar = penpot.createRectangle();
  sidebar.name = "Sidebar";
  sidebar.resize(240, 1080);
  sidebar.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  // Logo
  var logoSvg = makeTextSvg("MADHORSE", 208, 32, 20, 700, colors.text, 0, 24);
  var logo = penpot.createShapeFromSvg(logoSvg);
  logo.name = "Logo";
  logo.x = 16;
  logo.y = 24;

  // Nav Items
  var navData = [
    {icon: "◈", label: "Dashboard", active: true},
    {icon: "◇", label: "Projects", active: false},
    {icon: "○", label: "Analytics", active: false},
    {icon: "△", label: "Messages", active: false},
    {icon: "□", label: "Settings", active: false},
  ];

  for (var i = 0; i < navData.length; i++) {
    var item = navData[i];
    var y = 80 + i * 56;
    var iconColor = item.active ? colors.accent : colors.muted;
    var textColor = item.active ? colors.text : colors.muted;
    var fontWeight = item.active ? 600 : 400;

    if (item.active) {
      var border = penpot.createRectangle();
      border.name = "ActiveBorder";
      border.resize(3, 48);
      border.y = y;
      border.fills = [{fillColor: colors.accent, fillOpacity: 1}];
    }

    var iconSvg = makeTextSvg(item.icon, 24, 20, 16, 400, iconColor, 0, 16);
    var icon = penpot.createShapeFromSvg(iconSvg);
    icon.name = "NavIcon";
    icon.x = 16;
    icon.y = y + 14;

    var labelSvg = makeTextSvg(item.label, 176, 20, 14, fontWeight, textColor, 0, 15);
    var label = penpot.createShapeFromSvg(labelSvg);
    label.name = "NavLabel";
    label.x = 48;
    label.y = y + 14;
  }

  // === HEADER ===
  var header = penpot.createRectangle();
  header.name = "Header";
  header.resize(1680, 64);
  header.x = 240;
  header.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  var headerBorder = penpot.createRectangle();
  headerBorder.name = "HeaderBorder";
  headerBorder.resize(1680, 1);
  headerBorder.x = 240;
  headerBorder.y = 63;
  headerBorder.fills = [{fillColor: colors.primary, fillOpacity: 0.3}];

  var searchBox = penpot.createRectangle();
  searchBox.name = "SearchBox";
  searchBox.resize(320, 36);
  searchBox.x = 264;
  searchBox.y = 14;
  searchBox.fills = [{fillColor: colors.primary, fillOpacity: 0.5}];
  searchBox.borderRadius = 8;

  var searchSvg = makeTextSvg("Search...", 288, 20, 14, 400, colors.muted, 0, 15);
  var search = penpot.createShapeFromSvg(searchSvg);
  search.name = "SearchPlaceholder";
  search.x = 280;
  search.y = 22;

  var avatar = penpot.createEllipse();
  avatar.name = "UserAvatar";
  avatar.resize(36, 36);
  avatar.x = 1844;
  avatar.y = 14;
  avatar.fills = [{fillColor: colors.accent, fillOpacity: 1}];

  // === PAGE TITLE ===
  var titleSvg = makeTextSvg("Dashboard", 400, 40, 32, 700, colors.text, 0, 32);
  var pageTitle = penpot.createShapeFromSvg(titleSvg);
  pageTitle.name = "PageTitle";
  pageTitle.x = 280;
  pageTitle.y = 88;

  // === STAT CARDS ===
  var statData = [
    {title: "Total Projects", value: "24", change: "+12%", positive: true},
    {title: "Active Tasks", value: "156", change: "+8%", positive: true},
    {title: "Team Members", value: "12", change: "0%", positive: false},
    {title: "Revenue", value: "$48.5K", change: "-3%", positive: false},
  ];

  for (var i = 0; i < statData.length; i++) {
    var stat = statData[i];
    var x = 280 + i * 312;
    var card = penpot.createRectangle();
    card.name = "StatCard";
    card.resize(288, 120);
    card.x = x;
    card.y = 144;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    var titleSvgEl = makeTextSvg(stat.title, 256, 20, 14, 400, colors.muted, 0, 15);
    var title = penpot.createShapeFromSvg(titleSvgEl);
    title.name = "StatTitle";
    title.x = x + 16;
    title.y = 160;

    var valueSvg = makeTextSvg(stat.value, 200, 40, 32, 700, colors.text, 0, 32);
    var value = penpot.createShapeFromSvg(valueSvg);
    value.name = "StatValue";
    value.x = x + 16;
    value.y = 188;

    var changeColor = stat.positive ? colors.success : colors.accent;
    var changeSvg = makeTextSvg(stat.change, 100, 20, 14, 400, changeColor, 0, 15);
    var change = penpot.createShapeFromSvg(changeSvg);
    change.name = "StatChange";
    change.x = x + 16;
    change.y = 236;
  }

  // === PROJECT CARDS ===
  var projTitleSvg = makeTextSvg("Recent Projects", 400, 32, 24, 600, colors.text, 0, 24);
  var projTitle = penpot.createShapeFromSvg(projTitleSvg);
  projTitle.name = "ProjectsTitle";
  projTitle.x = 280;
  projTitle.y = 296;

  var projects = [
    {name: "Meal Planner v2", progress: 72, status: "In Progress", due: "Apr 15"},
    {name: "Mahjong Arena", progress: 45, status: "Review", due: "Apr 20"},
    {name: "Trading Bot", progress: 88, status: "Testing", due: "Apr 10"},
    {name: "Design System", progress: 95, status: "Almost Done", due: "Apr 5"},
  ];

  for (var i = 0; i < projects.length; i++) {
    var proj = projects[i];
    var x = 280 + i * 312;

    var card = penpot.createRectangle();
    card.name = "ProjectCard";
    card.resize(288, 200);
    card.x = x;
    card.y = 344;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    var nameSvg = makeTextSvg(proj.name, 256, 24, 18, 600, colors.text, 0, 18);
    var name = penpot.createShapeFromSvg(nameSvg);
    name.name = "ProjectName";
    name.x = x + 16;
    name.y = 360;

    var badgeBg = penpot.createRectangle();
    badgeBg.name = "BadgeBg";
    badgeBg.resize(88, 24);
    badgeBg.x = x + 16;
    badgeBg.y = 396;
    badgeBg.fills = [{fillColor: colors.accent, fillOpacity: 0.2}];
    badgeBg.borderRadius = 999;

    var badgeSvg = makeTextSvg(proj.status, 72, 16, 12, 400, colors.accent, 0, 12);
    var badge = penpot.createShapeFromSvg(badgeSvg);
    badge.name = "Badge";
    badge.x = x + 24;
    badge.y = 400;

    var progressBg = penpot.createRectangle();
    progressBg.name = "ProgressBg";
    progressBg.resize(256, 8);
    progressBg.x = x + 16;
    progressBg.y = 448;
    progressBg.fills = [{fillColor: colors.primary, fillOpacity: 1}];
    progressBg.borderRadius = 4;

    var progressFill = penpot.createRectangle();
    progressFill.name = "ProgressFill";
    progressFill.resize(Math.floor(256 * proj.progress / 100), 8);
    progressFill.x = x + 16;
    progressFill.y = 448;
    progressFill.fills = [{fillColor: colors.accent, fillOpacity: 1}];
    progressFill.borderRadius = 4;

    var pctSvg = makeTextSvg(proj.progress + "%", 256, 16, 12, 400, colors.muted, 0, 12);
    var pct = penpot.createShapeFromSvg(pctSvg);
    pct.name = "ProgressText";
    pct.x = x + 16;
    pct.y = 464;

    var dueSvg = makeTextSvg("Due: " + proj.due, 256, 16, 12, 400, colors.muted, 0, 12);
    var due = penpot.createShapeFromSvg(dueSvg);
    due.name = "DueDate";
    due.x = x + 16;
    due.y = 512;
  }

  // === BUTTONS ===
  var btnTitleSvg = makeTextSvg("Button Variants (shadcn/ui)", 400, 32, 24, 600, colors.text, 0, 24);
  var btnTitle = penpot.createShapeFromSvg(btnTitleSvg);
  btnTitle.name = "ButtonsTitle";
  btnTitle.x = 280;
  btnTitle.y = 576;

  var btnData = [
    {label: "Default", bg: colors.accent, text: "#FFFFFF", outline: false},
    {label: "Destructive", bg: "#FF6B6B", text: "#FFFFFF", outline: false},
    {label: "Outline", bg: "transparent", text: colors.muted, outline: true},
    {label: "Ghost", bg: "transparent", text: colors.muted, outline: false},
  ];

  for (var i = 0; i < btnData.length; i++) {
    var btn = btnData[i];
    var x = 280 + i * 140;
    var btnRect = penpot.createRectangle();
    btnRect.name = "Button";
    btnRect.resize(120, 40);
    btnRect.x = x;
    btnRect.y = 624;
    if (btn.outline) {
      btnRect.fills = [{fillColor: "transparent", fillOpacity: 1}];
      btnRect.strokes = [{strokeColor: btn.text, strokeOpacity: 1, strokeWidth: 1}];
    } else {
      btnRect.fills = [{fillColor: btn.bg, fillOpacity: 1}];
    }
    btnRect.borderRadius = 8;

    var btnTextSvg = makeTextSvg(btn.label, 72, 20, 14, 500, btn.text, 0, 15);
    var btnText = penpot.createShapeFromSvg(btnTextSvg);
    btnText.name = "ButtonText";
    btnText.x = x + 24;
    btnText.y = 634;
  }

  return "Desktop Dashboard v1 complete!";
})();
`;

  const res = await mcpCall("tools/call", {name: "execute_code", arguments: {code}});
  return res;
}

async function createDesktopPart2() {
  console.log("Creating Desktop Part 2 (Badges + Table)...");

  const code = `
(function() {
  var colors = {
    primary: "#1A1A2E",
    accent: "#E94560",
    surface: "#16213E",
    bg: "#0F3460",
    text: "#FFFFFF",
    muted: "#A8A8B3",
    success: "#00B894",
  };

  // === BADGES ===
  var badgeTitleSvg = makeTextSvg("Badges (pill style)", 400, 32, 24, 600, colors.text, 0, 24);
  var badgeTitle = penpot.createShapeFromSvg(badgeTitleSvg);
  badgeTitle.name = "BadgesTitle";
  badgeTitle.x = 280;
  badgeTitle.y = 696;

  var badges = [
    {label: "Success", bg: "#00B894", dark: false},
    {label: "Warning", bg: "#FDCB6E", dark: true},
    {label: "Error", bg: "#FF6B6B", dark: false},
    {label: "Info", bg: "#74B9FF", dark: true},
    {label: "Default", bg: "#A8A8B3", dark: false},
  ];

  for (var i = 0; i < badges.length; i++) {
    var badge = badges[i];
    var x = 280 + i * 96;
    var textColor = badge.dark ? "#1A1A2E" : "#FFFFFF";

    var badgeBg = penpot.createRectangle();
    badgeBg.name = "Badge";
    badgeBg.resize(80, 24);
    badgeBg.x = x;
    badgeBg.y = 744;
    badgeBg.fills = [{fillColor: badge.bg, fillOpacity: 1}];
    badgeBg.borderRadius = 999;

    var badgeSvg = makeTextSvg(badge.label, 56, 16, 12, 400, textColor, 0, 12);
    var badgeText = penpot.createShapeFromSvg(badgeSvg);
    badgeText.name = "BadgeText";
    badgeText.x = x + 12;
    badgeText.y = 748;
  }

  // === TABLE ===
  var tableTitleSvg = makeTextSvg("Table Component", 400, 32, 24, 600, colors.text, 0, 24);
  var tableTitle = penpot.createShapeFromSvg(tableTitleSvg);
  tableTitle.name = "TableTitle";
  tableTitle.x = 280;
  tableTitle.y = 800;

  var tableContainer = penpot.createRectangle();
  tableContainer.name = "TableContainer";
  tableContainer.resize(1000, 200);
  tableContainer.x = 280;
  tableContainer.y = 848;
  tableContainer.fills = [{fillColor: colors.surface, fillOpacity: 1}];
  tableContainer.borderRadius = 12;
  tableContainer.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

  var tableHeaders = ["Project", "Status", "Progress", "Due Date"];
  var colWidths = [280, 200, 280, 240];
  var colX = 280;

  for (var i = 0; i < tableHeaders.length; i++) {
    var hSvg = makeTextSvg(tableHeaders[i], colWidths[i] - 32, 24, 14, 600, colors.muted, 0, 14);
    var h = penpot.createShapeFromSvg(hSvg);
    h.name = "TableHeader";
    h.x = colX + 16;
    h.y = 864;
    colX += colWidths[i];
  }

  var tableSep = penpot.createRectangle();
  tableSep.name = "TableSep";
  tableSep.resize(968, 1);
  tableSep.x = 280;
  tableSep.y = 896;
  tableSep.fills = [{fillColor: colors.primary, fillOpacity: 0.3}];

  var tableRows = [
    ["Meal Planner v2", "In Progress", "72%", "Apr 15, 2026"],
    ["Mahjong Arena", "Review", "45%", "Apr 20, 2026"],
    ["Trading Bot", "Testing", "88%", "Apr 10, 2026"],
  ];

  for (var rowIdx = 0; rowIdx < tableRows.length; rowIdx++) {
    var row = tableRows[rowIdx];
    var rowY = 912 + rowIdx * 44;
    colX = 280;
    for (var colIdx = 0; colIdx < row.length; colIdx++) {
      var cellSvg = makeTextSvg(row[colIdx], colWidths[colIdx] - 32, 24, 14, 400, colors.text, 0, 14);
      var cell = penpot.createShapeFromSvg(cellSvg);
      cell.name = "TableCell";
      cell.x = colX + 16;
      cell.y = rowY;
      colX += colWidths[colIdx];
    }
  }

  return "Desktop Dashboard COMPLETE!";
})();
`;

  const res = await mcpCall("tools/call", {name: "execute_code", arguments: {code}});
  return res;
}

async function createMobile() {
  console.log("Creating Mobile Dashboard (375x812)...");

  const code = `
(function() {
  var colors = {
    primary: "#1A1A2E",
    accent: "#E94560",
    surface: "#16213E",
    bg: "#0F3460",
    text: "#FFFFFF",
    muted: "#A8A8B3",
    success: "#00B894",
  };

  // === MOBILE BOARD ===
  var mobile = penpot.createBoard();
  mobile.name = "Dashboard - shadcn/ui (Mobile)";
  mobile.resize(375, 812);
  mobile.fills = [{fillColor: colors.bg, fillOpacity: 1}];

  // === MOBILE HEADER ===
  var mobileHeader = penpot.createRectangle();
  mobileHeader.name = "MobileHeader";
  mobileHeader.resize(375, 64);
  mobileHeader.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  // Menu button (rectangle as placeholder)
  var menuBtn = penpot.createRectangle();
  menuBtn.name = "MenuButton";
  menuBtn.resize(44, 44);
  menuBtn.y = 10;
  menuBtn.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  var menuSvg = makeTextSvg("☰", 20, 20, 20, 400, colors.text, 0, 16);
  var menuIcon = penpot.createShapeFromSvg(menuSvg);
  menuIcon.name = "MenuIcon";
  menuIcon.x = 12;
  menuIcon.y = 22;

  var logoSvg = makeTextSvg("MADHORSE", 120, 20, 16, 700, colors.text, 0, 16);
  var mobileLogo = penpot.createShapeFromSvg(logoSvg);
  mobileLogo.name = "MobileLogo";
  mobileLogo.x = 52;
  mobileLogo.y = 22;

  var mobileAvatar = penpot.createEllipse();
  mobileAvatar.name = "MobileAvatar";
  mobileAvatar.resize(32, 32);
  mobileAvatar.x = 323;
  mobileAvatar.y = 16;
  mobileAvatar.fills = [{fillColor: colors.accent, fillOpacity: 1}];

  // === PAGE TITLE ===
  var mobileTitleSvg = makeTextSvg("Dashboard", 343, 36, 28, 700, colors.text, 0, 28);
  var mobileTitle = penpot.createShapeFromSvg(mobileTitleSvg);
  mobileTitle.name = "MobileTitle";
  mobileTitle.x = 16;
  mobileTitle.y = 80;

  // === MOBILE STAT CARDS ===
  var mobileStats = [
    {title: "Total Projects", value: "24", change: "+12%", positive: true},
    {title: "Active Tasks", value: "156", change: "+8%", positive: true},
  ];

  for (var i = 0; i < mobileStats.length; i++) {
    var stat = mobileStats[i];
    var y = 128 + i * 96;

    var card = penpot.createRectangle();
    card.name = "MobileStatCard";
    card.resize(343, 80);
    card.x = 16;
    card.y = y;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    var titleSvgEl = makeTextSvg(stat.title, 150, 16, 12, 400, colors.muted, 0, 12);
    var title = penpot.createShapeFromSvg(titleSvgEl);
    title.name = "MobileStatTitle";
    title.x = 28;
    title.y = y + 12;

    var valueSvg = makeTextSvg(stat.value, 150, 36, 28, 700, colors.text, 0, 28);
    var value = penpot.createShapeFromSvg(valueSvg);
    value.name = "MobileStatValue";
    value.x = 28;
    value.y = y + 32;

    var changeColor = stat.positive ? colors.success : colors.accent;
    var changeSvg = makeTextSvg(stat.change, 60, 20, 14, 400, changeColor, 0, 14);
    var change = penpot.createShapeFromSvg(changeSvg);
    change.name = "MobileStatChange";
    change.x = 280;
    change.y = y + 30;
  }

  // === PROJECTS SECTION ===
  var projTitleSvg = makeTextSvg("Recent Projects", 200, 28, 20, 600, colors.text, 0, 20);
  var projTitle = penpot.createShapeFromSvg(projTitleSvg);
  projTitle.name = "MobileProjectsTitle";
  projTitle.x = 16;
  projTitle.y = 332;

  var projects = [
    {name: "Meal Planner v2", progress: 72, status: "In Progress"},
    {name: "Mahjong Arena", progress: 45, status: "Review"},
    {name: "Trading Bot", progress: 88, status: "Testing"},
  ];

  for (var i = 0; i < projects.length; i++) {
    var proj = projects[i];
    var y = 372 + i * 112;

    var card = penpot.createRectangle();
    card.name = "MobileProjectCard";
    card.resize(343, 96);
    card.x = 16;
    card.y = y;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    var nameSvg = makeTextSvg(proj.name, 200, 22, 16, 600, colors.text, 0, 16);
    var name = penpot.createShapeFromSvg(nameSvg);
    name.name = "MobileProjectName";
    name.x = 28;
    name.y = y + 12;

    var badgeBg = penpot.createRectangle();
    badgeBg.name = "MobileBadgeBg";
    badgeBg.resize(80, 22);
    badgeBg.x = 28;
    badgeBg.y = y + 42;
    badgeBg.fills = [{fillColor: colors.accent, fillOpacity: 0.2}];
    badgeBg.borderRadius = 999;

    var badgeSvg = makeTextSvg(proj.status, 64, 16, 11, 400, colors.accent, 0, 11);
    var badge = penpot.createShapeFromSvg(badgeSvg);
    badge.name = "MobileBadge";
    badge.x = 36;
    badge.y = y + 45;

    var progressBg = penpot.createRectangle();
    progressBg.name = "MobileProgressBg";
    progressBg.resize(287, 6);
    progressBg.x = 28;
    progressBg.y = y + 74;
    progressBg.fills = [{fillColor: colors.primary, fillOpacity: 1}];
    progressBg.borderRadius = 3;

    var progressFill = penpot.createRectangle();
    progressFill.name = "MobileProgressFill";
    progressFill.resize(Math.floor(287 * proj.progress / 100), 6);
    progressFill.x = 28;
    progressFill.y = y + 74;
    progressFill.fills = [{fillColor: colors.accent, fillOpacity: 1}];
    progressFill.borderRadius = 3;
  }

  // === BOTTOM TAB BAR ===
  var tabBar = penpot.createRectangle();
  tabBar.name = "MobileTabBar";
  tabBar.resize(375, 64);
  tabBar.y = 748;
  tabBar.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  var tabs = [
    {icon: "◈", label: "Home", active: true},
    {icon: "◇", label: "Projects", active: false},
    {icon: "○", label: "Analytics", active: false},
    {icon: "□", label: "Settings", active: false},
  ];

  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    var x = 16 + i * 92;
    var tabColor = tab.active ? colors.accent : colors.muted;

    var tabIconSvg = makeTextSvg(tab.icon, 24, 24, 18, 400, tabColor, 0, 18);
    var tabIcon = penpot.createShapeFromSvg(tabIconSvg);
    tabIcon.name = "TabIcon";
    tabIcon.x = x + 28;
    tabIcon.y = 756;

    var tabLabelSvg = makeTextSvg(tab.label, 56, 14, 10, 400, tabColor, 0, 10);
    var tabLabel = penpot.createShapeFromSvg(tabLabelSvg);
    tabLabel.name = "TabLabel";
    tabLabel.x = x + 12;
    tabLabel.y = 782;
  }

  return "Mobile Dashboard COMPLETE!";
})();
`;

  const res = await mcpCall("tools/call", {name: "execute_code", arguments: {code}});
  return res;
}

async function main() {
  try {
    await init();
    
    let r = await createDesktop();
    console.log("Desktop Part 1:", r.substring(0, 300));
    
    r = await createDesktopPart2();
    console.log("Desktop Part 2:", r.substring(0, 300));
    
    r = await createMobile();
    console.log("Mobile:", r.substring(0, 300));
    
    console.log("\n✅ Dashboard Design Complete!");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
