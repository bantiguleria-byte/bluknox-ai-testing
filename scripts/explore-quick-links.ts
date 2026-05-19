import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // Use existing storage state if available
  const storageStatePath = path.join(process.cwd(), 'utils', 'storageState.json');
  const context = await browser.newContext({
    storageState: fs.existsSync(storageStatePath) ? storageStatePath : undefined,
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  // Setup API interception
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/') || url.includes('graphql')) {
      try {
        const body = await response.body();
        const safeName = url.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 100);
        fs.writeFileSync(path.join('extracted', 'api', `${safeName}.json`), JSON.stringify({
          url: url,
          status: response.status(),
          method: response.request().method(),
          body: body.toString('utf-8')
        }, null, 2));
      } catch (e) {
        // Ignore binary/failed responses
      }
    }
  });

  console.log('Navigating to staging environment...');
  await page.goto('https://staging.bluknox.com');
  await page.waitForLoadState('networkidle');

  console.log('Scrolling to footer Quick Links...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const quickLinks = [
    { name: 'ONC Health IT Certification CHPL Listing', text: 'ONC Health IT Certification CHPL Listing' },
    { name: 'ONC Health IT Certification Mandatory Disclosures', text: 'ONC Health IT Certification Mandatory Disclosures' },
    { name: 'Patient Data Export Format', text: 'Patient Data Export Format' }
  ];

  for (const link of quickLinks) {
    console.log(`\nExploring: ${link.name}`);
    
    // We navigate to base and scroll again for each link to reset state
    await page.goto('https://staging.bluknox.com');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Find the link by text
    const linkLocator = page.getByText(link.text, { exact: true });
    if (await linkLocator.isVisible().catch(() => false)) {
      console.log(`Clicking ${link.name}...`);
      await linkLocator.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000); // Give JS time to render

      // Capture screenshot
      const safeName = link.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      await page.screenshot({ path: path.join('extracted', 'screenshots', `${safeName}.png`), fullPage: true });
      console.log(`Saved screenshot for ${link.name}`);

      // Capture DOM
      const dom = await page.evaluate(() => document.documentElement.outerHTML);
      fs.writeFileSync(path.join('extracted', 'dom', `${safeName}.html`), dom);
      console.log(`Saved DOM for ${link.name}`);
      
      // Identify components using playwright locators and count them
      const forms = await page.locator('form').count();
      const buttons = await page.locator('button').count();
      const tables = await page.locator('table').count();
      const inputs = await page.locator('input').count();
      
      const componentData = {
        pageName: link.name,
        url: page.url(),
        components: { forms, buttons, tables, inputs }
      };
      
      fs.writeFileSync(path.join('extracted', 'dom', `${safeName}_components.json`), JSON.stringify(componentData, null, 2));
      console.log(`Saved component analysis for ${link.name}`);
      
    } else {
      console.log(`Could not find link: ${link.name}`);
    }
  }

  console.log('\nExploration complete!');
  await browser.close();
})();
