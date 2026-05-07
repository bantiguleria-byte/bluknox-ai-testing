# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-negative.spec.ts >> Stripe Checkout Negative Testing >> TC-NEG-CHK-003: Verify error for incorrect CVC
- Location: tests\checkout-negative.spec.ts:53:9

# Error details

```
Error: CRITICAL: Stripe card number input was not visible before timeout. TimeoutError: locator.waitFor: Timeout 1ms exceeded.
Call log:
  - waiting for locator('iframe[name^="__privateStripeFrame"], iframe[title*="Secure payment" i], iframe[src*="stripe" i]').nth(5).contentFrame().locator('#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]').first() to be visible

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
            - generic [ref=e32]: ₹7,049.98
            - generic [ref=e35]:
              - text: per
              - text: year
          - generic [ref=e44]: ₹587.50 / month billed annually
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
                - text: 1 USD = 98.0796 INR
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
                  - generic [ref=e94]: ₹7,049.98 per Licenses
              - generic [ref=e97]: ₹7,049.98
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]: Subtotal
            - generic [ref=e103]: ₹7,049.98
          - generic [ref=e109]:
            - textbox "Add promotion code" [ref=e113] [cursor=pointer]
            - button [disabled]:
              - generic:
                - generic: Apply
          - generic [ref=e114]:
            - generic [ref=e115]: Total due today
            - generic [ref=e117]: ₹7,049.98
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
  122 |         return [
  123 |             this.page.getByRole('textbox', { name: /cvc|security code/i }).first(),
  124 |             this.page.locator(selector).first(),
  125 |             ...this.stripeFrameInputLocators(selector, 'iframe[title*="cvc" i], iframe[title*="security" i], iframe[name*="cardCvc" i]'),
  126 |             ...this.stripeFrameInputLocators(selector)
  127 |         ];
  128 |     }
  129 | 
  130 |     private postalCodeLocators(): Locator[] {
  131 |         const selector = '#billingPostalCode, #Field-postalCodeInput, input[name="postal"], input[name="postalCode"], input[autocomplete="postal-code"]';
  132 |         return [
  133 |             this.page.locator(selector).first(),
  134 |             ...this.stripeFrameInputLocators(selector, 'iframe[title*="postal" i], iframe[name*="postal" i]'),
  135 |             ...this.stripeFrameInputLocators(selector)
  136 |         ];
  137 |     }
  138 | 
  139 |     private stripeFrameInputLocators(inputSelector: string, frameSelector = this.stripeFrameSelector): Locator[] {
  140 |         return Array.from({ length: 6 }, (_, index) =>
  141 |             this.page.frameLocator(frameSelector).nth(index).locator(inputSelector).first()
  142 |         );
  143 |     }
  144 | 
  145 |     private stripeFramePayWithoutLinkLocators(): Locator[] {
  146 |         return Array.from({ length: 6 }, (_, index) => {
  147 |             const stripeFrame = this.page.frameLocator(this.stripeFrameSelector).nth(index);
  148 |             return stripeFrame.getByRole('button', { name: /pay without link/i })
  149 |                 .or(stripeFrame.getByText(/pay without link/i))
  150 |                 .first();
  151 |         });
  152 |     }
  153 | 
  154 |     private async fillEmptyCardDetailsIfNeeded() {
  155 |         const cardNumberInput = await this.firstVisibleLocator(this.cardNumberLocators(), 'Stripe card number input', 5000).catch(() => null);
  156 |         if (!cardNumberInput) {
  157 |             return;
  158 |         }
  159 | 
  160 |         const existingValue = await cardNumberInput.inputValue().catch(() => '');
  161 |         if (existingValue.trim()) {
  162 |             return;
  163 |         }
  164 | 
  165 |         await this.fillCardDetails('4242424242424242', '12/30', '123');
  166 |         const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
  167 |             .or(this.page.getByRole('textbox', { name: /cardholder name|name on card/i }))
  168 |             .or(this.page.getByPlaceholder(/full name on card/i))
  169 |             .first();
  170 |         if (await nameInput.isVisible().catch(() => false)) {
  171 |             await nameInput.fill('Banti Guleria');
  172 |         }
  173 |     }
  174 | 
  175 |     private async handleStripeLinkChallenge(otp: string) {
  176 |         const skeleton = this.page.locator('.Skeleton, .loading, .spinner').first();
  177 |         if (await skeleton.isVisible().catch(() => false)) {
  178 |             await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  179 |         }
  180 | 
  181 |         const payWithoutLink = await this.firstVisibleLocator([
  182 |             this.page.getByRole('button', { name: /pay without link/i }).first(),
  183 |             this.page.getByText(/pay without link/i).first(),
  184 |             ...this.stripeFramePayWithoutLinkLocators()
  185 |         ], 'Pay without Link control', 3000).catch(() => null);
  186 | 
  187 |         if (payWithoutLink) {
  188 |             await payWithoutLink.click({ force: true });
  189 |             await this.page.waitForLoadState('domcontentloaded').catch(() => {});
  190 |             return;
  191 |         }
  192 | 
  193 |         const otpInputs = this.page.locator('input[inputmode="numeric"], input[autocomplete="one-time-code"]');
  194 |         if (await otpInputs.first().isVisible().catch(() => false)) {
  195 |             const count = await otpInputs.count();
  196 |             if (count > 1) {
  197 |                 for (let i = 0; i < Math.min(count, otp.length); i++) {
  198 |                     await otpInputs.nth(i).fill(otp[i]);
  199 |                 }
  200 |             } else {
  201 |                 await otpInputs.first().fill(otp);
  202 |             }
  203 |             await this.page.waitForLoadState('domcontentloaded').catch(() => {});
  204 |         }
  205 |     }
  206 | 
  207 |     private async firstVisibleLocator(locators: Locator[], label: string, timeout: number): Promise<Locator> {
  208 |         const deadline = Date.now() + timeout;
  209 |         let lastError: unknown;
  210 | 
  211 |         while (Date.now() < deadline) {
  212 |             for (const locator of locators) {
  213 |                 try {
  214 |                     await locator.waitFor({ state: 'visible', timeout: Math.min(750, Math.max(1, deadline - Date.now())) });
  215 |                     return locator;
  216 |                 } catch (error) {
  217 |                     lastError = error;
  218 |                 }
  219 |             }
  220 |         }
  221 | 
> 222 |         throw new Error(`CRITICAL: ${label} was not visible before timeout. ${String(lastError ?? '')}`);
      |               ^ Error: CRITICAL: Stripe card number input was not visible before timeout. TimeoutError: locator.waitFor: Timeout 1ms exceeded.
  223 |     }
  224 | 
  225 |     async getEmailValue(): Promise<string> {
  226 |         return await this.stripeEmailInput.inputValue();
  227 |     }
  228 | }
  229 | 
```