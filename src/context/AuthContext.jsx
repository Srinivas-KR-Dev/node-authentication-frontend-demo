import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        username: '',
        accessToken: ''
    });

    const login = (username, accessToken) => {
        setAuth({
            username,
            accessToken
        });
    };

    const updateAccessToken = (accessToken) => {
        setAuth((currentAuth) => ({
            ...currentAuth,
            accessToken
        }));
    };

    const logout = () => {
        setAuth({
            username: '',
            accessToken: ''
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, updateAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
