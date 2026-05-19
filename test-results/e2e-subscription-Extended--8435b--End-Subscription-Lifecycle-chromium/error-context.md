# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-subscription.spec.ts >> Extended E2E Subscription Flow >> Full End-to-End Subscription Lifecycle
- Location: tests\e2e-subscription.spec.ts:20:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*login.*/
Received string:  "https://staging.bluknox.com/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "https://staging.bluknox.com/"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "banner-image" [ref=e7] [cursor=pointer]:
        - /url: /
        - img "banner-image" [ref=e8]
      - generic [ref=e9]:
        - generic [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: /about-us
          - link "Contact Us" [ref=e12] [cursor=pointer]:
            - /url: /contact-us
        - generic [ref=e14]:
          - link "Login" [ref=e15] [cursor=pointer]:
            - /url: /login
            - button "Login" [ref=e16]:
              - generic [ref=e17]: Login
          - link "Sign Up" [ref=e18] [cursor=pointer]:
            - /url: /signup
            - button "Sign Up" [ref=e19]:
              - generic [ref=e20]: Sign Up
  - generic [ref=e22]:
    - main [ref=e23]:
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - heading "Bring the Cloud to your Laptop" [level=1] [ref=e28]:
              - generic [ref=e29]: Bring the Cloud
              - generic [ref=e30]: to your Laptop
            - paragraph [ref=e31]:
              - generic [ref=e32]: Secured
              - generic [ref=e33]: data
              - generic [ref=e34]: management
              - generic [ref=e35]: "&"
              - generic [ref=e36]: sharing
              - generic [ref=e37]: across
              - generic [ref=e38]: all
              - generic [ref=e39]: devices
          - button "View Subscription Plans View Subscription Plans" [ref=e41] [cursor=pointer]:
            - generic [ref=e42]: View Subscription Plans
            - generic: View Subscription Plans
        - img "Mac display" [ref=e45]
    - main [ref=e48]:
      - generic [ref=e49]:
        - generic [ref=e50]:
          - heading "Introducing BluKnox" [level=4] [ref=e51]:
            - generic [ref=e52]: Introducing BluKnox
          - paragraph [ref=e53]:
            - text: BluKnox gets its name from
            - link "Fort Knox" [ref=e54] [cursor=pointer]:
              - /url: https://en.wikipedia.org/wiki/United_States_Bullion_Depository
            - text: ", which is known for the unparalleled security of its vaults."
        - generic [ref=e55]:
          - img "Main Banner" [ref=e57]
          - generic [ref=e59]:
            - paragraph [ref=e60]: Disk encryption, which now comes built-in with the latest OS versions on Windows and Mac computers, only protects data when your PC is not operational or shut down. If your laptop is stolen, your data remains safe due to disk encryption. However, when you are using your PC, the disk is unlocked and hackers can steal your data. Ransomware is one example of a cyberattack that can result in loss of critical data.
            - paragraph [ref=e61]: Hackers also exploit unsecured networks in coffee shops, hotels, airports, hospitals, libraries, and restaurants.
            - paragraph [ref=e62]:
              - text: BluKnox secures the files on your PC with AES 256-bit encryption while keeping them available to view and edit with just one click. It eliminates the risk of data theft for personally identifiable information (PII) and confidential files and
              - generic [ref=e63]: is certified by the US Government (HHS) for privacy and security.
            - paragraph [ref=e64]: With BluKnox, you get all major data transfer / sharing and secure file features in a single product—no guessing which tool to use..........
    - main [ref=e65]:
      - generic [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]:
            - heading "BluKnox has it all" [level=2] [ref=e70]
            - generic [ref=e71]: PATENT PENDING
          - paragraph [ref=e72]: Pay only for what you need by selecting the appropriate add-ons
        - generic [ref=e73]:
          - generic [ref=e74]:
            - link "Secure local file protection on your PC Certification Logo Secure local file protection on your PC Protect files stored locally on your device with powerful encryption that prevents unauthorized access. Data is AES-256 bit encrypted; BluKnox files are not visible in ‘File Explorer’ One-click editing of files Offline access to your confidential or sensitive data The ONC CERTIFIED HIT® is a registered trademark of the United States Department of Health and Human Services (HHS). BluKnox application on the PC is certified for privacy and security under HIPAA by HHS. Watch Video" [ref=e77] [cursor=pointer]:
              - /url: /m/offline-access
              - generic [ref=e78]:
                - generic [ref=e79]:
                  - generic [ref=e80]:
                    - img "Secure local file protection on your PC" [ref=e81]
                    - img "Certification Logo" [ref=e82]
                  - heading "Secure local file protection on your PC" [level=3] [ref=e83]
                  - paragraph [ref=e84]: Protect files stored locally on your device with powerful encryption that prevents unauthorized access.
                  - list [ref=e85]:
                    - listitem [ref=e86]: Data is AES-256 bit encrypted; BluKnox files are not visible in ‘File Explorer’
                    - listitem [ref=e88]: One-click editing of files
                    - listitem [ref=e90]: Offline access to your confidential or sensitive data
                  - paragraph [ref=e92]: The ONC CERTIFIED HIT® is a registered trademark of the United States Department of Health and Human Services (HHS). BluKnox application on the PC is certified for privacy and security under HIPAA by HHS.
                - generic [ref=e94]:
                  - text: Watch Video
                  - img [ref=e96]
            - link "Sync across phone and cloud Sync across phone and cloud Keep your encrypted files synchronized across devices and cloud environments. Export encrypted files from PC to phone or cloud while preserving folder structure. Upload files from phone or cloud into BluKnox with AES 256-bit encryption. Seamlessly download and sync files between PC, phone, and cloud anytime. Learn More" [ref=e101] [cursor=pointer]:
              - /url: /m/sync-phone-cloud
              - generic [ref=e102]:
                - generic [ref=e103]:
                  - img "Sync across phone and cloud" [ref=e105]
                  - heading "Sync across phone and cloud" [level=3] [ref=e106]
                  - paragraph [ref=e107]: Keep your encrypted files synchronized across devices and cloud environments.
                  - list [ref=e108]:
                    - listitem [ref=e109]: Export encrypted files from PC to phone or cloud while preserving folder structure.
                    - listitem [ref=e111]: Upload files from phone or cloud into BluKnox with AES 256-bit encryption.
                    - listitem [ref=e113]: Seamlessly download and sync files between PC, phone, and cloud anytime.
                - generic [ref=e116]:
                  - text: Learn More
                  - img [ref=e118]
            - link "Easy, encrypted data sharing Easy, encrypted data sharing Securely share encrypted data via email, instant messaging (IM), or secure links—without compromising control. Share files via email, IM, or secure links End-to-end encryption ensures only intended recipients can access the data. No complex setup—recipients can decrypt with a simple, secure process. Watch Video" [ref=e123] [cursor=pointer]:
              - /url: /m/true-end-to-end-encryption
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - img "Easy, encrypted data sharing" [ref=e127]
                  - heading "Easy, encrypted data sharing" [level=3] [ref=e128]
                  - paragraph [ref=e129]: Securely share encrypted data via email, instant messaging (IM), or secure links—without compromising control.
                  - list [ref=e130]:
                    - listitem [ref=e131]: Share files via email, IM, or secure links
                    - listitem [ref=e133]: End-to-end encryption ensures only intended recipients can access the data.
                    - listitem [ref=e135]: No complex setup—recipients can decrypt with a simple, secure process.
                - generic [ref=e138]:
                  - text: Watch Video
                  - img [ref=e140]
            - link "PHI-grade encrypted data sharing PHI-grade encrypted data sharing Designed for healthcare, financial and other regulated industries requiring high compliance standards. End-to-end PHI-grade encryption with PC-held keys and double encryption in the cloud (AES-256 + user-managed key). HIPAA-aligned security with certified PC protection True end-to-end protection—secure at source, in transit, and at destination, with full user control. Watch Video" [ref=e145] [cursor=pointer]:
              - /url: /m/phi-grade-encryption
              - generic [ref=e146]:
                - generic [ref=e147]:
                  - img "PHI-grade encrypted data sharing" [ref=e149]
                  - heading "PHI-grade encrypted data sharing" [level=3] [ref=e150]
                  - paragraph [ref=e151]: Designed for healthcare, financial and other regulated industries requiring high compliance standards.
                  - list [ref=e152]:
                    - listitem [ref=e153]: End-to-end PHI-grade encryption with PC-held keys and double encryption in the cloud (AES-256 + user-managed key).
                    - listitem [ref=e155]: HIPAA-aligned security with certified PC protection
                    - listitem [ref=e157]: True end-to-end protection—secure at source, in transit, and at destination, with full user control.
                - generic [ref=e160]:
                  - text: Watch Video
                  - img [ref=e162]
          - generic [ref=e165]:
            - generic [ref=e169]:
              - img "safety" [ref=e172]:
                - img [ref=e173]
              - heading "Simple Installation" [level=3] [ref=e176]
              - paragraph [ref=e177]: No admin access required to install on Windows and Mac. Get up and running in minutes.
            - generic [ref=e181]:
              - img "lock" [ref=e184]:
                - img [ref=e185]
              - heading "Enhanced Data Security" [level=3] [ref=e187]
              - paragraph [ref=e188]: More features directly on your PC compared to traditional secure data transfer products, which are server-based.
            - generic [ref=e192]:
              - img "mobile" [ref=e195]:
                - img [ref=e196]
              - heading "Available Everywhere" [level=3] [ref=e198]
              - paragraph [ref=e199]: BluKnox phone app is available on the Apple Store and Google Play Store for seamless mobile productivity.
    - main [ref=e200]:
      - generic [ref=e202]:
        - generic [ref=e203]:
          - heading "Products" [level=2] [ref=e204]
          - paragraph [ref=e205]: BluKnox offers flexible solutions designed for individuals, business professionals, and enterprise teams who demand uncompromising data security.
        - generic [ref=e206]:
          - link "BluKnox Classic View Details BluKnox Classic" [ref=e208] [cursor=pointer]:
            - /url: /product/ODQ=
            - generic [ref=e209]:
              - generic [ref=e211]:
                - img "BluKnox Classic" [ref=e212]
                - generic [ref=e214]: View Details
              - heading "BluKnox Classic" [level=3] [ref=e217]
          - link "BluKnox Healthcare View Details BluKnox Healthcare" [ref=e219] [cursor=pointer]:
            - /url: /product/ODU=
            - generic [ref=e220]:
              - generic [ref=e222]:
                - img "BluKnox Healthcare" [ref=e223]
                - generic [ref=e225]: View Details
              - heading "BluKnox Healthcare" [level=3] [ref=e228]
          - link "BluKnox Enterprise View Details BluKnox Enterprise" [ref=e230] [cursor=pointer]:
            - /url: /product/ODY=
            - generic [ref=e231]:
              - generic [ref=e233]:
                - img "BluKnox Enterprise" [ref=e234]
                - generic [ref=e236]: View Details
              - heading "BluKnox Enterprise" [level=3] [ref=e239]
          - link "BluKnox API View Details BluKnox API" [ref=e241] [cursor=pointer]:
            - /url: /product/ODc=
            - generic [ref=e242]:
              - generic [ref=e244]:
                - img "BluKnox API" [ref=e245]
                - generic [ref=e247]: View Details
              - heading "BluKnox API" [level=3] [ref=e250]
          - link "BluKnox GroupShare View Details BluKnox GroupShare" [ref=e252] [cursor=pointer]:
            - /url: /product/ODg=
            - generic [ref=e253]:
              - generic [ref=e255]:
                - img "BluKnox GroupShare" [ref=e256]
                - generic [ref=e258]: View Details
              - heading "BluKnox GroupShare" [level=3] [ref=e261]
    - main [ref=e262]:
      - generic [ref=e263]:
        - generic [ref=e264]:
          - heading "Want to Know More?" [level=2] [ref=e265]
          - paragraph [ref=e266]: Explore deeper insights into BluKnox security, encryption standards, and everyday usability
        - generic [ref=e267]:
          - link "Data Management in the BluKnox System BluKnox secures your data directly on your PC while using the cloud for encrypted transport and controlled access on mobile. Your files remain under your control at all times and are never accessible to BluKnox administrators or third parties. Learn More" [ref=e268] [cursor=pointer]:
            - /url: /m/secure-data-mgmt-more-info
            - generic [ref=e269]:
              - heading "Data Management in the BluKnox System" [level=3] [ref=e270]
              - paragraph [ref=e271]: BluKnox secures your data directly on your PC while using the cloud for encrypted transport and controlled access on mobile. Your files remain under your control at all times and are never accessible to BluKnox administrators or third parties.
            - generic [ref=e272]:
              - text: Learn More
              - img [ref=e274]
          - link "PHI-Grade Encrypted Data Sharing Designed for healthcare and regulated industries, PHI-grade encryption provides true end-to-end protection with PC-held export keys, double encryption in the cloud, and comprehensive audit logging for enhanced accountability. Learn More" [ref=e277] [cursor=pointer]:
            - /url: /m/secure-data-mgmt-more-info
            - generic [ref=e278]:
              - heading "PHI-Grade Encrypted Data Sharing" [level=3] [ref=e279]
              - paragraph [ref=e280]: Designed for healthcare and regulated industries, PHI-grade encryption provides true end-to-end protection with PC-held export keys, double encryption in the cloud, and comprehensive audit logging for enhanced accountability.
            - generic [ref=e281]:
              - text: Learn More
              - img [ref=e283]
          - link "Helpful Note on Using BluKnox BluKnox is built to secure your most sensitive files — not replace your PC storage. Learn how to organize encrypted folders efficiently while maintaining optimal performance and scalability. Learn More" [ref=e286] [cursor=pointer]:
            - /url: /m/secure-data-mgmt-more-info
            - generic [ref=e287]:
              - heading "Helpful Note on Using BluKnox" [level=3] [ref=e288]
              - paragraph [ref=e289]: BluKnox is built to secure your most sensitive files — not replace your PC storage. Learn how to organize encrypted folders efficiently while maintaining optimal performance and scalability.
            - generic [ref=e290]:
              - text: Learn More
              - img [ref=e292]
          - link "BluKnox in Your Daily Life From securing files on your PC to encrypted messaging, mobile viewing, offline access, and cross-device transfers, BluKnox integrates seamlessly into your everyday workflow. Learn More" [ref=e295] [cursor=pointer]:
            - /url: /m/secure-data-mgmt-more-info
            - generic [ref=e296]:
              - heading "BluKnox in Your Daily Life" [level=3] [ref=e297]
              - paragraph [ref=e298]: From securing files on your PC to encrypted messaging, mobile viewing, offline access, and cross-device transfers, BluKnox integrates seamlessly into your everyday workflow.
            - generic [ref=e299]:
              - text: Learn More
              - img [ref=e301]
    - generic [ref=e305]:
      - heading "Book a Demo" [level=2] [ref=e306]
      - paragraph [ref=e307]: Experience the power of BluKnox firsthand. Get a personalized walkthrough of our secure digital vault technology.
      - button "Request Demo Request Demo" [ref=e309] [cursor=pointer]:
        - generic [ref=e310]: Request Demo
        - generic: Request Demo
  - contentinfo [ref=e311]:
    - generic [ref=e312]:
      - generic [ref=e313]:
        - generic [ref=e314]:
          - generic [ref=e315]: BluKnox
          - paragraph [ref=e316]: Secured data management & sharing across all devices
        - generic [ref=e317]:
          - heading "Quick Links" [level=3] [ref=e318]
          - list [ref=e319]:
            - listitem [ref=e320]:
              - link "ONC Health IT Certification CHPL Listing" [ref=e321] [cursor=pointer]:
                - /url: https://chpl.healthit.gov/#/listing/11826
            - listitem [ref=e322]:
              - link "ONC Health IT Certification Mandatory Disclosures" [ref=e323] [cursor=pointer]:
                - /url: https://intellixs.com/html_pages/healthcare/Mandatory%20Disclosures.html
            - listitem [ref=e324]:
              - link "Patient Data Export Format" [ref=e325] [cursor=pointer]:
                - /url: https://intellixs.com/html_pages/healthcare/Patient%20Data%20Export%20Format.html
        - generic [ref=e326]:
          - heading "Products" [level=3] [ref=e327]
          - list [ref=e328]:
            - listitem [ref=e329]:
              - link "BluKnox Classic" [ref=e330] [cursor=pointer]:
                - /url: /product/ODQ=
            - listitem [ref=e331]:
              - link "BluKnox Healthcare" [ref=e332] [cursor=pointer]:
                - /url: /product/ODU=
            - listitem [ref=e333]:
              - link "BluKnox Enterprise" [ref=e334] [cursor=pointer]:
                - /url: /product/ODY=
            - listitem [ref=e335]:
              - link "BluKnox API" [ref=e336] [cursor=pointer]:
                - /url: /product/ODc=
            - listitem [ref=e337]:
              - link "BluKnox GroupShare" [ref=e338] [cursor=pointer]:
                - /url: /product/ODg=
        - generic [ref=e339]:
          - heading "Contact Us" [level=3] [ref=e340]
          - generic [ref=e341]:
            - generic [ref=e342]:
              - generic [ref=e343]: Blucygnus, Inc.
              - generic [ref=e344]: 800 N. State St, Ste 402
              - generic [ref=e345]: Dover, DE 19901
            - paragraph [ref=e346]:
              - img "phone" [ref=e347]:
                - img [ref=e348]
              - text: +1 (302) 302-3454
      - paragraph [ref=e351]:
        - text: ©
        - link "Blucygnus, Inc." [ref=e352] [cursor=pointer]:
          - /url: https://blucygnus.ai
        - text: – All Rights Reserved
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { SubscriptionPage } from '../pages/SubscriptionPage';
  4  | import { CheckoutPage } from '../pages/CheckoutPage';
  5  | 
  6  | test.describe('Extended E2E Subscription Flow', () => {
  7  |     let loginPage: LoginPage;
  8  |     let subscriptionPage: SubscriptionPage;
  9  |     let checkoutPage: CheckoutPage;
  10 | 
  11 |     test.beforeEach(async ({ page }) => {
  12 |         // Step 1: Configure Viewport
  13 |         await page.setViewportSize({ width: 1981, height: 558 });
  14 |         
  15 |         loginPage = new LoginPage(page);
  16 |         subscriptionPage = new SubscriptionPage(page);
  17 |         checkoutPage = new CheckoutPage(page);
  18 |     });
  19 | 
  20 |     test('Full End-to-End Subscription Lifecycle', async ({ page }) => {
  21 |         test.setTimeout(180000);
  22 |         // Step 2 & 3: Launch and Validate Landing
  23 |         await page.goto('https://staging.bluknox.com/');
  24 |         await expect(page).toHaveTitle(/bluknox/i);
  25 |         
  26 |         // Phase 2: Login Flow
  27 |         if (await page.locator('input[type="email"]').isVisible({ timeout: 5000 })) {
  28 |             await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
  29 |         }
  30 |         
  31 |         // Assert Login Success
  32 |         await expect(page.locator('.ant-dropdown-trigger').first()).toBeVisible({ timeout: 30000 });
  33 | 
  34 |         // Phase 3: Navigate to Subscription Plans
  35 |         await subscriptionPage.goTo();
  36 |         
  37 |         // Phase 4: Validate Plans UI
  38 |         await subscriptionPage.validatePlansUI();
  39 | 
  40 |         // Phase 5: Interaction (Checkout Flow)
  41 |         await subscriptionPage.selectPlan('Personal Plan');
  42 |         
  43 |         // Wait for Order Summary drawer
  44 |         await expect(page.getByText('Order Summary')).toBeVisible({ timeout: 15000 });
  45 |         
  46 |         await subscriptionPage.proceedToCheckout();
  47 | 
  48 |         // Stripe Payment Page
  49 |         await page.waitForURL(/.*checkout.stripe.com.*/, { timeout: 60000 });
  50 |         
  51 |         // Complete payment through the Stripe POM
  52 |         await checkoutPage.completePayment();
  53 | 
  54 |         // Phase 6: Redirection and Cleanup
  55 |         await page.waitForURL(/.*(orders|order-history).*/, { timeout: 90000 });
  56 |         await expect(page).toHaveURL(/.*(orders|order-history).*/);
  57 |         
  58 |         // Close drawer/modal if present
  59 |         const closeButton = page.locator('.ant-drawer-close').or(page.getByRole('button', { name: /Close|Cancel/i })).first();
  60 |         if (await closeButton.isVisible()) {
  61 |             await closeButton.click();
  62 |         }
  63 | 
  64 |         // Download button
  65 |         const downloadButton = page.getByRole('button', { name: /download/i }).first();
  66 |         if (await downloadButton.isVisible({ timeout: 15000 })) {
  67 |             const [download] = await Promise.all([
  68 |                 page.waitForEvent('download'),
  69 |                 downloadButton.click(),
  70 |             ]);
  71 |             console.log('Downloaded file:', download.suggestedFilename());
  72 |         }
  73 | 
  74 |         // Phase 6: Logout
  75 |         await subscriptionPage.logout();
> 76 |         await expect(page).toHaveURL(/.*login.*/);
     |                            ^ Error: expect(page).toHaveURL(expected) failed
  77 |     });
  78 | });
  79 | 
```