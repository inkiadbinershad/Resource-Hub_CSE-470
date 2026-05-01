import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // On app load, read token and user from localStorage to restore session
  useEffect(() => {
    const storedUser = localStorage.getItem('resourcehubUser');
    const storedToken = localStorage.getItem('resourcehubToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login function - calls real API, saves token and user to localStorage
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiLogin(email, password);
      const userData = data.user;
      const authToken = data.token;
      
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('resourcehubUser', JSON.stringify(userData));
      localStorage.setItem('resourcehubToken', authToken);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - calls real API, saves token and user to localStorage
  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRegister(name, email, password);
      const userData = data.user;
      const authToken = data.token;
      
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('resourcehubUser', JSON.stringify(userData));
      localStorage.setItem('resourcehubToken', authToken);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function - clears token and user from localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('resourcehubUser');
    localStorage.removeItem('resourcehubToken');
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      error,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
