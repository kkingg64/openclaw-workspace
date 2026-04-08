const http = require('http');
const base = "http://76.13.215.13:4401/mcp";
let sessionId = null;

async function mcpCall(method, params) {
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

async function runCode(code) {
  const res = await mcpCall("tools/call", {name: "execute_code", arguments: {code}});
  return res;
}

async function main() {
  await mcpCall("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: {name: "cdo", version: "1"}
  });
  await mcpCall("notifications/initialized", {});

  console.log("Building Dashboard step by step...");

  // Step 1: Desktop Board + Sidebar
  let r = await runCode(`
  const colors = {
    primary: "#1A1A2E",
    accent: "#E94560",
    surface: "#16213E",
    bg: "#0F3460",
    text: "#FFFFFF",
    muted: "#A8A8B3",
    success: "#00B894",
  };
  
  const desktop = penpot.createBoard();
  desktop.name = "Dashboard - shadcn/ui Style (Desktop)";
  desktop.resize(1920, 1080);
  desktop.fills = [{fillColor: colors.bg, fillOpacity: 1}];
  
  const sidebar = penpot.createRectangle();
  sidebar.name = "Sidebar";
  sidebar.resize(240, 1080);
  sidebar.x = 0;
  sidebar.y = 0;
  sidebar.fills = [{fillColor: colors.surface, fillOpacity: 1}];
  
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
  
  return "Step 1 done: Desktop + Sidebar";
  `);
  console.log("Step 1:", r.substring(0, 200));

  // Step 2: Nav Items
  r = await runCode(`
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
      const border = penpot.createRectangle();
      border.name = "ActiveBorder";
      border.resize(3, 48);
      border.x = 0;
      border.y = y;
      border.fills = [{fillColor: "#E94560", fillOpacity: 1}];
    }
    const icon = penpot.createText();
    icon.name = "NavIcon_" + item.label;
    icon.characters = item.icon;
    icon.fontSize = 16;
    icon.fillColor = item.active ? "#E94560" : "#A8A8B3";
    icon.x = 16;
    icon.y = y + 14;
    icon.width = 24;
    icon.height = 20;
    const label = penpot.createText();
    label.name = "NavLabel_" + item.label;
    label.characters = item.label;
    label.fontSize = 14;
    label.fontWeight = item.active ? 600 : 400;
    label.fillColor = item.active ? "#FFFFFF" : "#A8A8B3";
    label.x = 48;
    label.y = y + 14;
    label.width = 176;
    label.height = 20;
  });
  return "Step 2 done: Nav items";
  `);
  console.log("Step 2:", r.substring(0, 200));

  // Step 3: Header
  r = await runCode(`
  const header = penpot.createRectangle();
  header.name = "Header";
  header.resize(1680, 64);
  header.x = 240;
  header.y = 0;
  header.fills = [{fillColor: "#16213E", fillOpacity: 1}];
  
  const headerBorder = penpot.createRectangle();
  headerBorder.name = "HeaderBorder";
  headerBorder.resize(1680, 1);
  headerBorder.x = 240;
  headerBorder.y = 63;
  headerBorder.fills = [{fillColor: "#1A1A2E", fillOpacity: 0.3}];
  
  const searchBox = penpot.createRectangle();
  searchBox.name = "SearchBox";
  searchBox.resize(320, 36);
  searchBox.x = 264;
  searchBox.y = 14;
  searchBox.fills = [{fillColor: "#1A1A2E", fillOpacity: 0.5}];
  searchBox.borderRadius = 8;
  
  const searchText = penpot.createText();
  searchText.name = "SearchPlaceholder";
  searchText.characters = "Search...";
  searchText.fontSize = 14;
  searchText.fillColor = "#A8A8B3";
  searchText.x = 280;
  searchText.y = 22;
  searchText.width = 288;
  searchText.height = 20;
  
  const avatar = penpot.createEllipse();
  avatar.name = "UserAvatar";
  avatar.resize(36, 36);
  avatar.x = 1844;
  avatar.y = 14;
  avatar.fills = [{fillColor: "#E94560", fillOpacity: 1}];
  
  const avatarInitial = penpot.createText();
  avatarInitial.name = "AvatarInitial";
  avatarInitial.characters = "K";
  avatarInitial.fontSize = 14;
  avatarInitial.fontWeight = 600;
  avatarInitial.fillColor = "#FFFFFF";
  avatarInitial.x = 1852;
  avatarInitial.y = 20;
  avatarInitial.width = 20;
  avatarInitial.height = 24;
  
  return "Step 3 done: Header";
  `);
  console.log("Step 3:", r.substring(0, 200));

  // Step 4: Page Title + Stat Cards
  r = await runCode(`
  const pageTitle = penpot.createText();
  pageTitle.name = "PageTitle";
  pageTitle.characters = "Dashboard";
  pageTitle.fontSize = 32;
  pageTitle.fontWeight = 700;
  pageTitle.fillColor = "#FFFFFF";
  pageTitle.x = 280;
  pageTitle.y = 88;
  pageTitle.width = 400;
  pageTitle.height = 40;
  
  const statData = [
    {title: "Total Projects", value: "24", change: "+12%", positive: true},
    {title: "Active Tasks", value: "156", change: "+8%", positive: true},
    {title: "Team Members", value: "12", change: "0%", positive: false},
    {title: "Revenue", value: "$48.5K", change: "-3%", positive: false},
  ];
  
  statData.forEach((stat, i) => {
    const x = 280 + i * 312;
    const card = penpot.createRectangle();
    card.name = "StatCard_" + i;
    card.resize(288, 120);
    card.x = x;
    card.y = 144;
    card.fills = [{fillColor: "#16213E", fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];
    
    const title = penpot.createText();
    title.name = "StatTitle_" + i;
    title.characters = stat.title;
    title.fontSize = 14;
    title.fillColor = "#A8A8B3";
    title.x = x + 16;
    title.y = 160;
    title.width = 256;
    title.height = 20;
    
    const value = penpot.createText();
    value.name = "StatValue_" + i;
    value.characters = stat.value;
    value.fontSize = 32;
    value.fontWeight = 700;
    value.fillColor = "#FFFFFF";
    value.x = x + 16;
    value.y = 188;
    value.width = 200;
    value.height = 40;
    
    const change = penpot.createText();
    change.name = "StatChange_" + i;
    change.characters = stat.change;
    change.fontSize = 14;
    change.fillColor = stat.positive ? "#00B894" : "#E94560";
    change.x = x + 16;
    change.y = 236;
    change.width = 100;
    change.height = 20;
  });
  
  return "Step 4 done: Title + Stat Cards";
  `);
  console.log("Step 4:", r.substring(0, 200));

  // Step 5: Project Cards
  r = await runCode(`
  const projectTitle = penpot.createText();
  projectTitle.name = "ProjectsTitle";
  projectTitle.characters = "Recent Projects";
  projectTitle.fontSize = 24;
  projectTitle.fontWeight = 600;
  projectTitle.fillColor = "#FFFFFF";
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
    card.name = "ProjectCard_" + i;
    card.resize(288, 200);
    card.x = x;
    card.y = 344;
    card.fills = [{fillColor: "#16213E", fillOpacity: 1}];
    card.borderRadius = 12;
    card.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];
    
    const name = penpot.createText();
    name.name = "ProjectName_" + i;
    name.characters = proj.name;
    name.fontSize = 18;
    name.fontWeight = 600;
    name.fillColor = "#FFFFFF";
    name.x = x + 16;
    name.y = 360;
    name.width = 256;
    name.height = 24;
    
    const badgeBg = penpot.createRectangle();
    badgeBg.name = "BadgeBg_" + i;
    badgeBg.resize(88, 24);
    badgeBg.x = x + 16;
    badgeBg.y = 396;
    badgeBg.fills = [{fillColor: "#E94560", fillOpacity: 0.2}];
    badgeBg.borderRadius = 999;
    
    const badgeText = penpot.createText();
    badgeText.name = "BadgeText_" + i;
    badgeText.characters = proj.status;
    badgeText.fontSize = 12;
    badgeText.fillColor = "#E94560";
    badgeText.x = x + 24;
    badgeText.y = 400;
    badgeText.width = 72;
    badgeText.height = 16;
    
    const progressBg = penpot.createRectangle();
    progressBg.name = "ProgressBg_" + i;
    progressBg.resize(256, 8);
    progressBg.x = x + 16;
    progressBg.y = 448;
    progressBg.fills = [{fillColor: "#1A1A2E", fillOpacity: 1}];
    progressBg.borderRadius = 4;
    
    const progressFill = penpot.createRectangle();
    progressFill.name = "ProgressFill_" + i;
    progressFill.resize(Math.floor(256 * proj.progress / 100), 8);
    progressFill.x = x + 16;
    progressFill.y = 448;
    progressFill.fills = [{fillColor: "#E94560", fillOpacity: 1}];
    progressFill.borderRadius = 4;
    
    const progressText = penpot.createText();
    progressText.name = "ProgressText_" + i;
    progressText.characters = proj.progress + "%";
    progressText.fontSize = 12;
    progressText.fillColor = "#A8A8B3";
    progressText.x = x + 16;
    progressText.y = 464;
    progressText.width = 256;
    progressText.height = 16;
    
    const dueDate = penpot.createText();
    dueDate.name = "DueDate_" + i;
    dueDate.characters = "Due: " + proj.due;
    dueDate.fontSize = 12;
    dueDate.fillColor = "#A8A8B3";
    dueDate.x = x + 16;
    dueDate.y = 512;
    dueDate.width = 256;
    dueDate.height = 16;
  });
  
  return "Step 5 done: Project Cards";
  `);
  console.log("Step 5:", r.substring(0, 200));

  // Step 6: Button Variants
  r = await runCode(`
  const buttonTitle = penpot.createText();
  buttonTitle.name = "ButtonsTitle";
  buttonTitle.characters = "Button Variants (shadcn/ui)";
  buttonTitle.fontSize = 24;
  buttonTitle.fontWeight = 600;
  buttonTitle.fillColor = "#FFFFFF";
  buttonTitle.x = 280;
  buttonTitle.y = 576;
  buttonTitle.width = 400;
  buttonTitle.height = 32;
  
  const buttonVariants = [
    {label: "Default", bg: "#E94560", text: "#FFFFFF"},
    {label: "Destructive", bg: "#FF6B6B", text: "#FFFFFF"},
    {label: "Outline", bg: "transparent", text: "#A8A8B3", outline: "#A8A8B3"},
    {label: "Ghost", bg: "transparent", text: "#A8A8B3"},
  ];
  
  buttonVariants.forEach((btn, i) => {
    const x = 280 + i * 140;
    const btnRect = penpot.createRectangle();
    btnRect.name = "Button_" + btn.label;
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
    btnText.name = "ButtonText_" + btn.label;
    btnText.characters = btn.label;
    btnText.fontSize = 14;
    btnText.fontWeight = 500;
    btnText.fillColor = btn.text;
    btnText.x = x + 24;
    btnText.y = 634;
    btnText.width = 72;
    btnText.height = 20;
  });
  
  return "Step 6 done: Button Variants";
  `);
  console.log("Step 6:", r.substring(0, 200));

  // Step 7: Badges
  r = await runCode(`
  const badgeTitle = penpot.createText();
  badgeTitle.name = "BadgesTitle";
  badgeTitle.characters = "Badges (pill style)";
  badgeTitle.fontSize = 24;
  badgeTitle.fontWeight = 600;
  badgeTitle.fillColor = "#FFFFFF";
  badgeTitle.x = 280;
  badgeTitle.y = 696;
  badgeTitle.width = 400;
  badgeTitle.height = 32;
  
  const badges = [
    {label: "Success", bg: "#00B894", dark: false},
    {label: "Warning", bg: "#FDCB6E", dark: true},
    {label: "Error", bg: "#FF6B6B", dark: false},
    {label: "Info", bg: "#74B9FF", dark: true},
    {label: "Default", bg: "#A8A8B3", dark: false},
  ];
  
  let badgeX = 280;
  badges.forEach((badge) => {
    const badgeBg = penpot.createRectangle();
    badgeBg.name = "Badge_" + badge.label;
    badgeBg.resize(80, 24);
    badgeBg.x = badgeX;
    badgeBg.y = 744;
    badgeBg.fills = [{fillColor: badge.bg, fillOpacity: 1}];
    badgeBg.borderRadius = 999;
    
    const badgeText = penpot.createText();
    badgeText.name = "BadgeText_" + badge.label;
    badgeText.characters = badge.label;
    badgeText.fontSize = 12;
    badgeText.fillColor = badge.dark ? "#1A1A2E" : "#FFFFFF";
    badgeText.x = badgeX + 12;
    badgeText.y = 748;
    badgeText.width = 56;
    badgeText.height = 16;
    
    badgeX += 96;
  });
  
  return "Step 7 done: Badges";
  `);
  console.log("Step 7:", r.substring(0, 200));

  // Step 8: Table
  r = await runCode(`
  const tableTitle = penpot.createText();
  tableTitle.name = "TableTitle";
  tableTitle.characters = "Table Component";
  tableTitle.fontSize = 24;
  tableTitle.fontWeight = 600;
  tableTitle.fillColor = "#FFFFFF";
  tableTitle.x = 280;
  tableTitle.y = 800;
  tableTitle.width = 400;
  tableTitle.height = 32;
  
  const tableContainer = penpot.createRectangle();
  tableContainer.name = "TableContainer";
  tableContainer.resize(1000, 200);
  tableContainer.x = 280;
  tableContainer.y = 848;
  tableContainer.fills = [{fillColor: "#16213E", fillOpacity: 1}];
  tableContainer.borderRadius = 12;
  tableContainer.shadows = [{shadowColor: "#000000", shadowOpacity: 0.3, shadowBlur: 20, shadowOffsetX: 0, shadowOffsetY: 4}];
  
  const tableHeaders = ["Project", "Status", "Progress", "Due Date"];
  const colWidths = [280, 200, 280, 240];
  let colX = 280;
  tableHeaders.forEach((header, i) => {
    const hText = penpot.createText();
    hText.name = "TableHeader_" + i;
    hText.characters = header;
    hText.fontSize = 14;
    hText.fontWeight = 600;
    hText.fillColor = "#A8A8B3";
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
  tableSep.fills = [{fillColor: "#1A1A2E", fillOpacity: 0.3}];
  
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
      cellText.name = "TableCell_" + rowIdx + "_" + colIdx;
      cellText.characters = cell;
      cellText.fontSize = 14;
      cellText.fillColor = "#FFFFFF";
      cellText.x = colX + 16;
      cellText.y = rowY;
      cellText.width = colWidths[colIdx] - 32;
      cellText.height = 24;
      colX += colWidths[colIdx];
    });
  });
  
  return "Step 8 done: Table - Desktop COMPLETE!";
  `);
  console.log("Step 8:", r.substring(0, 200));
  console.log("\n✅ DESKTOP Dashboard (1920x1080) Complete!");
}

main().catch(console.error);
