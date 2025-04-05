import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
    const isAuthenticated = localStorage.getItem("email");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
