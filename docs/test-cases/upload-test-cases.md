# Manual Test Cases: Upload Module

## TC-UP-001: Verify Document Upload Functionality
- **Priority**: High
- **Pre-conditions**: User is logged in and on the Upload page.
- **Steps**:
    1. Click on the "Click to Upload" button.
    2. Select a valid document from the local file system.
    3. Wait for the upload to complete.
- **Expected Result**: The document should be uploaded successfully and appear in the "Document Table".

## TC-UP-002: Verify Document Table Columns
- **Priority**: Medium
- **Pre-conditions**: User is on the Upload page with at least one uploaded document.
- **Steps**:
    1. Observe the "Document Table".
- **Expected Result**: The table should display the following columns: Name, Size, Date, and Actions.

## TC-UP-003: Verify Document Download
- **Priority**: High
- **Pre-conditions**: At least one document exists in the table.
- **Steps**:
    1. Click on the "Download" icon (svg[data-icon='download']) in the Actions column.
- **Expected Result**: The document should be downloaded to the user's local machine.

## TC-UP-004: Verify Document Sharing
- **Priority**: Medium
- **Pre-conditions**: At least one document exists in the table.
- **Steps**:
    1. Click on the "Share" icon (svg[data-icon='share-alt']) in the Actions column.
- **Expected Result**: The share dialog/modal should open.

## TC-UP-005: Verify Document Deletion
- **Priority**: High
- **Pre-conditions**: At least one document exists in the table.
- **Steps**:
    1. Click on the "Delete" icon (svg[data-icon='delete']) in the Actions column.
    2. Confirm the deletion if a confirmation modal appears.
- **Expected Result**: The document should be removed from the table.
