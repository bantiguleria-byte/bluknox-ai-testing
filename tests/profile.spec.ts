import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('Profile Module Regression Suite', () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        // 1. Login successfully
        await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        
        // 2. Navigate to Profile via header dropdown
        await profilePage.navigateToProfile();
    });

    test('Verify Profile dashboard tabs navigation', async () => {
        console.log('Verifying Profile section...');
        await profilePage.goToSection('Profile');
        await expect(profilePage.page.getByText('Profile Settings').first()).toBeVisible();

        console.log('Verifying Order History section...');
        await profilePage.goToSection('Order History');
        await profilePage.verifyOrderHistoryVisible();

        console.log('Verifying Billing section...');
        await profilePage.goToSection('Billing');
        await profilePage.verifyBillingDetails();

        console.log('Verifying Change Password section...');
        await profilePage.goToSection('Change Password');
        await expect(profilePage.page.getByRole('heading', { name: /Change Password/i })
            .or(profilePage.page.locator('form').getByText(/Change Password/i))
            .first()).toBeVisible();

        console.log('Verifying FAQ section...');
        await profilePage.goToSection('Frequently Asked Questions');
        
        // Navigation Reset: FAQ opens in a help center (external-like), sidebar may be gone.
        // The goToSection for FAQ already asserts the URL.
        
        console.log('Returning to Profile to restore sidebar...');
        await profilePage.navigateToProfile();

        console.log('Verifying Training Material section...');
        await profilePage.goToSection('Training Material');
    });
});
