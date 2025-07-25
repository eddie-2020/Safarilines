// hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const useAuth = (switchToLogin) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await api.post('login/', data);
      
      if (response.data.requires_2fa) {
        localStorage.setItem('temp_token', response.data.temp_token);
        navigate('/two-factor');
        return { requires2FA: true };
      }
      
      localStorage.setItem('accessToken', response.data.tokens.access);
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
      toast.success('Login successful');
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      const errorData = error.response?.data || {};
      setErrors(errorData.errors || { message: 'Login failed' });
      toast.error(errorData.message || 'Login failed');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    setErrors({});

    try {
      const isFormData = data instanceof FormData;

      const response = await api.post('register/', data, {
        headers: isFormData
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
      });

      toast.success('Registration successful!');
      
      // Optionally switch to login
      if (typeof switchToLogin === 'function') {
        switchToLogin();
      }

      return response.data; // ← FIXED: Return actual backend response
    } catch (error) {
      const errorData = error.response?.data || {};
      console.error("Backend registration error:", errorData); // ← ADD THIS for debugging
      setErrors(errorData || { message: 'Registration failed' });
      toast.error(errorData.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        await api.post('logout/', { 
          refresh_token: refreshToken  // Match backend expected key
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).catch((error) => {
          console.error('Logout API error:', error);
          // Proceed with client-side cleanup even if server fails
        });
      }
      
      // Client-side cleanup
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('temp_token');
      
      // Clear cookies
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      });
      
      navigate('/');
      toast.success('Logged out successfully');
      
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
      window.location.reload(); // Ensure complete state reset
    }
  };
  return { 
    login, 
    register, 
    logout, 
    errors, 
    isLoading, 
    isLoggingOut,
    setErrors 
  };
};

export default useAuth;