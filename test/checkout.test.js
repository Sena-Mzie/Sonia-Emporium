import { db } from "../__mocks__/firebaseConfig";
import { submitCheckout } from "../checkout";

jest.mock("../firebaseConfig");

describe("Checkout Page", () => {
  beforeEach(async () => {
    const cartRef = db.collection("cart");
    await cartRef.doc("1").set({
      name: "Luxury Dress",
      price: 1000,
      quantity: 2,
    });
  });

  afterEach(async () => {
    await db.clearFirestoreData();
  });

  test("submits checkout and clears the cart", async () => {
    const success = await submitCheckout({
      address: "123 Fashion St",
      paymentMethod: "Cash on Delivery",
    });
    expect(success).toBe(true);

    const cartSnapshot = await db.collection("cart").get();
    expect(cartSnapshot.docs).toHaveLength(0);
  });
});
