# Skill: API Testing with Playwright

Guidelines for performing API requests and assertions using Playwright's `request` context.

## Core Concepts
1. **Request Context**: Use `request` from `@playwright/test` to perform HTTP calls.
2. **Assertions**: Use `expect(response).toBeOK()` and `expect(response.json()).resolves.toMatchObject(...)`.
3. **Authentication**: Reuse `storageState` or set headers (e.g., `Authorization`) in the request.

## Example Usage
```typescript
import { test, expect } from '@playwright/test';

test('verify user profile api', async ({ request }) => {
  const response = await request.get('/api/v1/profile');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data).toHaveProperty('email');
});
```

## Best Practices
- Keep API tests separate from E2E tests for faster execution.
- Use environment variables for API base URLs and credentials.
- Validate JSON schemas for consistency.
- Clean up test data after execution using `afterAll` or `afterEach` hooks.
