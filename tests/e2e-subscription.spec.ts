import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Extended E2E Subscription Flow', () => {
    let loginPage: LoginPage;
    let subscriptionPage: SubscriptionPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        // Step 1: Configure Viewport
        await page.setViewportSize({ width: 1981, height: 558 });
        
        loginPage = new LoginPage(page);
        subscriptionPage = new SubscriptionPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('Full End-to-End Subscription Lifecycle', async ({ page }) => {
        test.setTimeout(180000);
        // Step 2 & 3: Launch and Validate Landing
        await page.goto('https://staging.bluknox.com/');
        await expect(page).toHaveTitle(/bluknox/i);
        
        // Phase 2: Login Flow
        if (await page.locator('input[type="email"]').isVisible({ timeout: 5000 })) {
            await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        }
        
        // Assert Login Success
        await expect(page.locator('.ant-dropdown-trigger').first()).toBeVisible({ timeout: 30000 });

        // Phase 3: Navigate to Subscription Plans
        await subscriptionPage.goTo();
        
        // Phase 4: Validate Plans UI
        await subscriptionPage.validatePlansUI();

        // Phase 5: Interaction (Checkout Flow)
        await subscriptionPage.selectPlan('Personal Plan');
        
        // Wait for Order Summary drawer
        await expect(page.getByText('Order Summary')).toBeVisible({ timeout: 15000 });
        
        await subscriptionPage.proceedToCheckout();

        // Stripe Payment Page
        await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 60000 });
        
        // Complete payment through the Stripe POM
        await checkoutPage.completePayment();

        // Phase 6: Redirection and Cleanup
        await page.waitForURL(/.*(orders|order-history).*/, { timeout: 90000 });
        await expect(page).toHaveURL(/.*(orders|order-history).*/);
        
        // Close drawer/modal if present
        const closeButton = page.locator('.ant-drawer-close').or(page.getByRole('button', { name: /Close|Cancel/i })).first();
        if (await closeButton.isVisible()) {
            await closeButton.click();
        }

        // Download button
        const downloadButton = page.getByRole('button', { name: /download/i }).first();
        if (await downloadButton.isVisible({ timeout: 15000 })) {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                downloadButton.click(),
            ]);
            console.log('Downloaded file:', download.suggestedFilename());
        }

        // Phase 6: Logout
        await subscriptionPage.logout();
        await expect(page).toHaveURL(/.*login.*/);
    });
});
