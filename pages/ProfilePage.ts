import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
    // Sidebar Locators
    private readonly profileLink: Locator;
    private readonly orderHistoryLink: Locator;
    private readonly billingLink: Locator;
    private readonly changePasswordLink: Locator;
    private readonly faqLink: Locator;
    private readonly trainingMaterialLink: Locator;
    private readonly customerServiceLink: Locator;

    // Section Headers
    private readonly profileHeader: Locator;
    private readonly orderHistoryHeader: Locator;
    private readonly billingHeader: Locator;
    private readonly changePasswordHeader: Locator;
    private readonly supportHeader: Locator;

    // Input Fields
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly oldPasswordInput: Locator;
    private readonly newPasswordInput: Locator;
    private readonly confirmPasswordInput: Locator;

    private readonly saveButton: Locator;
    private readonly updatePasswordButton: Locator;
    private readonly errorMessage: Locator;
    private readonly notificationNotice: Locator;
    private readonly spinner: Locator;

    constructor(page: Page) {
        super(page);

        // Sidebar
        const sidebar = page.locator('aside, .ant-layout-sider');
        this.profileLink = sidebar.getByText('Profile', { exact: true });
        this.orderHistoryLink = sidebar.getByText('Order History');
        this.billingLink = sidebar.getByText('Billing');
        this.changePasswordLink = sidebar.getByText('Change Password');
        this.faqLink = sidebar.getByText('Frequently Asked Questions');
        this.trainingMaterialLink = sidebar.getByText('Training Material');
        this.customerServiceLink = sidebar.getByText('Customer Service');

        // Headers
        this.profileHeader = page.getByText('Profile Settings').first();
        this.orderHistoryHeader = page.getByText('Order History').first();
        this.billingHeader = page.getByText('Billing & Subscription').first();
        this.changePasswordHeader = page.getByText('Change Password').first();
        this.supportHeader = page.getByText('BluKnox Functions').first();

        // Inputs
        this.firstNameInput = page.getByLabel('First Name').or(page.locator('input[id*="firstName"]'));
        this.lastNameInput = page.getByLabel('Last Name').or(page.locator('input[id*="lastName"]'));
        this.emailInput = page.getByLabel('Email').or(page.locator('input[id*="email"]'));
        this.oldPasswordInput = page.getByLabel('Old Password').or(page.locator('input[id*="oldPassword"]'));
        this.newPasswordInput = page.getByLabel('New Password').or(page.locator('input[id*="newPassword"]'));
        this.confirmPasswordInput = page.getByLabel('Confirm Password').or(page.locator('input[id*="confirmPassword"]'));

        // Buttons
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.updatePasswordButton = this.saveButton;
        this.errorMessage = page.locator('.ant-form-item-explain-error, .ant-notification-notice-error, .ant-message-error, .ant-notification-notice-message');
        this.notificationNotice = page.locator('.ant-notification-notice-error, .ant-message-error');
        this.spinner = page.locator('.ant-spin, .ant-skeleton');
    }

    async navigateToProfile() {
        if (this.page.url().includes('/profile')) {
            await this.ensureProfileSectionLoaded();
            return;
        }

        await expect(this.page.locator('.ant-dropdown-trigger').or(this.page.locator('.ant-avatar')).first()).toBeVisible({ timeout: 30000 });
        
        // Try to navigate with retry logic for transient network errors
        let lastError: Error | null = null;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                await this.page.goto('/profile', { waitUntil: 'domcontentloaded' });
                break;
            } catch (error) {
                lastError = error as Error;
                if (attempt < 2) {
                    // Exponential backoff: 1s, 2s
                    await this.page.waitForTimeout(Math.pow(2, attempt) * 1000);
                }
            }
        }
        
        if (lastError) {
            throw lastError;
        }
        
        await expect(this.page).toHaveURL(/.*profile.*/, { timeout: 15000 });
        await this.ensureProfileSectionLoaded();
    }

    async goToSection(sectionName: 'Profile' | 'Order History' | 'Billing' | 'Change Password' | 'Frequently Asked Questions' | 'Training Material' | 'Customer Service') {
        switch (sectionName) {
            case 'Profile': await this.profileLink.click(); break;
            case 'Order History': await this.orderHistoryLink.click(); break;
            case 'Billing': await this.billingLink.click(); break;
            case 'Change Password': await this.changePasswordLink.click(); break;
            case 'Frequently Asked Questions':
                await this.faqLink.click();
                await expect(this.page).toHaveURL(/.*\/m\/faq.*/, { timeout: 15000 });
                return;
            case 'Training Material':
                if (await this.trainingMaterialLink.isVisible().catch(() => false)) {
                    await this.trainingMaterialLink.click();
                } else {
                    await this.navigateTo('/m/training-material');
                }
                await expect(this.page).toHaveURL(/.*\/m\/training-material.*/, { timeout: 15000 });
                return;
            case 'Customer Service': await this.customerServiceLink.click(); break;
        }
        await this.waitForLoading();
    }

    async waitForLoading() {
        if (await this.spinner.count() > 0) {
            await expect(this.spinner.first()).toBeHidden({ timeout: 20000 });
        }
    }

    private async ensureProfileSectionLoaded() {
        await this.waitForLoading();

        if (!(await this.profileHeader.isVisible().catch(() => false)) && await this.profileLink.isVisible().catch(() => false)) {
            await this.profileLink.click();
            await this.waitForLoading();
        }

        if (!(await this.profileHeader.isVisible().catch(() => false))) {
            await this.navigateTo('/profile');
            await this.waitForLoading();
        }

        await expect(this.profileHeader.or(this.firstNameInput).first()).toBeVisible({ timeout: 30000 });
    }

    async getProfileDetails() {
        return {
            firstName: await this.firstNameInput.inputValue(),
            lastName: await this.lastNameInput.inputValue(),
            email: await this.emailInput.inputValue()
        };
    }

    async updateProfile(details: { firstName?: string, lastName?: string, email?: string }) {
        if (details.firstName !== undefined) await this.firstNameInput.fill(details.firstName);
        if (details.lastName !== undefined) await this.lastNameInput.fill(details.lastName);
        if (details.email !== undefined) await this.emailInput.fill(details.email);
        await this.saveButton.click();
    }

    async updatePassword(old: string, newP: string, confirm: string) {
        await this.oldPasswordInput.fill(old);
        await this.newPasswordInput.fill(newP);
        await this.confirmPasswordInput.fill(confirm);
        await this.saveButton.click();
    }

    async verifyOrderHistoryVisible() {
        const item = this.page.getByText('BluKnox Classic').or(this.page.locator('.ant-card'));
        await expect(item.first()).toBeVisible({ timeout: 15000 });
    }

    async verifyBillingDetails() {
        // Wait for billing page to settle — it may take a moment after sidebar navigation
        await this.page.waitForTimeout(1500);
        await expect(this.page.getByText('Billing & Subscription').or(
            this.page.getByText(/billing/i)
        ).first()).toBeVisible({ timeout: 20000 });
        await expect(this.page.getByText(/BluKnox Classic|Plan Details|Billing|Subscription/i).first()).toBeVisible({ timeout: 20000 });
    }

    async verifyErrorMessage(pattern: RegExp) {
        const error = this.errorMessage.first().or(this.notificationNotice.first());
        await expect(error).toBeVisible({ timeout: 15000 });
        await expect(error).toContainText(pattern);
    }

    async verifyContactFormVisible() {
        // Wait for the contact/support page to load after sidebar navigation
        await this.page.waitForTimeout(1500);
        await expect(this.page.getByText('Contact Us').first()).toBeVisible({ timeout: 20000 });
        // Use flexible locators — the placeholder text may vary across app versions
        const nameField = this.page
            .getByRole('textbox', { name: /^name$/i })
            .or(this.page.getByPlaceholder(/your name|^name$/i))
            .or(this.page.locator('input[placeholder*="Name" i]'))
            .first();
        await expect(nameField).toBeVisible({ timeout: 20000 });
        const messageField = this.page
            .getByRole('textbox', { name: /message/i })
            .or(this.page.getByPlaceholder(/message/i))
            .or(this.page.locator('textarea[placeholder*="Message" i]'))
            .first();
        await expect(messageField).toBeVisible({ timeout: 20000 });
    }
}
