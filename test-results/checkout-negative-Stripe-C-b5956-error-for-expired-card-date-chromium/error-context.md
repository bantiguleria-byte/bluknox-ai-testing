# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-negative.spec.ts >> Stripe Checkout Negative Testing >> TC-NEG-CHK-002: Verify error for expired card date
- Location: tests\checkout-negative.spec.ts:38:9

# Error details

```
Error: CRITICAL: Stripe card number input was not visible before timeout. TimeoutError: locator.waitFor: Timeout 1238ms exceeded.
Call log:
  - waiting for locator('iframe[name^="__privateStripeFrame"], iframe[title*="Secure payment" i], iframe[src*="stripe" i]').first().contentFrame().locator('#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - banner [ref=e6]:
      - generic [ref=e8]:
        - link "Back to BluCygnus sandbox" [ref=e9] [cursor=pointer]:
          - /url: https://staging.bluknox.com/api/cancel/
          - generic [ref=e11]:
            - img [ref=e12]
            - generic [ref=e14]: Back
            - generic [ref=e16]:
              - img [ref=e18]
              - heading "BluCygnus sandbox" [level=1] [ref=e20]
        - generic [ref=e21]: Sandbox
    - generic [ref=e22]:
      - generic [ref=e24]:
        - heading "Subscribe to BluKnox Classic" [level=2] [ref=e25]
        - generic [ref=e27]:
          - generic [ref=e31]:
            - generic [ref=e32]: ₹7,061.10
            - generic [ref=e35]:
              - text: per
              - text: year
          - generic [ref=e44]: ₹588.43 / month billed annually
          - group "Choose a currency:" [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e49]:
                - button "IN INR" [disabled] [ref=e51] [cursor=pointer]:
                  - generic [ref=e53]:
                    - img "IN" [ref=e54]
                    - text: INR
                - button "US USD" [ref=e56] [cursor=pointer]:
                  - generic [ref=e58]:
                    - img "US" [ref=e59]
                    - text: USD
              - generic [ref=e61]:
                - text: 1 USD = 98.2347 INR
                - button "Show tooltip" [ref=e62] [cursor=pointer]:
                  - generic [ref=e63]:
                    - text: (
                    - button "includes 4% conversion fee" [ref=e64]:
                      - generic [ref=e66]: includes 4% conversion fee
                    - text: )
                - text: . Charges will vary based on exchange rates.
      - generic [ref=e67]:
        - list [ref=e68]:
          - listitem [ref=e69]:
            - generic [ref=e72]:
              - generic [ref=e76]: BluKnox Classic
              - generic [ref=e77]:
                - generic [ref=e80]:
                  - generic [ref=e81]: Secure your confidential or sensitive data such as financial, healthcare, legal, research-based, personally identifiable information, etc. locally on your PC. Purchase plans are available for personal as well as business use. Share your data conveniently and securely across all your devices and exchange it securely with others as needed.
                  - button [ref=e82] [cursor=pointer]:
                    - img [ref=e86]
                - generic [ref=e88]:
                  - generic [ref=e90]: Billed annually
                  - generic [ref=e94]: ₹7,061.10 per Licenses
              - generic [ref=e97]: ₹7,061.10
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]: Subtotal
            - generic [ref=e103]: ₹7,061.10
          - generic [ref=e109]:
            - textbox "Add promotion code" [ref=e113] [cursor=pointer]
            - button [disabled]:
              - generic:
                - generic: Apply
          - generic [ref=e114]:
            - generic [ref=e115]: Total due today
            - generic [ref=e117]: ₹7,061.10
  - generic [ref=e118]:
    - main [ref=e119]:
      - generic [ref=e124]:
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e135]:
              - link "Link" [ref=e140] [cursor=pointer]:
                - /url: https://link.com/
                - img [ref=e141]
              - button "more" [ref=e153] [cursor=pointer]:
                - img [ref=e156]
          - listitem [ref=e161]:
            - generic [ref=e171]:
              - text: Confirm it’s you
              - generic [ref=e172]:
                - generic [ref=e173]:
                  - text: Enter the code sent to
                  - generic [ref=e175]: •••••• •••33
                  - text: to use your saved information.
                - generic [ref=e176]: You are currently testing and no code will be sent. Enter 000000 to continue.
              - generic [ref=e179]:
                - textbox "Security code character 1" [active] [ref=e180]
                - textbox "Security code character 2" [ref=e181]
                - textbox "Security code character 3" [ref=e182]
                - textbox "Security code character 4" [ref=e183]
                - textbox "Security code character 5" [ref=e184]
                - textbox "Security code character 6" [ref=e185]
              - button "Send code to email instead" [ref=e190] [cursor=pointer]:
                - generic [ref=e193]: Send code to email instead
              - generic [ref=e194]: Logging in as banti.guleria@idsil.com
        - button "Pay without Link" [ref=e200] [cursor=pointer]:
          - generic [ref=e203]: Pay without Link
      - generic [ref=e204]:
        - checkbox "I am an AI agent acting on behalf of someone else" [ref=e205]
        - text: I am an AI agent acting on behalf of someone else
    - contentinfo [ref=e207]:
      - link "Powered by Stripe" [ref=e209] [cursor=pointer]:
        - /url: https://stripe.com
        - generic [ref=e210]:
          - text: Powered by
          - img "Stripe" [ref=e212]
      - link "Terms" [ref=e215] [cursor=pointer]:
        - /url: https://stripe.com/legal/end-users
      - link "Privacy" [ref=e216] [cursor=pointer]:
        - /url: https://stripe.com/privacy
```

# Test source

```ts
  186 |             locators.push(
  187 |                 stripeFrame.getByRole('button', { name: /pay without link/i })
  188 |                     .or(stripeFrame.getByText(/pay without link/i))
  189 |                     .first()
  190 |             );
  191 |         }
  192 |         return locators;
  193 |     }
  194 | 
  195 |     private async fillEmptyCardDetailsIfNeeded() {
  196 |         const cardNumberInput = await this.firstVisibleLocator(
  197 |             await this.buildCardNumberLocators(), 'Stripe card number input', 5000
  198 |         ).catch(() => null);
  199 |         if (!cardNumberInput) {
  200 |             return;
  201 |         }
  202 | 
  203 |         const existingValue = await cardNumberInput.inputValue().catch(() => '');
  204 |         if (existingValue.trim()) {
  205 |             return;
  206 |         }
  207 | 
  208 |         await this.fillCardDetails('4242424242424242', '12/30', '123');
  209 |         const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
  210 |             .or(this.page.getByRole('textbox', { name: /cardholder name|name on card/i }))
  211 |             .or(this.page.getByPlaceholder(/full name on card/i))
  212 |             .first();
  213 |         if (await nameInput.isVisible().catch(() => false)) {
  214 |             await nameInput.fill('Banti Guleria');
  215 |         }
  216 |     }
  217 | 
  218 |     private async handleStripeLinkChallenge(otp: string) {
  219 |         // Wait for skeleton/loading to disappear first
  220 |         const skeleton = this.page.locator('.Skeleton, .loading, .spinner').first();
  221 |         if (await skeleton.isVisible().catch(() => false)) {
  222 |             await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  223 |         }
  224 | 
  225 |         // --- Strategy 1: Click "Pay without Link" if visible (preferred — bypasses Link entirely) ---
  226 |         // Give it up to 15s since Stripe can be slow to render the Link challenge screen.
  227 |         const frameLocators = await this.stripeFramePayWithoutLinkLocators();
  228 |         const payWithoutLink = await this.firstVisibleLocator([
  229 |             this.page.getByRole('button', { name: /pay without link/i }).first(),
  230 |             this.page.getByText(/pay without link/i).first(),
  231 |             ...frameLocators
  232 |         ], 'Pay without Link control', 15000).catch(() => null);
  233 | 
  234 |         if (payWithoutLink) {
  235 |             console.log('Clicking "Pay without Link" to bypass Stripe Link challenge...');
  236 |             await payWithoutLink.click({ force: true });
  237 |             // Wait for card form to appear after bypassing Link
  238 |             await this.page.waitForLoadState('domcontentloaded').catch(() => {});
  239 |             await this.page.waitForTimeout(2000);
  240 |             return;
  241 |         }
  242 | 
  243 |         // --- Strategy 2: Fill the Stripe Link OTP (6-character security code) ---
  244 |         // Stripe test mode accepts "000000"
  245 |         const otpInputs = this.page.locator(
  246 |             'input[inputmode="numeric"], input[autocomplete="one-time-code"], ' +
  247 |             '[aria-label*="Security code character"]'
  248 |         );
  249 |         if (await otpInputs.first().isVisible({ timeout: 5000 }).catch(() => false)) {
  250 |             console.log('Filling Stripe Link OTP challenge...');
  251 |             const count = await otpInputs.count();
  252 |             if (count > 1) {
  253 |                 // Character-by-character OTP boxes
  254 |                 const otpStr = otp.padStart(count, '0');
  255 |                 for (let i = 0; i < count; i++) {
  256 |                     await otpInputs.nth(i).fill(otpStr[i]);
  257 |                 }
  258 |             } else {
  259 |                 await otpInputs.first().fill(otp);
  260 |             }
  261 |             // Wait for Stripe to process OTP and show the card form
  262 |             await this.page.waitForTimeout(3000);
  263 |             await this.page.waitForLoadState('domcontentloaded').catch(() => {});
  264 |         }
  265 |     }
  266 | 
  267 |     private async firstVisibleLocator(locators: Locator[], label: string, timeout: number): Promise<Locator> {
  268 |         const deadline = Date.now() + timeout;
  269 |         let lastError: unknown;
  270 |         // Minimum per-locator attempt window: 2000ms to avoid 1ms races
  271 |         const perAttemptMs = 2000;
  272 | 
  273 |         while (Date.now() < deadline) {
  274 |             for (const locator of locators) {
  275 |                 try {
  276 |                     const remaining = deadline - Date.now();
  277 |                     if (remaining <= 0) break;
  278 |                     await locator.waitFor({ state: 'visible', timeout: Math.min(perAttemptMs, remaining) });
  279 |                     return locator;
  280 |                 } catch (error) {
  281 |                     lastError = error;
  282 |                 }
  283 |             }
  284 |         }
  285 | 
> 286 |         throw new Error(`CRITICAL: ${label} was not visible before timeout. ${String(lastError ?? '')}`);
      |               ^ Error: CRITICAL: Stripe card number input was not visible before timeout. TimeoutError: locator.waitFor: Timeout 1238ms exceeded.
  287 |     }
  288 | 
  289 |     /**
  290 |      * Builds card number locators combining page-level and live iframe locators.
  291 |      */
  292 |     private async buildCardNumberLocators(): Promise<Locator[]> {
  293 |         const inputSelector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
  294 |         const frameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(inputSelector);
  295 |         return [
  296 |             this.page.getByRole('textbox', { name: /card number/i }).first(),
  297 |             this.page.getByPlaceholder(/1234 1234/i).first(),
  298 |             this.page.locator(inputSelector).first(),
  299 |             ...frameLocators,
  300 |         ];
  301 |     }
  302 | 
  303 |     async getEmailValue(): Promise<string> {
  304 |         return await this.stripeEmailInput.inputValue();
  305 |     }
  306 | }
  307 | 
```