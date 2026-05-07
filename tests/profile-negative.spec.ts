import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('Profile Module Negative Validation Suite', () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
        await profilePage.navigateToProfile();
    });

    test('TC-PROF-NEG-001: Change Password - New password and Confirm password mismatch', async () => {
        await profilePage.goToSection('Change Password');
        await profilePage.updatePassword('Test@12345', 'NewPass123!', 'DifferentPass123!');
        await profilePage.verifyErrorMessage(/match/i);
    });

    test('TC-PROF-NEG-002: Verify mandatory fields validation (Empty First Name)', async () => {
        await profilePage.goToSection('Profile');
        await profilePage.updateProfile({ firstName: '' });
        await profilePage.verifyErrorMessage(/required/i);
    });

    test('TC-PROF-NEG-003: Change Password - Incorrect Old Password', async () => {
        await profilePage.goToSection('Change Password');
        await profilePage.updatePassword('WrongPassword123', 'NewPass123!', 'NewPass123!');
        // Should show notification or error message
        await profilePage.verifyErrorMessage(/.*/); 
    });
});
