import { useState, useEffect, createContext, useContext } from 'react';
import { getCurrentUser, logout as doLogout } from '../services/authService';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const logout = () => {
    doLogout();
    setUser(null);
  };

  const refreshProfile = async () => {
    try {
      const res = await api.get('/profile');
      // do not overwrite token
      setUser({ ...user, profile: res.data.profile });
      // update localStorage
      localStorage.setItem('user', JSON.stringify({ id: res.data.id, email: res.data.email, profile: res.data.profile }));
    } catch (err) {
      console.error('Failed refresh profile', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

// Wrap app:
export function AuthWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
