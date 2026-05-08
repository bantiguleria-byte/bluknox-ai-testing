# Manual Test Cases — Login Module

## Module: Login
**URL:** https://staging.bluknox.com/login

---

## TC-LOGIN-001: Successful Login with Valid Credentials
- **Priority:** High | **Type:** Positive
- **Preconditions:** User is registered and active.
- **Steps:**
  1. Navigate to `https://staging.bluknox.com/login`
  2. Enter email: `banti.guleria@idsil.com`
  3. Enter password: `Test@12345`
  4. Click the **Sign in** button
- **Expected Result:** User is redirected to the dashboard/home page. Header shows avatar/profile icon.
- **Playwright Locators:**
  ```typescript
  await page.getByPlaceholder('Email').fill('banti.guleria@idsil.com');
  await page.getByPlaceholder('Password').fill('Test@12345');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('.ant-dropdown-trigger').first()).toBeVisible();
  ```

---

## TC-LOGIN-002: Login with Empty Email
- **Priority:** High | **Type:** Negative
- **Steps:**
  1. Navigate to login page
  2. Leave email empty
  3. Enter any password
  4. Click **Sign in**
- **Expected Result:** Inline validation error appears below Email field: `"Please enter Email!"` or `"Email is required"`

---

## TC-LOGIN-003: Login with Empty Password
- **Priority:** High | **Type:** Negative
- **Steps:**
  1. Navigate to login page
  2. Enter a valid email
  3. Leave password empty
  4. Click **Sign in**
- **Expected Result:** Inline validation error appears below Password field.

---

## TC-LOGIN-004: Login with Invalid Email Format
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Navigate to login page
  2. Enter `notanemail` in email field
  3. Enter any password
  4. Click **Sign in**
- **Expected Result:** Email format validation error shown: `"Please enter a valid email address"`

---

## TC-LOGIN-005: Login with Wrong Password
- **Priority:** High | **Type:** Negative
- **Steps:**
  1. Navigate to login page
  2. Enter valid email: `banti.guleria@idsil.com`
  3. Enter wrong password: `WrongPass@999`
  4. Click **Sign in**
- **Expected Result:** Error notification/toast appears: `"Invalid credentials"` or `"Incorrect password"`. User stays on login page.

---

## TC-LOGIN-006: Login with Unregistered Email
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Navigate to login page
  2. Enter unregistered email: `notregistered@test.com`
  3. Enter any password
  4. Click **Sign in**
- **Expected Result:** Error message: `"User not found"` or `"Account does not exist"`

---

## TC-LOGIN-007: Verify Password Field is Masked
- **Priority:** Medium | **Type:** Positive
- **Steps:**
  1. Navigate to login page
  2. Type characters in the Password field
- **Expected Result:** Characters are displayed as dots/asterisks (masked).

---

## TC-LOGIN-008: Forgot Password Link Navigates Correctly
- **Priority:** Low | **Type:** Positive
- **Steps:**
  1. Navigate to login page
  2. Click the **Forgot Password?** link
- **Expected Result:** User is navigated to the Forgot Password page (`/forgot-password` or similar).

---
---

# Manual Test Cases — Forgot Password Module

## Module: Forgot Password
**Accessed via:** Forgot Password link on Login page

---

## TC-FP-001: Successful OTP Request with Valid Registered Email
- **Priority:** High | **Type:** Positive
- **Preconditions:** Email `banti.guleria@idsil.com` is a registered account.
- **Steps:**
  1. Navigate to login page
  2. Click **Forgot Password?** link
  3. Enter email: `banti.guleria@idsil.com`
  4. Click **Send OTP**
- **Expected Result:** OTP input fields appear, or success message: `"OTP sent to your email"`. No error shown.
- **Playwright Locators:**
  ```typescript
  await page.getByText(/forgot.?password/i).click();
  await page.getByPlaceholder(/email/i).fill('banti.guleria@idsil.com');
  await page.getByRole('button', { name: /send otp|reset/i }).click();
  await expect(page.locator('input[inputmode="numeric"]').first()).toBeVisible();
  ```

---

## TC-FP-002: Submit Forgot Password with Empty Email
- **Priority:** High | **Type:** Negative
- **Steps:**
  1. Navigate to Forgot Password page
  2. Leave email field empty
  3. Click **Send OTP**
- **Expected Result:** AntD inline validation: `"Please enter Email!"` or `"Email is required"`

---

## TC-FP-003: Submit Forgot Password with Invalid Email Format
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Navigate to Forgot Password page
  2. Enter `invalidemail` in the email field
  3. Click **Send OTP**
- **Expected Result:** Email format validation error shown.

---

## TC-FP-004: Submit Forgot Password with Unregistered Email
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Navigate to Forgot Password page
  2. Enter unregistered email: `unknown@test.com`
  3. Click **Send OTP**
- **Expected Result:** Error message: `"Email not found"` or `"No account associated with this email"`. No OTP sent.

---

## TC-FP-005: Verify OTP Fields Appear After Valid Email Submit
- **Priority:** High | **Type:** Positive
- **Steps:**
  1. Navigate to Forgot Password page
  2. Enter valid registered email
  3. Click **Send OTP**
  4. Observe UI change
- **Expected Result:** 6 OTP input fields appear (or a single OTP input), confirming OTP was triggered.

---

## TC-FP-006: Back to Login Link Works
- **Priority:** Low | **Type:** Positive
- **Steps:**
  1. Navigate to Forgot Password page
  2. Click the **Back to Login** or **Sign In** link
- **Expected Result:** User navigates back to `/login` page.

---

## TC-FP-007: OTP Expiry (Edge Case)
- **Priority:** Low | **Type:** Edge Case
- **Steps:**
  1. Request OTP
  2. Wait for OTP to expire (check app timeout, typically 5-10 mins)
  3. Enter the expired OTP
- **Expected Result:** Error message: `"OTP expired"` or `"Invalid OTP"`. User prompted to resend.
