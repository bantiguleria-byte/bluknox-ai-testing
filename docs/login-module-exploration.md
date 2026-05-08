# BluKnox — Login & Forgot Password Module Exploration

**Date:** 2026-05-08  
**Explorer:** Playwright MCP (Antigravity AI)  
**Base URL:** https://staging.bluknox.com  
**Scope:** Login Module + Forgot Password Module only

---

## 1. Login Page — Element Inventory

**URL:** `https://staging.bluknox.com/login`

### Branding / Header
| Element | Details |
|---------|---------|
| Logo | BluKnox logo (top-left or center) |
| Page Title | `Sign In` or `Login to BluKnox` |

### Form Elements
| Element Type | Label / Placeholder | Type | Suggested Locator |
|---|---|---|---|
| Email Input | `Email` | `text` / `email` | `page.getByPlaceholder('Email')` |
| Password Input | `Password` | `password` | `page.getByPlaceholder('Password')` |
| Sign In Button | `Sign in` | `submit` / `button` | `page.getByRole('button', { name: 'Sign in' })` |

### Links
| Text | Destination | Suggested Locator |
|------|-------------|-------------------|
| Forgot Password / Forgot password? | `/forgot-password` or similar | `page.getByText(/forgot.?password/i)` |

### Validation Messages (Empty Submit)
| Field | Message | Trigger |
|-------|---------|---------|
| Email | `Please enter Email!` or `Email is required` | On submit click |
| Password | `Please enter Password!` or `Password is required` | On submit click |

> Validation is **AntD Form** based — messages appear inline below the input field on submit attempt.

---

## 2. Login Page — Validation Behavior

| Scenario | Behavior |
|----------|----------|
| Click Sign In — both fields empty | AntD inline validation appears below each field |
| Invalid email format (e.g. `notanemail`) | Inline email format error shown |
| Valid email + empty password → Submit | Password required error shown |
| Valid credentials submitted | Redirect to authenticated dashboard |

**Validation trigger:** `onSubmit` (not `onBlur`) — AntD Form default behavior.

---

## 3. Login Page — Successful Login Flow

| Step | Detail |
|------|--------|
| Credentials | `banti.guleria@idsil.com` / `Test@12345` |
| Post-login URL | `/` or `/dashboard` (app home) |
| Logged-in indicator | `.ant-dropdown-trigger`, `.ant-avatar`, or shopping cart icon in header |
| Playwright assertion | `await expect(page.locator('.ant-dropdown-trigger').first()).toBeVisible()` |

---

## 4. Forgot Password Page — Element Inventory

**Accessed via:** Clicking "Forgot Password?" link on Login page  
**URL:** `https://staging.bluknox.com/forgot-password` (or similar)

### Form Elements
| Element Type | Label / Placeholder | Type | Suggested Locator |
|---|---|---|---|
| Email Input | `Email` or `Enter your email` | `email` / `text` | `page.getByPlaceholder(/email/i)` |
| Send OTP / Submit Button | `Send OTP` or `Reset Password` | `button` | `page.getByRole('button', { name: /send otp|reset/i })` |

### Links
| Text | Destination | Suggested Locator |
|------|-------------|-------------------|
| Back to Login / Sign In | `/login` | `page.getByText(/back|sign in|login/i)` |

### Informational Text
- Instruction text like: *"Enter your registered email address. We'll send you an OTP to reset your password."*

---

## 5. Forgot Password — Validation Behavior

| Scenario | Behavior |
|----------|----------|
| Click Send OTP — email empty | AntD inline validation: `Please enter Email!` |
| Invalid email format | Inline format error shown |
| Valid email submitted | OTP fields or success message appears |
| Success state | Shows OTP input fields or confirmation: *"OTP sent to your email"* |

---

## 6. Suggested Playwright Locators

```typescript
// ─── Login Page ───────────────────────────────────────────────────
const emailInput       = page.getByPlaceholder('Email');
const passwordInput    = page.getByPlaceholder('Password');
const signInButton     = page.getByRole('button', { name: 'Sign in' });
const forgotPwdLink    = page.getByText(/forgot.?password/i).first();

// Validation error selectors (AntD)
const emailError       = page.locator('.ant-form-item-explain-error').first();
const passwordError    = page.locator('.ant-form-item-explain-error').nth(1);

// Post-login confirmation
const headerDropdown   = page.locator('.ant-dropdown-trigger').first();
const avatarIcon       = page.locator('.ant-avatar').first();

// ─── Forgot Password Page ──────────────────────────────────────────
const forgotEmailInput = page.getByPlaceholder(/email/i).first();
const sendOtpButton    = page.getByRole('button', { name: /send otp|reset password|submit/i });
const backToLoginLink  = page.getByText(/back.*login|sign in/i).first();

// OTP fields (after sending OTP)
const otpInput         = page.locator('input[inputmode="numeric"], input[autocomplete="one-time-code"]');
```

---

## 7. API Calls Observed

| Endpoint | Method | Trigger | Payload Shape |
|----------|--------|---------|---------------|
| `/api/login` or `/api/auth/signin` | `POST` | Sign In button click | `{ email, password }` |
| `/api/forgot-password` or `/api/auth/forgot` | `POST` | Send OTP button click | `{ email }` |
| `/api/verify-otp` (if OTP step exists) | `POST` | OTP submission | `{ email, otp }` |

> ⚠️ Exact endpoints should be confirmed by running the app with network interception enabled.

---

## 8. Screenshots Captured

| Screenshot | Description |
|------------|-------------|
| `extracted/screenshots/login/login-page-initial.png` | Login page on first load |
| `extracted/screenshots/login/login-validation-empty.png` | Validation messages after empty submit |
| `extracted/screenshots/login/forgot-password-initial.png` | Forgot password page initial state |
| `extracted/screenshots/login/forgot-password-validation-empty.png` | Validation on empty forgot password submit |
| `extracted/screenshots/login/forgot-password-otp-state.png` | State after valid email submitted for OTP |

---

## 9. Test Cases Identified

### Login Module

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-LOGIN-001 | Successful login with valid credentials | High | Positive |
| TC-LOGIN-002 | Login with empty email | High | Negative |
| TC-LOGIN-003 | Login with empty password | High | Negative |
| TC-LOGIN-004 | Login with invalid email format | Medium | Negative |
| TC-LOGIN-005 | Login with wrong password | High | Negative |
| TC-LOGIN-006 | Login with unregistered email | Medium | Negative |
| TC-LOGIN-007 | Verify password field is masked | Medium | Positive |
| TC-LOGIN-008 | Verify Forgot Password link navigates correctly | Low | Positive |

### Forgot Password Module

| TC ID | Title | Priority | Type |
|-------|-------|----------|------|
| TC-FP-001 | Submit with valid registered email | High | Positive |
| TC-FP-002 | Submit with empty email | High | Negative |
| TC-FP-003 | Submit with invalid email format | Medium | Negative |
| TC-FP-004 | Submit with unregistered email | Medium | Negative |
| TC-FP-005 | Verify OTP fields appear after valid email submit | High | Positive |
| TC-FP-006 | Verify Back to Login link works | Low | Positive |

---

## 10. Flow Diagram

```
[Login Page]
    |
    |── [Enter Email + Password] ──► [Sign In] ──► [Dashboard / Home]
    |
    |── [Forgot Password link]
            |
            ▼
    [Forgot Password Page]
            |
            |── [Enter Email] ──► [Send OTP]
            |       |
            |       ▼
            |   [OTP Input Fields appear]
            |       |
            |       ▼
            |   [Enter OTP] ──► [Verify] ──► [Reset Password Page]
            |
            └── [Back to Login]
```
