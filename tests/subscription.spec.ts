import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Subscription & Checkout Tests', () => {
    test.describe.configure({ mode: 'serial' });
    let subscriptionPage: SubscriptionPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        subscriptionPage = new SubscriptionPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('TC-SUB-001: Verify Subscription Plan Selection', async ({ page }) => {
        await subscriptionPage.goTo();
        await subscriptionPage.selectPlan('Personal Plan');
        await expect(page.getByText('Order Summary')).toBeVisible();
    });

    test('TC-SUB-002: Verify Add-on Selection', async ({ page }) => {
        await subscriptionPage.goTo();
        const initialPrice = await subscriptionPage.getDisplayedPlanAnnualPrice('Personal Plan');

        // Select an add-on
        const addonName = 'Additional Encrypted Storage - 15GB';
        await subscriptionPage.selectAddon(addonName);

        // Verify price has updated (should be different from initial)
        const updatedPrice = await subscriptionPage.getDisplayedPlanAnnualPrice('Personal Plan');
        expect(updatedPrice).not.toBe(initialPrice);

        // Verify checkbox is actually checked (handled in POM but good to assert here too)
        expect(await subscriptionPage.isAddonSelected(addonName)).toBeTruthy();
    });

    test('TC-CH-001 & TC-CH-002: Verify Stripe Checkout Flow', async ({ page }) => {
        test.setTimeout(180000);

        await subscriptionPage.goTo();
        await subscriptionPage.selectPlan('Personal Plan');
        
        // Ensure the drawer is fully visible
        await page.getByText('Order Summary').waitFor({ state: 'visible', timeout: 15000 });
        
        await subscriptionPage.proceedToCheckout();

        // TC-CH-001: Verify Redirection to Stripe
        await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 60000, waitUntil: 'load' });
        await expect(page).toHaveURL(/.*checkout.stripe.com.*/);

        // TC-CH-002: Complete payment through the Stripe POM, which handles Link,
        // saved cards, iframes, and processing states.
        await checkoutPage.completePayment();

        // Wait for redirection back to the app
        await page.waitForURL(/.*order-history.*/, { timeout: 90000 });
        await expect(page).toHaveURL(/.*order-history.*/);
        await expect(page.getByRole('heading', { name: 'Order History' })).toBeVisible();
    });
});
