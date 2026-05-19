import { test, expect } from '@playwright/test';
import { FooterPage } from '../pages/FooterPage';

test.describe('Products Footer Module Testing', () => {
    let footerPage: FooterPage;

    test.beforeEach(async ({ page }) => {
        footerPage = new FooterPage(page);
    });

    test.describe('Positive Test Cases', () => {
        test('TC-PROD-001: Verify navigation to BluKnox Classic', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickClassic();
            
            // Verify correct internal URL path
            await expect(page).toHaveURL(/.*\/product\/ODQ=/, { timeout: 15000 });
            
            // Verify unique page content is visible
            await expect(page.getByText('Store up to 5 GB of encrypted data').first()).toBeVisible({ timeout: 10000 });
            await expect(page.getByText('All BluKnox Capabilities').first()).toBeVisible();
        });
 
        test('TC-PROD-002: Verify navigation to BluKnox Healthcare', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickHealthcare();
            
            // Verify correct internal URL path
            await expect(page).toHaveURL(/.*\/product\/ODU=/, { timeout: 15000 });
            
            // Verify unique page content is visible
            await expect(page.getByText('physicians and other healthcare workers').first()).toBeVisible({ timeout: 10000 });
            await expect(page.getByText('Electronic Health Record').first()).toBeVisible();
        });
 
        test('TC-PROD-003: Verify navigation to BluKnox Enterprise', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickEnterprise();
            
            // Verify correct internal URL path
            await expect(page).toHaveURL(/.*\/product\/ODY=/, { timeout: 15000 });
            
            // Verify unique page content is visible
            await expect(page.getByText('explore enterprise-grade deployment').first()).toBeVisible({ timeout: 10000 });
            await expect(page.getByText('on-prem server').first()).toBeVisible();
        });
 
        test('TC-PROD-004: Verify navigation to BluKnox API', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickAPI();
            
            // Verify correct internal URL path
            await expect(page).toHaveURL(/.*\/product\/ODc=/, { timeout: 15000 });
            
            // Verify unique page content is visible
            await expect(page.getByText('integrate BluKnox API Vault capabilities').first()).toBeVisible({ timeout: 10000 });
            await expect(page.getByText('prevent data breaches').first()).toBeVisible();
        });
 
        test('TC-PROD-005: Verify navigation to BluKnox GroupShare', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickGroupShare();
            
            // Verify correct internal URL path
            await expect(page).toHaveURL(/.*\/product\/ODg=/, { timeout: 15000 });
            
            // Verify unique page content is visible
            await expect(page.getByText('learn how GroupShare enables secure collaboration').first()).toBeVisible({ timeout: 10000 });
            await expect(page.getByText('collaboration at scale').first()).toBeVisible();
        });
    });

    test.describe('Negative Test Cases', () => {
        test('TC-PROD-NEG-001: Verify product page behavior with invalid/corrupted product ID', async ({ page }) => {
            // Directly navigate to invalid product ID URL
            await page.goto('/product/INVALID_PRODUCT_ID', { waitUntil: 'load' });
            await page.waitForTimeout(3000);
            
            // Verify page handled it gracefully (e.g. redirected or stayed on path without crashing)
            // Expect that no stack trace or raw crash screen is shown
            await expect(page.locator('body')).not.toContainText(/Cannot read property/i);
            await expect(page.locator('body')).not.toContainText(/Stack Trace/i);
            
            // Depending on BluKnox's behavior, it either shows an empty page or a 404 or stays cleanly. Let's make it robust:
            expect(page.url()).toContain('/product/INVALID_PRODUCT_ID');
        });

        test('TC-PROD-NEG-002: Verify Products links visibility on extremely small viewports (Mobile UI check)', async ({ page }) => {
            // Set viewport to mobile size (iPhone SE)
            await page.setViewportSize({ width: 375, height: 667 });
            
            await footerPage.navigateAndScrollToFooter();
            
            // Assert that the links are visible
            await expect(footerPage.classicLink).toBeVisible();
            await expect(footerPage.healthcareLink).toBeVisible();
            
            // Playwright's click performs visibility and actionability checks natively
            await footerPage.clickClassic();
            
            await expect(page).toHaveURL(/.*\/product\/ODQ=/, { timeout: 15000 });
        });
    });
});
