
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch additional user data from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    setUser({ uid: firebaseUser.uid, ...userDoc.data() });
                } else {
                    setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
            name,
            email,
            preferredLanguage: 'English',
            progress: {}, // { topic: { level: 'Beginner', seenQuestionIds: [] } }
            createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
        setUser({ uid: userCredential.user.uid, ...newUser });
        return newUser;
    };

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = { uid: userCredential.user.uid, ...userDoc.data() };
        setUser(userData);
        return userData;
    };

    const logout = () => {
        return signOut(auth);
    };

    const updateUser = async (updatedData) => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, updatedData);
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
