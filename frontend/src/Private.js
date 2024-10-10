import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Check if user is authenticated
    console.log("Is Authenticated:", isAuthenticated); // Debugging log

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
