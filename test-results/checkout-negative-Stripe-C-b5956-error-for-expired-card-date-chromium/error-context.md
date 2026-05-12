# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-negative.spec.ts >> Stripe Checkout Negative Testing >> TC-NEG-CHK-002: Verify error for expired card date
- Location: tests\checkout-negative.spec.ts:38:9

# Error details

```
Error: locator.waitFor: Error: strict mode violation: getByRole('button', { name: /pay without link/i }).or(getByText(/pay without link/i)).or(locator('input[autocomplete="one-time-code"]')).or(locator('[aria-label*="Security code character"]')) resolved to 8 elements:
    1) <input class="" value="" type="text" tabindex="0" pattern="[0-9]*" id="one-time-code" inputmode="numeric" name="one-time-code" autocomplete="one-time-code" data-testid="sms-code-input-0" aria-label="Security code character 1"/> aka getByTestId('sms-code-input-0')
    2) <input class="" value="" type="text" tabindex="-1" pattern="[0-9]*" inputmode="numeric" data-testid="sms-code-input-1" aria-label="Security code character 2"/> aka getByTestId('sms-code-input-1')
    3) <input class="" value="" type="text" tabindex="-1" pattern="[0-9]*" inputmode="numeric" data-testid="sms-code-input-2" aria-label="Security code character 3"/> aka getByTestId('sms-code-input-2')
    4) <input class="" value="" type="text" tabindex="-1" pattern="[0-9]*" inputmode="numeric" data-testid="sms-code-input-3" aria-label="Security code character 4"/> aka getByTestId('sms-code-input-3')
    5) <input class="" value="" type="text" tabindex="-1" pattern="[0-9]*" inputmode="numeric" data-testid="sms-code-input-4" aria-label="Security code character 5"/> aka getByTestId('sms-code-input-4')
    6) <input class="" value="" type="text" tabindex="-1" pattern="[0-9]*" inputmode="numeric" data-testid="sms-code-input-5" aria-label="Security code character 6"/> aka getByTestId('sms-code-input-5')
    7) <button type="reset" class="LinkActionButton LinkActionButton--text LinkCancelPartialLoginButton">…</button> aka getByRole('button', { name: 'Pay without Link' })
    8) <span class="LinkText LinkText--bodyEmphasized LinkText-color--brand">Pay without Link</span> aka getByRole('button', { name: 'Pay without Link' })

Call log:
  - waiting for getByRole('button', { name: /pay without link/i }).or(getByText(/pay without link/i)).or(locator('input[autocomplete="one-time-code"]')).or(locator('[aria-label*="Security code character"]')) to be visible

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
            - generic [ref=e32]: ₹7,143.29
            - generic [ref=e35]:
              - text: per
              - text: year
          - generic [ref=e44]: ₹595.27 / month billed annually
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
                - text: 1 USD = 99.3779 INR
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
                  - generic [ref=e94]: ₹7,143.29 per Licenses
              - generic [ref=e97]: ₹7,143.29
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]: Subtotal
            - generic [ref=e103]: ₹7,143.29
          - generic [ref=e109]:
            - textbox "Add promotion code" [ref=e113] [cursor=pointer]
            - button [disabled]:
              - generic:
                - generic: Apply
          - generic [ref=e114]:
            - generic [ref=e115]: Total due today
            - generic [ref=e117]: ₹7,143.29
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
      |                         ^ Error: locator.waitFor: Error: strict mode violation: getByRole('button', { name: /pay without link/i }).or(getByText(/pay without link/i)).or(locator('input[autocomplete="one-time-code"]')).or(locator('[aria-label*="Security code character"]')) resolved to 8 elements:
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