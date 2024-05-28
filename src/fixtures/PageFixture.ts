import { EligibilityPage } from "src/pages/Eligibility.page";
import { test as base } from "@playwright/test";
import { getUserData } from "@utils/UserConfig";

type PageFixture = {
  eligibilityPage: EligibilityPage;
  userRole: string;
  userPt: string;
  userPassword: string;
};

export const test = base.extend<PageFixture>({
  userPassword: async ({}, use) => {
    use(await getUserData("password"));
  },

  userPt: async ({}, use) => {
    use(await getUserData("pt_code"));
  },

  userRole: async ({}, use) => {
    use(await getUserData("role"));
  },

  eligibilityPage: async ({ page }, use) => {
    await use(new EligibilityPage(page));
  },
});

export { expect } from "@playwright/test";
