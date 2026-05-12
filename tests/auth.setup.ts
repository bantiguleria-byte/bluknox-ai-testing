import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExecutionManager } from '../framework/core/ExecutionManager';

const authFile = 'utils/storageState.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Use ExecutionManager to wrap the entire login process with a safety timeout
  await ExecutionManager.runWithTimeout(
    (async () => {
      // Navigate and login
      await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
      
      // Wait for navigation away from login page
      await expect(page).not.toHaveURL(/.*\/login/, { timeout: 30000 });
      
      // Verify profile icon is present as a secondary check
      const profileIcon = page.locator('.ant-avatar, .ant-dropdown-trigger').first();
      await expect(profileIcon).toBeVisible({ timeout: 30000 });
      
      // Save storage state
      await page.context().storageState({ path: authFile });
      console.log('Authentication successful, storage state saved.');
    })(),
    120000 // 2 minute global timeout for the setup
  );
});


