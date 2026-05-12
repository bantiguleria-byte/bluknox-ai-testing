import { Page, Locator } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class UploadPage extends BasePage {
    private readonly uploadButton: Locator;
    private readonly documentTable: Locator;
    private readonly shareIcon: Locator;
    private readonly downloadIcon: Locator;
    private readonly deleteIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.uploadButton = page.getByRole('button', { name: /Click to Upload/i });
        this.documentTable = page.getByRole('table');
        this.shareIcon = page.getByRole('button', { name: 'share-alt' });
        this.downloadIcon = page.getByRole('button', { name: 'download' });
        this.deleteIcon = page.getByRole('button', { name: 'delete' });
    }

    async goTo() {
        await this.navigateTo('/upload');
    }

    async uploadFile(filePath: string) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.click(this.uploadButton),
        ]);
        await fileChooser.setFiles(filePath);
    }

    async getDocumentRow(name: string): Promise<Locator> {
        return this.page.getByRole('row').filter({ hasText: name });
    }

    async downloadDocument(name: string) {
        const row = await this.getDocumentRow(name);
        const downloadBtn = row.getByRole('button', { name: 'download' });
        
        // Clicking download opens a new tab to a file-share disclaimer page
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            downloadBtn.click(),
        ]);
        
        // Wait for the disclaimer page to load in the new tab
        await popup.waitForLoadState('load');
        
        // Click "Yes" on the disclaimer page to initiate the actual download
        const [download] = await Promise.all([
            popup.waitForEvent('download', { timeout: 30000 }),
            popup.getByRole('button', { name: 'Yes' }).click(),
        ]);
        
        return download;
    }

    async deleteDocument(name: string) {
        const row = await this.getDocumentRow(name);
        const deleteBtn = row.getByRole('button', { name: 'delete' });
        await deleteBtn.click();
        
        // Handle confirmation modal
        const okButton = this.page.getByRole('button', { name: 'OK' });
        await okButton.waitFor({ state: 'visible', timeout: 5000 });
        await okButton.click();

        // Wait for success toast notification
        await this.page.getByText(/deleted successfully/i).waitFor({ state: 'visible', timeout: 10000 });
    }

    async shareDocument(name: string) {
        const row = await this.getDocumentRow(name);
        // Find the share button by its icon's aria-label
        const shareBtn = row.locator('button').filter({ has: this.page.locator('span[aria-label="share-alt"]') });
        await shareBtn.waitFor({ state: 'visible', timeout: 15000 });
        await shareBtn.click();
    }
}
