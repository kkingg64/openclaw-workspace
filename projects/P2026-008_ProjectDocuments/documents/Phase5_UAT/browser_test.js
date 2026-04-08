const puppeteer = require('puppeteer-core');

(async () => {
  console.log('=== PHASE 5 UAT - Research Page with Browser ===\n');
  
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('1. Opening http://76.13.215.13:3002...');
  await page.goto('http://76.13.215.13:3002', { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Save login page screenshot
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_login.png', fullPage: false });
  console.log('   Screenshot: TC-00_login.png');
  console.log('   URL:', page.url());
  
  // Get CSRF token from page
  const csrfToken = await page.evaluate(() => {
    const input = document.querySelector('input[name="csrfToken"]');
    return input ? input.value : null;
  });
  console.log('   CSRF Token found:', csrfToken ? 'Yes' : 'No');
  
  console.log('2. Filling login form...');
  await page.type('input[type="email"]', 'fabio@madhorse.cloud', { delay: 50 });
  await page.type('input[type="password"]', 'admin123', { delay: 50 });
  
  // Inject CSRF token if found
  if (csrfToken) {
    await page.evaluate((token) => {
      const input = document.querySelector('input[name="csrfToken"]');
      if (input) input.value = token;
    }, csrfToken);
  }
  
  // Submit form by pressing Enter or clicking button
  console.log('3. Submitting login form...');
  await Promise.all([
    page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
    page.keyboard.press('Enter')
  ]);
  
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_after_login.png', fullPage: false });
  console.log('   Screenshot: TC-00_after_login.png');
  console.log('   URL after login:', page.url());
  
  // Check if we're authenticated
  const cookies = await page.cookies();
  const sessionCookie = cookies.find(c => c.name.includes('session') || c.name.includes('next-auth'));
  console.log('   Session cookie found:', sessionCookie ? 'Yes' : 'No');
  
  // Try to navigate to research page
  console.log('4. Navigating to /research...');
  await page.goto('http://76.13.215.13:3002/research', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-06_COO_Digest.png', fullPage: false });
  console.log('   Screenshot: TC-06_COO_Digest.png');
  console.log('   URL:', page.url());
  
  // Get page content
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- Page content preview (500 chars) ---');
  console.log(bodyText.substring(0, 500));
  
  // Check for key elements
  const hasDigest = bodyText.includes('COO') || bodyText.includes('Digest') || bodyText.includes('Research');
  const hasTrends = bodyText.includes('YouTube') || bodyText.includes('Reddit') || bodyText.includes('Twitter') || bodyText.includes('HackerNews');
  const hasFiles = bodyText.includes('Recent') || bodyText.includes('Research') || bodyText.includes('File');
  const isResearchPage = page.url().includes('research');
  
  console.log('\n--- Element Detection ---');
  console.log('On Research page:', isResearchPage);
  console.log('COO Digest content found:', hasDigest);
  console.log('Social Media Trends found:', hasTrends);
  console.log('Research Files found:', hasFiles);
  
  // Take mobile screenshot
  console.log('\n5. Testing mobile layout...');
  await page.setViewport({ width: 375, height: 812 });
  await new Promise(r => setTimeout(r, 1000));
  await page.goto('http://76.13.215.13:3002/research', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-06E_Mobile.png', fullPage: false });
  console.log('   Screenshot: TC-06E_Mobile.png (mobile 375x812)');
  
  await browser.close();
  console.log('\n=== Browser Test Complete ===');
})();
