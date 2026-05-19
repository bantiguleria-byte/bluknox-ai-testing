import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Explore Quick Links', async ({ page }) => {
  test.setTimeout(120000);
  
  // Create extraction dirs
  ['dom', 'screenshots', 'api'].forEach(dir => {
    const fullPath = path.join('extracted', dir);
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
  });

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
  await page.goto('/', { waitUntil: 'load' });
  await page.waitForTimeout(5000); // Wait for SPA to render completely

  // Capture current page screenshot and DOM
  await page.screenshot({ path: path.join('extracted', 'screenshots', 'dashboard_debug.png'), fullPage: true });
  const debugDom = await page.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync(path.join('extracted', 'dom', 'dashboard_debug.html'), debugDom);
  console.log('Saved dashboard_debug screenshot and DOM');

  const productsLinks = [
    { name: 'BluKnox Classic', text: 'BluKnox Classic' },
    { name: 'BluKnox Healthcare', text: 'BluKnox Healthcare' },
    { name: 'BluKnox Enterprise', text: 'BluKnox Enterprise' },
    { name: 'BluKnox API', text: 'BluKnox API' },
    { name: 'BluKnox GroupShare', text: 'BluKnox GroupShare' }
  ];

  for (const link of productsLinks) {
    console.log(`\nExploring: ${link.name}`);
    
    // Reset page state and scroll to footer
    await page.goto('/', { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const linkLocator = page.getByRole('link', { name: new RegExp(link.name, 'i') })
      .or(page.getByText(new RegExp(link.name, 'i'))).first();
      
    let found = false;
    try {
      await linkLocator.waitFor({ state: 'visible', timeout: 5000 });
      found = true;
    } catch (e: any) {
      console.log(`Error locating ${link.name}: ${e.message}`);
      found = false;
    }

    if (found) {
      console.log(`Clicking ${link.name}...`);
      await linkLocator.click();
      await page.waitForLoadState('load');
      await page.waitForTimeout(3000);

      const safeName = link.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      await page.screenshot({ path: path.join('extracted', 'screenshots', `${safeName}.png`), fullPage: true });
      console.log(`Saved screenshot for ${link.name}`);

      const dom = await page.evaluate(() => document.documentElement.outerHTML);
      fs.writeFileSync(path.join('extracted', 'dom', `${safeName}.html`), dom);
      console.log(`Saved DOM for ${link.name}`);
      
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
});
