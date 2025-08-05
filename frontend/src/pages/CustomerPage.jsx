import { useState, useEffect } from "react";
import React from "react";


function CustomerPage({ user }) {
  const [productTypes, setProductTypes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({});

  useEffect(() => {
    fetch("https://paketera-fullstack-project.onrender.com/product-types")
    .then((res) => res.json())
      .then((data) => setProductTypes(data));

      fetch("https://paketera-fullstack-project.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleQuantityChange = (type, value) => {
    const quantity = parseInt(value);
    setNewOrder((prev) => ({
      ...prev,
      [type]: isNaN(quantity) ? 0 : quantity,
    }));
  };

  const handleSubmit = async () => {
    const nonZeroProducts = Object.entries(newOrder).filter(([_, qty]) => qty > 0);
    if (nonZeroProducts.length === 0) return;

    const orderData = {
      customerUsername: user.username,
      products: Object.fromEntries(nonZeroProducts),
    };

    const res = await fetch("https://paketera-fullstack-project.onrender.com/orders", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      const updated = await fetch("https://paketera-fullstack-project.onrender.com/orders")
      setOrders(updated);
      setNewOrder({});
    }
  };

  const maskName = (name) => {
    if (name.length < 2) return "*";
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Page</h2>

      <h3 className="text-xl font-semibold mb-2">Create Order</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {productTypes.map((pt) => (
          <div key={pt.id} className="flex flex-col">
            <label className="font-medium">{pt.name}</label>
            <input
              type="number"
              min="0"
              value={newOrder[pt.name] || ""}
              onChange={(e) => handleQuantityChange(pt.name, e.target.value)}
              className="border p-2 rounded"
              placeholder="Quantity"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Order
      </button>

      <h3 className="text-xl font-semibold mt-10 mb-2">Your Orders</h3>
      {orders
        .filter((order) => order.customer === user.username)
        .map((order) => (
          <div key={order.id} className="border rounded p-4 mb-4 bg-white shadow">
            <p className="font-semibold">Order #{order.id}</p>
            <div className="mt-2">
              <p className="font-semibold">Products:</p>
              <ul className="list-disc list-inside ml-4">
                {order.products.map((p, i) => (
                  <li key={i}>{p.type}: {p.quantity}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Interested Suppliers:</p>
              <ul className="list-disc list-inside ml-4">
                {order.interested_suppliers && order.interested_suppliers.length > 0 ? (
                  order.interested_suppliers.map((s, i) => (
                    <li key={i}>{maskName(s)}</li>
                  ))
                ) : (
                  <li>None yet</li>
                )}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CustomerPage;
