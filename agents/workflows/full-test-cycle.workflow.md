# Full Test Cycle Workflow (FIXED)

Step 1: Planner Agent
- Read test cases from `/docs/test-cases`
- Generate execution plan

Step 2: Executor Agent
- Run Playwright tests:
  npx playwright test --reporter=json
- WAIT until execution completes (NO polling)

Step 3: Evaluate Result

IF tests PASSED:
  → END WORKFLOW

IF tests FAILED:
  → Call Analyzer Agent

Step 4: Analyzer Agent
- Read failure logs
- Identify root cause
- Return:
  - failure_type
  - confidence
  - suggested_fix

Step 5: Decision

IF confidence > 80%:
  → Call Healer Agent

ELSE:
  → STOP and report failure

Step 6: Healer Agent
- Apply fix (locator / wait / assertion)
- DO NOT rewrite full test
- Only patch failing part

Step 7: Re-run Test
- Execute:
  npx playwright test

Step 8: Retry Guard

IF retry_count > 2:
  → STOP (avoid infinite loop)

ELSE:
  → Go to Step 3