# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload.spec.ts >> Upload Module Tests >> TC-UP-005: Verify Document Deletion
- Location: tests\upload.spec.ts:50:9

# Error details

```
TimeoutError: locator.click: Timeout 40000ms exceeded.
Call log:
  - waiting for getByRole('row').filter({ hasText: 'sample.pdf' }).getByRole('button', { name: 'delete' })

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
  - main [ref=e22]:
    - generic [ref=e23]:
      - heading "401" [level=1] [ref=e24]
      - heading "Unauthorized Access" [level=2] [ref=e25]
      - generic [ref=e26]: You do not have permission to view this page. Please sign in with an account that has the required access.
      - link "Back to Home" [ref=e28] [cursor=pointer]:
        - /url: /
        - button "Back to Home" [ref=e29]:
          - generic [ref=e30]: Back to Home
  - contentinfo [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - generic [ref=e34]:
          - generic [ref=e35]: BluKnox
          - paragraph [ref=e36]: Secured data management & sharing across all devices
        - generic [ref=e37]:
          - heading "Quick Links" [level=3] [ref=e38]
          - list [ref=e39]:
            - listitem [ref=e40]:
              - link "ONC Health IT Certification CHPL Listing" [ref=e41] [cursor=pointer]:
                - /url: https://chpl.healthit.gov/#/listing/11746
            - listitem [ref=e42]:
              - link "ONC Health IT Certification Mandatory Disclosures" [ref=e43] [cursor=pointer]:
                - /url: https://intellixs.com/html_pages/healthcare/Mandatory%20Disclosures.html
            - listitem [ref=e44]:
              - link "Patient Data Export Format" [ref=e45] [cursor=pointer]:
                - /url: https://intellixs.com/html_pages/healthcare/Patient%20Data%20Export%20Format.html
        - generic [ref=e46]:
          - heading "Products" [level=3] [ref=e47]
          - list
        - generic [ref=e48]:
          - heading "Contact Us" [level=3] [ref=e49]
          - generic [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: Blucygnus, Inc.
              - generic [ref=e53]: 800 N. State St, Ste 402
              - generic [ref=e54]: Dover, DE 19901
            - paragraph [ref=e55]:
              - img "phone" [ref=e56]:
                - img [ref=e57]
              - text: +1 (302) 302-3454
      - paragraph [ref=e60]:
        - text: ©
        - link "Blucygnus, Inc." [ref=e61] [cursor=pointer]:
          - /url: https://blucygnus.ai
        - text: – All Rights Reserved
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class UploadPage extends BasePage {
  5  |     private readonly uploadButton: Locator;
  6  |     private readonly documentTable: Locator;
  7  |     private readonly shareIcon: Locator;
  8  |     private readonly downloadIcon: Locator;
  9  |     private readonly deleteIcon: Locator;
  10 | 
  11 |     constructor(page: Page) {
  12 |         super(page);
  13 |         this.uploadButton = page.getByRole('button', { name: /Click to Upload/i });
  14 |         this.documentTable = page.getByRole('table');
  15 |         this.shareIcon = page.getByRole('button', { name: 'share-alt' });
  16 |         this.downloadIcon = page.getByRole('button', { name: 'download' });
  17 |         this.deleteIcon = page.getByRole('button', { name: 'delete' });
  18 |     }
  19 | 
  20 |     async goTo() {
  21 |         await this.navigateTo('/upload');
  22 |     }
  23 | 
  24 |     async uploadFile(filePath: string) {
  25 |         const [fileChooser] = await Promise.all([
  26 |             this.page.waitForEvent('filechooser'),
  27 |             this.click(this.uploadButton),
  28 |         ]);
  29 |         await fileChooser.setFiles(filePath);
  30 |     }
  31 | 
  32 |     async getDocumentRow(name: string): Promise<Locator> {
  33 |         return this.page.getByRole('row').filter({ hasText: name });
  34 |     }
  35 | 
  36 |     async downloadDocument(name: string) {
  37 |         const row = await this.getDocumentRow(name);
  38 |         const downloadBtn = row.getByRole('button', { name: 'download' });
  39 |         
  40 |         // Clicking download opens a new tab to a file-share disclaimer page
  41 |         const [popup] = await Promise.all([
  42 |             this.page.waitForEvent('popup'),
  43 |             downloadBtn.click(),
  44 |         ]);
  45 |         
  46 |         // Wait for the disclaimer page to load in the new tab
  47 |         await popup.waitForLoadState('load');
  48 |         
  49 |         // Click "Yes" on the disclaimer page to initiate the actual download
  50 |         const [download] = await Promise.all([
  51 |             popup.waitForEvent('download', { timeout: 30000 }),
  52 |             popup.getByRole('button', { name: 'Yes' }).click(),
  53 |         ]);
  54 |         
  55 |         return download;
  56 |     }
  57 | 
  58 |     async deleteDocument(name: string) {
  59 |         const row = await this.getDocumentRow(name);
  60 |         const deleteBtn = row.getByRole('button', { name: 'delete' });
> 61 |         await deleteBtn.click();
     |                         ^ TimeoutError: locator.click: Timeout 40000ms exceeded.
  62 |         
  63 |         // Handle confirmation modal
  64 |         const okButton = this.page.getByRole('button', { name: 'OK' });
  65 |         await okButton.waitFor({ state: 'visible', timeout: 5000 });
  66 |         await okButton.click();
  67 | 
  68 |         // Wait for success toast notification
  69 |         await this.page.getByText(/deleted successfully/i).waitFor({ state: 'visible', timeout: 10000 });
  70 |     }
  71 | 
  72 |     async shareDocument(name: string) {
  73 |         const row = await this.getDocumentRow(name);
  74 |         // Find the share button by its icon's aria-label
  75 |         const shareBtn = row.locator('button').filter({ has: this.page.locator('span[aria-label="share-alt"]') });
  76 |         await shareBtn.waitFor({ state: 'visible', timeout: 15000 });
  77 |         await shareBtn.click();
  78 |     }
  79 | }
  80 | 
```