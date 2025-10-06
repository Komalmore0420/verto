# 🛍️ Simple Shopping Cart

A minimal e-commerce site to list products and manage a shopping cart.  
This project has a backend built with **Node.js + Express** and a frontend built with **React**.

---

## 📌 Features

### Backend
- `/products` API returns a hardcoded list of products.
- `/checkout` API accepts cart data and returns a confirmation with total price.
- Simple, clean code without database dependency.

### Frontend
- Stylish product grid with larger product images.
- Quantity selector for each product.
- Add/remove products from cart.
- Cart persists in localStorage even after refresh.
- Cart view with total price and checkout option.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have:
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git installed

---

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Komalmore0420/verto.git 
cd online-shopping

2️⃣ Backend Setup
cd backend
npm install
npm start

Backend will run at: http://localhost:5000

3️⃣ Frontend Setup
Open another terminal:
cd frontend
npm install
npm start

Frontend will run at: http://localhost:3000

4️⃣ Running Backend Tests
cd backend
npm test
 

📚 Tech Stack

Frontend: React.js, CSS

Backend: Node.js, Express.js

Testing: Jest

Storage: localStorage
