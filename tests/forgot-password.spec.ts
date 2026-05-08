import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Forgot Password Module Regression Suite', () => {
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach(async ({ page }) => {
        forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.goTo();
    });

    test('TC-FP-001: Request OTP with valid registered email', async () => {
        await forgotPasswordPage.requestOTP('banti.guleria@idsil.com');
        // Success state should show OTP fields
        expect(await forgotPasswordPage.isOtpSectionVisible()).toBe(true);
    });

    test('TC-FP-002: Submit with empty email', async () => {
        await forgotPasswordPage.click(forgotPasswordPage['sendOtpButton']);
        expect(await forgotPasswordPage.getValidationError()).toContain('Please input your email!');
    });

    test('TC-FP-003: Submit with invalid email format', async () => {
        await forgotPasswordPage.requestOTP('notanemail');
        expect(await forgotPasswordPage.getValidationError()).toContain('Please enter a valid email!');
    });

    test('TC-FP-006: Back to Login link works', async () => {
        await forgotPasswordPage.click(forgotPasswordPage['backToLoginLink']);
        await expect(forgotPasswordPage.page).toHaveURL(/.*login.*/);
    });
});
