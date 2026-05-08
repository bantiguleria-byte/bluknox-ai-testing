import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Create Account Module Regression Suite', () => {
    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        await signupPage.goTo();
    });

    test('TC-SIGNUP-001: Successful registration (navigate to OTP)', async () => {
        const uniqueEmail = `testuser_${Date.now()}@mailinator.com`;
        await signupPage.register({
            firstName: 'Test',
            lastName: 'User',
            email: uniqueEmail,
            country: 'India',
            password: 'Password@123',
            confirmPassword: 'Password@123'
        });
        
        // Should redirect to OTP page
        await expect(signupPage.page).toHaveURL(/.*otp-verification.*/, { timeout: 20000 });
    });

    test('TC-SIGNUP-002: Form validation for empty fields', async () => {
        await signupPage.click(signupPage['signupButton']);
        expect(await signupPage.getValidationError(0)).toContain('Please input your first name!');
        expect(await signupPage.getValidationError(2)).toContain('Please input your email!');
    });

    test('TC-SIGNUP-005: Password mismatch validation', async () => {
        await signupPage.register({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            country: 'India',
            password: 'Password@123',
            confirmPassword: 'WrongPassword@123'
        });
        expect(await signupPage.getValidationError(0)).toContain('The two passwords do not match!');
    });

    test('TC-SIGNUP-008: Back to Login link works', async () => {
        await signupPage.click(signupPage['backToLoginLink']);
        await expect(signupPage.page).toHaveURL(/.*login.*/);
    });
});
