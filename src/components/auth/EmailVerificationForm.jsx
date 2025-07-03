import React, { useState } from 'react';
import styles from './EmailVerificationForm.module.css';

const EmailVerificationForm = ({ email, onVerify }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <div className={styles.container}>
      <h2>Verify Your Email</h2>
      <p>We've sent a verification code to {email}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
        />
        <button type="submit">Verify</button>
      </form>
      <button 
        onClick={() => console.log('Resend code')} 
        className={styles.resendButton}
      >
        Resend Code
      </button>
    </div>
  );
};

export default EmailVerificationForm;