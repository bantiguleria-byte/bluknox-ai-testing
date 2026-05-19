import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Technical Audit: Profile Module DOM and Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    console.log('Logging in...');
    await loginPage.login('banti.guleria@idsil.com', 'Test@12345');
    
    console.log('Navigating to Profile...');
    await page.locator('.ant-dropdown-trigger').first().hover();
    await page.locator('.ant-dropdown-trigger').first().click();
    await page.getByText('View Profile').click({ force: true });
    
    await page.waitForTimeout(5000); // Allow for hydration

    console.log('Auditing Email Field...');
    const emailField = page.locator('input[id*="email"]').first();
    const emailInfo = await emailField.evaluate(el => ({
        id: el.id,
        name: (el as any).name,
        readonly: (el as any).readOnly,
        disabled: (el as any).disabled,
        placeholder: (el as any).placeholder,
        outerHTML: el.outerHTML
    }));
    console.log('Email Field Audit:', JSON.stringify(emailInfo, null, 2));

    console.log('Triggering Validation Error...');
    await emailField.fill('invalid-email-address');
    await page.getByRole('button', { name: 'Save' }).or(page.getByRole('button', { name: 'Update' })).click();
    
    await page.waitForTimeout(3000); // Wait for validation node to appear
    
    const formItems = await page.locator('.ant-form-item').all();
    for (const item of formItems) {
        const text = await item.innerText();
        const html = await item.evaluate(el => el.outerHTML);
        if (text.toLowerCase().includes('email')) {
            console.log('Form Item (Email) HTML:', html);
        }
    }
});
