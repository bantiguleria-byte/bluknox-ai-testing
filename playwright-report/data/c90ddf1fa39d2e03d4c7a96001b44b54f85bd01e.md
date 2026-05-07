# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: subscription.spec.ts >> Subscription & Checkout Tests >> TC-CH-001 & TC-CH-002: Verify Stripe Checkout Flow
- Location: tests\subscription.spec.ts:37:9

# Error details

```
Error: locator.click: Element is outside of the viewport
Call log:
  - waiting for getByText(/I am an AI agent/i)
    - locator resolved to <label>…</label>
  - attempting click action
    - scrolling into view if needed
    - done scrolling

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
        - heading "Subscribe to BluKnox Classic and 1 more" [level=2] [ref=e25]
        - generic [ref=e27]:
          - generic [ref=e31]:
            - generic [ref=e32]: ₹18,762.59
            - generic [ref=e35]:
              - text: per
              - text: year
          - generic [ref=e44]: ₹1,563.55 / month billed annually
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
                - text: 1 USD = 97.8445 INR
                - button "Show tooltip" [ref=e62] [cursor=pointer]:
                  - generic [ref=e63]:
                    - text: (
                    - button "includes 3.75% conversion fee" [ref=e64]:
                      - generic [ref=e66]: includes 3.75% conversion fee
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
                  - generic [ref=e90]:
                    - generic [ref=e91]: Qty 2,
                    - text: Billed annually
                  - generic [ref=e95]: ₹7,033.04 per Licenses
              - generic [ref=e98]: ₹14,066.07
          - listitem [ref=e99]:
            - generic [ref=e101]:
              - generic [ref=e105]: Additional Encrypted Storage - 15GB
              - generic [ref=e109]:
                - generic [ref=e110]: Qty 1,
                - text: Billed annually
              - generic [ref=e114]: ₹4,696.52
        - generic [ref=e116]:
          - generic [ref=e117]:
            - generic [ref=e118]: Subtotal
            - generic [ref=e120]: ₹18,762.59
          - generic [ref=e126]:
            - textbox "Add promotion code" [ref=e130] [cursor=pointer]
            - button [disabled]:
              - generic:
                - generic: Apply
          - generic [ref=e131]:
            - generic [ref=e132]: Total due today
            - generic [ref=e134]: ₹18,762.59
  - generic [ref=e135]:
    - main [ref=e136]:
      - generic [ref=e141]:
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e152]:
              - link "Link" [ref=e157] [cursor=pointer]:
                - /url: https://link.com/
                - img [ref=e158]
              - button "more" [ref=e170] [cursor=pointer]:
                - img [ref=e173]
          - listitem [ref=e178]:
            - generic [ref=e188]:
              - text: Confirm it’s you
              - generic [ref=e189]:
                - generic [ref=e190]:
                  - text: Enter the code sent to
                  - generic [ref=e192]: •••••• •••33
                  - text: to use your saved information.
                - generic [ref=e193]: You are currently testing and no code will be sent. Enter 000000 to continue.
              - generic [ref=e196]:
                - textbox "Security code character 1" [active] [ref=e197]
                - textbox "Security code character 2" [ref=e198]
                - textbox "Security code character 3" [ref=e199]
                - textbox "Security code character 4" [ref=e200]
                - textbox "Security code character 5" [ref=e201]
                - textbox "Security code character 6" [ref=e202]
              - button "Send code to email instead" [ref=e207] [cursor=pointer]:
                - generic [ref=e210]: Send code to email instead
              - generic [ref=e211]: Logging in as banti.guleria@idsil.com
        - button "Pay without Link" [ref=e217] [cursor=pointer]:
          - generic [ref=e220]: Pay without Link
      - generic [ref=e221]:
        - checkbox "I am an AI agent acting on behalf of someone else" [ref=e222]
        - text: I am an AI agent acting on behalf of someone else
    - contentinfo [ref=e224]:
      - link "Powered by Stripe" [ref=e226] [cursor=pointer]:
        - /url: https://stripe.com
        - generic [ref=e227]:
          - text: Powered by
          - img "Stripe" [ref=e229]
      - link "Terms" [ref=e232] [cursor=pointer]:
        - /url: https://stripe.com/legal/end-users
      - link "Privacy" [ref=e233] [cursor=pointer]:
        - /url: https://stripe.com/privacy
```

# Test source

```ts
  1   | import { FrameLocator, Page, Locator, expect } from '@playwright/test';
  2   | import { BasePage } from './BasePage';
  3   | 
  4   | export class CheckoutPage extends BasePage {
  5   |     private readonly stripeEmailInput: Locator;
  6   |     private readonly subscribeButton: Locator;
  7   |     private readonly stripeFrameSelector = 'iframe[name^="__privateStripeFrame"], iframe[title*="Secure payment" i], iframe[src*="stripe" i]';
  8   | 
  9   |     constructor(page: Page) {
  10  |         super(page);
  11  |         this.stripeEmailInput = page.getByPlaceholder(/email/i).or(page.locator('input[type="email"]')).first();
  12  |         this.subscribeButton = page.getByRole('button', { name: /Subscribe|Pay/i }).or(page.locator('button.SubmitButton')).first();
  13  |     }
  14  | 
  15  |     async completePayment() {
  16  |         if (await this.page.getByRole('button', { name: /processing/i }).isVisible().catch(() => false)) {
  17  |             await this.page.waitForURL(/.*order-history.*/, { timeout: 90000 });
  18  |             return;
  19  |         }
  20  | 
  21  |         await this.handleStripeLinkChallenge('000000');
  22  |         await this.fillEmptyCardDetailsIfNeeded();
  23  | 
  24  |         if (await this.page.getByRole('button', { name: /processing/i }).isVisible().catch(() => false)) {
  25  |             await this.page.waitForURL(/.*order-history.*/, { timeout: 90000 });
  26  |             return;
  27  |         }
  28  | 
  29  |         const aiAgentCheckbox = this.page.getByRole('checkbox', { name: /AI agent/i });
  30  |         if (await aiAgentCheckbox.isVisible().catch(() => false) && !(await aiAgentCheckbox.isChecked())) {
  31  |             await aiAgentCheckbox.check({ force: true }).catch(async () => {
> 32  |                 await this.page.getByText(/I am an AI agent/i).click({ force: true });
      |                                                                ^ Error: locator.click: Element is outside of the viewport
  33  |             });
  34  |         }
  35  | 
  36  |         await expect(this.subscribeButton).toBeVisible({ timeout: 30000 });
  37  |         await this.click(this.subscribeButton);
  38  |         await this.page.waitForURL(/.*order-history.*/, { timeout: 120000 });
  39  |     }
  40  | 
  41  |     async fillCardDetails(cardNumber: string, expiry: string, cvc: string) {
  42  |         await this.handleStripeLinkChallenge('000000');
  43  | 
  44  |         const cardNumberInput = await this.firstVisibleLocator(this.cardNumberLocators(), 'Stripe card number input', 120000);
  45  |         const expiryInput = await this.firstVisibleLocator(this.cardExpiryLocators(), 'Stripe expiry input', 30000);
  46  |         const cvcInput = await this.firstVisibleLocator(this.cardCvcLocators(), 'Stripe CVC input', 30000);
  47  | 
  48  |         await cardNumberInput.fill(cardNumber);
  49  |         await expiryInput.fill(expiry);
  50  |         await cvcInput.fill(cvc);
  51  | 
  52  |         const postalInput = await this.firstVisibleLocator(this.postalCodeLocators(), 'Stripe postal code input', 3000).catch(() => null);
  53  |         if (postalInput) {
  54  |             await postalInput.fill('110001');
  55  |         }
  56  |     }
  57  | 
  58  |     async setCardholderName(name: string) {
  59  |         // Stripe hosted page usually uses billingName, but let's be deterministic
  60  |         const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
  61  |             .or(this.page.getByLabel(/cardholder name|name on card/i))
  62  |             .first();
  63  |         await expect(nameInput).toBeVisible({ timeout: 15000 });
  64  |         await nameInput.fill(name);
  65  |     }
  66  | 
  67  |     async enterOTP(otp: string) {
  68  |         console.log("Waiting for Stripe content to load (waiting for skeletons to vanish)...");
  69  |         
  70  |         // Wait for ANY real content or the skeleton to be hidden
  71  |         const skeleton = this.page.locator('.Skeleton, .loading, .spinner').first();
  72  |         if (await skeleton.isVisible().catch(() => false)) {
  73  |             await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  74  |         }
  75  |         
  76  |         // Give it a small extra buffer for Stripe's dynamic hydration
  77  |         await this.page.waitForTimeout(3000);
  78  |         
  79  |         // Capture a screenshot for debugging
  80  |         await this.page.screenshot({ path: `test-results/stripe-ready-${Date.now()}.png` });
  81  | 
  82  |         await this.handleStripeLinkChallenge(otp);
  83  |     }
  84  | 
  85  |     async getStripeErrorMessage(): Promise<string> {
  86  |         // Stripe uses various selectors for error messages depending on the field and context
  87  |         const errorElement = await this.firstVisibleLocator([
  88  |             this.page.locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError').first(),
  89  |             this.stripeFrame().locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError').first()
  90  |         ], 'Stripe validation error', 15000);
  91  |         return (await errorElement.textContent()) || '';
  92  |     }
  93  | 
  94  |     private stripeFrame(selector = this.stripeFrameSelector): FrameLocator {
  95  |         return this.page.frameLocator(selector).first();
  96  |     }
  97  | 
  98  |     private cardNumberLocators(): Locator[] {
  99  |         const selector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
  100 |         return [
  101 |             this.page.getByRole('textbox', { name: /card number/i }).first(),
  102 |             this.page.getByPlaceholder(/1234 1234/i).first(),
  103 |             this.page.locator(selector).first(),
  104 |             ...this.stripeFrameInputLocators(selector, 'iframe[title*="card number" i], iframe[name*="cardNumber" i]'),
  105 |             ...this.stripeFrameInputLocators(selector)
  106 |         ];
  107 |     }
  108 | 
  109 |     private cardExpiryLocators(): Locator[] {
  110 |         const selector = '#cardExpiry, #Field-expiryInput, input[name="exp-date"], input[name="cardExpiry"], input[autocomplete="cc-exp"]';
  111 |         return [
  112 |             this.page.getByRole('textbox', { name: /expiration|expiry/i }).first(),
  113 |             this.page.getByPlaceholder(/MM\s*\/\s*YY/i).first(),
  114 |             this.page.locator(selector).first(),
  115 |             ...this.stripeFrameInputLocators(selector, 'iframe[title*="expiration" i], iframe[title*="expiry" i], iframe[name*="cardExpiry" i]'),
  116 |             ...this.stripeFrameInputLocators(selector)
  117 |         ];
  118 |     }
  119 | 
  120 |     private cardCvcLocators(): Locator[] {
  121 |         const selector = '#cardCvc, #Field-cvcInput, input[name="cvc"], input[name="cardCvc"], input[autocomplete="cc-csc"]';
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
```