import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';

test.describe('Profile Module Tests', () => {
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        profilePage = new ProfilePage(page);
        await profilePage.goTo();
    });

    test('TC-PR-001: Verify Basic Details Rendering', async ({ page }) => {
        await expect(page.locator('#first_name')).toBeVisible();
        await expect(page.locator('#last_name')).toBeVisible();
        await expect(page.locator('#email')).toBeVisible();
    });

    test('TC-PR-002: Verify Email Field Visibility', async ({ page }) => {
        await expect(page.locator('#email')).toBeVisible();
    });

    test('TC-PR-003: Verify Gender Selection', async ({ page }) => {
        await profilePage.selectGender('Female');
        await expect(page.getByRole('radio', { name: 'Female', exact: true })).toBeChecked();
        
        await profilePage.selectGender('Male');
        await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeChecked();
        await expect(page.getByRole('radio', { name: 'Female', exact: true })).not.toBeChecked();
    });

    test('TC-PR-004: Verify Tab Navigation', async ({ page }) => {
        await profilePage.switchTab('Address Details');
        // After clicking, verify the heading changes to "Address Details"
        await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible({ timeout: 10000 });
        
        await profilePage.switchTab('Basic Details');
        await expect(page.getByRole('heading', { name: 'Profile Settings' })).toBeVisible({ timeout: 10000 });
    });
});
