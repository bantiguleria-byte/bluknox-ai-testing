# Skill: Debugging Playwright Tests

Guidelines for identifying and resolving failures in Playwright TypeScript tests.

## Debugging Techniques
1. **Trace Viewer**: Use `npx playwright show-trace path/to/trace.zip` to inspect execution steps, snapshots, and network logs.
2. **Screenshots & Videos**: Review automated screenshots and videos in `test-results/` for visual discrepancies.
3. **Debug Mode**: Run tests with `npx playwright test --debug` to step through execution.
4. **Console Logs**: Use `console.log()` within tests or Page Objects to track variable states.
5. **Slow Mo**: Use `launchOptions: { slowMo: 1000 }` in the config to slow down execution for observation.

## Common Issues & Fixes
- **Flakiness**: Add robust waits (`waitForSelector`, `waitForLoadState`) or increase timeouts.
- **Selector Failures**: Use Playwright's Codegen (`npx playwright codegen`) to find more stable locators (getByRole, getByText).
- **Navigation Timeouts**: Ensure the `baseURL` is correct and the network is stable.
- **State Issues**: Use `serial` mode if tests are dependent, but prioritize independent tests.
