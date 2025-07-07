import axios from 'axios';

// Create a new Axios instance with a base URL
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend API base URL
});

// Use an interceptor to dynamically add the token to every request
// This runs BEFORE each request is sent.
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Continue with the request
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default apiClient;