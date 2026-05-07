import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' = 'domcontentloaded') {
        try {
            await this.page.goto(url, { waitUntil });
        } catch (error: unknown) {
            // Retry once for transient network errors
            const message = error instanceof Error ? error.message : String(error);
            if (/ERR_CONNECTION_RESET|ERR_TIMED_OUT|ERR_NAME_NOT_RESOLVED|timeout|timed out/i.test(message)) {
                console.log(`Navigation to ${url} failed, retrying once...`);
                await this.page.waitForTimeout(2000);
                await this.page.goto(url, { waitUntil });
            } else {
                throw error;
            }
        }
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async type(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) || '';
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async waitForElement(locator: Locator, timeout = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async logout() {
        const profileIcon = this.page.locator('.ant-dropdown-trigger').first();
        await profileIcon.click({ force: true });
        const logoutButton = this.page.getByText('Logout', { exact: true });
        await this.click(logoutButton);
        await this.page.waitForURL(url => url.pathname === '/' || url.pathname.includes('login'), { timeout: 15000 });
        await expect(this.page.getByRole('button', { name: /Login/i }).or(this.page.getByText('Sign in'))).toBeVisible();
    }
}
