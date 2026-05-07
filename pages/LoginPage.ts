import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
    }

    async goToLogin() {
        await this.navigateTo('/login');
    }

    async login(username: string, password: string) {
        await this.goToLogin();
        // If already logged in, the authenticated header controls are present.
        if (await this.authenticatedHeader().isVisible().catch(() => false)) {
            return;
        }

        if (!(await this.usernameInput.isVisible({ timeout: 30000 }).catch(() => false))) {
            if (await this.authenticatedHeader().isVisible().catch(() => false)) {
                return;
            }
            await this.goToLogin();
        }

        await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
        // Wait for profile icon to confirm successful login and session establishment
        // Increased timeout to 90s to handle extreme environmental lag
        await this.authenticatedHeader().waitFor({ state: 'visible', timeout: 90000 });
    }

    private authenticatedHeader(): Locator {
        return this.page.locator('.ant-dropdown-trigger')
            .or(this.page.locator('.ant-avatar'))
            .or(this.page.getByRole('button', { name: /cloud-upload|bell/i }))
            .first();
    }
}
