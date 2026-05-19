# BluKnox Footer Products Module Test Cases

This document outlines the manual test cases (both positive and negative) designed to verify the functionality, responsiveness, and resilience of the **Products** links located in the website footer.

---

## Positive Test Cases

### TC-PROD-001: Verify navigation to BluKnox Classic
* **Description:** Ensure clicking the "BluKnox Classic" footer link successfully navigates the user to the classic product details page.
* **Pre-conditions:** The user is logged into the application and is on the main page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Products" column.
  3. Click on the link text: **BluKnox Classic**.
* **Expected Result:** The user is successfully navigated to the internal URL path `/product/ODQ=`, and the BluKnox Classic product page renders completely with its details, buttons, and inputs.

---

### TC-PROD-002: Verify navigation to BluKnox Healthcare
* **Description:** Ensure clicking the "BluKnox Healthcare" footer link successfully navigates the user to the healthcare product details page.
* **Pre-conditions:** The user is logged into the application and is on the main page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Products" column.
  3. Click on the link text: **BluKnox Healthcare**.
* **Expected Result:** The user is successfully navigated to the internal URL path `/product/ODU=`, and the BluKnox Healthcare product page renders completely.

---

### TC-PROD-003: Verify navigation to BluKnox Enterprise
* **Description:** Ensure clicking the "BluKnox Enterprise" footer link successfully navigates the user to the enterprise product details page.
* **Pre-conditions:** The user is logged into the application and is on the main page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Products" column.
  3. Click on the link text: **BluKnox Enterprise**.
* **Expected Result:** The user is successfully navigated to the internal URL path `/product/ODY=`, and the BluKnox Enterprise product page renders completely.

---

### TC-PROD-004: Verify navigation to BluKnox API
* **Description:** Ensure clicking the "BluKnox API" footer link successfully navigates the user to the API product details page.
* **Pre-conditions:** The user is logged into the application and is on the main page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Products" column.
  3. Click on the link text: **BluKnox API**.
* **Expected Result:** The user is successfully navigated to the internal URL path `/product/ODc=`, and the BluKnox API product page renders completely.

---

### TC-PROD-005: Verify navigation to BluKnox GroupShare
* **Description:** Ensure clicking the "BluKnox GroupShare" footer link successfully navigates the user to the GroupShare product details page.
* **Pre-conditions:** The user is logged into the application and is on the main page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Products" column.
  3. Click on the link text: **BluKnox GroupShare**.
* **Expected Result:** The user is successfully navigated to the internal URL path `/product/ODg=`, and the BluKnox GroupShare product page renders completely.

---

## Negative Test Cases

### TC-PROD-NEG-001: Verify product page behavior with invalid/corrupted product ID
* **Description:** Ensure the application handles invalid or corrupted product IDs gracefully without crashing the UI.
* **Pre-conditions:** The user is logged into the application.
* **Steps:**
  1. Navigate directly in the browser address bar to `https://staging.bluknox.com/product/INVALID_PRODUCT_ID`.
  2. Press Enter to load the page.
* **Expected Result:** The application should handle the invalid path gracefully. It should display a clean "404 Not Found" or a "Product not found" error, or redirect the user back to the dashboard with an appropriate alert message. The UI/layout must not crash or display raw stack traces.

---

### TC-PROD-NEG-002: Verify Products links visibility on extremely small viewports (Mobile UI check)
* **Description:** Ensure that the products list in the footer is not obscured, overlapping, or unclickable on narrow mobile screen viewports.
* **Pre-conditions:** The user is accessing the application on a mobile device or a browser with the viewport set to a width of 375px (e.g., iPhone SE).
* **Steps:**
  1. Resize the browser window to mobile dimensions (375x667).
  2. Scroll down to the absolute bottom of the page to find the footer section.
  3. Attempt to click the Products links.
* **Expected Result:** The Products column and its links should be fully visible, not hidden behind any floating active widgets, and should successfully register user touch/click input.
