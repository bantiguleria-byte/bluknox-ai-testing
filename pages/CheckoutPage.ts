import { FrameLocator, Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly stripeEmailInput: Locator;
    private readonly subscribeButton: Locator;
    private readonly stripeFrameSelector = 'iframe[name^="__privateStripeFrame"], iframe[title*="Secure payment" i], iframe[src*="stripe" i]';

    constructor(page: Page) {
        super(page);
        this.stripeEmailInput = page.getByPlaceholder(/email/i).or(page.locator('input[type="email"]')).first();
        this.subscribeButton = page.getByRole('button', { name: /Subscribe|Pay/i }).or(page.locator('button.SubmitButton')).first();
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
                await this.page.waitForTimeout(200);
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

        const cardFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(cardInputSelector);
        const expiryFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(expiryInputSelector);
        const cvcFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(cvcInputSelector);
        const postalFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(postalInputSelector);

        const cardNumberInput = await this.firstVisibleLocator([
            this.page.getByRole('textbox', { name: /card number/i }).first(),
            this.page.getByPlaceholder(/1234 1234/i).first(),
            this.page.locator(cardInputSelector).first(),
            ...cardFrameLocators,
        ], 'Stripe card number input', 120000);

        const expiryInput = await this.firstVisibleLocator([
            this.page.getByRole('textbox', { name: /expiration|expiry/i }).first(),
            this.page.getByPlaceholder(/MM\s*\/\s*YY/i).first(),
            this.page.locator(expiryInputSelector).first(),
            ...expiryFrameLocators,
        ], 'Stripe expiry input', 30000);

        const cvcInput = await this.firstVisibleLocator([
            this.page.getByRole('textbox', { name: /cvc|security code/i }).first(),
            this.page.locator(cvcInputSelector).first(),
            ...cvcFrameLocators,
        ], 'Stripe CVC input', 30000);

        await cardNumberInput.fill(cardNumber);
        await expiryInput.fill(expiry);
        await cvcInput.fill(cvc);

        const postalInput = await this.firstVisibleLocator([
            this.page.locator(postalInputSelector).first(),
            ...postalFrameLocators,
        ], 'Stripe postal code input', 3000).catch(() => null);
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
        console.log("Waiting for Stripe content to load (waiting for skeletons to vanish)...");
        
        // Wait for ANY real content or the skeleton to be hidden
        const skeleton = this.page.locator('.Skeleton, .loading, .spinner').first();
        if (await skeleton.isVisible().catch(() => false)) {
            await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
        }
        
        // Give it a small extra buffer for Stripe's dynamic hydration
        await this.page.waitForTimeout(3000);
        
        // Capture a screenshot for debugging
        await this.page.screenshot({ path: `test-results/stripe-ready-${Date.now()}.png` });

        await this.handleStripeLinkChallenge(otp);
    }

    async getStripeErrorMessage(): Promise<string> {
        // Stripe uses various selectors for error messages depending on the field and context
        const errorElement = await this.firstVisibleLocator([
            this.page.locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError').first(),
            this.stripeFrame().locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError').first()
        ], 'Stripe validation error', 15000);
        return (await errorElement.textContent()) || '';
    }

    private stripeFrame(selector = this.stripeFrameSelector): FrameLocator {
        return this.page.frameLocator(selector).first();
    }

    private cardNumberLocators(): Locator[] {
        const selector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
        return [
            this.page.getByRole('textbox', { name: /card number/i }).first(),
            this.page.getByPlaceholder(/1234 1234/i).first(),
            this.page.locator(selector).first(),
        ];
    }

    private cardExpiryLocators(): Locator[] {
        const selector = '#cardExpiry, #Field-expiryInput, input[name="exp-date"], input[name="cardExpiry"], input[autocomplete="cc-exp"]';
        return [
            this.page.getByRole('textbox', { name: /expiration|expiry/i }).first(),
            this.page.getByPlaceholder(/MM\s*\/\s*YY/i).first(),
            this.page.locator(selector).first(),
        ];
    }

    private cardCvcLocators(): Locator[] {
        const selector = '#cardCvc, #Field-cvcInput, input[name="cvc"], input[name="cardCvc"], input[autocomplete="cc-csc"]';
        return [
            this.page.getByRole('textbox', { name: /cvc|security code/i }).first(),
            this.page.locator(selector).first(),
        ];
    }

    private postalCodeLocators(): Locator[] {
        const selector = '#billingPostalCode, #Field-postalCodeInput, input[name="postal"], input[name="postalCode"], input[autocomplete="postal-code"]';
        return [
            this.page.locator(selector).first(),
        ];
    }

    /**
     * Dynamically scans all available Stripe iframes (by actual count) and returns
     * a flat list of Locators for the given inputSelector found inside each frame.
     * This avoids the brittle nth(N) hardcoding that crashes when fewer iframes exist.
     */
    private async stripeFrameInputLocatorsFromLiveFrames(inputSelector: string): Promise<Locator[]> {
        const allIframes = this.page.locator(this.stripeFrameSelector);
        const count = await allIframes.count();
        const locators: Locator[] = [];
        for (let i = 0; i < count; i++) {
            locators.push(
                this.page.frameLocator(this.stripeFrameSelector).nth(i).locator(inputSelector).first()
            );
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
        const cardNumberInput = await this.firstVisibleLocator(
            await this.buildCardNumberLocators(), 'Stripe card number input', 5000
        ).catch(() => null);
        if (!cardNumberInput) {
            return;
        }

        const existingValue = await cardNumberInput.inputValue().catch(() => '');
        if (existingValue.trim()) {
            return;
        }

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
        // Wait for skeleton/loading to disappear first
        const skeleton = this.page.locator('.Skeleton, .loading, .spinner').first();
        if (await skeleton.isVisible().catch(() => false)) {
            await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
        }

        // --- Strategy 1: Click "Pay without Link" if visible (preferred — bypasses Link entirely) ---
        // Give it up to 15s since Stripe can be slow to render the Link challenge screen.
        const frameLocators = await this.stripeFramePayWithoutLinkLocators();
        const payWithoutLink = await this.firstVisibleLocator([
            this.page.getByRole('button', { name: /pay without link/i }).first(),
            this.page.getByText(/pay without link/i).first(),
            ...frameLocators
        ], 'Pay without Link control', 15000).catch(() => null);

        if (payWithoutLink) {
            console.log('Clicking "Pay without Link" to bypass Stripe Link challenge...');
            await payWithoutLink.click({ force: true });
            // Wait for card form to appear after bypassing Link
            await this.page.waitForLoadState('domcontentloaded').catch(() => {});
            await this.page.waitForTimeout(2000);
            return;
        }

        // --- Strategy 2: Fill the Stripe Link OTP (6-character security code) ---
        // Stripe test mode accepts "000000"
        const otpInputs = this.page.locator(
            'input[inputmode="numeric"], input[autocomplete="one-time-code"], ' +
            '[aria-label*="Security code character"]'
        );
        if (await otpInputs.first().isVisible({ timeout: 5000 }).catch(() => false)) {
            console.log('Filling Stripe Link OTP challenge...');
            const count = await otpInputs.count();
            if (count > 1) {
                // Character-by-character OTP boxes
                const otpStr = otp.padStart(count, '0');
                for (let i = 0; i < count; i++) {
                    await otpInputs.nth(i).fill(otpStr[i]);
                }
            } else {
                await otpInputs.first().fill(otp);
            }
            // Wait for Stripe to process OTP and show the card form
            await this.page.waitForTimeout(3000);
            await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        }
    }

    private async firstVisibleLocator(locators: Locator[], label: string, timeout: number): Promise<Locator> {
        const deadline = Date.now() + timeout;
        let lastError: unknown;
        // Minimum per-locator attempt window: 2000ms to avoid 1ms races
        const perAttemptMs = 2000;

        while (Date.now() < deadline) {
            for (const locator of locators) {
                try {
                    const remaining = deadline - Date.now();
                    if (remaining <= 0) break;
                    await locator.waitFor({ state: 'visible', timeout: Math.min(perAttemptMs, remaining) });
                    return locator;
                } catch (error) {
                    lastError = error;
                }
            }
        }

        throw new Error(`CRITICAL: ${label} was not visible before timeout. ${String(lastError ?? '')}`);
    }

    /**
     * Builds card number locators combining page-level and live iframe locators.
     */
    private async buildCardNumberLocators(): Promise<Locator[]> {
        const inputSelector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
        const frameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(inputSelector);
        return [
            this.page.getByRole('textbox', { name: /card number/i }).first(),
            this.page.getByPlaceholder(/1234 1234/i).first(),
            this.page.locator(inputSelector).first(),
            ...frameLocators,
        ];
    }

    async getEmailValue(): Promise<string> {
        return await this.stripeEmailInput.inputValue();
    }
}
