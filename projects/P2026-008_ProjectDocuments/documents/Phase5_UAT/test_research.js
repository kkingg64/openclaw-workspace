const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('Opening http://76.13.215.13:3002...');
  await page.goto('http://76.13.215.13:3002', { waitUntil: 'networkidle' });
  
  // Take screenshot of login page
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_login.png' });
  console.log('Screenshot saved: TC-00_login.png');
  
  // Check if on login page
  const title = await page.title();
  console.log('Page title:', title);
  
  // Look for login form
  const emailInput = await page.$('input[type="email"], input[name="email"]');
  if (emailInput) {
    console.log('Found email input');
    await emailInput.fill('fabio@madhorse.cloud');
    
    const passwordInput = await page.$('input[type="password"]');
    if (passwordInput) {
      await passwordInput.fill('admin123');
    }
    
    // Try to submit
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForTimeout(3000);
    }
  }
  
  // Take screenshot after login attempt
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_after_login.png' });
  console.log('Screenshot saved: TC-00_after_login.png');
  
  // Get current URL
  console.log('Current URL:', page.url());
  
  // Get page content summary
  const bodyText = await page.textContent('body');
  console.log('Body text (first 500 chars):', bodyText.substring(0, 500));
  
  await browser.close();
})();
