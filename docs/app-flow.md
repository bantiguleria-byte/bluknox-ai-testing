# BluKnox Application Flow Documentation

## 1. Overview
BluKnox is a document management and subscription-based platform. This document outlines the core modules, navigation paths, and UI components discovered during the guided exploration.

---

## 2. Core Modules

### 2.1 Authentication
- **URL**: `https://staging.bluknox.com/login`
- **Fields**:
  - Email: `input#login_email`
  - Password: `input#login_password`
- **Actions**:
  - Sign in: `button:has-text('Sign in')`
- **Flow**: User enters credentials and is redirected to the Dashboard.

### 2.2 Dashboard
- **URL**: `https://staging.bluknox.com/`
- **Key Elements**:
  - **View Subscription Plans**: `button:has-text('View Subscription Plans')` - Primary CTA for upsell.
  - **Profile Avatar**: `span.ant-avatar` - Top-right dropdown trigger.
  - **Navigation Sidebar**: Contains links to Dashboard, Upload, and Settings.

### 2.3 Upload Module
- **URL**: `https://staging.bluknox.com/upload`
- **Key Elements**:
  - **Upload Button**: `button:has-text('Click to Upload')` - Triggers file chooser.
  - **Document Table**: `.ant-table` - Displays Name, Size, Uploaded At, and Actions.
  - **Row Actions**: Share, Download, Delete icons.

### 2.4 Subscription Plans
- **URL**: `https://staging.bluknox.com/product/ODQ=`
- **Plan Tiers**:
  - **Business Plan**: $13.99/mo (Introductory Price).
  - **Personal Plan**: $5.99/mo.
- **Key Elements**:
  - **Plan Cards**: `.ant-card` components.
  - **Select Button**: `button:has-text('SELECT PLAN')`.
  - **Order Summary**: Side drawer (`.ant-drawer`) that opens upon selection.

### 2.5 Profile & Settings
- **Access**: Click Profile Avatar -> "View Profile".
- **Tabs**:
  - Basic Details (First Name, Last Name, Email, Mobile).
  - Address Details.
- **Actions**: Logout.

---

## 3. UI Component Patterns (Ant Design)
The application heavily utilizes Ant Design components:
- **Buttons**: Often have classes like `ant-btn-primary`.
- **Modals**: Used for confirmations (e.g., Delete, Checkout Disclaimer).
- **Drawers**: Used for the Order Summary and Checkout flow.
- **Checkboxes**: Standard `ant-checkbox` used in Add-on selection.

---

## 4. Subscription Purchase Flow (E2E)
Detailed path for a successful subscription:
1. **Plan Selection**: User clicks `SELECT PLAN` on a card.
2. **Order Summary**: Drawer opens on the right.
3. **Checkout**: User clicks `Checkout` button in the drawer.
4. **Disclaimer**: A modal appears; user must click `Proceed`.
5. **Stripe Redirection**: Redirects to `checkout.stripe.com`.
6. **Payment**:
   - Card Number: `#cardNumber`
   - Expiry/CVC: `#cardExpiry`, `#cardCvc`
   - Submit: `button.SubmitButton`
7. **Success**: Redirects back to `/orders` (Order History).

---

## 5. Discovered API Endpoints
- `POST /api/v1/auth/login`: Authentication.
- `GET /api/v1/product/list`: Fetching subscription plans.
- `POST /api/v1/document/upload`: File upload endpoint.
- `GET /api/v1/user/profile`: Fetching user details.
- `GET /api/v1/order/history`: Fetching successful subscriptions.

---

## 6. Navigation Paths
- **Login** -> **Dashboard**
- **Dashboard** -> **Upload** (via sidebar)
- **Dashboard** -> **Plans** (via "View Subscription Plans" button)
- **Plans** -> **Order History** (via successful Stripe checkout)
- **Profile Avatar** -> **Logout** -> **Login**
