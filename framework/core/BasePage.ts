import { Page, Locator, expect } from "@playwright/test";
import { AgentGuard } from "./AgentGuard";

export class BasePage {
    private guard: AgentGuard;

    constructor(public readonly page: Page) {
        this.guard = new AgentGuard();
    }

    async navigateTo(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' = 'domcontentloaded') {
        try {
            await this.page.goto(url, { waitUntil });
        } catch (error: unknown) {
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

    async waitForLoaderToDisappear() {
        await this.page.waitForLoadState("networkidle");
    }

    async click(locator: Locator | string) {
        const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
        this.guard.reset();
        
        while (true) {
            try {
                await loc.waitFor({ state: "visible", timeout: 10000 });
                await loc.click();
                break;
            } catch (error) {
                if (this.guard.canRetry()) {
                    this.guard.incrementRetry();
                    console.log(`Click failed, retrying (${this.guard.getRetries()})...`);
                    await this.page.waitForTimeout(1000);
                } else {
                    throw error;
                }
            }
        }
    }

    async type(locator: Locator | string, value: string) {
        const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
        this.guard.reset();

        while (true) {
            try {
                await loc.waitFor({ state: "visible", timeout: 10000 });
                await loc.fill(value);
                await expect(loc).toHaveValue(value);
                break;
            } catch (error) {
                if (this.guard.canRetry()) {
                    this.guard.incrementRetry();
                    console.log(`Type failed, retrying (${this.guard.getRetries()})...`);
                    await this.page.waitForTimeout(1000);
                } else {
                    throw error;
                }
            }
        }
    }

    async safeClick(locator: string) {
        await this.click(locator);
    }

    async safeFill(locator: string, value: string) {
        await this.type(locator, value);
    }

    async getText(locator: Locator | string): Promise<string> {
        const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
        return (await loc.textContent()) || '';
    }

    async isVisible(locator: Locator | string): Promise<boolean> {
        const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
        return await loc.isVisible();
    }

    async waitForElement(locator: Locator | string, timeout = 30000) {
        const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await loc.waitFor({ state: 'visible', timeout });
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