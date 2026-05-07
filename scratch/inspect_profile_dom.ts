import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log('Logging in...');
        await page.goto('https://staging.bluknox.com/login');
        await page.locator('input[type="email"]').fill('banti.guleria@idsil.com');
        await page.locator('input[type="password"]').fill('Test@12345');
        await page.locator('button[type="submit"]').click();

        console.log('Navigating to Profile...');
        await page.locator('.ant-dropdown-trigger').first().waitFor({ state: 'visible', timeout: 60000 });
        await page.locator('.ant-dropdown-trigger').first().hover();
        await page.locator('.ant-dropdown-trigger').first().click();
        await page.getByText('View Profile').click();

        await page.waitForTimeout(5000); // Wait for hydration

        console.log('Inspecting Profile Fields...');
        const emailField = await page.locator('input[id*="email"]').first();
        const emailHTML = await emailField.evaluate(el => el.outerHTML);
        const emailProps = await emailField.evaluate(el => ({
            disabled: (el as HTMLInputElement).disabled,
            readOnly: (el as HTMLInputElement).readOnly,
            id: el.id,
            className: el.className
        }));

        console.log('Email Field Analysis:', JSON.stringify(emailProps, null, 2));
        console.log('Email HTML:', emailHTML);

        // Attempt to trigger error
        await emailField.fill('invalid-email');
        await page.getByRole('button', { name: 'Save' }).or(page.getByRole('button', { name: 'Update' })).click();
        await page.waitForTimeout(2000);

        const errors = await page.locator('.ant-form-item-explain-error').allInnerTexts();
        console.log('Detected Errors:', errors);

    } catch (error) {
        console.error('Error during inspection:', error);
    } finally {
        await browser.close();
    }
})();
