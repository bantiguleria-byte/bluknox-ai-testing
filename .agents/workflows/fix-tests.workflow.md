---
description: Fix failing Playwright tests automatically
---

# Fix Tests Workflow

Step 1:
Run all Playwright tests:
npx playwright test

Step 2:
If any test fails:
- Use analyzer agent
- Read error logs

Step 3:
Fix test:
- improve selector
- add wait

Step 4:
Re-run test

Step 5:
Repeat until pass