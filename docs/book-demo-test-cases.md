# Book a Demo Module - Manual Test Cases

## Test Environment
* **Platform:** Web Application (staging.bluknox.com)
* **Module:** Landing Page > Book a Demo (Contact Us Form)
* **Test Type:** Functional / Manual Testing

---

## Positive Test Cases

### TC-BD-001: Verify navigation to Contact Us page from Home Page
* **Description:** Ensure clicking the "Request Demo" button in the "Book a Demo" card successfully redirects the user to the Contact/Demo form.
* **Pre-conditions:** The user is on the BluKnox Homepage (staging.bluknox.com) and scrolled to the "Book a Demo" section.
* **Steps:**
  1. Locate the **Book a Demo** card on the homepage.
  2. Click the orange **Request Demo** button.
* **Expected Result:** The user is successfully navigated to `https://staging.bluknox.com/contact-us` and the Contact Us page loads with the Demo Request form.

---

### TC-BD-002: Successfully Fill and Submit Demo Request Form
* **Description:** Ensure the user can submit the Demo Request form by entering valid information in all mandatory fields.
* **Pre-conditions:** The user is on the Contact Us page (`https://staging.bluknox.com/contact-us`).
* **Steps:**
  1. Enter a valid name (e.g. `John Doe`) in the **Name** field.
  2. Enter a valid 10-digit US phone number (e.g. `7021234567`) in the **Phone Number** field.
  3. Enter a valid email format (e.g. `johndoe@example.com`) in the **Email** field.
  4. Enter a detailed demo message (e.g. `Looking for healthcare package walkthrough`) in the **Message** field.
  5. Click the **Submit** button.
* **Expected Result:** The form values are validated successfully, the submission goes through, and a success notification or confirmation message is displayed on the screen.

---

## Negative Test Cases

### TC-BD-NEG-001: Trigger Field Validation Errors on Empty Submit
* **Description:** Verify that validation messages appear and form submission is blocked when submitting a completely blank form.
* **Pre-conditions:** The user is on the Contact Us page (`https://staging.bluknox.com/contact-us`) with a clean form.
* **Steps:**
  1. Leave all form fields (Name, Phone Number, Email, Message) completely empty.
  2. Click the **Submit** button.
* **Expected Result:** Form submission is blocked, and the following inline validation messages appear in red under each field:
  - **Name:** `Please enter your name`
  - **Phone Number:** `Please enter your phone number`
  - **Email:** `Please enter your email`
  - **Message:** `Please enter your message`
  All four input borders turn red to indicate an error status.

---

### TC-BD-NEG-002: Test Character Restriction in Phone Field
* **Description:** Verify that the phone number input strictly filters out non-numeric/alphabetic characters to prevent invalid data entry.
* **Pre-conditions:** The user is on the Contact Us page (`https://staging.bluknox.com/contact-us`).
* **Steps:**
  1. Focus on the **Phone Number** input field.
  2. Attempt to type alphabetic characters (e.g., `abcde`).
  3. Attempt to type special symbols (e.g., `@#$`).
* **Expected Result:** The input field strictly rejects the alphabetic and symbolic keystrokes. Only numbers (0-9) are registered, formatting under the selected country code structure (e.g. US `+1`).

---

### TC-BD-NEG-003: Test Invalid Email Format Acceptability
* **Description:** Verify frontend handling of structurally incorrect email inputs (lax validation check).
* **Pre-conditions:** The user is on the Contact Us page (`https://staging.bluknox.com/contact-us`).
* **Steps:**
  1. Fill valid data into the **Name**, **Phone Number**, and **Message** fields.
  2. Enter an invalid, non-standard email string (e.g., `invalid-email`) in the **Email** field.
  3. Click **Submit**.
* **Expected Result:** The frontend accepts the text without triggering standard pattern validation error, demonstrating a lax email pattern check on the client side.

---

### TC-BD-NEG-004: Verify Form Layout on Small Mobile Screens
* **Description:** Ensure that the form fields, labels, country flags dropdown, and submit buttons align perfectly and are fully visible and clickable without horizontal overflow.
* **Pre-conditions:** Accessing the page on a mobile device or a browser window set to a viewport width of 375px (e.g., iPhone SE).
* **Steps:**
  1. Resize the browser to mobile viewport dimensions.
  2. Scroll down to view the **Book a Demo** form.
  3. Scroll and click on every field and dropdown.
* **Expected Result:** All form fields, place holders, labels, and the submit button fit within the viewport. No text overlap occurs, and horizontal scrolling is not triggered.
