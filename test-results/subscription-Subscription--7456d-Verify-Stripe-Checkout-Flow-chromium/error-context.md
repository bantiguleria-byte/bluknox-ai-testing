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
  32  |                 const aiAgentLabel = this.page.getByText(/I am an AI agent/i);
  33  |                 await aiAgentLabel.scrollIntoViewIfNeeded();
  34  |                 await this.page.waitForTimeout(200);
> 35  |                 await aiAgentLabel.click({ force: true });
      |                                    ^ Error: locator.click: Element is outside of the viewport
  36  |             });
  37  |         }
  38  | 
  39  |         await expect(this.subscribeButton).toBeVisible({ timeout: 30000 });
  40  |         await this.click(this.subscribeButton);
  41  |         await this.page.waitForURL(/.*order-history.*/, { timeout: 120000 });
  42  |     }
  43  | 
  44  |     async fillCardDetails(cardNumber: string, expiry: string, cvc: string) {
  45  |         await this.handleStripeLinkChallenge('000000');
  46  | 
  47  |         const cardInputSelector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
  48  |         const expiryInputSelector = '#cardExpiry, #Field-expiryInput, input[name="exp-date"], input[name="cardExpiry"], input[autocomplete="cc-exp"]';
  49  |         const cvcInputSelector = '#cardCvc, #Field-cvcInput, input[name="cvc"], input[name="cardCvc"], input[autocomplete="cc-csc"]';
  50  |         const postalInputSelector = '#billingPostalCode, #Field-postalCodeInput, input[name="postal"], input[name="postalCode"], input[autocomplete="postal-code"]';
  51  | 
  52  |         const cardFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(cardInputSelector);
  53  |         const expiryFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(expiryInputSelector);
  54  |         const cvcFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(cvcInputSelector);
  55  |         const postalFrameLocators = await this.stripeFrameInputLocatorsFromLiveFrames(postalInputSelector);
  56  | 
  57  |         const cardNumberInput = await this.firstVisibleLocator([
  58  |             this.page.getByRole('textbox', { name: /card number/i }).first(),
  59  |             this.page.getByPlaceholder(/1234 1234/i).first(),
  60  |             this.page.locator(cardInputSelector).first(),
  61  |             ...cardFrameLocators,
  62  |         ], 'Stripe card number input', 120000);
  63  | 
  64  |         const expiryInput = await this.firstVisibleLocator([
  65  |             this.page.getByRole('textbox', { name: /expiration|expiry/i }).first(),
  66  |             this.page.getByPlaceholder(/MM\s*\/\s*YY/i).first(),
  67  |             this.page.locator(expiryInputSelector).first(),
  68  |             ...expiryFrameLocators,
  69  |         ], 'Stripe expiry input', 30000);
  70  | 
  71  |         const cvcInput = await this.firstVisibleLocator([
  72  |             this.page.getByRole('textbox', { name: /cvc|security code/i }).first(),
  73  |             this.page.locator(cvcInputSelector).first(),
  74  |             ...cvcFrameLocators,
  75  |         ], 'Stripe CVC input', 30000);
  76  | 
  77  |         await cardNumberInput.fill(cardNumber);
  78  |         await expiryInput.fill(expiry);
  79  |         await cvcInput.fill(cvc);
  80  | 
  81  |         const postalInput = await this.firstVisibleLocator([
  82  |             this.page.locator(postalInputSelector).first(),
  83  |             ...postalFrameLocators,
  84  |         ], 'Stripe postal code input', 3000).catch(() => null);
  85  |         if (postalInput) {
  86  |             await postalInput.fill('110001');
  87  |         }
  88  |     }
  89  | 
  90  |     async setCardholderName(name: string) {
  91  |         // Stripe hosted page usually uses billingName, but let's be deterministic
  92  |         const nameInput = this.page.locator('#billingName, input[name="billingName"], input[autocomplete="cc-name"]')
  93  |             .or(this.page.getByLabel(/cardholder name|name on card/i))
  94  |             .first();
  95  |         await expect(nameInput).toBeVisible({ timeout: 15000 });
  96  |         await nameInput.fill(name);
  97  |     }
  98  | 
  99  |     async enterOTP(otp: string) {
  100 |         console.log("Waiting for Stripe content to load (waiting for skeletons to vanish)...");
  101 |         
  102 |         // Wait for ANY real content or the skeleton to be hidden
  103 |         const skeleton = this.page.locator('.Skeleton, .loading, .spinner').first();
  104 |         if (await skeleton.isVisible().catch(() => false)) {
  105 |             await skeleton.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  106 |         }
  107 |         
  108 |         // Give it a small extra buffer for Stripe's dynamic hydration
  109 |         await this.page.waitForTimeout(3000);
  110 |         
  111 |         // Capture a screenshot for debugging
  112 |         await this.page.screenshot({ path: `test-results/stripe-ready-${Date.now()}.png` });
  113 | 
  114 |         await this.handleStripeLinkChallenge(otp);
  115 |     }
  116 | 
  117 |     async getStripeErrorMessage(): Promise<string> {
  118 |         // Stripe uses various selectors for error messages depending on the field and context
  119 |         const errorElement = await this.firstVisibleLocator([
  120 |             this.page.locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError').first(),
  121 |             this.stripeFrame().locator('#error-message, .FieldError, [role="alert"], .CheckoutInput--invalid + .FieldError').first()
  122 |         ], 'Stripe validation error', 15000);
  123 |         return (await errorElement.textContent()) || '';
  124 |     }
  125 | 
  126 |     private stripeFrame(selector = this.stripeFrameSelector): FrameLocator {
  127 |         return this.page.frameLocator(selector).first();
  128 |     }
  129 | 
  130 |     private cardNumberLocators(): Locator[] {
  131 |         const selector = '#cardNumber, #Field-numberInput, input[name="cardnumber"], input[autocomplete="cc-number"]';
  132 |         return [
  133 |             this.page.getByRole('textbox', { name: /card number/i }).first(),
  134 |             this.page.getByPlaceholder(/1234 1234/i).first(),
  135 |             this.page.locator(selector).first(),
```