import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            } else if (!storageUser) {
                setLoading(false);
            }
        }
        loadStorageData();
    }, [])

    async function setToken(token) {
        setUser(token);
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(token));
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, setToken, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;