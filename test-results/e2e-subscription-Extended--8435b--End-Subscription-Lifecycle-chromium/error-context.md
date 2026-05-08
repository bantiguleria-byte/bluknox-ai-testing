# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-subscription.spec.ts >> Extended E2E Subscription Flow >> Full End-to-End Subscription Lifecycle
- Location: tests\e2e-subscription.spec.ts:20:9

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
      - generic [ref=e122]:
        - generic [ref=e123]:
          - iframe [ref=e129]:
            - button "Pay with Link" [ref=f10e8] [cursor=pointer]:
              - generic [ref=f10e9]:
                - generic [ref=f10e10]:
                  - text: Pay with
                  - img [ref=f10e11]
                - generic [ref=f10e14]:
                  - img [ref=f10e15]
                  - generic [ref=f10e22]: "0000"
          - generic [ref=e130]:
            - separator [ref=e131]
            - paragraph [ref=e132]: Or
        - heading "Contact information" [level=2] [ref=e133]
      - generic [ref=e137]:
        - generic [ref=e138]:
          - generic [ref=e145]:
            - generic [ref=e146]: Email
            - generic [ref=e148]:
              - generic [ref=e149]: banti.guleria@idsil.com
              - button "Continue with Link" [ref=e151] [cursor=pointer]:
                - generic [ref=e152]: Continue with Link
          - heading "Payment method" [level=2] [ref=e154]
        - list [ref=e156]:
          - listitem [ref=e161]:
            - generic [ref=e162]:
              - generic [ref=e176]: Card
              - generic [ref=e182]:
                - generic [ref=e184]:
                  - generic [ref=e186]: Card information
                  - group [ref=e187]:
                    - generic [ref=e188]:
                      - generic [ref=e190]:
                        - textbox "Card number" [ref=e193]:
                          - /placeholder: 1234 1234 1234 1234
                          - text: "0"
                        - generic:
                          - img
                      - generic [ref=e195]:
                        - textbox "Expiration" [ref=e198]:
                          - /placeholder: MM / YY
                          - text: "0"
                        - generic:
                          - img
                      - generic [ref=e200]:
                        - textbox "CVC" [active] [ref=e203]: "0"
                        - generic:
                          - generic:
                            - img "Credit or debit card CVC"
                      - generic [ref=e204]:
                        - generic:
                          - alert: Your card number is incomplete.
                - group "Billing address" [ref=e210]:
                  - generic [ref=e211]:
                    - generic [ref=e213]:
                      - generic [ref=e215]: Cardholder name
                      - textbox "Cardholder name" [ref=e222]:
                        - /placeholder: Full name on card
                    - generic [ref=e224]:
                      - generic [ref=e226]: Country or region
                      - generic [ref=e232]:
                        - combobox "Country or region" [ref=e233]:
                          - option "Afghanistan"
                          - option "Åland Islands"
                          - option "Albania"
                          - option "Algeria"
                          - option "Andorra"
                          - option "Angola"
                          - option "Anguilla"
                          - option "Antarctica"
                          - option "Antigua & Barbuda"
                          - option "Argentina"
                          - option "Armenia"
                          - option "Aruba"
                          - option "Ascension Island"
                          - option "Australia"
                          - option "Austria"
                          - option "Azerbaijan"
                          - option "Bahamas"
                          - option "Bahrain"
                          - option "Bangladesh"
                          - option "Barbados"
                          - option "Belarus"
                          - option "Belgium"
                          - option "Belize"
                          - option "Benin"
                          - option "Bermuda"
                          - option "Bhutan"
                          - option "Bolivia"
                          - option "Bosnia & Herzegovina"
                          - option "Botswana"
                          - option "Bouvet Island"
                          - option "Brazil"
                          - option "British Indian Ocean Territory"
                          - option "British Virgin Islands"
                          - option "Brunei"
                          - option "Bulgaria"
                          - option "Burkina Faso"
                          - option "Burundi"
                          - option "Cambodia"
                          - option "Cameroon"
                          - option "Canada"
                          - option "Cape Verde"
                          - option "Caribbean Netherlands"
                          - option "Cayman Islands"
                          - option "Central African Republic"
                          - option "Chad"
                          - option "Chile"
                          - option "China"
                          - option "Colombia"
                          - option "Comoros"
                          - option "Congo - Brazzaville"
                          - option "Congo - Kinshasa"
                          - option "Cook Islands"
                          - option "Costa Rica"
                          - option "Côte d’Ivoire"
                          - option "Croatia"
                          - option "Curaçao"
                          - option "Cyprus"
                          - option "Czechia"
                          - option "Denmark"
                          - option "Djibouti"
                          - option "Dominica"
                          - option "Dominican Republic"
                          - option "Ecuador"
                          - option "Egypt"
                          - option "El Salvador"
                          - option "Equatorial Guinea"
                          - option "Eritrea"
                          - option "Estonia"
                          - option "Eswatini"
                          - option "Ethiopia"
                          - option "Falkland Islands"
                          - option "Faroe Islands"
                          - option "Fiji"
                          - option "Finland"
                          - option "France"
                          - option "French Guiana"
                          - option "French Polynesia"
                          - option "French Southern Territories"
                          - option "Gabon"
                          - option "Gambia"
                          - option "Georgia"
                          - option "Germany"
                          - option "Ghana"
                          - option "Gibraltar"
                          - option "Greece"
                          - option "Greenland"
                          - option "Grenada"
                          - option "Guadeloupe"
                          - option "Guam"
                          - option "Guatemala"
                          - option "Guernsey"
                          - option "Guinea"
                          - option "Guinea-Bissau"
                          - option "Guyana"
                          - option "Haiti"
                          - option "Honduras"
                          - option "Hong Kong SAR China"
                          - option "Hungary"
                          - option "Iceland"
                          - option "India" [selected]
                          - option "Indonesia"
                          - option "Iraq"
                          - option "Ireland"
                          - option "Isle of Man"
                          - option "Israel"
                          - option "Italy"
                          - option "Jamaica"
                          - option "Japan"
                          - option "Jersey"
                          - option "Jordan"
                          - option "Kazakhstan"
                          - option "Kenya"
                          - option "Kiribati"
                          - option "Kosovo"
                          - option "Kuwait"
                          - option "Kyrgyzstan"
                          - option "Laos"
                          - option "Latvia"
                          - option "Lebanon"
                          - option "Lesotho"
                          - option "Liberia"
                          - option "Libya"
                          - option "Liechtenstein"
                          - option "Lithuania"
                          - option "Luxembourg"
                          - option "Macao SAR China"
                          - option "Madagascar"
                          - option "Malawi"
                          - option "Malaysia"
                          - option "Maldives"
                          - option "Mali"
                          - option "Malta"
                          - option "Martinique"
                          - option "Mauritania"
                          - option "Mauritius"
                          - option "Mayotte"
                          - option "Mexico"
                          - option "Moldova"
                          - option "Monaco"
                          - option "Mongolia"
                          - option "Montenegro"
                          - option "Montserrat"
                          - option "Morocco"
                          - option "Mozambique"
                          - option "Myanmar (Burma)"
                          - option "Namibia"
                          - option "Nauru"
                          - option "Nepal"
                          - option "Netherlands"
                          - option "New Caledonia"
                          - option "New Zealand"
                          - option "Nicaragua"
                          - option "Niger"
                          - option "Nigeria"
                          - option "Niue"
                          - option "North Macedonia"
                          - option "Norway"
                          - option "Oman"
                          - option "Pakistan"
                          - option "Palestinian Territories"
                          - option "Panama"
                          - option "Papua New Guinea"
                          - option "Paraguay"
                          - option "Peru"
                          - option "Philippines"
                          - option "Pitcairn Islands"
                          - option "Poland"
                          - option "Portugal"
                          - option "Puerto Rico"
                          - option "Qatar"
                          - option "Réunion"
                          - option "Romania"
                          - option "Russia"
                          - option "Rwanda"
                          - option "Samoa"
                          - option "San Marino"
                          - option "São Tomé & Príncipe"
                          - option "Saudi Arabia"
                          - option "Senegal"
                          - option "Serbia"
                          - option "Seychelles"
                          - option "Sierra Leone"
                          - option "Singapore"
                          - option "Sint Maarten"
                          - option "Slovakia"
                          - option "Slovenia"
                          - option "Solomon Islands"
                          - option "Somalia"
                          - option "South Africa"
                          - option "South Georgia & South Sandwich Islands"
                          - option "South Korea"
                          - option "South Sudan"
                          - option "Spain"
                          - option "Sri Lanka"
                          - option "St. Barthélemy"
                          - option "St. Helena"
                          - option "St. Kitts & Nevis"
                          - option "St. Lucia"
                          - option "St. Martin"
                          - option "St. Pierre & Miquelon"
                          - option "St. Vincent & Grenadines"
                          - option "Sudan"
                          - option "Suriname"
                          - option "Svalbard & Jan Mayen"
                          - option "Sweden"
                          - option "Switzerland"
                          - option "Taiwan"
                          - option "Tajikistan"
                          - option "Tanzania"
                          - option "Thailand"
                          - option "Timor-Leste"
                          - option "Togo"
                          - option "Tokelau"
                          - option "Tonga"
                          - option "Trinidad & Tobago"
                          - option "Tristan da Cunha"
                          - option "Tunisia"
                          - option "Turkey"
                          - option "Turkmenistan"
                          - option "Turks & Caicos Islands"
                          - option "Tuvalu"
                          - option "Uganda"
                          - option "Ukraine"
                          - option "United Arab Emirates"
                          - option "United Kingdom"
                          - option "United States"
                          - option "Uruguay"
                          - option "Uzbekistan"
                          - option "Vanuatu"
                          - option "Vatican City"
                          - option "Venezuela"
                          - option "Vietnam"
                          - option "Wallis & Futuna"
                          - option "Western Sahara"
                          - option "Yemen"
                          - option "Zambia"
                          - option "Zimbabwe"
                        - img
        - generic [ref=e235]:
          - button "Subscribe" [ref=e238] [cursor=pointer]:
            - generic:
              - generic [ref=e240]: Subscribe
              - generic [ref=e241]: Processing
            - img [ref=e246]
            - img [ref=e251]
          - generic [ref=e257]: By subscribing, you authorize BluCygnus sandbox to charge you in INR at the displayed exchange rate or the exchange rate at the time of billing, according to the terms until you cancel.
      - generic [ref=e258]:
        - checkbox "I am an AI agent acting on behalf of someone else" [ref=e259]
        - text: I am an AI agent acting on behalf of someone else
    - contentinfo [ref=e261]:
      - link "Powered by Stripe" [ref=e263] [cursor=pointer]:
        - /url: https://stripe.com
        - generic [ref=e264]:
          - text: Powered by
          - img "Stripe" [ref=e266]
      - link "Terms" [ref=e269] [cursor=pointer]:
        - /url: https://stripe.com/legal/end-users
      - link "Privacy" [ref=e270] [cursor=pointer]:
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