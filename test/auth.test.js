import { loginAdmin } from "../auth";

jest.mock("../firebaseConfig");

describe("Admin Authentication", () => {
  test("allows admin login with correct credentials", async () => {
    const success = await loginAdmin("admin@sonia.com", "sonia123");
    expect(success).toBe(true);
  });

  test("rejects login with incorrect credentials", async () => {
    const success = await loginAdmin("wrong@sonia.com", "wrongpass");
    expect(success).toBe(false);
  });
});
