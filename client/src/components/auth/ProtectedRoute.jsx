import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, user } = useAuthStore();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== "admin") return <Navigate to="/" replace />;
  return children;
}
