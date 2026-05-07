## Trigger Condition

ONLY run analyzer IF:
executor.status == "failed"

---

## Output Format

{
  "failure_type": "locator | timing | assertion",
  "root_cause": "...",
  "confidence": 0.0 - 1.0,
  "suggested_fix": "..."
}