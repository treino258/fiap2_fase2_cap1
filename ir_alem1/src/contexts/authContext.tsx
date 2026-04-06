import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../schemas/user';

const generateFakeJWT = (user: User): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ name: user.name, iat: Math.floor(Date.now() / 1000) }));
    const signature = btoa('simulated-signature');
    return `${header}.${payload}.${signature}`;
};

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        // NOTE: In a real application, tokens should be stored in httpOnly cookies
        // to prevent XSS attacks. Using localStorage here only for simulation purposes.
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const parts = token.split('.');
                if (parts.length !== 3) throw new Error('Invalid token format');
                const payload = JSON.parse(atob(parts[1])) as { name?: unknown };
                if (typeof payload.name !== 'string' || payload.name.length === 0) {
                    throw new Error('Invalid token payload');
                }
                return { name: payload.name, password: '' };
            } catch {
                localStorage.removeItem('token');
            }
        }
        return null;
    });

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem('token', generateFakeJWT(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
