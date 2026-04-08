const http = require('http');
const base = "http://76.13.215.13:4401/mcp";
let sessionId = null;

async function mcpCall(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({jsonrpc: "2.0", id: Date.now(), method, params});
    const headers = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"};
    if (sessionId) headers["mcp-session-id"] = sessionId;
    
    const req = http.request(base, {method: "POST", headers}, res => {
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

async function main() {
  // Initialize
  await mcpCall("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: {name: "cdo", version: "1"}
  });
  await mcpCall("notifications/initialized", {});
  console.log("Session:", sessionId);

  // Full Dashboard Design
  const code = `
  const colors = {
    primary: "#1A1A2E",
    accent: "#E94560",
    surface: "#16213E",
    bg: "#0F3460",
    text: "#FFFFFF",
    muted: "#A8A8B3",
    success: "#00B894",
    warning: "#FDCB6E",
  };

  // =====================
  // DESKTOP BOARD (1920x1080)
  // =====================
  const desktop = penpot.createBoard();
  desktop.name = "Dashboard - shadcn/ui Style (Desktop)";
  desktop.resize(1920, 1080);
  desktop.fills = [{fillColor: colors.bg, fillOpacity: 1}];

  // --- SIDEBAR (240px wide) ---
  const sidebar = penpot.createRectangle();
  sidebar.name = "Sidebar";
  sidebar.resize(240, 1080);
  sidebar.x = 0;
  sidebar.y = 0;
  sidebar.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  // Logo
  const logo = penpot.createText();
  logo.name = "Logo";
  logo.characters = "MADHORSE";
  logo.fontSize = 20;
  logo.fontWeight = 700;
  logo.fillColor = colors.text;
  logo.x = 16;
  logo.y = 24;
  logo.width = 208;
  logo.height = 32;

  // Nav Items
  const navItems = [
    {icon: "◈", label: "Dashboard", active: true},
    {icon: "◇", label: "Projects", active: false},
    {icon: "○", label: "Analytics", active: false},
    {icon: "△", label: "Messages", active: false},
    {icon: "□", label: "Settings", active: false},
  ];

  navItems.forEach((item, i) => {
    const y = 80 + i * 56;
    
    if (item.active) {
      // Accent left border
      const border = penpot.createRectangle();
      border.name = "ActiveBorder";
      border.resize(3, 48);
      border.x = 0;
      border.y = y;
      border.fills = [{fillColor: colors.accent, fillOpacity: 1}];
      
      // Nav background
      const navBg = penpot.createRectangle();
      navBg.name = "NavBg";
      navBg.resize(240, 48);
      navBg.x = 0;
      navBg.y = y;
      navBg.fills = [{fillColor: colors.primary, fillOpacity: 0.5}];
    }

    // Icon
    const navIcon = penpot.createText();
    navIcon.name = "NavIcon";
    navIcon.characters = item.icon;
    navIcon.fontSize = 16;
    navIcon.fillColor = item.active ? colors.accent : colors.muted;
    navIcon.x = 16;
    navIcon.y = y + 14;
    navIcon.width = 24;
    navIcon.height = 20;

    // Label
    const navLabel = penpot.createText();
    navLabel.name = "NavLabel";
    navLabel.characters = item.label;
    navLabel.fontSize = 14;
    navLabel.fontWeight = item.active ? 600 : 400;
    navLabel.fillColor = item.active ? colors.text : colors.muted;
    navLabel.x = 48;
    navLabel.y = y + 14;
    navLabel.width = 176;
    navLabel.height = 20;
  });

  // --- HEADER (64px height) ---
  const header = penpot.createRectangle();
  header.name = "Header";
  header.resize(1680, 64);
  header.x = 240;
  header.y = 0;
  header.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  // Header bottom border
  const headerBorder = penpot.createRectangle();
  headerBorder.name = "HeaderBorder";
  headerBorder.resize(1680, 1);
  headerBorder.x = 240;
  headerBorder.y = 63;
  headerBorder.fills = [{fillColor: colors.primary, fillOpacity: 0.3}];

  // Search box
  const searchBox = penpot.createRectangle();
  searchBox.name = "SearchBox";
  searchBox.resize(320, 36);
  searchBox.x = 264;
  searchBox.y = 14;
  searchBox.fills = [{fillColor: colors.primary, fillOpacity: 0.5}];
  searchBox.borderRadius = 8;

  const searchText = penpot.createText();
  searchText.name = "SearchPlaceholder";
  searchText.characters = "Search...";
  searchText.fontSize = 14;
  searchText.fillColor = colors.muted;
  searchText.x = 280;
  searchText.y = 22;
  searchText.width = 288;
  searchText.height = 20;

  // User avatar
  const avatar = penpot.createEllipse();
  avatar.name = "UserAvatar";
  avatar.resize(36, 36);
  avatar.x = 1844;
  avatar.y = 14;
  avatar.fills = [{fillColor: colors.accent, fillOpacity: 1}];

  const avatarInitial = penpot.createText();
  avatarInitial.name = "AvatarInitial";
  avatarInitial.characters = "K";
  avatarInitial.fontSize = 14;
  avatarInitial.fontWeight = 600;
  avatarInitial.fillColor = colors.text;
  avatarInitial.x = 1852;
  avatarInitial.y = 20;
  avatarInitial.width = 20;
  avatarInitial.height = 24;

  // --- PAGE TITLE ---
  const pageTitle = penpot.createText();
  pageTitle.name = "PageTitle";
  pageTitle.characters = "Dashboard";
  pageTitle.fontSize = 32;
  pageTitle.fontWeight = 700;
  pageTitle.fillColor = colors.text;
  pageTitle.x = 280;
  pageTitle.y = 88;
  pageTitle.width = 400;
  pageTitle.height = 40;

  // --- STAT CARDS (4 cards) ---
  const statData = [
    {title: "Total Projects", value: "24", change: "+12%", positive: true},
    {title: "Active Tasks", value: "156", change: "+8%", positive: true},
    {title: "Team Members", value: "12", change: "0%", positive: false},
    {title: "Revenue", value: "$48.5K", change: "-3%", positive: false},
  ];

  statData.forEach((stat, i) => {
    const x = 280 + i * 312;
    
    const card = penpot.createRectangle();
    card.name = "StatCard";
    card.resize(288, 120);
    card.x = x;
    card.y = 144;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    const title = penpot.createText();
    title.name = "StatTitle";
    title.characters = stat.title;
    title.fontSize = 14;
    title.fillColor = colors.muted;
    title.x = x + 16;
    title.y = 160;
    title.width = 256;
    title.height = 20;

    const value = penpot.createText();
    value.name = "StatValue";
    value.characters = stat.value;
    value.fontSize = 32;
    value.fontWeight = 700;
    value.fillColor = colors.text;
    value.x = x + 16;
    value.y = 188;
    value.width = 200;
    value.height = 40;

    const change = penpot.createText();
    change.name = "StatChange";
    change.characters = stat.change;
    change.fontSize = 14;
    change.fillColor = stat.positive ? colors.success : colors.accent;
    change.x = x + 16;
    change.y = 236;
    change.width = 100;
    change.height = 20;
  });

  // --- PROJECT CARDS ---
  const projectTitle = penpot.createText();
  projectTitle.name = "ProjectsTitle";
  projectTitle.characters = "Recent Projects";
  projectTitle.fontSize = 24;
  projectTitle.fontWeight = 600;
  projectTitle.fillColor = colors.text;
  projectTitle.x = 280;
  projectTitle.y = 296;
  projectTitle.width = 400;
  projectTitle.height = 32;

  const projects = [
    {name: "Meal Planner v2", progress: 72, status: "In Progress", due: "Apr 15"},
    {name: "Mahjong Arena", progress: 45, status: "Review", due: "Apr 20"},
    {name: "Trading Bot", progress: 88, status: "Testing", due: "Apr 10"},
    {name: "Design System", progress: 95, status: "Almost Done", due: "Apr 5"},
  ];

  projects.forEach((proj, i) => {
    const x = 280 + i * 312;
    
    const card = penpot.createRectangle();
    card.name = "ProjectCard";
    card.resize(288, 200);
    card.x = x;
    card.y = 344;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    const name = penpot.createText();
    name.name = "ProjectName";
    name.characters = proj.name;
    name.fontSize = 18;
    name.fontWeight = 600;
    name.fillColor = colors.text;
    name.x = x + 16;
    name.y = 360;
    name.width = 256;
    name.height = 24;

    // Badge background
    const badgeBg = penpot.createRectangle();
    badgeBg.name = "BadgeBg";
    badgeBg.resize(88, 24);
    badgeBg.x = x + 16;
    badgeBg.y = 396;
    badgeBg.fills = [{fillColor: colors.accent, fillOpacity: 0.2}];
    badgeBg.borderRadius = 999;

    const badgeText = penpot.createText();
    badgeText.name = "BadgeText";
    badgeText.characters = proj.status;
    badgeText.fontSize = 12;
    badgeText.fillColor = colors.accent;
    badgeText.x = x + 24;
    badgeText.y = 400;
    badgeText.width = 72;
    badgeText.height = 16;

    // Progress bar background
    const progressBg = penpot.createRectangle();
    progressBg.name = "ProgressBg";
    progressBg.resize(256, 8);
    progressBg.x = x + 16;
    progressBg.y = 448;
    progressBg.fills = [{fillColor: colors.primary, fillOpacity: 1}];
    progressBg.borderRadius = 4;

    // Progress bar fill
    const progressFill = penpot.createRectangle();
    progressFill.name = "ProgressFill";
    progressFill.resize(Math.floor(256 * proj.progress / 100), 8);
    progressFill.x = x + 16;
    progressFill.y = 448;
    progressFill.fills = [{fillColor: colors.accent, fillOpacity: 1}];
    progressFill.borderRadius = 4;

    const progressText = penpot.createText();
    progressText.name = "ProgressText";
    progressText.characters = proj.progress + "%";
    progressText.fontSize = 12;
    progressText.fillColor = colors.muted;
    progressText.x = x + 16;
    progressText.y = 464;
    progressText.width = 256;
    progressText.height = 16;

    const dueDate = penpot.createText();
    dueDate.name = "DueDate";
    dueDate.characters = "Due: " + proj.due;
    dueDate.fontSize = 12;
    dueDate.fillColor = colors.muted;
    dueDate.x = x + 16;
    dueDate.y = 512;
    dueDate.width = 256;
    dueDate.height = 16;
  });

  // --- BUTTON VARIANTS ---
  const buttonTitle = penpot.createText();
  buttonTitle.name = "ButtonsTitle";
  buttonTitle.characters = "Button Variants (shadcn/ui)";
  buttonTitle.fontSize = 24;
  buttonTitle.fontWeight = 600;
  buttonTitle.fillColor = colors.text;
  buttonTitle.x = 280;
  buttonTitle.y = 576;
  buttonTitle.width = 400;
  buttonTitle.height = 32;

  const buttonVariants = [
    {label: "Default", bg: colors.accent, text: colors.text},
    {label: "Destructive", bg: "#FF6B6B", text: colors.text},
    {label: "Outline", bg: "transparent", text: colors.muted, outline: colors.muted},
    {label: "Ghost", bg: "transparent", text: colors.muted},
  ];

  buttonVariants.forEach((btn, i) => {
    const x = 280 + i * 140;
    
    const btnRect = penpot.createRectangle();
    btnRect.name = "Button";
    btnRect.resize(120, 40);
    btnRect.x = x;
    btnRect.y = 624;
    if (btn.outline) {
      btnRect.fills = [{fillColor: "transparent", fillOpacity: 1}];
      btnRect.strokes = [{strokeColor: btn.outline, strokeOpacity: 1, strokeWidth: 1}];
    } else {
      btnRect.fills = [{fillColor: btn.bg, fillOpacity: 1}];
    }
    btnRect.borderRadius = 8;

    const btnText = penpot.createText();
    btnText.name = "ButtonText";
    btnText.characters = btn.label;
    btnText.fontSize = 14;
    btnText.fontWeight = 500;
    btnText.fillColor = btn.text;
    btnText.x = x + 24;
    btnText.y = 634;
    btnText.width = 72;
    btnText.height = 20;
  });

  // --- BADGE EXAMPLES ---
  const badgeTitle = penpot.createText();
  badgeTitle.name = "BadgesTitle";
  badgeTitle.characters = "Badges (pill style)";
  badgeTitle.fontSize = 24;
  badgeTitle.fontWeight = 600;
  badgeTitle.fillColor = colors.text;
  badgeTitle.x = 280;
  badgeTitle.y = 696;
  badgeTitle.width = 400;
  badgeTitle.height = 32;

  const badges = [
    {label: "Success", bg: "#00B894", dark: false},
    {label: "Warning", bg: "#FDCB6E", dark: true},
    {label: "Error", bg: "#FF6B6B", dark: false},
    {label: "Info", bg: "#74B9FF", dark: true},
    {label: "Default", bg: colors.muted, dark: false},
  ];

  let badgeX = 280;
  badges.forEach((badge) => {
    const badgeBg = penpot.createRectangle();
    badgeBg.name = "Badge";
    badgeBg.resize(80, 24);
    badgeBg.x = badgeX;
    badgeBg.y = 744;
    badgeBg.fills = [{fillColor: badge.bg, fillOpacity: 1}];
    badgeBg.borderRadius = 999;

    const badgeText = penpot.createText();
    badgeText.name = "BadgeText";
    badgeText.characters = badge.label;
    badgeText.fontSize = 12;
    badgeText.fillColor = badge.dark ? "#1A1A2E" : "#FFFFFF";
    badgeText.x = badgeX + 12;
    badgeText.y = 748;
    badgeText.width = 56;
    badgeText.height = 16;
    
    badgeX += 96;
  });

  // --- TABLE COMPONENT ---
  const tableTitle = penpot.createText();
  tableTitle.name = "TableTitle";
  tableTitle.characters = "Table Component";
  tableTitle.fontSize = 24;
  tableTitle.fontWeight = 600;
  tableTitle.fillColor = colors.text;
  tableTitle.x = 280;
  tableTitle.y = 800;
  tableTitle.width = 400;
  tableTitle.height = 32;

  const tableContainer = penpot.createRectangle();
  tableContainer.name = "TableContainer";
  tableContainer.resize(1000, 200);
  tableContainer.x = 280;
  tableContainer.y = 848;
  tableContainer.fills = [{fillColor: colors.surface, fillOpacity: 1}];
  tableContainer.borderRadius = 12;
  tableContainer.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

  const tableHeaders = ["Project", "Status", "Progress", "Due Date"];
  const colWidths = [280, 200, 280, 240];
  let colX = 280;
  tableHeaders.forEach((header, i) => {
    const hText = penpot.createText();
    hText.name = "TableHeader";
    hText.characters = header;
    hText.fontSize = 14;
    hText.fontWeight = 600;
    hText.fillColor = colors.muted;
    hText.x = colX + 16;
    hText.y = 864;
    hText.width = colWidths[i] - 32;
    hText.height = 24;
    colX += colWidths[i];
  });

  const tableSep = penpot.createRectangle();
  tableSep.name = "TableSep";
  tableSep.resize(968, 1);
  tableSep.x = 280;
  tableSep.y = 896;
  tableSep.fills = [{fillColor: colors.primary, fillOpacity: 0.3}];

  const tableRows = [
    ["Meal Planner v2", "In Progress", "72%", "Apr 15, 2026"],
    ["Mahjong Arena", "Review", "45%", "Apr 20, 2026"],
    ["Trading Bot", "Testing", "88%", "Apr 10, 2026"],
  ];

  tableRows.forEach((row, rowIdx) => {
    const rowY = 912 + rowIdx * 44;
    colX = 280;
    row.forEach((cell, colIdx) => {
      const cellText = penpot.createText();
      cellText.name = "TableCell";
      cellText.characters = cell;
      cellText.fontSize = 14;
      cellText.fillColor = colors.text;
      cellText.x = colX + 16;
      cellText.y = rowY;
      cellText.width = colWidths[colIdx] - 32;
      cellText.height = 24;
      colX += colWidths[colIdx];
    });
  });

  return "Desktop Dashboard (1920x1080) created successfully!";
  `;

  console.log("Creating Desktop Dashboard...");
  const desktopRes = await mcpCall("tools/call", {name: "execute_code", arguments: {code}});
  console.log("Desktop:", desktopRes.substring(0, 400));

  // Create Mobile Dashboard
  const mobileCode = `
  const colors = {
    primary: "#1A1A2E",
    accent: "#E94560",
    surface: "#16213E",
    bg: "#0F3460",
    text: "#FFFFFF",
    muted: "#A8A8B3",
    success: "#00B894",
  };

  // =====================
  // MOBILE BOARD (375x812 - iPhone)
  // =====================
  const mobile = penpot.createBoard();
  mobile.name = "Dashboard - shadcn/ui Style (Mobile)";
  mobile.resize(375, 812);
  mobile.fills = [{fillColor: colors.bg, fillOpacity: 1}];

  // --- MOBILE HEADER ---
  const mobileHeader = penpot.createRectangle();
  mobileHeader.name = "MobileHeader";
  mobileHeader.resize(375, 64);
  mobileHeader.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  // Menu button
  const menuBtn = penpot.createRectangle();
  menuBtn.name = "MenuButton";
  menuBtn.resize(44, 44);
  menuBtn.x = 0;
  menuBtn.y = 10;
  menuBtn.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  const menuIcon = penpot.createText();
  menuIcon.name = "MenuIcon";
  menuIcon.characters = "☰";
  menuIcon.fontSize = 20;
  menuIcon.fillColor = colors.text;
  menuIcon.x = 12;
  menuIcon.y = 22;
  menuIcon.width = 20;
  menuIcon.height = 20;

  const mobileLogo = penpot.createText();
  mobileLogo.name = "MobileLogo";
  mobileLogo.characters = "MADHORSE";
  mobileLogo.fontSize = 16;
  mobileLogo.fontWeight = 700;
  mobileLogo.fillColor = colors.text;
  mobileLogo.x = 52;
  mobileLogo.y = 22;
  mobileLogo.width = 120;
  mobileLogo.height = 20;

  const mobileAvatar = penpot.createEllipse();
  mobileAvatar.name = "MobileAvatar";
  mobileAvatar.resize(32, 32);
  mobileAvatar.x = 323;
  mobileAvatar.y = 16;
  mobileAvatar.fills = [{fillColor: colors.accent, fillOpacity: 1}];

  // --- PAGE TITLE ---
  const mobileTitle = penpot.createText();
  mobileTitle.name = "MobileTitle";
  mobileTitle.characters = "Dashboard";
  mobileTitle.fontSize = 28;
  mobileTitle.fontWeight = 700;
  mobileTitle.fillColor = colors.text;
  mobileTitle.x = 16;
  mobileTitle.y = 80;
  mobileTitle.width = 343;
  mobileTitle.height = 36;

  // --- MOBILE STAT CARDS ---
  const mobileStats = [
    {title: "Total Projects", value: "24", change: "+12%", positive: true},
    {title: "Active Tasks", value: "156", change: "+8%", positive: true},
  ];

  mobileStats.forEach((stat, i) => {
    const y = 128 + i * 96;
    
    const card = penpot.createRectangle();
    card.name = "MobileStatCard";
    card.resize(343, 80);
    card.x = 16;
    card.y = y;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    const title = penpot.createText();
    title.name = "MobileStatTitle";
    title.characters = stat.title;
    title.fontSize = 12;
    title.fillColor = colors.muted;
    title.x = 28;
    title.y = y + 12;
    title.width = 150;
    title.height = 16;

    const value = penpot.createText();
    value.name = "MobileStatValue";
    value.characters = stat.value;
    value.fontSize = 28;
    value.fontWeight = 700;
    value.fillColor = colors.text;
    value.x = 28;
    value.y = y + 32;
    value.width = 150;
    value.height = 36;

    const change = penpot.createText();
    change.name = "MobileStatChange";
    change.characters = stat.change;
    change.fontSize = 14;
    change.fillColor = stat.positive ? colors.success : colors.accent;
    change.x = 280;
    change.y = y + 30;
    change.width = 60;
    change.height = 20;
  });

  // --- PROJECTS SECTION ---
  const projTitle = penpot.createText();
  projTitle.name = "MobileProjectsTitle";
  projTitle.characters = "Recent Projects";
  projTitle.fontSize = 20;
  projTitle.fontWeight = 600;
  projTitle.fillColor = colors.text;
  projTitle.x = 16;
  projTitle.y = 332;
  projTitle.width = 200;
  projTitle.height = 28;

  const projects = [
    {name: "Meal Planner v2", progress: 72, status: "In Progress"},
    {name: "Mahjong Arena", progress: 45, status: "Review"},
    {name: "Trading Bot", progress: 88, status: "Testing"},
  ];

  projects.forEach((proj, i) => {
    const y = 372 + i * 112;
    
    const card = penpot.createRectangle();
    card.name = "MobileProjectCard";
    card.resize(343, 96);
    card.x = 16;
    card.y = y;
    card.fills = [{fillColor: colors.surface, fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];

    const name = penpot.createText();
    name.name = "MobileProjectName";
    name.characters = proj.name;
    name.fontSize = 16;
    name.fontWeight = 600;
    name.fillColor = colors.text;
    name.x = 28;
    name.y = y + 12;
    name.width = 200;
    name.height = 22;

    const badgeBg = penpot.createRectangle();
    badgeBg.name = "MobileBadgeBg";
    badgeBg.resize(80, 22);
    badgeBg.x = 28;
    badgeBg.y = y + 42;
    badgeBg.fills = [{fillColor: colors.accent, fillOpacity: 0.2}];
    badgeBg.borderRadius = 999;

    const badgeText = penpot.createText();
    badgeText.name = "MobileBadge";
    badgeText.characters = proj.status;
    badgeText.fontSize = 11;
    badgeText.fillColor = colors.accent;
    badgeText.x = 36;
    badgeText.y = y + 45;
    badgeText.width = 64;
    badgeText.height = 16;

    const progressBg = penpot.createRectangle();
    progressBg.name = "MobileProgressBg";
    progressBg.resize(287, 6);
    progressBg.x = 28;
    progressBg.y = y + 74;
    progressBg.fills = [{fillColor: colors.primary, fillOpacity: 1}];
    progressBg.borderRadius = 3;

    const progressFill = penpot.createRectangle();
    progressFill.name = "MobileProgressFill";
    progressFill.resize(Math.floor(287 * proj.progress / 100), 6);
    progressFill.x = 28;
    progressFill.y = y + 74;
    progressFill.fills = [{fillColor: colors.accent, fillOpacity: 1}];
    progressFill.borderRadius = 3;
  });

  // --- BOTTOM TAB BAR ---
  const tabBar = penpot.createRectangle();
  tabBar.name = "MobileTabBar";
  tabBar.resize(375, 64);
  tabBar.x = 0;
  tabBar.y = 748;
  tabBar.fills = [{fillColor: colors.surface, fillOpacity: 1}];

  const tabs = [
    {icon: "◈", label: "Home", active: true},
    {icon: "◇", label: "Projects", active: false},
    {icon: "○", label: "Analytics", active: false},
    {icon: "□", label: "Settings", active: false},
  ];

  tabs.forEach((tab, i) => {
    const x = 16 + i * 92;
    
    const tabIcon = penpot.createText();
    tabIcon.name = "TabIcon";
    tabIcon.characters = tab.icon;
    tabIcon.fontSize = 18;
    tabIcon.fillColor = tab.active ? colors.accent : colors.muted;
    tabIcon.x = x + 28;
    tabIcon.y = 756;
    tabIcon.width = 24;
    tabIcon.height = 24;

    const tabLabel = penpot.createText();
    tabLabel.name = "TabLabel";
    tabLabel.characters = tab.label;
    tabLabel.fontSize = 10;
    tabLabel.fillColor = tab.active ? colors.accent : colors.muted;
    tabLabel.x = x + 12;
    tabLabel.y = 782;
    tabLabel.width = 56;
    tabLabel.height = 14;
  });

  return "Mobile Dashboard (375x812) created successfully!";
  `;

  console.log("Creating Mobile Dashboard...");
  const mobileRes = await mcpCall("tools/call", {name: "execute_code", arguments: {code: mobileCode}});
  console.log("Mobile:", mobileRes.substring(0, 400));
  
  console.log("✅ shadcn/ui Dashboard Design Complete!");
}

main().catch(console.error);
