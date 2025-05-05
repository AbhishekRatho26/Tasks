import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
  
    if (!token || !user) {
      return <Navigate to="/login" replace />;
    }
  
    try {
      const parsedUser = JSON.parse(user);
      const userRole = parsedUser.role;
      console.log("User Role:", userRole);  // Debugging log
  
      if (!allowedRoles.includes(userRole)) {
        // Redirect based on role if not allowed
        if (userRole === 'student') return <Navigate to="/recruiter" replace />;
        if (userRole === 'recruiter') return <Navigate to="/employee/dashboard" replace />;
        return <Navigate to="/unauthorized" replace />;
      }
  
      return <Outlet />;
    } catch (error) {
      console.error("Error parsing user:", error);
      return <Navigate to="/   " replace />;
    }
  };
  
export default ProtectedRoute;