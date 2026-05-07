# Manual Test Cases: Subscription & Payment Flow

## 1. Overview
These test cases cover the end-to-end flow of selecting a subscription plan, completing the payment via Stripe, and verifying the order success within the BluKnox application.

---

## 2. Test Cases Table

| TC ID | Title | Priority | Category |
| :--- | :--- | :--- | :--- |
| **TC-SUB-001** | Successful Subscription (Personal Plan) | High | Positive |
| **TC-SUB-002** | Successful Subscription (Business Plan) | High | Positive |
| **TC-SUB-003** | Verify Add-on Selection & Price Calculation | Medium | Positive |
| **TC-SUB-004** | Payment Failure (Invalid Card Number) | High | Negative |
| **TC-SUB-005** | Payment Failure (Expired Card) | Medium | Negative |
| **TC-SUB-006** | User Cancels Payment Flow (Back to App) | Medium | Negative |
| **TC-SUB-007** | Page Refresh on Stripe Checkout | Low | Edge Case |
| **TC-SUB-008** | Order Summary Drawer Persistence | Low | Edge Case |

---

## 3. Detailed Test Case Specifications

### TC-SUB-001: Successful Subscription (Personal Plan)
- **Priority**: High
- **Preconditions**: User is logged in and has no active subscription.
- **Steps**:
  1. Navigate to Dashboard.
  2. Click "View Subscription Plans" button.
  3. Locate the "Personal Plan" card and click "SELECT PLAN".
  4. Verify "Order Summary" drawer opens on the right.
  5. Click "Checkout" button in the drawer.
  6. Click "Proceed" in the Disclaimer modal.
  7. Enter valid test card details on Stripe page (4242...).
  8. Click "Subscribe/Pay".
- **Expected Results**:
  - Redirection back to BluKnox application occurs within 30s.
  - User lands on the "Order History" page.
  - The new order is listed with "Success" status and correct plan name.
- **Test Data**: Card: `4242 4242 4242 4242`, Expiry: `12/26`, CVC: `123`.

---

### TC-SUB-002: Successful Subscription (Business Plan)
- **Priority**: High
- **Preconditions**: User is logged in.
- **Steps**:
  1. Navigate to Plans Page.
  2. Select "Business Plan".
  3. Proceed through Checkout and Disclaimer.
  4. Complete Stripe payment.
- **Expected Results**: Similar to TC-SUB-001, but verifying the "Business Plan" appears in Order History.

---

### TC-SUB-003: Verify Add-on Selection & Price Calculation
- **Priority**: Medium
- **Preconditions**: User is on the Plans Page.
- **Steps**:
  1. Select "Personal Plan".
  2. Note the initial "Total Price" in the Order Summary.
  3. Check the "Additional Encrypted Storage" add-on checkbox.
  4. Verify the "Total Price" updates automatically.
  5. Uncheck the add-on.
  6. Verify the price reverts to the original.
- **Expected Results**: Price should dynamically update (e.g., $5.99 -> $8.99) when add-ons are toggled.

---

### TC-SUB-004: Payment Failure (Invalid Card Number)
- **Priority**: High
- **Preconditions**: User is on the Stripe Checkout page.
- **Steps**:
  1. Enter an invalid card number (e.g., `4242 4242 4242 4241`).
  2. Fill other details and click "Pay".
- **Expected Results**:
  - Stripe should display an error message: "Your card number is incorrect."
  - User remains on the Stripe page.
  - No order is created in BluKnox.

---

### TC-SUB-005: Payment Failure (Expired Card)
- **Priority**: Medium
- **Steps**:
  1. Enter valid card number but an expired date (e.g., `01/20`).
  2. Click "Pay".
- **Expected Results**: Error message: "Your card's expiration year is in the past."

---

### TC-SUB-006: User Cancels Payment Flow (Back to App)
- **Priority**: Medium
- **Steps**:
  1. Reach the Stripe Checkout page.
  2. Click the "Back" button in the browser or the "Cancel/Return" link on Stripe.
- **Expected Results**:
  - User is redirected back to the BluKnox Plans page or Dashboard.
  - Order Summary drawer state should ideally be preserved or handled gracefully.

---

### TC-SUB-007: Page Refresh on Stripe Checkout
- **Priority**: Low
- **Steps**:
  1. Reach the Stripe Checkout page.
  2. Refresh the browser.
- **Expected Results**: Stripe page should reload correctly, preserving the session and payment details if possible (standard Stripe behavior).

---

### TC-SUB-008: Order Summary Drawer Persistence
- **Priority**: Low
- **Steps**:
  1. Select a plan to open the Order Summary drawer.
  2. Navigate to the "Upload" page via the sidebar.
  3. Navigate back to the Dashboard/Plans page.
- **Expected Results**: The drawer should either be closed (reset state) or correctly reflect the previous selection if implemented as persistent.
