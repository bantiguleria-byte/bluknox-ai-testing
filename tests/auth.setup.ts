import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'utils/storageState.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate and login
  await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
  
  // Wait for navigation away from login page
  await expect(page).not.toHaveURL(/.*\/login/, { timeout: 30000 });
  
  // Wait for a reliable logged-in indicator
  // Based on exploration, the shopping-cart icon is only present when logged in
  const cartIcon = page.getByLabel('shopping-cart');
  await expect(cartIcon).toBeVisible({ timeout: 60000 });
  
  // Verify profile icon is also present as a secondary check
  const profileIcon = page.locator('header').getByRole('img').last();
  await expect(profileIcon).toBeVisible();
  
  await page.context().storageState({ path: authFile });
});

