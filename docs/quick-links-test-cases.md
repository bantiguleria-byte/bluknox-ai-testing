# Quick Links Module - Manual Test Cases

## Test Environment
* **Platform:** Web Application (staging.bluknox.com)
* **Module:** Footer > Quick Links
* **Test Type:** Functional / Positive Testing

---

### TC-QL-001: Verify navigation to ONC Health IT Certification CHPL Listing
* **Description:** Ensure clicking the CHPL Listing link successfully redirects the user to the correct official external listing.
* **Pre-conditions:** The user is logged in and on the Dashboard page, or on any page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Quick Links" column.
  3. Click on the link text: **ONC Health IT Certification CHPL Listing**.
* **Expected Result:** The user is successfully navigated to the external URL `https://chpl.healthit.gov/#/listing/11826`, and the official CHPL listing page for BluKnox is visible.

---

### TC-QL-002: Verify navigation to ONC Health IT Certification Mandatory Disclosures
* **Description:** Ensure clicking the Mandatory Disclosures link successfully opens the static disclosures documentation.
* **Pre-conditions:** The user is logged in and on the Dashboard page, or on any page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Quick Links" column.
  3. Click on the link text: **ONC Health IT Certification Mandatory Disclosures**.
* **Expected Result:** The user is successfully navigated to the external URL `https://intellixs.com/html_pages/healthcare/Mandatory%20Disclosures.html`, and the mandatory disclosures page loads correctly.

---

### TC-QL-003: Verify navigation to Patient Data Export Format
* **Description:** Ensure clicking the Patient Data Export Format link successfully opens the static data export documentation.
* **Pre-conditions:** The user is logged in and on the Dashboard page, or on any page where the footer is visible.
* **Steps:**
  1. Scroll down to the footer section at the bottom of the page.
  2. Locate the "Quick Links" column.
  3. Click on the link text: **Patient Data Export Format**.
* **Expected Result:** The user is successfully navigated to the external URL `https://intellixs.com/html_pages/healthcare/Patient%20Data%20Export%20Format.html`, and the data export format instructions are visible.

---

## Negative Test Cases

### TC-QL-NEG-001: Verify Quick Links behavior when external site is unreachable (Simulate 500/404)
* **Description:** Ensure the application handles scenarios gracefully where the target external link is temporarily down or removed.
* **Pre-conditions:** The user is logged in. A network interception tool (e.g. Playwright route/Chrome DevTools) is used to simulate a 404 or 500 error on the target URL `chpl.healthit.gov`.
* **Steps:**
  1. Intercept the network request to the CHPL listing and mock a 500 Internal Server Error.
  2. Scroll down to the footer section.
  3. Click on **ONC Health IT Certification CHPL Listing**.
* **Expected Result:** The user should be navigated to the external site which will display its native error page (e.g., 500 error). It should not crash the BluKnox application or cause an unhandled exception in the main app window.

---

### TC-QL-NEG-002: Verify Quick Links visibility on extremely small viewports (Mobile UI check)
* **Description:** Ensure that the quick links are not obscured, overlapped, or rendered un-clickable on narrow mobile screens.
* **Pre-conditions:** The user is accessing the application on a mobile device or a browser with the viewport set to a width of 375px (e.g., iPhone SE).
* **Steps:**
  1. Resize the browser window to mobile dimensions.
  2. Scroll down to the absolute bottom of the page.
  3. Attempt to click the Quick Links.
* **Expected Result:** The links should be fully visible, not hidden behind any floating action buttons or chat widgets, and successfully register the click action.
