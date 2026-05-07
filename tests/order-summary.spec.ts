import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';

test.describe('Order Summary Regression Suite', () => {
    let loginPage: LoginPage;
    let subscriptionPage: SubscriptionPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        subscriptionPage = new SubscriptionPage(page);
    });

    test('TC-REG-ORDER-001: Verify successful login, cart clearing, and logout', async ({ page }) => {
        // Step 1: Login
        await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        
        // Wait for dashboard/profile icon to confirm login success
        const profileIcon = page.locator('.ant-dropdown-trigger').first();
        await expect(profileIcon).toBeVisible({ timeout: 30000 });
        
        // Step 2: Navigate to Subscription/Product page
        await subscriptionPage.goTo();
        
        // Step 3: Open Cart and Clear Items (if any)
        // We'll check if cart exists or has items
        const cartBadge = page.locator('.ant-badge-count');
        if (await cartBadge.isVisible() && await cartBadge.textContent() !== '0') {
            await subscriptionPage.clearCart();
        } else {
            console.log('Cart is already empty or not visible.');
            // Even if badge is not visible, let's try opening it to verify
            await subscriptionPage.openCart();
            await expect(page.locator('.ant-drawer-content').getByRole('heading', { name: /order summary/i })).toBeVisible();
        }
        
        // Step 4: Logout
        await subscriptionPage.logout();
    });
});
