import { useState } from 'react';
import AuthTabs from '../components/auth/AuthTabs';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default AuthPage;