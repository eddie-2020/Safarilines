import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import useAuth from '../../hooks/useAuth';
import styles from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const { requestPasswordReset, isLoading, errors } = useAuth();

  const onReCAPTCHAChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await requestPasswordReset({
      email,
      recaptcha_token: recaptchaToken
    });
    
    if (success) {
      navigate('/reset-password', { state: { email } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h3 className={styles.title}>Forgot Password</h3>
      <p className={styles.subtitle}>Enter your email to receive a reset link</p>
      
      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
          required
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />
        {errors.recaptcha_token && <span className={styles.error}>{errors.recaptcha_token}</span>}
      </div>
      
      <button 
        type="submit" 
        className={styles.submitBtn}
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;