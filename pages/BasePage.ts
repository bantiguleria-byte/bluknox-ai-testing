import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' = 'load') {
        await this.page.goto(url, { waitUntil });
    }

    async click(locator: Locator) {
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        await locator.click();
    }

    async type(locator: Locator, text: string) {
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        return (await locator.textContent()) || '';
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async waitForElement(locator: Locator, timeout = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
    }
}
