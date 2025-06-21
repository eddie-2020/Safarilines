import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
    token: ''
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { resetPassword, isLoading, errors } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await resetPassword({
      ...formData,
      email: state?.email
    });
    
    if (success) {
      navigate('/login', { state: { passwordResetSuccess: true } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h3 className={styles.title}>Reset Password</h3>
      
      <div className={styles.formGroup}>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          value={formData.confirm_password}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.confirm_password && <span className={styles.error}>{errors.confirm_password}</span>}
      </div>
      
      <input
        type="hidden"
        name="token"
        value={formData.token}
      />
      
      <button 
        type="submit" 
        className={styles.submitBtn}
        disabled={isLoading}
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;