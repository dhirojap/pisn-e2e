import UserParse from "./UserParse";

export async function getUserData(data: string): Promise<string | undefined> {
  const users = new UserParse();
  for (const user of users.parse()) {
    switch (data.toLowerCase()) {
      case "username":
        return user.username;
      case "password":
        return user.password;
      case "role":
        return user.role;
      case "pt_name":
        user.pt.map((p) => {
          return p.pt_name;
        });
      case "pt_code":
        user.pt.map((p) => {
          return p.pt_code;
        });
      case "prodi_name":
        user.prodi.map((prod) => {
          return prod.prodi_name;
        });
      case "prodi_code":
        user.prodi.map((prod) => {
          return prod.prodi_code;
        });
      default:
        return undefined;
    }
  }

  return users[data];
}
