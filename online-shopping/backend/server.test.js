const request = require("supertest");
const app = require("./server");

describe("Backend API Tests", () => {
  describe("GET /products", () => {
    it("should return all products with correct structure", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("imageUrl");
    });

    it("should return 404 for invalid endpoint", async () => {
      const response = await request(app).get("/invalid");
      expect(response.status).toBe(404);
    });
  });

  describe("POST /checkout", () => {
    it("should return error if cart is empty", async () => {
      const response = await request(app).post("/checkout").send({ cart: [] });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Cart is empty");
    });

    it("should return order summary and totalAmount for a valid cart", async () => {
      const cart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ];

      const response = await request(app).post("/checkout").send({ cart });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Order placed successfully!");
      expect(response.body).toHaveProperty("totalAmount");
      expect(response.body.totalAmount).toBe((800 * 2) + (500 * 1));
      expect(response.body.orderSummary).toEqual(cart);
    });

    it("should ignore invalid product IDs", async () => {
      const cart = [{ id: 999, quantity: 1 }];
      const response = await request(app).post("/checkout").send({ cart });
      expect(response.status).toBe(200);
      expect(response.body.totalAmount).toBe(0);
      expect(response.body.orderSummary).toEqual(cart);
    });
  });
});
