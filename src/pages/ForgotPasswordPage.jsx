import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './ForgotPasswordPage.module.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { forgotPassword, isLoading, errors, message } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h3 className={styles.title}>Forgot Password</h3>
        <p className={styles.description}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            required
            autoFocus
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        
        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {message && (
          <div className={styles.successMessage}>
            {message}
          </div>
        )}

        <div className={styles.backToLogin}>
          <a href="/login" className={styles.backLink}>
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;