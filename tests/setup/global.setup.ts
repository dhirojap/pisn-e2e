import { expect, test as setup } from "@playwright/test";
import URLConfig from "@utils/URLConfig";
import UserParse from "@utils/UserParse";
import path = require("path");

setup.describe.parallel("Auth Setup", () => {
  const users = new UserParse();
  for (const user of users.parse()) {
    setup(`Logging in ${user.username}`, async ({ page }) => {
      await page.goto(URLConfig.loginURL);
      await page.getByPlaceholder("Username").fill(user.username);
      await page.getByPlaceholder("Kata Sandi").fill(user.password);
      await page.getByRole("button", { name: "Login" }).last().click();

      await page.waitForLoadState("domcontentloaded");

      await expect(page).toHaveURL(`${URLConfig.baseURL}/${user.role}`);
      await expect(page.getByRole("link", { name: "dashboard" })).toBeVisible();

      const file = path.resolve(`.auth/${user.username}.json`);
      await page.context().storageState({ path: file });
    });
  }
});
