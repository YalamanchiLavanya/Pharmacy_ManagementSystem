import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import MedicineDetails from "./pages/MedicineDetails";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Pages */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/medicines"
          element={<Medicines />}
        />

        <Route
          path="/medicines/:id"
          element={<MedicineDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Logout */}

        <Route
          path="/logout"
          element={<Logout />}
        />

        {/* User Protected Page */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Admin Only Pages */}

        <Route
          path="/add-medicine"
          element={
            <AdminRoute>
              <AddMedicine />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-medicine/:id"
          element={
            <AdminRoute>
              <EditMedicine />
            </AdminRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;