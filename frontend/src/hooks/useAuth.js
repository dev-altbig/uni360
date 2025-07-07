import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start in a loading state

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Optional: Check if token is expired before decoding
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }
        } catch (error) {
            console.error("Invalid or expired token:", error);
            // Ensure user is null if token is bad
            setUser(null);
        } finally {
            // CRITICAL: We are done checking, so set loading to false
            setLoading(false);
        }
    }, []); // Empty array means this runs only once on initial mount

    return { user, loading }; // Return the loading state along with the user
};

export default useAuth;