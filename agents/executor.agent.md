## Execution Rules

- Run command:
  npx playwright test --reporter=json

- WAIT for full completion (blocking)
- DO NOT repeatedly check status

- After execution:
  Capture:
    - exit_code (0 = pass, 1 = fail)
    - failed tests
    - logs

- Return structured output:

{
  "status": "passed" | "failed",
  "exit_code": 0 | 1,
  "failed_tests": [...],
  "logs": "..."
}