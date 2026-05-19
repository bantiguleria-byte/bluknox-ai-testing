# BluKnox Quick Links Application Flow

This document details the exploratory analysis of the "Quick Links" module found in the footer of the BluKnox application. The exploration was conducted using a Playwright automation script to programmatically follow each link, evaluate the DOM structure, capture API responses, and save screenshots of the final destinations.

## Explored Modules

### 1. ONC Health IT Certification CHPL Listing
* **Target:** External Government Listing (`chpl.healthit.gov`)
* **URL Reached:** `https://chpl.healthit.gov/#/listing/11826`
* **Behavior:** When the user clicks this quick link, they are navigated away from the BluKnox platform to the official ONC Health IT Certification site where BluKnox's specific listing (ID: 11826) is hosted.
* **Component Analysis:**
  * Forms: 0
  * Buttons: 66
  * Tables: 15
  * Inputs: 3
* **Artifacts Captured:**
  * Screenshot: `extracted/screenshots/ONCHealthITCertificationCHPLListing.png`
  * DOM JSON: `extracted/dom/ONCHealthITCertificationCHPLListing.html`

### 2. ONC Health IT Certification Mandatory Disclosures
* **Target:** Static Hosted Documentation (`intellixs.com`)
* **URL Reached:** `https://intellixs.com/html_pages/healthcare/Mandatory%20Disclosures.html`
* **Behavior:** Navigates the user to the Intellixs (BluCygnus) hosted static HTML page outlining the mandatory disclosures regarding costs, limitations, and requirements as per ONC regulations.
* **Component Analysis:**
  * Forms: 0
  * Buttons: 0
  * Tables: 1
  * Inputs: 0
* **Artifacts Captured:**
  * Screenshot: `extracted/screenshots/ONCHealthITCertificationMandatoryDisclosures.png`
  * DOM JSON: `extracted/dom/ONCHealthITCertificationMandatoryDisclosures.html`

### 3. Patient Data Export Format
* **Target:** Static Hosted Documentation (`intellixs.com`)
* **URL Reached:** `https://intellixs.com/html_pages/healthcare/Patient%20Data%20Export%20Format.html`
* **Behavior:** Navigates the user to a static HTML page detailing the technical specifications and formats for exporting patient data from the BluKnox platform.
* **Component Analysis:**
  * Forms: 0
  * Buttons: 0
  * Tables: 0
  * Inputs: 0
* **Artifacts Captured:**
  * Screenshot: `extracted/screenshots/PatientDataExportFormat.png`
  * DOM JSON: `extracted/dom/PatientDataExportFormat.html`

## Conclusion
The "Quick Links" module in the BluKnox footer primarily serves to route users to external compliance, certification, and technical documentation hosted by either governmental bodies (CHPL) or the parent organization (Intellixs). The navigation flows are successful and the target pages load correctly.
