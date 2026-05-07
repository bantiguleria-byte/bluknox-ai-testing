# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile-regression.spec.ts >> Profile Module Regression Suite >> TC-PROF-006: Verify Customer Service contact form is present
- Location: tests\profile-regression.spec.ts:51:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Profile Settings').first().or(getByLabel('First Name').or(locator('input[id*="firstName"]'))).first()
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByText('Profile Settings').first().or(getByLabel('First Name').or(locator('input[id*="firstName"]'))).first()

```

# Test source

```ts
  44  |         this.faqLink = sidebar.getByText('Frequently Asked Questions');
  45  |         this.trainingMaterialLink = sidebar.getByText('Training Material');
  46  |         this.customerServiceLink = sidebar.getByText('Customer Service');
  47  | 
  48  |         // Headers
  49  |         this.profileHeader = page.getByText('Profile Settings').first();
  50  |         this.orderHistoryHeader = page.getByText('Order History').first();
  51  |         this.billingHeader = page.getByText('Billing & Subscription').first();
  52  |         this.changePasswordHeader = page.getByText('Change Password').first();
  53  |         this.supportHeader = page.getByText('BluKnox Functions').first();
  54  | 
  55  |         // Inputs
  56  |         this.firstNameInput = page.getByLabel('First Name').or(page.locator('input[id*="firstName"]'));
  57  |         this.lastNameInput = page.getByLabel('Last Name').or(page.locator('input[id*="lastName"]'));
  58  |         this.emailInput = page.getByLabel('Email').or(page.locator('input[id*="email"]'));
  59  |         this.oldPasswordInput = page.getByLabel('Old Password').or(page.locator('input[id*="oldPassword"]'));
  60  |         this.newPasswordInput = page.getByLabel('New Password').or(page.locator('input[id*="newPassword"]'));
  61  |         this.confirmPasswordInput = page.getByLabel('Confirm Password').or(page.locator('input[id*="confirmPassword"]'));
  62  | 
  63  |         // Buttons
  64  |         this.saveButton = page.getByRole('button', { name: 'Save' });
  65  |         this.updatePasswordButton = this.saveButton;
  66  |         this.errorMessage = page.locator('.ant-form-item-explain-error, .ant-notification-notice-error, .ant-message-error, .ant-notification-notice-message');
  67  |         this.notificationNotice = page.locator('.ant-notification-notice-error, .ant-message-error');
  68  |         this.spinner = page.locator('.ant-spin, .ant-skeleton');
  69  |     }
  70  | 
  71  |     async navigateToProfile() {
  72  |         if (this.page.url().includes('/profile')) {
  73  |             await this.ensureProfileSectionLoaded();
  74  |             return;
  75  |         }
  76  | 
  77  |         await expect(this.page.locator('.ant-dropdown-trigger').or(this.page.locator('.ant-avatar')).first()).toBeVisible({ timeout: 30000 });
  78  |         
  79  |         // Try to navigate with retry logic for transient network errors
  80  |         let lastError: Error | null = null;
  81  |         for (let attempt = 0; attempt < 3; attempt++) {
  82  |             try {
  83  |                 await this.page.goto('/profile', { waitUntil: 'domcontentloaded' });
  84  |                 break;
  85  |             } catch (error) {
  86  |                 lastError = error as Error;
  87  |                 if (attempt < 2) {
  88  |                     // Exponential backoff: 1s, 2s
  89  |                     await this.page.waitForTimeout(Math.pow(2, attempt) * 1000);
  90  |                 }
  91  |             }
  92  |         }
  93  |         
  94  |         if (lastError) {
  95  |             throw lastError;
  96  |         }
  97  |         
  98  |         await expect(this.page).toHaveURL(/.*profile.*/, { timeout: 15000 });
  99  |         await this.ensureProfileSectionLoaded();
  100 |     }
  101 | 
  102 |     async goToSection(sectionName: 'Profile' | 'Order History' | 'Billing' | 'Change Password' | 'Frequently Asked Questions' | 'Training Material' | 'Customer Service') {
  103 |         switch (sectionName) {
  104 |             case 'Profile': await this.profileLink.click(); break;
  105 |             case 'Order History': await this.orderHistoryLink.click(); break;
  106 |             case 'Billing': await this.billingLink.click(); break;
  107 |             case 'Change Password': await this.changePasswordLink.click(); break;
  108 |             case 'Frequently Asked Questions':
  109 |                 await this.faqLink.click();
  110 |                 await expect(this.page).toHaveURL(/.*\/m\/faq.*/, { timeout: 15000 });
  111 |                 return;
  112 |             case 'Training Material':
  113 |                 if (await this.trainingMaterialLink.isVisible().catch(() => false)) {
  114 |                     await this.trainingMaterialLink.click();
  115 |                 } else {
  116 |                     await this.navigateTo('/m/training-material');
  117 |                 }
  118 |                 await expect(this.page).toHaveURL(/.*\/m\/training-material.*/, { timeout: 15000 });
  119 |                 return;
  120 |             case 'Customer Service': await this.customerServiceLink.click(); break;
  121 |         }
  122 |         await this.waitForLoading();
  123 |     }
  124 | 
  125 |     async waitForLoading() {
  126 |         if (await this.spinner.count() > 0) {
  127 |             await expect(this.spinner.first()).toBeHidden({ timeout: 20000 });
  128 |         }
  129 |     }
  130 | 
  131 |     private async ensureProfileSectionLoaded() {
  132 |         await this.waitForLoading();
  133 | 
  134 |         if (!(await this.profileHeader.isVisible().catch(() => false)) && await this.profileLink.isVisible().catch(() => false)) {
  135 |             await this.profileLink.click();
  136 |             await this.waitForLoading();
  137 |         }
  138 | 
  139 |         if (!(await this.profileHeader.isVisible().catch(() => false))) {
  140 |             await this.navigateTo('/profile');
  141 |             await this.waitForLoading();
  142 |         }
  143 | 
> 144 |         await expect(this.profileHeader.or(this.firstNameInput).first()).toBeVisible({ timeout: 30000 });
      |                                                                          ^ Error: expect(locator).toBeVisible() failed
  145 |     }
  146 | 
  147 |     async getProfileDetails() {
  148 |         return {
  149 |             firstName: await this.firstNameInput.inputValue(),
  150 |             lastName: await this.lastNameInput.inputValue(),
  151 |             email: await this.emailInput.inputValue()
  152 |         };
  153 |     }
  154 | 
  155 |     async updateProfile(details: { firstName?: string, lastName?: string, email?: string }) {
  156 |         if (details.firstName !== undefined) await this.firstNameInput.fill(details.firstName);
  157 |         if (details.lastName !== undefined) await this.lastNameInput.fill(details.lastName);
  158 |         if (details.email !== undefined) await this.emailInput.fill(details.email);
  159 |         await this.saveButton.click();
  160 |     }
  161 | 
  162 |     async updatePassword(old: string, newP: string, confirm: string) {
  163 |         await this.oldPasswordInput.fill(old);
  164 |         await this.newPasswordInput.fill(newP);
  165 |         await this.confirmPasswordInput.fill(confirm);
  166 |         await this.saveButton.click();
  167 |     }
  168 | 
  169 |     async verifyOrderHistoryVisible() {
  170 |         const item = this.page.getByText('BluKnox Classic').or(this.page.locator('.ant-card'));
  171 |         await expect(item.first()).toBeVisible({ timeout: 15000 });
  172 |     }
  173 | 
  174 |     async verifyBillingDetails() {
  175 |         await expect(this.page.getByText('Billing & Subscription').first()).toBeVisible({ timeout: 15000 });
  176 |         await expect(this.page.getByText(/BluKnox Classic|Plan Details|Billing/i).first()).toBeVisible({ timeout: 15000 });
  177 |     }
  178 | 
  179 |     async verifyErrorMessage(pattern: RegExp) {
  180 |         const error = this.errorMessage.first().or(this.notificationNotice.first());
  181 |         await expect(error).toBeVisible({ timeout: 15000 });
  182 |         await expect(error).toContainText(pattern);
  183 |     }
  184 | 
  185 |     async verifyContactFormVisible() {
  186 |         await expect(this.page.getByText('Contact Us').first()).toBeVisible({ timeout: 15000 });
  187 |         await expect(this.page.locator('input[placeholder="Name"]').first()).toBeVisible({ timeout: 15000 });
  188 |         await expect(this.page.locator('textarea[placeholder="Message"]').first()).toBeVisible({ timeout: 15000 });
  189 |     }
  190 | }
  191 | 
```