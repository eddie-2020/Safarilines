import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import AuthTabs from '../components/auth/AuthTabs';
import styles from './AuthPage.module.css';

const AuthPage = ({ defaultTab = 'login' }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isForgotPassword = location.pathname === '/forgot-password';

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        {isForgotPassword ? (
          <ForgotPasswordForm />
        ) : (
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
