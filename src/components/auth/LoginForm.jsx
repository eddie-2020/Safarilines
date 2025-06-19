import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useAuth from '../../hooks/useAuth'; 
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    recaptcha_token: ''
  });

  const recaptchaRef = useRef();
  const { login, errors, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onReCAPTCHAChange = (token) => {
    setFormData({ ...formData, recaptcha_token: token });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h3 className={styles.title}>Login</h3>
      
      <div className={styles.formGroup}>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={formData.username}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.username && <span className={styles.error}>{errors.username}</span>}
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
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
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
    </form>
  );
};

export default LoginForm;