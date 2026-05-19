import { test, expect } from '@playwright/test';
import { FooterPage } from '../pages/FooterPage';

test.describe('Quick Links Module Testing', () => {
    let footerPage: FooterPage;

    test.beforeEach(async ({ page }) => {
        footerPage = new FooterPage(page);
    });

    test.describe('Positive Test Cases', () => {
        test('TC-QL-001: Verify navigation to ONC Health IT Certification CHPL Listing', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            
            // Setup a promise to catch the new page/tab or the redirection
            // Since it's an external link, it might open in a new tab. If not, it will navigate the main page.
            // Using Promise.race to handle both scenarios (new tab vs same tab redirection)
            await footerPage.clickCHPLListing();
            
            // Verify redirection to CHPL
            await expect(page).toHaveURL(/.*chpl\.healthit\.gov.*/, { timeout: 15000 });
        });

        test('TC-QL-002: Verify navigation to ONC Health IT Certification Mandatory Disclosures', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickMandatoryDisclosures();
            
            await expect(page).toHaveURL(/.*intellixs\.com.*Mandatory%20Disclosures\.html.*/, { timeout: 15000 });
        });

        test('TC-QL-003: Verify navigation to Patient Data Export Format', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            await footerPage.clickExportFormat();
            
            await expect(page).toHaveURL(/.*intellixs\.com.*Patient%20Data%20Export%20Format\.html.*/, { timeout: 15000 });
        });
    });

    test.describe('Negative Test Cases', () => {
        test('TC-QL-NEG-001: Verify Quick Links behavior when external site is unreachable (Simulate 500/404)', async ({ page }) => {
            await footerPage.navigateAndScrollToFooter();
            
            // Intercept and mock 500 error for CHPL
            await page.route('**/*chpl.healthit.gov*/**', route => {
                route.fulfill({
                    status: 500,
                    contentType: 'text/html',
                    body: '<h1>500 Internal Server Error</h1>'
                });
            });

            await footerPage.clickCHPLListing();
            
            // Verify that we are navigated there and the mock 500 is served without crashing the main context
            await expect(page).toHaveURL(/.*chpl\.healthit\.gov.*/, { timeout: 15000 });
            await expect(page.locator('h1')).toHaveText('500 Internal Server Error');
        });

        test('TC-QL-NEG-002: Verify Quick Links visibility on extremely small viewports (Mobile UI check)', async ({ page }) => {
            // Set viewport to mobile size (e.g., iPhone SE)
            await page.setViewportSize({ width: 375, height: 667 });
            
            await footerPage.navigateAndScrollToFooter();
            
            // Assert that the links are fully visible and clickable (Playwright checks for obscured elements natively on click)
            await expect(footerPage.chplListingLink).toBeVisible();
            await expect(footerPage.mandatoryDisclosuresLink).toBeVisible();
            await expect(footerPage.exportFormatLink).toBeVisible();
            
            // Perform a robust click to ensure no overlapping elements are blocking it in mobile view
            await footerPage.clickCHPLListing();
            
            await expect(page).toHaveURL(/.*chpl\.healthit\.gov.*/, { timeout: 15000 });
        });
    });
});
