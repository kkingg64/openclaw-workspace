const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('=== PHASE 5 UAT - Research Page ===\n');
  
  // 1. Get CSRF token first
  const csrfResponse = await page.goto('http://76.13.215.13:3002/api/auth/csrf');
  const csrfData = await page.evaluate(() => JSON.parse(document.body.textContent));
  console.log('CSRF Token:', csrfData.csrfToken);
  
  // 2. Go to login page
  await page.goto('http://76.13.215.13:3002/login', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_login.png' });
  console.log('Screenshot: TC-00_login.png (login page)');
  
  // 3. Fill login form
  await page.fill('input[type="email"]', 'fabio@madhorse.cloud');
  await page.fill('input[type="password"]', 'admin123');
  
  // 4. Submit using the form
  await Promise.all([
    page.waitForURL('**/research**', { timeout: 15000 }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);
  
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_after_login.png' });
  console.log('Screenshot: TC-00_after_login.png (after login attempt)');
  console.log('Current URL:', page.url());
  
  // Check if redirected to research
  if (page.url().includes('research')) {
    console.log('\n=== Logged in, now on Research page ===\n');
  } else {
    console.log('\n=== Not on research page yet ===\n');
  }
  
  // Navigate to research page
  await page.goto('http://76.13.215.13:3002/research', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // TC-06: COO Research Digest
  console.log('\n=== TC-06: COO Research Digest ===');
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-06_COO_Digest.png' });
  console.log('Screenshot: TC-06_COO_Digest.png');
  
  // TC-06B: Social Media Hot Topics
  console.log('\n=== TC-06B: Social Media Hot Topics ===');
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-06B_Trends.png' });
  console.log('Screenshot: TC-06B_Trends.png');
  
  // TC-06C: Recent Research Files
  console.log('\n=== TC-06C: Recent Research Files ===');
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-06C_Files.png' });
  console.log('Screenshot: TC-06C_Files.png');
  
  // TC-06D: No Search Input
  console.log('\n=== TC-06D: No Search Input ===');
  const searchInputs = await page.$$('input[type="search"], input[placeholder*="earch"]');
  console.log('Search inputs found:', searchInputs.length);
  
  // TC-06E: Mobile Layout
  console.log('\n=== TC-06E: Mobile Layout ===');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://76.13.215.13:3002/research', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-06E_Mobile.png' });
  console.log('Screenshot: TC-06E_Mobile.png (mobile viewport)');
  
  // Get page content for analysis
  const content = await page.content();
  
  // Save HTML for analysis
  const fs = require('fs');
  fs.writeFileSync('/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/research_page.html', content);
  console.log('\nSaved HTML for analysis');
  
  // Get visible text content
  const bodyText = await page.textContent('body');
  console.log('\n--- Page content summary ---');
  console.log(bodyText.substring(0, 2000));
  
  await browser.close();
  console.log('\n=== UAT Complete ===');
})();
