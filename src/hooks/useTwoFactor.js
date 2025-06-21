// hooks/useTwoFactor.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const useTwoFactor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backupCodes, setBackupCodes] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
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

  const setup2FA = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/auth/two-factor/setup/');
      setQrCodeData({
        uri: response.data.provisioning_uri,
        secret: response.data.totp_secret
      });
      setBackupCodes(response.data.backup_codes);
      return response.data;
    } catch (error) {
      toast.error('Failed to setup 2FA');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirm2FASetup = async (code) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/two-factor/confirm/', {
        code,
        enable_2fa: true
      });
      toast.success('2FA setup completed successfully');
      return response.data;
    } catch (error) {
      const errorData = error.response?.data || {};
      setErrors(errorData.errors || { message: '2FA confirmation failed' });
      toast.error(errorData.message || 'Invalid verification code');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewBackupCodes = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/two-factor/backup-codes/', {
        generate_new: true
      });
      setBackupCodes(response.data.backup_codes);
      toast.success('New backup codes generated');
      return response.data;
    } catch (error) {
      toast.error('Failed to generate new backup codes');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    errors, 
    qrCodeData,
    backupCodes,
    verify2FA, 
    setup2FA,
    confirm2FASetup,
    generateNewBackupCodes
  };
};

export default useTwoFactor;