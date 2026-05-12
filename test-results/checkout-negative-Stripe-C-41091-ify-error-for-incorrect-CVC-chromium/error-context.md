# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-negative.spec.ts >> Stripe Checkout Negative Testing >> TC-NEG-CHK-003: Verify error for incorrect CVC
- Location: tests\checkout-negative.spec.ts:53:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /pay without link/i }).or(getByText(/pay without link/i)).or(locator('input[autocomplete="one-time-code"]')).or(locator('[aria-label*="Security code character"]')) to be visible

```

# Test source

```ts
  83  |         const postalInput = await this.getOptimizedFirstVisible([
  84  |             this.page.locator(postalInputSelector),
  85  |             ...(await this.stripeFrameInputLocatorsFromLiveFrames(postalInputSelector))
  86  |         ], 'Postal', 5000).catch(() => null);
  87  | 
  88  |         if (postalInput) {
  89  |             await postalInput.fill('110001');
  90  |         }
  91  |     }
  92  | 
  93  |     async setCardholderName(name: string) {
  94  |         // Stripe hosted page usually uses billingName, but let's be deterministic
  95  |         const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
  96  |             .or(this.page.getByLabel(/cardholder name|name on card/i))
  97  |             .first();
  98  |         await expect(nameInput).toBeVisible({ timeout: 15000 });
  99  |         await nameInput.fill(name);
  100 |     }
  101 | 
  102 |     async enterOTP(otp: string) {
  103 |         console.log("Waiting for Stripe content to load...");
  104 |         await this.waitForSkeletonToHide();
  105 |         await this.handleStripeLinkChallenge(otp);
  106 |     }
  107 | 
  108 |     async getStripeErrorMessage(): Promise<string> {
  109 |         const errorElement = await this.getOptimizedFirstVisible([
  110 |             this.page.locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError'),
  111 |             ...(await this.stripeFrameInputLocatorsFromLiveFrames('#error-message, .FieldError, [role="alert"]'))
  112 |         ], 'Stripe validation error', 15000).catch(() => null);
  113 |         return errorElement ? (await errorElement.textContent() || '') : '';
  114 |     }
  115 | 
  116 |     private stripeFrame(selector = this.stripeFrameSelector): FrameLocator {
  117 |         return this.page.frameLocator(selector).first();
  118 |     }
  119 | 
  120 |     private async stripeFrameInputLocatorsFromLiveFrames(inputSelector: string): Promise<Locator[]> {
  121 |         const allIframes = this.page.locator(this.stripeFrameSelector);
  122 |         const count = await allIframes.count().catch(() => 0);
  123 |         const locators: Locator[] = [];
  124 |         for (let i = 0; i < count; i++) {
  125 |             locators.push(this.page.frameLocator(this.stripeFrameSelector).nth(i).locator(inputSelector).first());
  126 |         }
  127 |         return locators;
  128 |     }
  129 | 
  130 |     private async stripeFramePayWithoutLinkLocators(): Promise<Locator[]> {
  131 |         const allIframes = this.page.locator(this.stripeFrameSelector);
  132 |         const count = await allIframes.count();
  133 |         const locators: Locator[] = [];
  134 |         for (let i = 0; i < count; i++) {
  135 |             const stripeFrame = this.page.frameLocator(this.stripeFrameSelector).nth(i);
  136 |             locators.push(
  137 |                 stripeFrame.getByRole('button', { name: /pay without link/i })
  138 |                     .or(stripeFrame.getByText(/pay without link/i))
  139 |                     .first()
  140 |             );
  141 |         }
  142 |         return locators;
  143 |     }
  144 | 
  145 |     private async fillEmptyCardDetailsIfNeeded() {
  146 |         const inputSelector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
  147 |         const cardNumberInput = await this.getOptimizedFirstVisible([
  148 |             this.page.getByRole('textbox', { name: /card number/i }),
  149 |             this.page.getByPlaceholder(/1234 1234/i),
  150 |             this.page.locator(inputSelector),
  151 |             ...(await this.stripeFrameInputLocatorsFromLiveFrames(inputSelector))
  152 |         ], 'Card Number', 5000).catch(() => null);
  153 | 
  154 |         if (!cardNumberInput) return;
  155 | 
  156 |         const existingValue = await cardNumberInput.inputValue().catch(() => '');
  157 |         if (existingValue.trim()) return;
  158 | 
  159 |         await this.fillCardDetails('4242424242424242', '12/30', '123');
  160 |         const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
  161 |             .or(this.page.getByRole('textbox', { name: /cardholder name|name on card/i }))
  162 |             .or(this.page.getByPlaceholder(/full name on card/i))
  163 |             .first();
  164 |         if (await nameInput.isVisible().catch(() => false)) {
  165 |             await nameInput.fill('Banti Guleria');
  166 |         }
  167 |     }
  168 | 
  169 |     private async handleStripeLinkChallenge(otp: string) {
  170 |         await this.waitForSkeletonToHide();
  171 | 
  172 |         // Wait for either the Link challenge or the card form to be visible
  173 |         console.log("Detecting Stripe state (Link challenge vs Card form)...");
  174 |         
  175 |         const linkTrigger = this.page.getByRole('button', { name: /pay without link/i })
  176 |             .or(this.page.getByText(/pay without link/i))
  177 |             .or(this.page.locator('input[autocomplete="one-time-code"]'))
  178 |             .or(this.page.locator('[aria-label*="Security code character"]'));
  179 | 
  180 |         const cardFormTrigger = this.page.locator('#cardNumber, #Field-numberInput, input[name="cardnumber"]');
  181 | 
  182 |         const state = await Promise.race([
> 183 |             linkTrigger.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'link'),
      |                         ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  184 |             cardFormTrigger.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'card'),
  185 |             this.page.waitForTimeout(15000).then(() => 'unknown')
  186 |         ]);
  187 | 
  188 |         if (state === 'card') {
  189 |             console.log("Card form detected directly.");
  190 |             return;
  191 |         }
  192 | 
  193 |         // Handle "Pay without Link" if visible
  194 |         const frameLocators = await this.stripeFramePayWithoutLinkLocators();
  195 |         const payWithoutLink = await this.getOptimizedFirstVisible([
  196 |             this.page.getByRole('button', { name: /pay without link/i }),
  197 |             this.page.getByText(/pay without link/i),
  198 |             ...frameLocators
  199 |         ], 'Pay without Link', 5000).catch(() => null);
  200 | 
  201 |         if (payWithoutLink) {
  202 |             console.log('Clicking "Pay without Link" to bypass Stripe Link challenge...');
  203 |             await payWithoutLink.click({ force: true });
  204 |             await this.page.waitForTimeout(2000);
  205 |             return;
  206 |         }
  207 | 
  208 |         // Handle OTP if visible
  209 |         const otpInputs = this.page.locator('input[inputmode="numeric"], input[autocomplete="one-time-code"], [aria-label*="Security code character"]');
  210 |         if (await otpInputs.first().isVisible({ timeout: 5000 }).catch(() => false)) {
  211 |             console.log('Filling Stripe Link OTP challenge...');
  212 |             const count = await otpInputs.count();
  213 |             if (count > 1) {
  214 |                 const otpStr = otp.padStart(count, '0');
  215 |                 for (let i = 0; i < count; i++) {
  216 |                     await otpInputs.nth(i).fill(otpStr[i]);
  217 |                 }
  218 |             } else {
  219 |                 await otpInputs.first().fill(otp);
  220 |             }
  221 |             await this.page.waitForTimeout(3000);
  222 |         }
  223 |     }
  224 | 
  225 |     private async waitForSkeletonToHide() {
  226 |         const skeleton = this.page.locator('.Skeleton, .loading, .spinner, [class*="skeleton" i]').first();
  227 |         if (await skeleton.isVisible().catch(() => false)) {
  228 |             await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  229 |         }
  230 |         await this.page.waitForTimeout(1000);
  231 |     }
  232 | 
  233 |     private async getOptimizedFirstVisible(locators: Locator[], label: string, timeout: number): Promise<Locator> {
  234 |         if (locators.length === 0) throw new Error(`No locators provided for ${label}`);
  235 |         
  236 |         // Combine all locators into one using Playwright's .or() operator
  237 |         let combined = locators[0];
  238 |         for (let i = 1; i < locators.length; i++) {
  239 |             combined = combined.or(locators[i]);
  240 |         }
  241 | 
  242 |         try {
  243 |             await combined.first().waitFor({ state: 'visible', timeout });
  244 |             // Find which one is actually visible
  245 |             for (const loc of locators) {
  246 |                 if (await loc.first().isVisible()) return loc.first();
  247 |             }
  248 |             return combined.first();
  249 |         } catch (error) {
  250 |             throw new Error(`CRITICAL: ${label} was not visible after ${timeout}ms. ${String(error)}`);
  251 |         }
  252 |     }
  253 | 
  254 |     async getEmailValue(): Promise<string> {
  255 |         return await this.stripeEmailInput.inputValue();
  256 |     }
  257 | }
  258 | 
```