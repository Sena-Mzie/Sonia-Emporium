
import {fetchCartItems, loadCartItems, updateSummary, updateQuantity, removeItem,} from "../script"; 
import { getAuth } from "firebase/auth";
import { getDoc, updateDoc } from "firebase/firestore";

// Mock Firebase functions
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "testUser123" },
  })),
}));

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

describe("Shopping Cart Functionality", () => {
  let mockCartItems;
  let mockDOM;

  beforeEach(() => {
    // Mock cart items
    mockCartItems = [
      { name: "Shirt", price: 200, quantity: 2, image: "shirt.jpg" },
      { name: "Shoes", price: 500, quantity: 1, image: "shoes.jpg" },
    ];

    // Mock DOM elements
    document.body.innerHTML = `
      <div id="cartItemsList"></div>
      <p id="subtotal"></p>
      <p id="deliveryFee"></p>
      <h3 id="totalPrice"></h3>
    `;
    mockDOM = {
      cartItemsList: document.getElementById("cartItemsList"),
      subtotalElem: document.getElementById("subtotal"),
      deliveryFeeElem: document.getElementById("deliveryFee"),
      totalPriceElem: document.getElementById("totalPrice"),
    };
  });

  // Test fetchCartItems
  test("fetchCartItems should fetch user cart items from Firestore", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ product: mockCartItems }),
    });

    const result = await fetchCartItems();
    expect(result).toEqual(mockCartItems);
  });

  test("fetchCartItems should return an empty array if no data exists", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => false,
    });

    const result = await fetchCartItems();
    expect(result).toEqual([]);
  });

  // Test loadCartItems
  test("loadCartItems should render cart items and update summary", async () => {
    // Mock fetchCartItems to return the mockCartItems
    jest.spyOn(global, "fetchCartItems").mockResolvedValueOnce(mockCartItems);

    await loadCartItems();

    // Check if cart items are rendered
    expect(mockDOM.cartItemsList.innerHTML).toContain("Shirt");
    expect(mockDOM.cartItemsList.innerHTML).toContain("Shoes");

    // Check if the summary is updated correctly
    expect(mockDOM.subtotalElem.textContent).toBe("Subtotal: R900.00");
    expect(mockDOM.deliveryFeeElem.textContent).toBe("Delivery Fee (10%): R90.00");
    expect(mockDOM.totalPriceElem.textContent).toBe("Total: R990.00");
  });

  // Test updateSummary
  test("updateSummary should correctly calculate totals", () => {
    const subtotal = 900;
    const deliveryFee = subtotal * 0.1;
    const total = subtotal + deliveryFee;

    // Mock cart subtotal
    global.subtotal = subtotal;

    updateSummary();

    expect(mockDOM.subtotalElem.textContent).toBe(`Subtotal: R${subtotal.toFixed(2)}`);
    expect(mockDOM.deliveryFeeElem.textContent).toBe(`Delivery Fee (10%): R${deliveryFee.toFixed(2)}`);
    expect(mockDOM.totalPriceElem.textContent).toBe(`Total: R${total.toFixed(2)}`);
  });

  // Test updateQuantity
  test("updateQuantity should adjust item quantity and update summary", async () => {
    const index = 0;
    const change = 1;

    // Mock item
    cartItems = [...mockCartItems];
    const item = cartItems[index];

    // Call the function
    global.updateCartFirestore = jest.fn();
    await updateQuantity(index, change);

    expect(item.quantity).toBe(3); // Quantity should increase
    expect(global.updateCartFirestore).toHaveBeenCalledWith(index, { quantity: 3 }); // Firestore updated
  });

  // Test removeItem
  test("removeItem should remove item from the cart and update Firestore", async () => {
    const index = 1; // Remove the second item (Shoes)

    cartItems = [...mockCartItems];
    global.updateCartFirestore = jest.fn();
    jest.spyOn(global, "loadCartItems").mockResolvedValueOnce();

    await removeItem(index);

    expect(cartItems).toHaveLength(1); // Only one item left
    expect(global.updateCartFirestore).toHaveBeenCalledWith(index, null, true); // Firestore updated
    expect(loadCartItems).toHaveBeenCalled(); // Cart reloaded
  });
});

