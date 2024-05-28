import { Locator, Page, expect } from "@playwright/test";
import URLConfig from "@utils/URLConfig";

export class EligibilityPage {
  readonly page: Page;
  readonly inputMahasiswaMenu: Locator;
  readonly uploadFileMenu: Locator;
  readonly ptInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputMahasiswaMenu = page.locator(".card").first();
    this.uploadFileMenu = page.locator("div:nth-child(2) > .card");
    this.ptInput = page
      .locator('h5:has-text("Pilih Perguruan Tinggi")')
      .locator("..")
      .locator(".select2");
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async chooseInputMahasiswa() {
    await this.inputMahasiswaMenu.click();
  }

  async chooseUploadFile() {
    await this.uploadFileMenu.click();
  }

  async expectCorrectPtName(ptCode: string, ptName: string) {
    await this.ptInput.click();
    await expect(
      this.page.getByRole("option", { name: `- ${ptName}` })
    ).toBeVisible();
  }
}
