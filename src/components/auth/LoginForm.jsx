import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; 
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    recaptcha_token: ''
  });

  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const { login, errors, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onReCAPTCHAChange = (token) => {
    setFormData({ ...formData, recaptcha_token: token });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.recaptcha_token) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    try {
      const result = await login(formData);
      
      if (result?.requires_2fa) {
        // Store temporary token if provided
        if (result.temp_token) {
          localStorage.setItem('temp_token', result.temp_token);
        }
        // Redirect to 2FA page with email
        navigate('/two-factor', { 
          state: { 
            email: result.email || formData.identifier.includes('@') ? formData.identifier : '',
            requires_2fa: true 
          } 
        });
      } else if (result?.tokens) {
        // Successful login without 2FA
        localStorage.setItem('accessToken', result.tokens.access);
        localStorage.setItem('refreshToken', result.tokens.refresh);
        navigate('/dashboard');
      }
    } catch (error) {
      // Specific error for email verification
      if (error.response?.data?.code === 'email_verification_required') {
        navigate('/verify-email', { 
          state: { 
            email: formData.identifier.includes('@') ? formData.identifier : error.response.data.email 
          } 
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h3 className={styles.title}>Login</h3>
      
      <div className={styles.formGroup}>
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={formData.identifier}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.identifier && <span className={styles.error}>{errors.identifier}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
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
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div className={styles.links}>
        <button 
          type="button" 
          className={styles.linkBtn}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;