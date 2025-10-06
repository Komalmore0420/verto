const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

 
app.use(express.static("public"));

const products = [
  { id: 1, name: "Laptop", price: 80000, imageUrl: "http://localhost:5000/images/laptop.jpg" },
  { id: 2, name: "Smartphone", price: 5000, imageUrl: "http://localhost:5000/images/smartphone.jpg" },
  { id: 3, name: "Headphones", price: 1000, imageUrl: "http://localhost:5000/images/headphone.jpg" },
  { id: 4, name: "Keyboard", price: 500, imageUrl: "http://localhost:5000/images/keyboard.jpg" },
  { id: 5, name: "Mouse", price: 300, imageUrl: "http://localhost:5000/images/mouse.jpg" },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/checkout", (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) total += product.price * item.quantity;
  });

  res.json({
    message: "Order placed successfully!",
    totalAmount: total,
    orderSummary: cart,
  });
});

if (require.main === module) {
  app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));
}

module.exports = app;
