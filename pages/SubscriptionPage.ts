import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class SubscriptionPage extends BasePage {
    private readonly selectPlanButtons: Locator;
    private readonly addonCheckboxes: Locator;
    private readonly checkoutButton: Locator;
    private readonly proceedButton: Locator;
    private selectedPlanName: 'Personal Plan' | 'Business Plan' = 'Personal Plan';

    constructor(page: Page) {
        super(page);
        this.selectPlanButtons = page.getByRole('button', { name: 'SELECT PLAN' });
        this.addonCheckboxes = page.locator("input[type='checkbox']");
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.proceedButton = page.getByRole('button', { name: 'Proceed' });
    }

    async goTo() {
        // Navigate to the product page which leads to subscription plans
        await this.navigateTo('/product/ODQ=');
        
        // Wait for text-based visibility to ensure page is loaded
        await expect(this.page.locator('text=Subscription')).toBeVisible({ timeout: 30000 });

        if (await this.cartBadgeCount() > 0) {
            await this.clearCart();
            await this.closeOrderSummaryIfOpen();
        }

        // If Order Summary drawer is open, close it to avoid obscuring cards
        await this.closeOrderSummaryIfOpen();

        const viewPlansBtn = this.page.getByRole('button', { name: 'View Subscription Plans' });
        await viewPlansBtn.scrollIntoViewIfNeeded();
        await expect(viewPlansBtn).toBeVisible({ timeout: 20000 });
        await viewPlansBtn.click();
        
        // Wait for the specific heading that indicates plans section is loaded
        const plansHeading = this.page.getByText('Pick the plan of your choice');
        await expect(plansHeading).toBeVisible({ timeout: 15000 });
    }

    async selectPlan(planName: 'Personal Plan' | 'Business Plan') {
        this.selectedPlanName = planName;

        // Wait for the plan heading to be visible
        const fullName = planName === 'Personal Plan'
            ? 'Personal Plan (per user) - Introductory Price'
            : 'Business Plan (per user) - Introductory Price';
        const planHeading = this.page.getByRole('heading', { name: fullName });
        await planHeading.waitFor({ state: 'visible', timeout: 30000 });

        const planCard = this.getPlanCard(planName);
        const selectButton = planCard.getByRole('button', { name: /^SELECT PLAN$/ });
        await expect(selectButton).toBeVisible({ timeout: 10000 });
        await this.resetPlanAddonSelections(planCard);
        await selectButton.scrollIntoViewIfNeeded();
        await selectButton.click();

        // Wait for Order Summary sidebar to appear/update
        await this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i }).waitFor({ state: 'visible', timeout: 30000 });
    }

    async selectAddon(addonName: string) {
        await this.closeOrderSummaryIfOpen();

        const checkbox = await this.getAddonCheckbox(addonName);
        
        // Use check() directly for deterministic state
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        if (!(await checkbox.isChecked())) {
            await checkbox.check({ force: true }).catch(async () => {
                const checkboxTarget = checkbox.locator('xpath=ancestor::*[contains(@class,"ant-checkbox-wrapper")][1]')
                    .or(checkbox.locator('xpath=ancestor::div[.//input[@type="checkbox"]][1]'))
                    .first();
                await checkboxTarget.click({ force: true });
            });
        }
        
        // Final validation
        await expect(checkbox).toBeChecked({ timeout: 10000 });

        const planCard = this.getPlanCard(this.selectedPlanName);
        const selectButton = planCard.getByRole('button', { name: /^SELECT PLAN$/ });
        await expect(selectButton).toBeVisible({ timeout: 10000 });
        await selectButton.scrollIntoViewIfNeeded();
        await selectButton.click();
        await this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i }).waitFor({ state: 'visible', timeout: 30000 });
    }

    async isAddonSelected(addonName: string): Promise<boolean> {
        const checkbox = await this.getAddonCheckbox(addonName);
        return await checkbox.isChecked();
    }

    async proceedToCheckout() {
        // Wait for the Checkout button in the drawer to be stable and visible
        await this.checkoutButton.waitFor({ state: 'visible', timeout: 20000 });
        await this.checkoutButton.scrollIntoViewIfNeeded();
        await this.click(this.checkoutButton);

        // Wait for the Disclaimer modal's Proceed button to appear
        await this.proceedButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.click(this.proceedButton);

        // Navigation Guard: Fail fast if Stripe fails to load
        console.log("Verifying redirection to Stripe...");
        try {
            await this.page.waitForURL(/.*checkout\.stripe\.com.*/, { timeout: 45000 });
        } catch (e) {
            throw new Error('CRITICAL: Failed to redirect to Stripe checkout. Environment may be down or slow.');
        }
    }

    async getTotalPrice(): Promise<string> {
        if (!(await this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i }).isVisible().catch(() => false))) {
            await this.openCart();
        }

        // Target the price value in the Order Summary drawer
        const drawer = this.orderSummaryDrawer();
        const priceLabel = drawer.getByText(/^Total Price$/);
        const priceValue = priceLabel.locator('xpath=following-sibling::*[1]')
            .or(priceLabel.locator('xpath=..').getByText(/[$₹]\s*[\d,.]+/))
            .first();
        await expect(priceValue).toBeVisible({ timeout: 15000 });

        // Wait for price to be non-empty and formatted (usually starts with $)
        await expect(priceValue).toContainText(/[$₹]\s*[\d,.]+/, { timeout: 10000 });
        return ((await priceValue.textContent()) || '').trim();
    }

    async getDisplayedPlanAnnualPrice(planName: 'Personal Plan' | 'Business Plan'): Promise<string> {
        const planCard = this.getPlanCard(planName);
        const annualPrice = planCard.getByRole('heading', { name: /Billed annually/i });
        await expect(annualPrice).toBeVisible({ timeout: 15000 });
        const text = ((await annualPrice.textContent()) || '').trim();
        return text.match(/[$₹]\s*[\d,.]+/)?.[0] ?? text;
    }

    async openCart() {
        // Ensure drawer is closed first to avoid obscuring the icon
        const closeDrawer = this.page.locator('.ant-drawer-close');
        if (await closeDrawer.isVisible()) {
            await closeDrawer.click();
            await expect(closeDrawer).toBeHidden();
        }

        const cartIcon = this.page.getByRole('button', { name: /shopping-cart/i })
            .or(this.page.locator('.anticon-shopping-cart').locator('xpath=ancestor::button[1]'))
            .first();
        await expect(cartIcon).toBeVisible({ timeout: 15000 });
        await cartIcon.scrollIntoViewIfNeeded();
        await cartIcon.click();
        await expect(this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i })).toBeVisible({ timeout: 15000 });
    }

    async clearCart() {
        // Check if there's actually anything to clear
        const currentCount = await this.cartBadgeCount().catch(() => 0);
        if (currentCount <= 0) {
            return; // Nothing to clear
        }

        // Ensure drawer is open
        const heading = this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i });
        if (!(await heading.isVisible().catch(() => false))) {
            await this.openCart();
        }

        // Try to clear all items at once
        const drawer = this.orderSummaryDrawer();
        const clearAllButton = drawer.getByRole('button', { name: /clear all items/i });
        
        if (await clearAllButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            try {
                await clearAllButton.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(200);
                await clearAllButton.click({ force: true });
                
                // Wait for cart to be cleared
                await expect.poll(async () => this.cartBadgeCount(), { 
                    timeout: 15000,
                    intervals: [1000]
                }).toBe(0);
                return;
            } catch (error) {
                console.log('Clear all button failed, falling back to individual item deletion');
            }
        }

        // Fallback: delete items individually
        for (let attempt = 0; attempt < 5; attempt++) {
            const itemCount = await this.cartBadgeCount().catch(() => 0);
            if (itemCount <= 0) break;

            const deleteButtons = drawer.locator('[aria-label*="Delete"], [data-testid*="delete"], .anticon-delete')
                .locator('xpath=ancestor::button[1]')
                .or(drawer.locator('button:has-text("Delete")'))
                .first();
            
            if (await deleteButtons.isVisible({ timeout: 2000 }).catch(() => false)) {
                await deleteButtons.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(100);
                await deleteButtons.click({ force: true }).catch(() => {});
                await this.page.waitForTimeout(300);
            } else {
                break; // No more delete buttons
            }
        }

        // Final check
        await expect.poll(async () => this.cartBadgeCount(), {
            timeout: 10000,
            intervals: [500]
        }).toBeLessThanOrEqual(0).catch(() => {
            console.warn('Cart not fully cleared after attempts, but proceeding');
        });
    }

    async validatePlansUI() {
        // Ensure section heading is visible
        const sectionHeading = this.page.getByText('Pick the plan of your choice');
        await expect(sectionHeading).toBeVisible({ timeout: 30000 });
        
        // Target plan cards by their unique headings
        const planHeadings = [
            'Business Plan (per user) - Introductory Price',
            'Personal Plan (per user) - Introductory Price'
        ];

        // Guard condition: check if any plan heading is present
        const visibleHeadings = await this.page.getByRole('heading').all();
        if (visibleHeadings.length === 0) {
            throw new Error('No headings found on Subscription page. UI might not have rendered correctly.');
        }

        for (const headingText of planHeadings) {
            const heading = this.page.getByRole('heading', { name: headingText });
            
            // Log for debugging
            if (!(await heading.isVisible())) {
                console.warn(`Heading not found: ${headingText}. Checking for dynamic loading...`);
                await this.page.waitForTimeout(2000);
            }

            await expect(heading).toBeVisible({ timeout: 20000 });
            
            // Find the closest container that holds the heading and a select button
            // Using a more stable hierarchical locator instead of generic classes
            const card = this.page.locator('div').filter({ has: heading }).filter({ hasText: /SELECT PLAN/ }).first();
            
            if (await card.count() === 0) {
                throw new Error(`Plan card for "${headingText}" not found after stabilization.`);
            }

            // Use getByRole for the button within the card
            const selectButton = card.getByRole('button', { name: 'SELECT PLAN' }).first();
            await expect(selectButton).toBeVisible({ timeout: 10000 });
        }
    }

    private getPlanCard(planName: 'Personal Plan' | 'Business Plan'): Locator {
        const fullName = planName === 'Personal Plan'
            ? 'Personal Plan (per user) - Introductory Price'
            : 'Business Plan (per user) - Introductory Price';
        const planHeading = this.page.getByRole('heading', { name: fullName });
        return planHeading.locator('xpath=ancestor::div[.//button[normalize-space()="SELECT PLAN"]][1]');
    }

    private orderSummaryDrawer(): Locator {
        return this.page.locator('.ant-drawer-content')
            .filter({ has: this.page.getByRole('heading', { name: /order summary/i }) });
    }

    private async closeOrderSummaryIfOpen() {
        const closeDrawer = this.orderSummaryDrawer().getByRole('button', { name: /close panel/i })
            .or(this.page.locator('.ant-drawer-close'))
            .first();
        if (await closeDrawer.isVisible().catch(() => false)) {
            // Use Playwright's built-in scroll method
            await closeDrawer.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await closeDrawer.click({ force: true });
            await expect(this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i })).toBeHidden({ timeout: 10000 }).catch(async () => {
                await this.page.keyboard.press('Escape');
                await expect(this.orderSummaryDrawer().getByRole('heading', { name: /order summary/i })).toBeHidden({ timeout: 10000 });
            });
        }
    }

    private async getAddonCheckbox(addonName: string): Promise<Locator> {
        const planCard = this.getPlanCard(this.selectedPlanName);
        const escapedAddon = addonName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const exactLabel = new RegExp(`^${escapedAddon}$`, 'i');
        const preferredLabel = new RegExp(`^${escapedAddon}\\s*[-–—]\\s*15GB$`, 'i');
        const flexibleLabel = new RegExp(`^${escapedAddon}(?:\\s*[-–—].*)?$`, 'i');

        const label = await this.firstVisibleLocator([
            planCard.getByText(exactLabel),
            planCard.getByText(preferredLabel),
            planCard.getByText(flexibleLabel)
        ], `Addon "${addonName}"`);

        const addonRow = label.locator('xpath=ancestor::div[.//input[@type="checkbox"] or .//*[@role="checkbox"]][1]');
        const checkbox = addonRow.getByRole('checkbox').or(addonRow.locator('input[type="checkbox"]')).first();
        await expect(checkbox).toBeVisible({ timeout: 10000 });
        return checkbox;
    }

    private async resetPlanAddonSelections(planCard: Locator) {
        const checkedAddons = planCard.getByRole('checkbox', { checked: true });
        while (await checkedAddons.first().isVisible().catch(() => false)) {
            await checkedAddons.first().uncheck({ force: true });
            await expect(checkedAddons.first()).not.toBeChecked({ timeout: 10000 }).catch(() => {});
        }
    }

    private async firstVisibleLocator(locators: Locator[], label: string): Promise<Locator> {
        for (const locator of locators) {
            const count = await locator.count();
            for (let i = 0; i < count; i++) {
                const candidate = locator.nth(i);
                if (await candidate.isVisible().catch(() => false)) {
                    return candidate;
                }
            }
        }
        throw new Error(`CRITICAL: ${label} not found in selected plan card.`);
    }

    private async cartBadgeCount(): Promise<number> {
        const badge = this.page.locator('.ant-badge-count').first();
        if (!(await badge.isVisible().catch(() => false))) {
            return 0;
        }

        const text = (await badge.textContent()) || '';
        const digits = text.replace(/\D/g, '');
        return digits ? Number(digits) : 0;
    }
}
