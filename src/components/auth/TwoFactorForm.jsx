import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTwoFactor from '../../hooks/useTwoFactor';
import styles from './TwoFactorForm.module.css';

const TwoFactorForm = () => {
  const [code, setCode] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verify2FA, isLoading, errors } = useTwoFactor();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verify2FA({
      email: state?.email,
      verification_code: code
    });
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h3 className={styles.title}>Two-Factor Authentication</h3>
      <p className={styles.subtitle}>Enter the 6-digit code from your authenticator app</p>
      
      <div className={styles.formGroup}>
        <input
          type="text"
          name="code"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.formInput}
          required
          autoFocus
        />
        {errors.verification_code && <span className={styles.error}>{errors.verification_code}</span>}
      </div>
      
      <button 
        type="submit" 
        className={styles.submitBtn}
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>

      <div className={styles.links}>
        <p className={styles.helpText}>
          Can't access your authenticator app? Use a backup code.
        </p>
      </div>
    </form>
  );
};

export default TwoFactorForm;