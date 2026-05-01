# Manual Test Cases: Subscription & Checkout

## TC-SUB-001: Verify Subscription Plan Selection
- **Priority**: High
- **Pre-conditions**: User is on the Subscription Plans page.
- **Steps**:
    1. Observe "Personal Plan" and "Business Plan" cards.
    2. Select a plan by clicking "SELECT PLAN".
- **Expected Result**: The plan should be selected, and the Order Summary sidebar should open.

## TC-SUB-002: Verify Add-on Selection
- **Priority**: Medium
- **Pre-conditions**: User is on the Subscription Plans page.
- **Steps**:
    1. Check one or more add-on checkboxes (e.g., "Additional Encrypted Storage").
- **Expected Result**: The selected add-ons should be added to the total price in the Order Summary.

## TC-CH-001: Verify Stripe Checkout Redirection
- **Priority**: High
- **Pre-conditions**: A plan is selected and user clicks "Checkout".
- **Steps**:
    1. Click "Proceed" on the disclaimer modal.
- **Expected Result**: User should be redirected to the hosted Stripe Checkout page.

## TC-CH-002: Verify Stripe Subscription Completion
- **Priority**: Critical
- **Pre-conditions**: User is on the Stripe Checkout page.
- **Steps**:
    1. Verify pre-filled email.
    2. Click the "Subscribe" button.
- **Expected Result**: Payment should process (in Sandbox), and user should be redirected to the "Order History" page showing the new active subscription.
