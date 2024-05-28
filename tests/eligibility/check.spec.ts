import { test, expect } from "@fixtures/PageFixture";
import URLConfig from "@utils/URLConfig";
import { getUserData } from "@utils/UserConfig";
import UserParse from "@utils/UserParse";

// test.describe.parallel("Eligibility Check", () => {
//   const users = new UserParse();
//   for (const user of users.parse()) {
//     test(`Is Eligible ${user.username}`, async ({
//       page,
//       userRole,
//       eligibilityPage,
//     }) => {
//       await eligibilityPage.goto(
//         `${URLConfig.baseURL}/${user.role}/check-eligibility`
//       );
//       await eligibilityPage.chooseInputMahasiswa();

//       const ptCode = user.pt[0].pt_code;
//       const ptName = user.pt[0].pt_name;

//       await eligibilityPage.expectCorrectPtName(ptCode, ptName);
//     });
//   }
// });

// test.describe("Eligibility Check", () => {
//   test("Has Eligible", async ({
//     page,
//     userRole,
//     eligibilityPage,
//     userPassword,
//     userPt,
//   }) => {
//     await eligibilityPage.goto(userRole);
//     await eligibilityPage.chooseInputMahasiswa();
//     const ptName = await getUserData("pt_name");
//     console.log(userPassword, userPt);
//   });
// });
