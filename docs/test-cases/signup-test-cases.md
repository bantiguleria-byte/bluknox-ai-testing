# Manual Test Cases — Create Account Module

## Module: Create Account (Signup)
**URL:** https://staging.bluknox.com/signup

---

## TC-SIGNUP-001: Successful Account Creation (Valid Data)
- **Priority:** High | **Type:** Positive
- **Steps:**
  1. Navigate to `https://staging.bluknox.com/signup`
  2. Enter valid First Name, Last Name.
  3. Enter a unique, valid Email.
  4. Select a Country.
  5. Enter a strong Password (meeting all requirements).
  6. Confirm the Password.
  7. Click **Create Account**.
- **Expected Result:** User is redirected to the OTP Verification page.

---

## TC-SIGNUP-002: Mandatory Fields Validation (Empty Submit)
- **Priority:** High | **Type:** Negative
- **Steps:**
  1. Navigate to signup page.
  2. Leave all fields empty.
  3. Click **Create Account**.
- **Expected Result:** Validation errors appear for all required fields (First Name, Last Name, Email, Country, Password, Confirm Password).

---

## TC-SIGNUP-003: Invalid Email Format
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Enter invalid email (e.g., `user@com`).
  2. Fill other fields correctly.
  3. Click **Create Account**.
- **Expected Result:** Error message: `"Please enter a valid email!"`

---

## TC-SIGNUP-004: Password Strength Requirements
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Enter a weak password (e.g., `password123`).
  2. Observe the checklist/error.
- **Expected Result:** UI shows failing requirements (e.g., missing uppercase, special char). Error: `"Password does not meet all requirements."`

---

## TC-SIGNUP-005: Password Mismatch
- **Priority:** High | **Type:** Negative
- **Steps:**
  1. Enter valid Password.
  2. Enter a different password in Confirm Password.
  3. Click **Create Account**.
- **Expected Result:** Error message: `"The two passwords do not match!"`

---

## TC-SIGNUP-006: Verify OTP Page Navigation
- **Priority:** High | **Type:** Positive
- **Steps:**
  1. Complete TC-SIGNUP-001.
- **Expected Result:** OTP page loads with 6 input boxes and a verify button.

---

## TC-SIGNUP-007: Already Registered Email
- **Priority:** Medium | **Type:** Negative
- **Steps:**
  1. Enter an email that is already registered (e.g., `banti.guleria@idsil.com`).
  2. Fill other fields and submit.
- **Expected Result:** Error notification: `"Email already exists"` or similar.

---

## TC-SIGNUP-008: Back to Login Link
- **Priority:** Low | **Type:** Positive
- **Steps:**
  1. On signup page, click **Sign in** link.
- **Expected Result:** User is navigated back to the Login page.
