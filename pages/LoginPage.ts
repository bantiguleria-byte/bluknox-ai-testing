import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#login_email');
        this.passwordInput = page.locator('#login_password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
    }

    async goToLogin() {
        await this.navigateTo('https://staging.bluknox.com/login');
    }

    async login(username: string, password: string) {
        await this.goToLogin();
        await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }
}
