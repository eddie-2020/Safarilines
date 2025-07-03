import React, { useState } from 'react';
import styles from './TwoFactorForm.module.css';
import useTwoFactor from '../../hooks/useTwoFactor';

const TwoFactorForm = ({ email, onSuccess }) => {
  const [code, setCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const { isLoading, errors, verify2FA } = useTwoFactor();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verify2FA({ code, email });
    if (success) onSuccess();
  };

  return (
    <div className={styles.container}>
      <h2>Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="code">
            {useBackupCode ? 'Backup Code' : 'Verification Code'}
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={useBackupCode ? 'Enter 8-digit backup code' : 'Enter 6-digit code'}
            maxLength={useBackupCode ? 8 : 6}
            required
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>
        
        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
        
        <button
          type="button"
          onClick={() => setUseBackupCode(!useBackupCode)}
          className={styles.toggleButton}
        >
          {useBackupCode ? 'Use Authenticator App' : 'Use Backup Code'}
        </button>
      </form>
    </div>
  );
};

export default TwoFactorForm;