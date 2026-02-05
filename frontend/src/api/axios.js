import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/', // Use env var for production
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
