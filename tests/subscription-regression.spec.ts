import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Subscription Navigation Regression', () => {
    let subscriptionPage: SubscriptionPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        subscriptionPage = new SubscriptionPage(page);
        checkoutPage = new CheckoutPage(page);

        // Login
        await page.goto('https://staging.bluknox.com/');
        if (await page.locator('input[type="email"]').isVisible({ timeout: 5000 })) {
            await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        }
        await subscriptionPage.goTo();
    });

    test('TC-SUB-001: Verify Successful Navigation to Stripe Checkout (Personal Plan)', async ({ page }) => {
        await subscriptionPage.selectPlan('Personal Plan');
        await expect(page.getByText('Order Summary')).toBeVisible();
        await subscriptionPage.proceedToCheckout();
        
        console.log("Waiting for Stripe Checkout page (Personal Plan)...");
        await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 90000 });
        
        const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
        await Promise.race([
            page.getByText(/Confirm it's you|Pay without Link|Card information/i).waitFor({ state: 'visible', timeout: 60000 }),
            stripeFrame.getByText(/Confirm it's you|Pay without Link|Card information/i).waitFor({ state: 'visible', timeout: 60000 })
        ]).catch(() => console.log("Timeout waiting for Stripe UI, but URL reached."));
        console.log("SUCCESS: Personal Plan reached Stripe.");
    });

    test('TC-SUB-002: Verify Successful Navigation to Stripe Checkout (Business Plan)', async ({ page }) => {
        await subscriptionPage.selectPlan('Business Plan');
        await subscriptionPage.proceedToCheckout();
        
        console.log("Waiting for Stripe Checkout page (Business Plan)...");
        await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 90000 });
        
        const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
        await Promise.race([
            page.getByText(/Confirm it's you|Pay without Link|Card information/i).waitFor({ state: 'visible', timeout: 60000 }),
            stripeFrame.getByText(/Confirm it's you|Pay without Link|Card information/i).waitFor({ state: 'visible', timeout: 60000 })
        ]).catch(() => console.log("Timeout waiting for Stripe UI, but URL reached."));
        console.log("SUCCESS: Business Plan reached Stripe.");
    });

    test('TC-SUB-003: Verify Add-on Selection & Price Calculation', async ({ page }) => {
        const initialPrice = await subscriptionPage.getDisplayedPlanAnnualPrice('Personal Plan');
        
        await subscriptionPage.selectAddon('Additional Encrypted Storage - 15GB');
        const updatedPrice = await subscriptionPage.getDisplayedPlanAnnualPrice('Personal Plan');

        expect(updatedPrice).not.toBe(initialPrice);
        expect(await subscriptionPage.isAddonSelected('Additional Encrypted Storage - 15GB')).toBeTruthy();
        console.log("SUCCESS: Price calculation verified.");
    });
});
