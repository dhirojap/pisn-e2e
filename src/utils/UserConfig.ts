import path = require("path");
import UserParse, { IUserData } from "./UserParse";
import * as fs from "fs";

let userData: IUserData[] = [];

function getUserData(): IUserData[] {
  const users = new UserParse();
  users.parse();

  const userDataPath = path.resolve(".data", "userData.json");
  const userDataString = fs.readFileSync(userDataPath, "utf-8");
  const result = JSON.parse(userDataString) as IUserData[];

  userData.push(...result);

  return userData;
}

export default getUserData;
