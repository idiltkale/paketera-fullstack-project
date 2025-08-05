import React, { useState, useEffect } from "react";

function SupplierPage({ user }) {
  const [selectedType, setSelectedType] = useState("");
  const [orders, setOrders] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

    fetch("http://localhost:3001/product-types")
      .then((res) => res.json())
      .then((data) => setProductTypes(data));
  }, []);

  const handleInterest = async (orderId, interested) => {
    await fetch(`http://localhost:3001/orders/${orderId}/supplier-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplierUsername: user.username,
        interested: interested,
      }),
    });

    const updated = await fetch("http://localhost:3001/orders").then((res) => res.json());
    setOrders(updated);
  };

  const filteredOrders = selectedType
    ? orders.filter((order) =>
        order.products.some((p) => p.type === selectedType)
      )
    : orders;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Supplier Page</h2>

      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by product type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          {productTypes.map((pt) => (
            <option key={pt.id} value={pt.name}>
              {pt.name}
            </option>
          ))}
        </select>
      </div>

      {filteredOrders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 bg-white shadow">
          <p className="font-semibold">Order #{order.id}</p>
          <p>Customer: {order.customer}</p>

          <div className="mt-2">
            <p className="font-semibold">Products:</p>
            <ul className="list-disc list-inside ml-4">
              {order.products.map((p, i) => (
                <li key={i}>{p.type}: {p.quantity}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleInterest(order.id, true)}
              className={`px-4 py-1 rounded ${
                order.interested_suppliers?.includes(user.username)
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              ✅ Interested
            </button>
            <button
              onClick={() => handleInterest(order.id, false)}
              className={`px-4 py-1 rounded ${
                order.interested_suppliers?.includes(user.username)
                  ? "bg-gray-200"
                  : "bg-red-600 text-white"
              }`}
            >
              ❌ Not Interested
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SupplierPage;
