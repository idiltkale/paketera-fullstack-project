import React, { useEffect, useState } from "react";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [newType, setNewType] = useState("");

  useEffect(() => {
    fetch("https://paketera-fullstack-project.onrender.com/users")

      .then((res) => res.json())
      .then((data) => setUsers(data));

      fetch("https://paketera-fullstack-project.onrender.com/orders")

      .then((res) => res.json())
      .then((data) => setOrders(data));

      fetch("https://paketera-fullstack-project.onrender.com/product-types")
      .then((res) => res.json())
      .then((data) => setProductTypes(data));
  }, []);

  const handleAddType = () => {
    if (newType.trim() === "" || productTypes.find((pt) => pt.name === newType)) return;

    fetch("https://paketera-fullstack-project.onrender.com/product-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newType }),
    })
      .then(() => setProductTypes([...productTypes, { name: newType }]))
      .then(() => setNewType(""));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">User List</h3>
      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.role !== "admin")
            .map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border capitalize">{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-6 mb-2">Order List</h3>
      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 bg-white shadow">
          <p className="font-semibold">Order #{order.id}</p>
          <p>Customer: <span className="font-medium">{order.customer}</span></p>

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
                order.interested_suppliers.map((s, i) => <li key={i}>{s}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-10 mb-2">Product Types</h3>
      <ul className="list-disc list-inside mb-4">
        {productTypes.map((pt, i) => (
          <li key={i}>{pt.name}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new product type"
          className="border p-2 rounded w-full"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
        <button
          onClick={handleAddType}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
