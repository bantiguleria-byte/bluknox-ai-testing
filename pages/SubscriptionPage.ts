import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SubscriptionPage extends BasePage {
    private readonly selectPlanButtons: Locator;
    private readonly addonCheckboxes: Locator;
    private readonly checkoutButton: Locator;
    private readonly proceedButton: Locator;

    constructor(page: Page) {
        super(page);
        this.selectPlanButtons = page.getByRole('button', { name: 'SELECT PLAN' });
        this.addonCheckboxes = page.locator("input[type='checkbox']");
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.proceedButton = page.getByRole('button', { name: 'Proceed' });
    }

    async goTo() {
        // Navigate to the product page which leads to subscription plans
        await this.navigateTo('https://staging.bluknox.com/product/ODQ=');
        
        // If Order Summary drawer is open, close it to avoid obscuring cards
        const closeDrawer = this.page.locator('.ant-drawer-close');
        if (await closeDrawer.isVisible()) {
            await closeDrawer.click();
        }

        await this.page.getByRole('button', { name: 'View Subscription Plans' }).click();
        // Wait for the "Pick the plan of your choice" section to be visible
        await this.page.getByText('Pick the plan of your choice').waitFor({ state: 'visible', timeout: 15000 });
    }

    async selectPlan(planName: 'Personal Plan' | 'Business Plan') {
        // Wait for the plan heading to be visible
        const fullName = planName === 'Personal Plan'
            ? 'Personal Plan (per user) - Introductory Price'
            : 'Business Plan (per user) - Introductory Price';
        const planHeading = this.page.getByRole('heading', { name: fullName });
        await planHeading.waitFor({ state: 'visible', timeout: 30000 });
        
        // Business Plan is the first card (index 0), Personal Plan is the second (index 1)
        const buttonIndex = planName === 'Business Plan' ? 0 : 1;
        const selectButton = this.page.getByRole('button', { name: 'SELECT PLAN' }).nth(buttonIndex);
        await selectButton.scrollIntoViewIfNeeded();
        await selectButton.click();
        
        // Wait for Order Summary sidebar to appear/update
        await this.page.getByText('Order Summary').waitFor({ state: 'visible', timeout: 30000 });
    }

    async selectAddon(addonName: string) {
        // Find the addon text element
        const addonText = this.page.getByText(addonName, { exact: false }).first();
        await addonText.scrollIntoViewIfNeeded();
        await addonText.waitFor({ state: 'visible', timeout: 15000 });
        // Go up from the text to the addon row container (text -> text-wrapper -> addon-row)
        // The row structure is: div.row > [checkbox, div.text-wrapper > [div.name, div.price]]
        const addonRow = addonText.locator('..').locator('..');
        await addonRow.getByRole('checkbox').check();
    }

    async proceedToCheckout() {
        await this.click(this.checkoutButton);
        await this.click(this.proceedButton);
    }
}
