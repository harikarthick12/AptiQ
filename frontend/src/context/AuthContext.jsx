
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Hardcoded test user for local development
const TEST_USER = {
    uid: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    preferredLanguage: 'English',
    progress: {},
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    badges: []
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock checking for a logged-in user in localStorage
        const storedUser = localStorage.getItem('aptiq_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        if (email === 'test@example.com' && password === 'password123') {
            setUser(TEST_USER);
            localStorage.setItem('aptiq_user', JSON.stringify(TEST_USER));
            return TEST_USER;
        } else {
            throw new Error('Invalid credentials. Use test@example.com / password123');
        }
    };

    const signup = async (name, email, password) => {
        const newUser = {
            uid: 'user-' + Date.now(),
            name,
            email,
            preferredLanguage: 'English',
            progress: {},
            xp: 0,
            streak: 0,
            lastActiveDate: new Date().toISOString().split('T')[0],
            badges: []
        };
        setUser(newUser);
        localStorage.setItem('aptiq_user', JSON.stringify(newUser));
        return newUser;
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('aptiq_user');
    };

    const updateUser = async (updatedData) => {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem('aptiq_user', JSON.stringify(newUser));
    };

    const value = { user, loading, login, signup, logout, updateUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
