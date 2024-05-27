import * as fs from "fs";
import path = require("path");
import { parse } from "csv-parse/sync";

type Role = "admin" | "operator";

interface IUserData {
  username: string;
  password: string;
  role: Role;
  pt: [
    {
      pt_name: string;
      pt_code: string[];
    }
  ];
  prodi: [
    {
      prodi_name: string;
      prodi_code: string;
    }
  ];
}

class UserParse {
  parse(): IUserData[] {
    const userData: IUserData[] = [];

    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "src",
      "assets",
      "user.csv"
    );
    const stream = fs.readFileSync(filePath);
    const users = parse(stream, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
    });

    for (const user of users) {
      userData.push({
        username: user.username,
        password: user.password,
        role: user.role,
        pt: [{ pt_name: user.pt_name, pt_code: user.pt_code }],
        prodi: [{ prodi_name: user.prodi_name, prodi_code: user.prodi_code }],
      });
    }

    const jsonFilePath = path.resolve(
      __dirname,
      "..",
      "..",
      ".data",
      "userData.json"
    );
    fs.writeFileSync(jsonFilePath, JSON.stringify(userData, null, 2));

    return userData;
  }
}

export default UserParse;
