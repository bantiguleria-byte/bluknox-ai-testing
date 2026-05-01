# Manual Test Cases: Profile Module

## TC-PR-001: Verify Basic Details Rendering
- **Priority**: High
- **Pre-conditions**: User is logged in and on the Profile page.
- **Steps**:
    1. Ensure the "Basic Details" tab is active.
    2. Verify the presence of First Name, Last Name, Email, and Mobile Number fields.
- **Expected Result**: All fields should be visible with current user data.

## TC-PR-002: Verify Email Field is Read-Only
- **Priority**: Medium
- **Pre-conditions**: User is on the Profile page.
- **Steps**:
    1. Try to edit the "Email" field.
- **Expected Result**: The email field should be disabled or read-only.

## TC-PR-003: Verify Gender Selection
- **Priority**: Low
- **Pre-conditions**: User is on the Profile page.
- **Steps**:
    1. Select different gender radio buttons (Male, Female, Others).
- **Expected Result**: Only one radio button should be selectable at a time.

## TC-PR-004: Verify Tab Navigation
- **Priority**: Medium
- **Pre-conditions**: User is on the Profile page.
- **Steps**:
    1. Click on the "Address Details" tab.
    2. Click back on the "Basic Details" tab.
- **Expected Result**: The active tab should switch correctly and display corresponding content.
