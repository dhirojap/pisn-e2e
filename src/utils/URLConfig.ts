interface IMissingBaseURLError extends Error {
  message: string;
}

function getBaseURL(): string {
  if (!process.env.BASE_URL) {
    throw new Error(
      "Missing BASE_URL environment variable. Please check your .env file!"
    ) as IMissingBaseURLError;
  }

  return process.env.BASE_URL;
}

const baseURL = getBaseURL();
console.log(process.env.BASE_URL);

interface IURLConfig {
  baseURL: string;
  loginURL: string;
}

const URLConfig: IURLConfig = {
  baseURL: baseURL,
  loginURL: baseURL + "/login",
};

export default URLConfig;
