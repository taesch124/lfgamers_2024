import { createContext, useContext, useState, PropsWithChildren } from 'react';

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: true,
});

export const AuthProvider = (props: PropsWithChildren<{}>) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{user, isLoading, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);