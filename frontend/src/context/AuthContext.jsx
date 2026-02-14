
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check active session
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetchProfile(session.user.id);
            }
            setLoading(false);
        };

        initAuth();

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                await fetchProfile(session.user.id);
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) {
            // Map snake_case from DB to camelCase for frontend
            const formattedUser = {
                uid: userId,
                ...data,
                preferredLanguage: data.preferred_language
            };
            setUser(formattedUser);
        }
    };

    const signup = async (name, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        if (data.user) {
            // Create profile in profiles table
            const profileData = {
                id: data.user.id,
                name,
                email,
                preferred_language: 'English',
                progress: {}
            };

            const { error: profileError } = await supabase
                .from('profiles')
                .insert([profileData]);

            if (profileError) throw profileError;

            setUser({ uid: data.user.id, ...profileData });
            return profileData;
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        if (data.user) {
            await fetchProfile(data.user.id);
        }
        return data.user;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const updateUser = async (updatedData) => {
        if (!user) return;

        // Map frontend camelCase to database snake_case if necessary
        // In our dashboard we use 'preferredLanguage', let's map it.
        const dbData = { ...updatedData };
        if (dbData.preferredLanguage) {
            dbData.preferred_language = dbData.preferredLanguage;
            delete dbData.preferredLanguage;
        }

        const { error } = await supabase
            .from('profiles')
            .update(dbData)
            .eq('id', user.uid);

        if (error) throw error;

        // Fetch fresh data
        await fetchProfile(user.uid);
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
