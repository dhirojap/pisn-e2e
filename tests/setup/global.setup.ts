import { type Page, expect, test as setup } from "@playwright/test";
import { baseURL, loginURL } from "@utils/URLConfig";
import UserParse from "@utils/UserParse";
import path = require("path");

setup.beforeAll(async ({ browser }) => {
  const page: Page = await browser.newPage();

  await page.goto(`${baseURL}/dev/cache`);
  await page.getByRole("button", { name: "Clear Expired Cache" }).click();
  await page.getByRole("button", { name: "OK" }).click();

  await expect(page.getByText("Success")).toBeVisible();

  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "Clear All Cache" }).click();
  await page.getByRole("button", { name: "OK" }).click();

  await expect(page.getByText("Success")).toBeVisible();

  await page.getByRole("button", { name: "OK" }).click();

  console.log("Clear server cache success ✅");

  await page.goto(`${baseURL}/dev/mock-operator`);
  await page.getByRole("link", { name: "Enable" }).first().click();

  await expect(page.getByText("Success").first()).toBeVisible();

  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("link", { name: "Enable" }).click();

  await expect(page.getByText("Success").first()).toBeVisible();

  await page.getByRole("button", { name: "OK" }).click();

  console.log("Enable mock operator success ✅");
});

setup.describe.parallel("Auth Setup", () => {
  const users = new UserParse();
  for (const user of users.parse()) {
    setup(`Logging In ${user.username}`, async ({ page }) => {
      await page.goto(loginURL);
      await page.getByPlaceholder("Username").fill(user.username);
      await page.getByPlaceholder("Kata Sandi").fill(user.password);
      await page.getByRole("button", { name: "Login" }).last().click();
      await page.waitForLoadState("domcontentloaded");

      await expect(page).toHaveURL(`${baseURL}/${user.role}`);
      await expect(page.getByRole("link", { name: "dashboard" })).toBeVisible();

      console.log(`${user.username} login success ✅`);

      try {
        const file = path.resolve(`.auth/${user.username}.json`);
        await page.context().storageState({ path: file });

        console.log(`Save ${user.username}'s storage state success ✅`);
      } catch (error) {
        console.error(`Error saving ${user.username}'s storage state`, error);
      }
    });
  }
});
