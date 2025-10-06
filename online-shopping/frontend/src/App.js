import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({});

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const increaseQuantity = (id) => {
    setQuantities({ ...quantities, [id]: (quantities[id] || 1) + 1 });
  };

  const decreaseQuantity = (id) => {
    setQuantities({
      ...quantities,
      [id]: quantities[id] > 1 ? quantities[id] - 1 : 1,
    });
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseCartQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseCartQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`${data.message} | Total: ₹${data.totalAmount}`);
        setCart([]);
        localStorage.removeItem("cart");
        setShowCart(false);
      })
      .catch((err) => console.error("Checkout error:", err));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🛍️ ShopEase</h1>
        <button className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 Cart ({cart.length})
        </button>
      </header>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>

            <div className="quantity-box horizontal">
  <span className="quantity-label">Quantity:</span>
  <button onClick={() => decreaseQuantity(p.id)}>-</button>
  <span>{quantities[p.id] || 1}</span>
  <button onClick={() => increaseQuantity(p.id)}>+</button>
</div>


            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="modal">
          <div className="modal-content">
            <h2>🛒 Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <div>
                        {item.name} ×
                        <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
                        {item.quantity}
                        <button onClick={() => increaseCartQuantity(item.id)}>+</button>
                      </div>
                      <div>
                        ₹{item.price * item.quantity}{" "}
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3>Total: ₹{totalPrice}</h3>
                <button className="checkout-btn" onClick={checkout}>
                  ✅ Checkout
                </button>
              </>
            )}
            <button className="close-btn" onClick={() => setShowCart(false)}>
              Close ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
