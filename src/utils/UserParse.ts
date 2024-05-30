import * as fs from "fs";
import path = require("path");
import { parse } from "csv-parse/sync";

type Role = "admin" | "operator";

export interface IUserData {
  username: string;
  password: string;
  role: Role;
  pt: [
    {
      pt_name: string;
      pt_code: string;
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
  private readonly csvDir: string;

  constructor() {
    this.csvDir = path.resolve(__dirname, "..", "..", "src", "assets");
  }

  parse(): IUserData[] {
    const userData: IUserData[] = [];
    const csvFiles = fs
      .readdirSync(this.csvDir)
      .filter((file) => file.endsWith(".csv"));

    for (const fileName of csvFiles) {
      const filePath = path.join(this.csvDir, fileName);

      try {
        const stream = fs.readFileSync(filePath);
        const users = parse(stream, {
          columns: true,
          skip_empty_lines: true,
          bom: true,
        });

        for (const user of users) {
          const username = user.username;
          const existingEntry = userData.find((u) => u.username === username);

          if (existingEntry) {
            existingEntry.pt.push({
              pt_name: user.pt_name,
              pt_code: user.pt_code,
            });
            existingEntry.prodi.push({
              prodi_name: user.prodi_name,
              prodi_code: user.prodi_code,
            });
          } else {
            userData.push({
              username: user.username,
              password: user.password,
              role: user.role,
              pt: [
                {
                  pt_name: user.pt_name,
                  pt_code: user.pt_code,
                },
              ],
              prodi: [
                {
                  prodi_name: user.prodi_name,
                  prodi_code: user.prodi_code,
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
      }
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
