import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Module Regression Suite', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToLogin();
    });

    test('TC-LOGIN-001: Successful login with valid credentials', async () => {
        await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        expect(await loginPage.isLoggedIn()).toBe(true);
    });

    test('TC-LOGIN-002: Login with empty fields', async () => {
        await loginPage.click(loginPage['loginButton']); // Accessing private for quick validation test
        expect(await loginPage.getValidationError(0)).toContain('Please input your email!');
        expect(await loginPage.getValidationError(1)).toContain('Please input your password!');
    });

    test('TC-LOGIN-004: Login with invalid email format', async () => {
        await loginPage.type(loginPage['usernameInput'], 'invalidemail');
        await loginPage.click(loginPage['loginButton']);
        expect(await loginPage.getValidationError(0)).toContain('Please enter a valid email!');
    });

    test('TC-LOGIN-008: Navigation to Forgot Password', async () => {
        await loginPage.goToForgotPassword();
        await expect(loginPage.page).toHaveURL(/.*forgot-password.*/);
    });
});
