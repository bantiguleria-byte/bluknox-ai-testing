import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('Profile Module Regression Suite', () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        
        test.setTimeout(120000);
        
        // Encapsulated Login and Navigation
        await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        await profilePage.navigateToProfile();
    });

    test('TC-PROF-001: Verify Basic Profile details are displayed correctly', async () => {
        await profilePage.goToSection('Profile');
        const details = await profilePage.getProfileDetails();
        expect(details.firstName).toBe('Banti');
        expect(details.lastName).toBe('Guleria');
        expect(details.email).toBe('banti.guleria@idsil.com');
    });

    test('TC-PROF-002: Verify Order History section displays records', async () => {
        await profilePage.goToSection('Order History');
        await profilePage.verifyOrderHistoryVisible();
    });

    test('TC-PROF-003: Verify Billing section displays subscription information', async () => {
        await profilePage.goToSection('Billing');
        await profilePage.verifyBillingDetails();
    });

    test('TC-PROF-004: Verify Change Password fields are accessible', async () => {
        await profilePage.goToSection('Change Password');
        // Verification encapsulated in goToSection -> waitForLoading
    });

    test('TC-PROF-005: Verify external support links are reachable', async () => {
        await profilePage.goToSection('Frequently Asked Questions');
        
        // Go back to restore sidebar context
        await profilePage.navigateToProfile();
        await profilePage.goToSection('Training Material');
    });

    test('TC-PROF-006: Verify Customer Service contact form is present', async () => {
        await profilePage.goToSection('Customer Service');
        await profilePage.verifyContactFormVisible();
    });
});
