import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
    private readonly emailInput: Locator;
    private readonly sendOtpButton: Locator;
    private readonly backToLoginLink: Locator;
    private readonly otpInputs: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByPlaceholder(/email/i).first();
        this.sendOtpButton = page.getByRole('button', { name: /send otp|reset/i });
        this.backToLoginLink = page.getByText(/back.*login|sign in/i).first();
        this.otpInputs = page.locator('input[inputmode="numeric"], input[autocomplete="one-time-code"]');
    }

    async goTo() {
        await this.navigateTo('/forgot-password');
    }

    async requestOTP(email: string) {
        await this.type(this.emailInput, email);
        await this.click(this.sendOtpButton);
    }

    async verifyOTP(otp: string) {
        const count = await this.otpInputs.count();
        if (count > 1) {
            for (let i = 0; i < Math.min(count, otp.length); i++) {
                await this.otpInputs.nth(i).fill(otp[i]);
            }
        } else {
            await this.otpInputs.first().fill(otp);
        }
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getValidationError(index: number = 0): Promise<string> {
        const error = this.page.locator('.ant-form-item-explain-error').nth(index);
        return (await error.textContent()) || '';
    }

    async isOtpSectionVisible(): Promise<boolean> {
        try {
            await this.otpInputs.first().waitFor({ state: 'visible', timeout: 15000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
