import { Role } from "./UserParse";

interface IMissingBaseURLError extends Error {
  message: string;
}

class URLConfig {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = this.getBaseURL();
  }

  getBaseURL(): string {
    if (!process.env.BASE_URL) {
      throw new Error(
        "Missing BASE_URL environment variable. Please check your .env file!"
      ) as IMissingBaseURLError;
    }

    return process.env.BASE_URL;
  }

  getEligibilityURL(role: Role): string {
    return `${this.baseURL}/${role}/check-eligibility`;
  }

  getGenerateURL(role: Role): string {
    return `${this.baseURL}/${role}/generated-certificate`;
  }
}

export default URLConfig;

const urlConfig = new URLConfig();
export const baseURL = urlConfig.getBaseURL();
export const loginURL = baseURL + "/login";
