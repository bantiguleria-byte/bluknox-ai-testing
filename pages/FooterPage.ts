import { Page, Locator } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class FooterPage extends BasePage {
    readonly chplListingLink: Locator;
    readonly mandatoryDisclosuresLink: Locator;
    readonly exportFormatLink: Locator;
    readonly classicLink: Locator;
    readonly healthcareLink: Locator;
    readonly enterpriseLink: Locator;
    readonly apiLink: Locator;
    readonly groupShareLink: Locator;

    constructor(page: Page) {
        super(page);
        this.chplListingLink = page.getByRole('link', { name: /ONC Health IT Certification CHPL Listing/i })
            .or(page.getByText(/ONC Health IT Certification CHPL Listing/i)).first();
            
        this.mandatoryDisclosuresLink = page.getByRole('link', { name: /ONC Health IT Certification Mandatory Disclosures/i })
            .or(page.getByText(/ONC Health IT Certification Mandatory Disclosures/i)).first();
            
        this.exportFormatLink = page.getByRole('link', { name: /Patient Data Export Format/i })
            .or(page.getByText(/Patient Data Export Format/i)).first();

        this.classicLink = page.getByRole('link', { name: /BluKnox Classic/i })
            .or(page.getByText(/BluKnox Classic/i)).first();

        this.healthcareLink = page.getByRole('link', { name: /BluKnox Healthcare/i })
            .or(page.getByText(/BluKnox Healthcare/i)).first();

        this.enterpriseLink = page.getByRole('link', { name: /BluKnox Enterprise/i })
            .or(page.getByText(/BluKnox Enterprise/i)).first();

        this.apiLink = page.getByRole('link', { name: /BluKnox API/i })
            .or(page.getByText(/BluKnox API/i)).first();

        this.groupShareLink = page.getByRole('link', { name: /BluKnox GroupShare/i })
            .or(page.getByText(/BluKnox GroupShare/i)).first();
    }

    /**
     * Navigates to the base URL and scrolls to the absolute bottom of the page to reveal the footer.
     */
    async navigateAndScrollToFooter() {
        await this.page.goto('/', { waitUntil: 'load' });
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000); // Allow any lazy-loaded footer components to render
    }

    /**
     * Wait for a link to be visible before clicking it. Provides better stability than strict mode exact matching.
     */
    private async clickLinkRobustly(linkLocator: Locator) {
        await linkLocator.waitFor({ state: 'visible', timeout: 15000 });
        await linkLocator.click();
    }

    async clickCHPLListing() {
        await this.clickLinkRobustly(this.chplListingLink);
    }

    async clickMandatoryDisclosures() {
        await this.clickLinkRobustly(this.mandatoryDisclosuresLink);
    }

    async clickExportFormat() {
        await this.clickLinkRobustly(this.exportFormatLink);
    }

    async clickClassic() {
        await this.clickLinkRobustly(this.classicLink);
    }

    async clickHealthcare() {
        await this.clickLinkRobustly(this.healthcareLink);
    }

    async clickEnterprise() {
        await this.clickLinkRobustly(this.enterpriseLink);
    }

    async clickAPI() {
        await this.clickLinkRobustly(this.apiLink);
    }

    async clickGroupShare() {
        await this.clickLinkRobustly(this.groupShareLink);
    }
}
