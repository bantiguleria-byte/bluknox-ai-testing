# Skill: Playwright UI Automation

Guidelines for building stable and maintainable UI automation using Playwright TypeScript.

## Locators Strategy
- **Prioritize User-Facing Attributes**: Use `getByRole`, `getByText`, `getByPlaceholder`, `getByLabel`, and `getByTestId`.
- **Avoid Implementation Details**: Avoid CSS selectors based on classes that might change (e.g., `.ant-btn-primary`).
- **Stable Outer Structure**: For complex components like Ant Design, target the stable outer wrapper if needed.

## Page Object Model (POM)
- **Structure**: Each page should have a corresponding class in `pages/`.
- **Encapsulation**: Locators should be private properties. Interactions should be public methods.
- **Assertions**: Keep assertions in the test files, not in the Page Objects.

## Synchronizations
- **Automatic Waiting**: Playwright waits for elements to be actionable before clicking.
- **Explicit Waits**: Use `waitForSelector` or `waitForLoadState` only when necessary for complex transitions.
- **Network Idle**: Use `page.waitForLoadState('networkidle')` carefully as it can be slow.

## Interaction Rules
- **Buttons**: Use `getByRole('button', { name: '...' })`.
- **Inputs**: Use `getByPlaceholder('...')` or `getByLabel('...')`.
- **Tables**: Use `getByRole('row')` and `filter({ hasText: '...' })` to target specific rows.
- **Ant Design**: For DatePickers, type the date directly and press Enter.
