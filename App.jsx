import React, { useState } from "react";

const shoes = [
  {
    id: 1,
    name: "Campus Men's Sneakers",
    price: 50,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Campus Men's OG-43 Sneakers",
    price: 75,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Classic White Sneakers",
    price: 60,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Running Sports Shoes",
    price: 85,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80"
  }
];

function App() {
  const [cart, setCart] = useState([]);

  // Add a shoe to cart
  const addToCart = (shoe) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === shoe.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...shoe, quantity: 1 }];
    });
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove shoe completely
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-6 py-5 shadow-sm">
        <h1 className="text-2xl font-bold">
          Shoe<span className="text-amber-700">Store</span>
        </h1>

        <div className="hidden gap-6 sm:flex">
          <a href="#home">Home</a>
          <a href="#products">Categories</a>
          <a href="#about">About Us</a>
        </div>

        <a
          href="#cart"
          className="rounded-lg bg-amber-700 px-4 py-2 text-white"
        >
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </a>
      </nav>

      {/* Hero */}
      <header
        id="home"
        className="mx-4 mt-6 rounded-2xl bg-[#e4d2ae] px-6 py-10 sm:mx-8 sm:px-10"
      >
        <p className="text-sm uppercase tracking-widest">
          Step into your style
        </p>

        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Find Your Perfect Pair
        </h2>

        <p className="mt-3 max-w-lg text-stone-700">
          Discover comfortable sneakers and sports shoes
          for every occasion.
        </p>

        <a
          href="#products"
          className="mt-5 inline-block rounded-lg bg-stone-900 px-5 py-3 text-white"
        >
          Shop Now
        </a>
      </header>

      {/* Products and Cart */}
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px] sm:px-8">

        {/* Shoe Products */}
        <section id="products">
          <h2 className="mb-5 text-2xl font-bold">
            Available Shoes
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {shoes.map((shoe) => (
              <article
                key={shoe.id}
                className="overflow-hidden rounded-xl bg-white p-4 shadow-sm"
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="h-48 w-full rounded-lg bg-stone-100 object-cover"
                />

                <h3 className="mt-4 font-semibold">
                  {shoe.name}
                </h3>

                <p className="mt-2 text-lg font-bold">
                  ${shoe.price.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(shoe)}
                  className="mt-4 w-full rounded-lg bg-[#d7c39a] px-4 py-2 font-semibold hover:bg-[#c4ad7d]"
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Shopping Cart */}
        <aside
          id="cart"
          className="h-fit rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-5"
        >
          <h2 className="text-xl font-bold">Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="mt-5 rounded-lg bg-stone-50 p-6 text-center text-stone-500">
              Your cart is empty.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-stone-200 pb-4"
                >
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="mt-1 text-sm text-stone-500">
                    ${item.price.toFixed(2)} each
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="rounded border px-3 py-1"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="rounded border px-3 py-1"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="mt-2 text-sm font-medium">
                    Item total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              disabled={cart.length === 0}
              className="mt-4 w-full rounded-lg bg-stone-900 px-4 py-3 text-white disabled:bg-stone-300"
            >
              Checkout
            </button>
          </div>
        </aside>
      </main>

      {/* About */}
      <section id="about" className="mx-4 mb-8 rounded-xl bg-white p-6 sm:mx-8">
        <h2 className="text-xl font-bold">About Our Store</h2>
        <p className="mt-2 text-stone-600">
          Find shoes that match your comfort, style, and everyday needs.
        </p>
      </section>

      <footer className="bg-stone-900 px-4 py-5 text-center text-white">
        © 2026 ShoeStore. All rights reserved.
      </footer>
    </div>
  );
}

export default App;