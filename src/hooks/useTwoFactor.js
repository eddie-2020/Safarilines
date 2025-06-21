// hooks/useTwoFactor.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const useTwoFactor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const verify2FA = async (data) => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await api.post('/auth/two-factor/verify/', {
        ...data,
        temp_token: localStorage.getItem('temp_token')
      });
      
      localStorage.removeItem('temp_token');
      localStorage.setItem('accessToken', response.data.tokens.access);
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
      
      toast.success('2FA verification successful');
      navigate('/dashboard');
      return true;
    } catch (error) {
      const errorData = error.response?.data || {};
      setErrors(errorData.errors || { message: '2FA verification failed' });
      toast.error(errorData.message || '2FA verification failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errors, verify2FA };
};

export default useTwoFactor;