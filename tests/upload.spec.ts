import { test, expect } from '@playwright/test';
import { UploadPage } from '../pages/UploadPage';
import path from 'path';

test.describe('Upload Module Tests', () => {
    // Tests must run in order: upload first, then verify, download, and delete last
    test.describe.configure({ mode: 'serial' });
    let uploadPage: UploadPage;

    test.beforeEach(async ({ page }) => {
        uploadPage = new UploadPage(page);
        await uploadPage.goTo();
    });

    test('TC-UP-001: Verify Document Upload Functionality', async ({ page }) => {
        const filePath = path.join(__dirname, '../test-assets/sample.pdf');
        await uploadPage.uploadFile(filePath);
        await page.waitForLoadState('networkidle');
        // Use cell role to target only the table cell, avoiding toast notifications
        await expect(page.getByRole('cell', { name: 'sample.pdf' })).toBeVisible({ timeout: 60000 });
    });

    test('TC-UP-002: Verify Document Table Columns', async ({ page }) => {
        const headers = page.locator('.ant-table-thead th');
        await expect(headers).toContainText(['Document Name', 'Size', 'Uploaded At', 'Actions']);
    });

    test('TC-UP-003: Verify Document Download', async ({ page }) => {
        const download = await uploadPage.downloadDocument('sample.pdf');
        expect(download.suggestedFilename()).toBe('sample.pdf');
    });

    test('TC-UP-005: Verify Document Deletion', async ({ page }) => {
        await uploadPage.deleteDocument('sample.pdf');
        await expect(page.getByText('sample.pdf')).not.toBeVisible();
    });
});
