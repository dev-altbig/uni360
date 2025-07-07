import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth(); // Destructure the new loading state

    // 1. While the hook is checking for a token, show a loading indicator.
    //    This prevents the premature redirect.
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // 2. After loading, if there's no user, redirect to login.
    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    // 3. If there is a user, check their role.
    //    The check for allowedRoles should handle undefined gracefully.
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If role is not allowed, send them to the main dashboard as a safe default.
        return <Navigate to="/" replace />;
    }

    // 4. If all checks pass, render the requested component.
    return children;
};

export default ProtectedRoute;