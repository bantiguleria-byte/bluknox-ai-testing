import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Stripe Checkout Negative Testing', () => {
    let loginPage: LoginPage;
    let subscriptionPage: SubscriptionPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        subscriptionPage = new SubscriptionPage(page);
        checkoutPage = new CheckoutPage(page);
        
        test.setTimeout(180000);
        
        // Initial setup: Login and go to subscription plans
        await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        await subscriptionPage.goTo();
    });

    test('TC-NEG-CHK-001: Verify error for invalid card number', async ({ page }) => {
        await subscriptionPage.selectPlan('Personal Plan');
        await subscriptionPage.proceedToCheckout();
        
        // Use an invalid card number that triggers immediate Stripe validation
        await checkoutPage.fillCardDetails('4242 4242 4242 4241', '12/26', '123');
        await checkoutPage.setCardholderName('Banti Guleria');
        
        // Click Subscribe to trigger validation
        await page.getByRole('button', { name: /Subscribe|Pay/i }).click();
        
        const error = await checkoutPage.getStripeErrorMessage();
        expect(error).toContain('Your card number is invalid');
    });

    test('TC-NEG-CHK-002: Verify error for expired card date', async ({ page }) => {
        await subscriptionPage.selectPlan('Personal Plan');
        await subscriptionPage.proceedToCheckout();
        
        // Use a valid card number but an expired date
        await checkoutPage.fillCardDetails('4242 4242 4242 4242', '01/20', '123');
        await checkoutPage.setCardholderName('Banti Guleria');
        
        // Click Subscribe to trigger validation
        await page.getByRole('button', { name: /Subscribe|Pay/i }).click();
        
        const error = await checkoutPage.getStripeErrorMessage();
        expect(error).toContain('past'); // e.g., "Your card’s expiration year is in the past."
    });

    test('TC-NEG-CHK-003: Verify error for incorrect CVC', async ({ page }) => {
        await subscriptionPage.selectPlan('Personal Plan');
        await subscriptionPage.proceedToCheckout();
        
        // Use a valid card number and date but invalid CVC (though Stripe might only validate this on server side)
        // For immediate UI validation, we'll use an incomplete CVC
        await checkoutPage.fillCardDetails('4242 4242 4242 4242', '12/26', '1');
        await checkoutPage.setCardholderName('Banti Guleria');
        
        await page.getByRole('button', { name: /Subscribe|Pay/i }).click();
        
        const error = await checkoutPage.getStripeErrorMessage();
        expect(error).toBeTruthy();
    });
});
