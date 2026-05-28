import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const baseApiUrl = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000/api' : 'https://dripzo-backend.onrender.com/api');
const API_URL = `${baseApiUrl.endsWith('/api') ? baseApiUrl : `${baseApiUrl}/api`}/auth`;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthSession = async () => {
      const token = localStorage.getItem('dripzo_token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        if (data.success && data.user) {
          setCurrentUser(data.user);
          localStorage.setItem('dripzo_user', JSON.stringify(data.user));
        } else {
          setCurrentUser(null);
          localStorage.removeItem('dripzo_user');
          localStorage.removeItem('dripzo_token');
        }
      } catch (error) {
        console.error('Failed to validate session with backend:', error.message);
        setCurrentUser(null);
        localStorage.removeItem('dripzo_user');
        localStorage.removeItem('dripzo_token');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password }, {
        withCredentials: true
      });
      
      const user = {
        ...data,
        avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
        tier: data.tier || 'DRIPZO Member',
      };
      
      setCurrentUser(user);
      localStorage.setItem('dripzo_user', JSON.stringify(user));
      localStorage.setItem('dripzo_token', data.token);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, { name, email, password }, {
        withCredentials: true
      });
      
      const user = {
        ...data,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        tier: 'New Member',
      };
      
      setCurrentUser(user);
      localStorage.setItem('dripzo_user', JSON.stringify(user));
      localStorage.setItem('dripzo_token', data.token);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const socialLogin = async (provider, credentialsPayload) => {
    try {
      const endpoint = provider === 'google' ? 'google' : 'facebook';
      const { data } = await axios.post(`${API_URL}/${endpoint}`, credentialsPayload, {
        withCredentials: true
      });
      
      if (data.success && data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('dripzo_user', JSON.stringify(data.user));
        localStorage.setItem('dripzo_token', data.token);
        return { success: true };
      } else {
        return { success: false, message: 'Authentication failed' };
      }
    } catch (error) {
      console.error(`${provider} API Authentication failed:`, error);
      return { 
        success: false, 
        message: error.response?.data?.message || `${provider} authentication failed` 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout request failed:', error.message);
    }
    setCurrentUser(null);
    localStorage.removeItem('dripzo_user');
    localStorage.removeItem('dripzo_token');
  };

  const updateUser = (updates) => {
    if (!currentUser) return false;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('dripzo_user', JSON.stringify(updatedUser));
    return true;
  };

  const value = {
    currentUser,
    login,
    signup,
    socialLogin,
    logout,
    updateUser,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
