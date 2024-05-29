import { expect, test as setup } from "@playwright/test";
import URLConfig from "@utils/URLConfig";
import UserParse from "@utils/UserParse";
import path = require("path");
import * as fs from "fs";

setup.describe.parallel("Global Setup", () => {
  setup("Clearing cache and enabling mock operator", async ({ page }) => {
    await page.goto(`${URLConfig.baseURL}/dev/cache`);
    await page.getByRole("button", { name: "Clear Expired Cache" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("Success")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
    await page.getByRole("button", { name: "Clear All Cache" }).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("Success")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();

    await page.goto(`${URLConfig.baseURL}/dev/mock-operator`);
    await page.getByRole("link", { name: "Enable" }).first().click();
    await expect(page.getByText("Success").first()).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
    await page.getByRole("link", { name: "Enable" }).click();
    await expect(page.getByText("Success").first()).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  });

  const users = new UserParse();
  users.parse();
  const userDataPath = path.resolve(".data", "userData.json");
  const userDataString = fs.readFileSync(userDataPath, "utf-8");
  const userData = JSON.parse(userDataString);

  for (const user of userData) {
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
