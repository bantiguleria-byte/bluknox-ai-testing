# BluKnox Application Flow Documentation

This document outlines the structure and key interaction points of the BluKnox staging application, explored on 2026-04-30.

## Overview
BluKnox is a cloud-based document management system. The primary flow involves logging in, uploading documents, managing profile settings, and viewing notifications.

## Modules

### 1. Login
- **URL**: `https://staging.bluknox.com/login`
- **Key Elements**:
    - Email/Username input
    - Password input
    - "Sign in" button
    - "Forgot password?" link
    - "Don't have an account? Sign Up" link

### 2. Upload / Dashboard
- **URL**: `https://staging.bluknox.com/upload`
- **Purpose**: Main workspace for document management.
- **Key Elements**:
    - **Upload Area**: Drag & drop zone or "Click to Upload" button.
    - **Document Table**: List of uploaded files with the following columns:
        - Name
        - Size
        - Upload Date
    - **Actions**:
        - Share (Icon)
        - Download (Icon)
        - Delete (Icon)
- **Visuals**: ![Upload Module](file:///e:/Bluknox-AI-Testing/extracted/screenshots/upload.png)

### 3. User Profile
- **URL**: `https://staging.bluknox.com/profile`
- **Purpose**: Manage personal information and account settings.
- **Key Elements**:
    - **Tabs**: Basic Details, Address Details.
    - **Form Fields**:
        - First Name (Input)
        - Last Name (Input)
        - Email (Read-only/Input)
        - Mobile Number (Input with country code)
        - Gender (Radio buttons: Male, Female, Others)
    - **Side Menu**:
        - Profile
        - Order History
        - Billing
        - Change Password
        - FAQ
        - Training Material
        - Customer Service
        - Logout
- **Visuals**: ![Profile Module](file:///e:/Bluknox-AI-Testing/extracted/screenshots/profile.png)

### 4. Shopping Cart
- **URL**: `https://staging.bluknox.com/cart` (accessed via Cart icon)
- **Purpose**: Manage subscriptions or purchases.
- **Key Elements**:
    - Cart items list.
    - Total amount.
    - Checkout button.
- **Visuals**: ![Cart Module](file:///e:/Bluknox-AI-Testing/extracted/screenshots/cart.png)

### 5. Notifications
- **Purpose**: View system alerts and updates.
- **Key Elements**:
    - Notification list (Pop-over from Bell icon).
- **Visuals**: ![Notifications Module](file:///e:/Bluknox-AI-Testing/extracted/screenshots/notifications.png)

### 6. Subscription Plans
- **URL**: `https://staging.bluknox.com/subscription` (accessed via "View Subscription Plans")
- **Purpose**: Select a service plan and add-ons.
- **Key Elements**:
    - **Plans**: Business Plan, Personal Plan.
    - **Add-ons**: Extra storage, secure collaboration, mobile device support, etc.
    - **Actions**: "SELECT PLAN" button for each plan.
- **Visuals**: ![Subscription Plans](file:///e:/Bluknox-AI-Testing/extracted/screenshots/subscription_plans.png)

### 7. Checkout & Payment (Stripe)
- **Flow**:
    1. Select Plan -> Opens **Order Summary Sidebar** (AntD Drawer).
    2. Click **Checkout** -> Opens **Disclaimer Modal**.
    3. Click **Proceed** -> Redirects to **Stripe hosted checkout**.
- **Stripe Checkout Page**:
    - **Elements**: Order summary, Email field, Payment method (Credit Card/Link), Subscribe button.
- **Visuals**: ![Stripe Checkout](file:///e:/Bluknox-AI-Testing/extracted/screenshots/stripe_checkout.png)

### 8. Order History
- **URL**: `https://staging.bluknox.com/orders` (Redirected after successful payment)
- **Purpose**: View past purchases, active subscriptions, and product keys.
- **Key Elements**:
    - **Order Cards**: Shows Plan Name, Purchase Date, Expiry Date.
    - **Actions**: "Show Product Key" link.
- **Visuals**: ![Order History Success](/e:/Bluknox-AI-Testing/extracted/screenshots/payment_success.png)

## Navigation Menu (Header)
- **About Us**
- **Contact Us**
- **Shopping Cart Icon**
- **Cloud Upload Icon** (Active for /upload)
- **Notifications Icon** (Bell)
- **User Profile Icon** (Avatar)
