import { db } from "../__mocks__/firebaseConfig";
import { getSalesData } from "../sales";

jest.mock("../firebaseConfig");

describe("Admin Dashboard", () => {
  beforeEach(async () => {
    const salesRef = db.collection("checkout");
    await salesRef.doc("1").set({
      totalPrice: 2000,
      items: 5,
    });
    await salesRef.doc("2").set({
      totalPrice: 3000,
      items: 8,
    });
  });

  afterEach(async () => {
    await db.clearFirestoreData();
  });

  test("fetches sales data correctly", async () => {
    const { totalSales, totalItems, totalRevenue } = await getSalesData();
    expect(totalSales).toBe(2);
    expect(totalItems).toBe(13);
    expect(totalRevenue).toBe(5000);
  });
});
