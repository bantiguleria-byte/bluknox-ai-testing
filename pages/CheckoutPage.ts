import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly stripeEmailInput: Locator;
    private readonly subscribeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.stripeEmailInput = page.locator('input#email');
        this.subscribeButton = page.locator('button.SubmitButton');
    }

    async completePayment() {
        // Wait for Stripe to load
        await this.stripeEmailInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.click(this.subscribeButton);
    }

    async getEmailValue(): Promise<string> {
        return await this.stripeEmailInput.inputValue();
    }
}
