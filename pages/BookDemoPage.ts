import { Page, Locator } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class BookDemoPage extends BasePage {
    readonly requestDemoBtn: Locator;
    readonly nameInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.requestDemoBtn = page.getByRole('button', { name: /Request Demo/i }).first();
        this.nameInput = page.locator('#name');
        this.phoneInput = page.locator('input[type="tel"]').or(page.locator('input[placeholder*="702"]')).first();
        this.emailInput = page.locator('#email');
        this.messageInput = page.locator('#message');
        this.submitBtn = page.getByRole('button', { name: /Submit/i }).first();
    }

    async navigateAndScrollToDemoSection() {
        await this.page.goto('/', { waitUntil: 'load' });
        const triggerCard = this.page.getByRole('heading', { name: /Book a Demo/i }).first();
        await triggerCard.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
    }

    async clickRequestDemo() {
        await this.requestDemoBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.requestDemoBtn.click();
        await this.page.waitForURL(/.*contact-us.*/, { timeout: 15000 });
    }

    async fillForm(details: { name?: string, phone?: string, email?: string, message?: string }) {
        if (details.name !== undefined) {
            await this.nameInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.nameInput.fill(details.name);
        }
        if (details.phone !== undefined) {
            await this.phoneInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.phoneInput.fill(details.phone);
        }
        if (details.email !== undefined) {
            await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.emailInput.fill(details.email);
        }
        if (details.message !== undefined) {
            await this.messageInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.messageInput.fill(details.message);
        }
    }

    async submitForm() {
        await this.submitBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.submitBtn.click();
    }

    async getErrorMessage(field: 'name' | 'phone' | 'email' | 'message'): Promise<string> {
        const input = field === 'name' ? this.nameInput :
                      field === 'phone' ? this.phoneInput :
                      field === 'email' ? this.emailInput :
                      this.messageInput;
                      
        const container = this.page.locator('.ant-form-item').filter({ has: input });
        const errorMsg = container.locator('.ant-form-item-explain-error').first();
        
        try {
            await errorMsg.waitFor({ state: 'visible', timeout: 5000 });
            return (await errorMsg.textContent().catch(() => '')) || '';
        } catch {
            return '';
        }
    }
}
