# BluKnox — Create Account Module Exploration

**Date:** 2026-05-08  
**Explorer:** Playwright MCP (Antigravity AI)  
**Base URL:** https://staging.bluknox.com  
**Scope:** Create Account / Sign Up Module

---

## 1. Entry Point Details

- **Login Page Link:** "Create an account"
- **Navigation URL:** `https://staging.bluknox.com/signup`

---

## 2. Create Account Page — Element Inventory

**URL:** `https://staging.bluknox.com/signup`

### Branding / Header
| Element | Details |
|---------|---------|
| Page Title | `Create an Account` (h1/h2) |

### Form Elements
| Element Type | Label / Placeholder | ID / Name | Suggested Locator |
|---|---|---|---|
| First Name Input | `First Name` | `register_first_name` | `page.getByPlaceholder('First Name')` |
| Last Name Input | `Last Name` | `register_last_name` | `page.getByPlaceholder('Last Name')` |
| Email Input | `Email` | `register_email` | `page.getByPlaceholder('Email')` |
| Country Dropdown | `Country of Residence` | `register_country` | `page.getByLabel('Country of Residence')` |
| Password Input | `Password` | N/A | `page.getByPlaceholder('Password', { exact: true })` |
| Confirm Password | `Confirm Password` | `register_confirmPassword` | `page.getByPlaceholder('Confirm Password')` |
| Create Account Button | `Create Account` | N/A | `page.getByRole('button', { name: 'Create Account' })` |

### Links
| Text | Destination | Suggested Locator |
|------|-------------|-------------------|
| Sign in | `/login` | `page.getByRole('link', { name: 'Sign in' })` |

---

## 3. Validation Behavior

### Empty Submit Validation
| Field | Message |
|-------|---------|
| First Name | `Please input your first name!` |
| Last Name | `Please input your last name!` |
| Email | `Please input your email!` |
| Country | `Please select your country!` |
| Password | `Please input your password!` and `Password does not meet all requirements.` |
| Confirm Password | `Please confirm your password!` |

### Field Specific Validations
| Scenario | Message |
|----------|---------|
| Invalid Email Format | `Please enter a valid email!` |
| Mismatched Passwords | `The two passwords do not match!` |
| Weak Password | Real-time checklist (10 chars, upper, lower, number, special) |

---

## 4. Post-Registration Flow (OTP Verification)

**URL:** `https://staging.bluknox.com/otp-verification`

### OTP Form Elements
| Element Type | Label / Role | Suggested Locator |
|---|---|---|
| OTP Input 1-6 | `OTP Input 1` to `OTP Input 6` | `page.getByLabel('OTP Input 1')` |
| Verify OTP Button | `Verify OTP` | `page.getByRole('button', { name: 'Verify OTP' })` |
| Resend OTP Link | `Resend OTP` | `page.getByRole('button', { name: 'Resend OTP' })` |
| Back to Login Link | `Back to Login` | `page.getByRole('link', { name: 'Back to Login' })` |

---

## 5. Suggested Playwright Locators

```typescript
// ─── Signup Page ──────────────────────────────────────────────────
const firstNameInput    = page.getByPlaceholder('First Name');
const lastNameInput     = page.getByPlaceholder('Last Name');
const emailInput        = page.getByPlaceholder('Email');
const countrySelect     = page.getByLabel('Country of Residence');
const passwordInput     = page.getByPlaceholder('Password', { exact: true });
const confirmPwdInput   = page.getByPlaceholder('Confirm Password');
const signupButton      = page.getByRole('button', { name: 'Create Account' });

// ─── OTP Verification Page ────────────────────────────────────────
const otpInput1         = page.getByLabel('OTP Input 1');
const verifyButton      = page.getByRole('button', { name: 'Verify OTP' });
const resendLink        = page.getByRole('button', { name: 'Resend OTP' });
```
