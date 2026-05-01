import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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
        await this.navigateTo('https://staging.bluknox.com/upload');
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
        // Assuming a confirmation modal appears
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async shareDocument(name: string) {
        const row = await this.getDocumentRow(name);
        const shareBtn = row.getByRole('button', { name: 'share-alt' });
        await shareBtn.click();
    }
}
