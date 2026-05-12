import { Page, Locator } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class SignupPage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly countrySelect: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly signupButton: Locator;
    private readonly backToLoginLink: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.countrySelect = page.locator('#register_country');
        this.passwordInput = page.getByPlaceholder('Password', { exact: true });
        this.confirmPasswordInput = page.getByPlaceholder('Confirm Password');
        this.signupButton = page.getByRole('button', { name: 'Create Account' });
        this.backToLoginLink = page.locator('a[href="/login"]');
    }

    async goTo() {
        await this.navigateTo('/signup');
    }

    async register(details: {
        firstName?: string;
        lastName?: string;
        email?: string;
        country?: string;
        password?: string;
        confirmPassword?: string;
    }) {
        if (details.firstName) await this.type(this.firstNameInput, details.firstName);
        if (details.lastName) await this.type(this.lastNameInput, details.lastName);
        if (details.email) await this.type(this.emailInput, details.email);
        
        if (details.country) {
            await this.countrySelect.click();
            await this.countrySelect.fill(details.country);
            const option = this.page.locator('.ant-select-item-option-content')
                .filter({ hasText: new RegExp(`^${details.country}$`, 'i') })
                .first();
            await option.click();
        }

        if (details.password) await this.type(this.passwordInput, details.password);
        if (details.confirmPassword) await this.type(this.confirmPasswordInput, details.confirmPassword);
        
        await this.click(this.signupButton);
    }

    async getValidationError(index: number = 0): Promise<string> {
        const error = this.page.locator('.ant-form-item-explain-error').nth(index);
        return (await error.textContent()) || '';
    }

    async isOtpPage(): Promise<boolean> {
        return this.page.url().includes('/otp-verification');
    }
}
