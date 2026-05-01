import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'utils/storageState.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate and login
  await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
  
  // Wait for a reliable logged-in indicator (e.g. shopping cart or dashboard element)
  // Based on exploration, shopping-cart image is a good indicator
  await page.getByRole('img', { name: 'shopping-cart' }).waitFor({ state: 'visible', timeout: 60000 });
  
  await page.context().storageState({ path: authFile });
});
