import { db } from "../__mocks__/firebaseConfig";
import { loadProductsByCategory } from "../shop";

jest.mock("../firebaseConfig");

describe("Shop Page", () => {
  beforeEach(async () => {
    // Add mock products to the Firestore database
    const productsRef = db.collection("products");
    await productsRef.doc("1").set({
      name: "Luxury Dress",
      category: "Luxury Dresses",
      price: 1000,
      imageUrl: "image1.jpg",
    });
    await productsRef.doc("2").set({
      name: "Resort Wear",
      category: "Resort Wear",
      price: 500,
      imageUrl: "image2.jpg",
    });
  });

  afterEach(async () => {
    await db.clearFirestoreData();
  });

  test("loads products by category", async () => {
    const products = await loadProductsByCategory("Luxury Dresses");
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Luxury Dress");
    expect(products[0].category).toBe("Luxury Dresses");
  });
});
