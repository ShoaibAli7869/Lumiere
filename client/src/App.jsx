import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Product from "@/pages/Product";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Account from "@/pages/Account";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCategories from "./pages/admin/Categories";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="admin"
        element={
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>
    </Routes>
  );
}
