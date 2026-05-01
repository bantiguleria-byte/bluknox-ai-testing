import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly mobileInput: Locator;
    private readonly basicDetailsTab: Locator;
    private readonly addressDetailsTab: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.emailInput = page.locator('#email');
        this.mobileInput = page.getByPlaceholder('1 (702) 123-4567');
        this.basicDetailsTab = page.getByRole('button', { name: 'Basic Details', exact: true });
        this.addressDetailsTab = page.getByRole('button', { name: 'Address Details', exact: true });
    }

    async goTo() {
        await this.navigateTo('https://staging.bluknox.com/profile');
    }

    async updateBasicDetails(firstName: string, lastName: string, mobile: string) {
        await this.type(this.firstNameInput, firstName);
        await this.type(this.lastNameInput, lastName);
        await this.type(this.mobileInput, mobile);
        await this.click(this.page.getByRole('button', { name: 'Save' }));
    }

    async selectGender(gender: 'Male' | 'Female' | 'Others') {
        await this.click(this.page.getByRole('radio', { name: gender, exact: true }));
    }

    async switchTab(tabName: 'Basic Details' | 'Address Details') {
        if (tabName === 'Basic Details') {
            await this.click(this.basicDetailsTab);
        } else {
            await this.click(this.addressDetailsTab);
        }
    }

    async isEmailReadOnly(): Promise<boolean> {
        return await this.emailInput.isDisabled() || await this.emailInput.getAttribute('readonly') !== null;
    }
}
