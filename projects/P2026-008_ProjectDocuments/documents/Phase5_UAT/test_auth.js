const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('=== PHASE 5 UAT - Research Page ===\n');
  
  // Go to login page first
  await page.goto('http://76.13.215.13:3002/login', { waitUntil: 'networkidle' });
  console.log('On login page:', page.url());
  
  // Get the callbackUrl from the page
  const url = page.url();
  console.log('Login URL:', url);
  
  // Find and click the credentials provider button or form
  // NextAuth typically has a form for credentials
  const forms = await page.$$('form');
  console.log('Forms found:', forms.length);
  
  // Try to fill the email and password fields
  const emailInput = await page.$('input[name="email"], input[type="email"]');
  const passwordInput = await page.$('input[name="password"], input[type="password"]');
  
  if (emailInput && passwordInput) {
    console.log('Found login form inputs');
    
    await emailInput.fill('fabio@madhorse.cloud');
    await passwordInput.fill('admin123');
    
    // Get the csrf token from the page if it's embedded
    const csrfInput = await page.$('input[name="csrfToken"]');
    if (csrfInput) {
      const csrfValue = await csrfInput.getAttribute('value');
      console.log('Found CSRF token in form:', csrfValue);
    }
    
    // Submit the form
    await page.click('button[type="submit"], button[name="submit"]');
    
    // Wait for navigation
    await page.waitForTimeout(5000);
    console.log('After submit, URL:', page.url());
  }
  
  // Check if we need to handle redirect
  if (page.url().includes('research')) {
    console.log('\n=== Successfully on Research page ===\n');
  } else {
    console.log('\n=== Still on login page, trying direct navigation ===\n');
  }
  
  // Try direct navigation to research anyway
  await page.goto('http://76.13.215.13:3002/research', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('Research page URL:', page.url());
  
  // Check if logged in by looking for logout button or user info
  const logoutBtn = await page.$('text=Logout, text=Sign Out, text=log out');
  console.log('Logout button found:', !!logoutBtn);
  
  // Get page content
  const bodyText = await page.textContent('body');
  console.log('\n--- Page content (first 1500 chars) ---');
  console.log(bodyText.substring(0, 1500));
  
  await page.screenshot({ path: '/root/.openclaw/workspace/projects/P2026-008_ProjectDocuments/documents/Phase5_UAT/TC-00_research.png' });
  console.log('\nScreenshot: TC-00_research.png');
  
  // Check for Research-specific elements
  const hasDigest = bodyText.includes('DIGEST') || bodyText.includes('Digest') || bodyText.includes('COO');
  const hasTrends = bodyText.includes('YouTube') || bodyText.includes('Reddit') || bodyText.includes('Twitter') || bodyText.includes('HackerNews');
  const hasFiles = bodyText.includes('Research') || bodyText.includes('research') || bodyText.includes('file');
  
  console.log('\n=== Content Analysis ===');
  console.log('COO Digest content:', hasDigest ? 'FOUND' : 'NOT FOUND');
  console.log('Social Media Trends:', hasTrends ? 'FOUND' : 'NOT FOUND');
  console.log('Research Files:', hasFiles ? 'FOUND' : 'NOT FOUND');
  
  await browser.close();
  console.log('\n=== Auth Test Complete ===');
})();
