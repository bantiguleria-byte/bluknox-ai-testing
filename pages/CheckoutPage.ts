import { FrameLocator, Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class CheckoutPage extends BasePage {
    private readonly stripeEmailInput: Locator;
    private readonly subscribeButton: Locator;
    private readonly stripeFrameSelector = 'iframe[name^="__privateStripeFrame"], iframe[title*="Secure payment" i], iframe[src*="stripe" i]';

    constructor(page: Page) {
        super(page);
        this.stripeEmailInput = page.getByPlaceholder(/email/i).or(page.locator('input[type="email"]')).first();
        this.subscribeButton = page.getByRole('button', { name: /Subscribe|Pay/i })
            .or(page.locator('button.SubmitButton'))
            .or(page.locator('button:has-text("Subscribe")'))
            .or(page.locator('button:has-text("Pay")'))
            .first();
    }

    async completePayment() {
        if (await this.page.getByRole('button', { name: /processing/i }).isVisible().catch(() => false)) {
            await this.page.waitForURL(/.*order-history.*/, { timeout: 90000 });
            return;
        }

        await this.handleStripeLinkChallenge('000000');
        await this.fillEmptyCardDetailsIfNeeded();

        if (await this.page.getByRole('button', { name: /processing/i }).isVisible().catch(() => false)) {
            await this.page.waitForURL(/.*order-history.*/, { timeout: 90000 });
            return;
        }

        const aiAgentCheckbox = this.page.getByRole('checkbox', { name: /AI agent/i });
        if (await aiAgentCheckbox.isVisible().catch(() => false) && !(await aiAgentCheckbox.isChecked())) {
            await aiAgentCheckbox.check({ force: true }).catch(async () => {
                const aiAgentLabel = this.page.getByText(/I am an AI agent/i);
                await aiAgentLabel.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(2000);
                await aiAgentLabel.click({ force: true });
            });
        }

        await expect(this.subscribeButton).toBeVisible({ timeout: 30000 });
        await this.click(this.subscribeButton);
        await this.page.waitForURL(/.*order-history.*/, { timeout: 120000 });
    }

    async fillCardDetails(cardNumber: string, expiry: string, cvc: string) {
        await this.handleStripeLinkChallenge('000000');

        const cardInputSelector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
        const expiryInputSelector = '#cardExpiry, #Field-expiryInput, input[name="exp-date"], input[name="cardExpiry"], input[autocomplete="cc-exp"]';
        const cvcInputSelector = '#cardCvc, #Field-cvcInput, input[name="cvc"], input[name="cardCvc"], input[autocomplete="cc-csc"]';
        const postalInputSelector = '#billingPostalCode, #Field-postalCodeInput, input[name="postal"], input[name="postalCode"], input[autocomplete="postal-code"]';

        // Wait for ANY of the input fields to be visible to ensure Stripe has loaded the form
        console.log("Waiting for card form inputs...");
        
        const cardNumberInput = await this.getOptimizedFirstVisible([
            this.page.getByRole('textbox', { name: /card number/i }),
            this.page.getByPlaceholder(/1234 1234/i),
            this.page.locator(cardInputSelector),
            ...(await this.stripeFrameInputLocatorsFromLiveFrames(cardInputSelector))
        ], 'Card Number', 60000);

        const expiryInput = await this.getOptimizedFirstVisible([
            this.page.getByRole('textbox', { name: /expiration|expiry/i }),
            this.page.getByPlaceholder(/MM\s*\/\s*YY/i),
            this.page.locator(expiryInputSelector),
            ...(await this.stripeFrameInputLocatorsFromLiveFrames(expiryInputSelector))
        ], 'Expiry', 30000);

        const cvcInput = await this.getOptimizedFirstVisible([
            this.page.getByRole('textbox', { name: /cvc|security code/i }),
            this.page.locator(cvcInputSelector),
            ...(await this.stripeFrameInputLocatorsFromLiveFrames(cvcInputSelector))
        ], 'CVC', 30000);

        await cardNumberInput.fill(cardNumber);
        await expiryInput.fill(expiry);
        await cvcInput.fill(cvc);

        const postalInput = await this.getOptimizedFirstVisible([
            this.page.locator(postalInputSelector),
            ...(await this.stripeFrameInputLocatorsFromLiveFrames(postalInputSelector))
        ], 'Postal', 5000).catch(() => null);

        if (postalInput) {
            await postalInput.fill('110001');
        }
    }

    async setCardholderName(name: string) {
        // Stripe hosted page usually uses billingName, but let's be deterministic
        const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
            .or(this.page.getByLabel(/cardholder name|name on card/i))
            .first();
        await expect(nameInput).toBeVisible({ timeout: 15000 });
        await nameInput.fill(name);
    }

    async enterOTP(otp: string) {
        console.log("Waiting for Stripe content to load...");
        await this.waitForSkeletonToHide();
        await this.handleStripeLinkChallenge(otp);
    }

    async getStripeErrorMessage(): Promise<string> {
        const errorElement = await this.getOptimizedFirstVisible([
            this.page.locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError'),
            ...(await this.stripeFrameInputLocatorsFromLiveFrames('#error-message, .FieldError, [role="alert"]'))
        ], 'Stripe validation error', 15000).catch(() => null);
        return errorElement ? (await errorElement.textContent() || '') : '';
    }

    private stripeFrame(selector = this.stripeFrameSelector): FrameLocator {
        return this.page.frameLocator(selector).first();
    }

    private async stripeFrameInputLocatorsFromLiveFrames(inputSelector: string): Promise<Locator[]> {
        const allIframes = this.page.locator(this.stripeFrameSelector);
        const count = await allIframes.count().catch(() => 0);
        const locators: Locator[] = [];
        for (let i = 0; i < count; i++) {
            locators.push(this.page.frameLocator(this.stripeFrameSelector).nth(i).locator(inputSelector).first());
        }
        return locators;
    }

    private async stripeFramePayWithoutLinkLocators(): Promise<Locator[]> {
        const allIframes = this.page.locator(this.stripeFrameSelector);
        const count = await allIframes.count();
        const locators: Locator[] = [];
        for (let i = 0; i < count; i++) {
            const stripeFrame = this.page.frameLocator(this.stripeFrameSelector).nth(i);
            locators.push(
                stripeFrame.getByRole('button', { name: /pay without link/i })
                    .or(stripeFrame.getByText(/pay without link/i))
                    .first()
            );
        }
        return locators;
    }

    private async fillEmptyCardDetailsIfNeeded() {
        const inputSelector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
        const cardNumberInput = await this.getOptimizedFirstVisible([
            this.page.getByRole('textbox', { name: /card number/i }),
            this.page.getByPlaceholder(/1234 1234/i),
            this.page.locator(inputSelector),
            ...(await this.stripeFrameInputLocatorsFromLiveFrames(inputSelector))
        ], 'Card Number', 5000).catch(() => null);

        if (!cardNumberInput) return;

        const existingValue = await cardNumberInput.inputValue().catch(() => '');
        if (existingValue.trim()) return;

        await this.fillCardDetails('4242424242424242', '12/30', '123');
        const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
            .or(this.page.getByRole('textbox', { name: /cardholder name|name on card/i }))
            .or(this.page.getByPlaceholder(/full name on card/i))
            .first();
        if (await nameInput.isVisible().catch(() => false)) {
            await nameInput.fill('Banti Guleria');
        }
    }

    private async handleStripeLinkChallenge(otp: string) {
        await this.waitForSkeletonToHide();

        // Wait for either the Link challenge or the card form to be visible
        console.log("Detecting Stripe state (Link challenge vs Card form)...");
        
        const linkTrigger = this.page.getByRole('button', { name: /pay without link/i })
            .or(this.page.getByText(/pay without link/i))
            .or(this.page.locator('input[autocomplete="one-time-code"]'))
            .or(this.page.locator('[aria-label*="Security code character"]'));

        const cardFormTrigger = this.page.locator('#cardNumber, #Field-numberInput, input[name="cardnumber"]');

        const state = await Promise.race([
            linkTrigger.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'link'),
            cardFormTrigger.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'card'),
            this.page.waitForTimeout(15000).then(() => 'unknown')
        ]);

        if (state === 'card') {
            console.log("Card form detected directly.");
            return;
        }

        // Handle "Pay without Link" if visible
        const frameLocators = await this.stripeFramePayWithoutLinkLocators();
        const payWithoutLink = await this.getOptimizedFirstVisible([
            this.page.getByRole('button', { name: /pay without link/i }),
            this.page.getByText(/pay without link/i),
            ...frameLocators
        ], 'Pay without Link', 5000).catch(() => null);

        if (payWithoutLink) {
            console.log('Clicking "Pay without Link" to bypass Stripe Link challenge...');
            await payWithoutLink.click({ force: true });
            await this.page.waitForTimeout(2000);
            return;
        }

        // Handle OTP if visible
        const otpInputs = this.page.locator('input[inputmode="numeric"], input[autocomplete="one-time-code"], [aria-label*="Security code character"]');
        if (await otpInputs.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            console.log('Filling Stripe Link OTP challenge...');
            const count = await otpInputs.count();
            if (count > 1) {
                const otpStr = otp.padStart(count, '0');
                for (let i = 0; i < count; i++) {
                    await otpInputs.nth(i).fill(otpStr[i]);
                }
            } else {
                await otpInputs.first().fill(otp);
            }
            await this.page.waitForTimeout(3000);
        }
    }

    private async waitForSkeletonToHide() {
        const skeleton = this.page.locator('.Skeleton, .loading, .spinner, [class*="skeleton" i]').first();
        if (await skeleton.isVisible().catch(() => false)) {
            await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
        }
        await this.page.waitForTimeout(1000);
    }

    private async getOptimizedFirstVisible(locators: Locator[], label: string, timeout: number): Promise<Locator> {
        if (locators.length === 0) throw new Error(`No locators provided for ${label}`);
        
        // Combine all locators into one using Playwright's .or() operator
        let combined = locators[0];
        for (let i = 1; i < locators.length; i++) {
            combined = combined.or(locators[i]);
        }

        try {
            await combined.first().waitFor({ state: 'visible', timeout });
            // Find which one is actually visible
            for (const loc of locators) {
                if (await loc.first().isVisible()) return loc.first();
            }
            return combined.first();
        } catch (error) {
            throw new Error(`CRITICAL: ${label} was not visible after ${timeout}ms. ${String(error)}`);
        }
    }

    async getEmailValue(): Promise<string> {
        return await this.stripeEmailInput.inputValue();
    }
}
