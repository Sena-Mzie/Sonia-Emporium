import { db } from "../__mocks__/firebaseConfig";
import { calculateTotalPrice, removeItemFromCart } from "../cart";

jest.mock("../firebaseConfig");

describe("Cart Page", () => {
  beforeEach(async () => {
    const cartRef = db.collection("cart");
    await cartRef.doc("1").set({
      name: "Luxury Dress",
      price: 1000,
      quantity: 2,
    });
    await cartRef.doc("2").set({
      name: "Resort Wear",
      price: 500,
      quantity: 1,
    });
  });

  afterEach(async () => {
    await db.clearFirestoreData();
  });

  test("calculates total price including delivery fee", async () => {
    const total = await calculateTotalPrice();
    expect(total).toBe(3300); // (1000 * 2 + 500) + 10% delivery fee
  });

  test("removes an item from the cart", async () => {
    await removeItemFromCart("1");
    const cartSnapshot = await db.collection("cart").get();
    expect(cartSnapshot.docs).toHaveLength(1);
  });
});
