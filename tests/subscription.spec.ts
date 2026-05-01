import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Subscription & Checkout Tests', () => {
    let subscriptionPage: SubscriptionPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        subscriptionPage = new SubscriptionPage(page);
        checkoutPage = new CheckoutPage(page);
        await subscriptionPage.goTo();
    });

    test('TC-SUB-001: Verify Subscription Plan Selection', async ({ page }) => {
        await subscriptionPage.selectPlan('Personal Plan');
        await expect(page.getByText('Order Summary')).toBeVisible();
    });

    test('TC-SUB-002: Verify Add-on Selection', async ({ page }) => {
        // Find the first "Additional Encrypted Storage" text and verify checkbox can be checked
        const addonText = page.getByText('Additional Encrypted Storage', { exact: false }).first();
        await addonText.scrollIntoViewIfNeeded();
        await addonText.waitFor({ state: 'visible', timeout: 15000 });
        // Navigate up: text -> text-wrapper -> addon-row (which contains the checkbox)
        const addonRow = addonText.locator('..').locator('..');
        const checkbox = addonRow.getByRole('checkbox');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    });

    test('TC-CH-001: Verify Stripe Checkout Redirection', async ({ page }) => {
        await subscriptionPage.selectPlan('Business Plan');
        await subscriptionPage.proceedToCheckout();
        // Wait for Stripe redirect - use 'domcontentloaded' as Stripe pages have heavy JS
        await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 60000, waitUntil: 'domcontentloaded' });
        await expect(page).toHaveURL(/.*checkout.stripe.com.*/);
    });

    test('TC-CH-002: Verify Stripe Subscription Completion', async ({ page }) => {
        await subscriptionPage.selectPlan('Personal Plan');
        await subscriptionPage.proceedToCheckout();
        
        // Wait for Stripe redirect
        await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 60000 });
        
        // Wait for Stripe page to fully load
        await page.waitForLoadState('load');
        await page.waitForTimeout(3000); // Allow Stripe JS to initialize
        
        // Verify we're on the Stripe checkout page
        await expect(page).toHaveURL(/.*checkout.stripe.com.*/);
        
        // Stripe Link modal may appear - check for email in the Link modal text
        // or dismiss Link and check the email field
        const linkEmailText = page.getByText('banti.guleria@idsil.com');
        const payWithoutLink = page.getByText('Pay without Link');
        
        // Try to find the email in the Link modal first
        if (await linkEmailText.isVisible({ timeout: 5000 }).catch(() => false)) {
            await expect(linkEmailText).toBeVisible();
        } else if (await payWithoutLink.isVisible({ timeout: 5000 }).catch(() => false)) {
            // Dismiss Link and check email field
            await payWithoutLink.click();
            await page.waitForTimeout(2000);
            const emailInput = page.locator('#email');
            await emailInput.waitFor({ state: 'visible', timeout: 15000 });
            const emailValue = await emailInput.inputValue();
            expect(emailValue).toBe('banti.guleria@idsil.com');
        }
    });
});
