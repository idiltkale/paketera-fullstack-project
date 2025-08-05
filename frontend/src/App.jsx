import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CustomerPage from "./pages/CustomerPage";
import SupplierPage from "./pages/SupplierPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (!loggedInUser) {
    return <LoginPage onLogin={setLoggedInUser} />;
  }

  if (loggedInUser.role === "admin") {
    return <AdminPage />;
  } else if (loggedInUser.role === "customer") {
      return <CustomerPage user={loggedInUser} />; 

    
  } else if (loggedInUser.role === "supplier") {
    return <SupplierPage user={loggedInUser} />
  }

  return <div>Rol tanımlanamadı</div>;
}

export default App;
