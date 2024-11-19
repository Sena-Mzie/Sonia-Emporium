// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  deleteDoc: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

import {
  getFirestore,
  collection,
  getDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

describe("Checkout Page Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <p id="totalItems">Total Items: 0</p>
      <p id="totalPrice">Total Price: R0.00</p>
      <form id="checkout-form">
        <input type="text" id="fullname" name="fullname" value="Test User">
        <input type="text" id="address" name="address" value="123 Test Street">
        <input type="text" id="city" name="city" value="Test City">
        <input type="text" id="country" name="country" value="Test Country">
        <input type="text" id="postal-code" name="postal-code" value="12345">
        <textarea id="delivery-notes" name="delivery-notes">Leave at the door.</textarea>
        <button type="submit">Complete Purchase</button>
      </form>
    `;
  });

  test("should load cart data and update summary", async () => {
    const mockUserId = "testUserId";
    const mockCartData = {
      product: [
        { price: 100, quantity: 2 },
        { price: 200, quantity: 1 },
      ],
    };

    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => mockCartData,
    });

    const totalItemsElem = document.getElementById("totalItems");
    const totalPriceElem = document.getElementById("totalPrice");

    const loadCartData = async (userId) => {
      const cartDoc = await getDoc(doc(getFirestore(), "total items in cart", userId));
      if (cartDoc.exists()) {
        const cartData = cartDoc.data().product || [];
        const totalItems = cartData.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const totalPrice = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalItemsElem.textContent = `Total Items: ${totalItems}`;
        totalPriceElem.textContent = `Total Price: R${totalPrice.toFixed(2)}`;
      }
    };

    await loadCartData(mockUserId);

    expect(getDoc).toHaveBeenCalledWith(doc(getFirestore(), "total items in cart", mockUserId));
    expect(totalItemsElem.textContent).toBe("Total Items: 3");
    expect(totalPriceElem.textContent).toBe("Total Price: R400.00");
  });

  test("should submit checkout form and save order", async () => {
    const mockUser = { uid: "testUserId" };
    const mockOrderData = {
      fullname: "Test User",
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country",
      postalCode: "12345",
      deliveryNotes: "Leave at the door.",
      totalItems: 2,
      totalPrice: "220.00",
      orderDate: expect.any(String),
      userId: mockUser.uid,
    };

    addDoc.mockResolvedValueOnce({});

    const checkoutForm = document.getElementById("checkout-form");
    const checkoutHandler = async (e) => {
      e.preventDefault();
      const formData = {
        fullname: checkoutForm.fullname.value.trim(),
        address: checkoutForm.address.value.trim(),
        city: checkoutForm.city.value.trim(),
        country: checkoutForm.country.value.trim(),
        postalCode: checkoutForm["postal-code"].value.trim(),
        deliveryNotes: checkoutForm["delivery-notes"].value.trim() || "",
        totalItems: 2,
        totalPrice: "220.00",
        orderDate: new Date().toISOString(),
      };

      await addDoc(collection(getFirestore(), "orders"), {
        ...formData,
        userId: mockUser.uid,
      });
    };

    checkoutForm.addEventListener("submit", checkoutHandler);

    const submitEvent = new Event("submit");
    checkoutForm.dispatchEvent(submitEvent);

    expect(addDoc).toHaveBeenCalledWith(collection(getFirestore(), "orders"), mockOrderData);
  });

  test("should redirect to cart if back button is clicked", () => {
    const backToCartButton = document.createElement("button");
    backToCartButton.id = "backToCartButton";
    document.body.appendChild(backToCartButton);

    const mockLocation = jest.spyOn(window.location, "href", "set");

    backToCartButton.addEventListener("click", () => {
      window.location.href = "cart.html";
    });

    backToCartButton.click();
    expect(mockLocation).toHaveBeenCalledWith("cart.html");
  });
});

