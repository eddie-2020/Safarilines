import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const useAuth = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      return true;
    } catch (error) {
      setErrors(error.response?.data?.errors || { message: 'Login failed. Please try again.' });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      return true;
    } catch (error) {
      setErrors(error.response?.data?.errors || { message: 'Registration failed. Please try again.' });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return { login, register, logout, errors, isLoading, setErrors };
};

export default useAuth;