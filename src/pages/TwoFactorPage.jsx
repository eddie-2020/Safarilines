import React from 'react';
import styles from './TwoFactorPage.module.css';
import TwoFactorForm from '../components/auth/TwoFactorForm';

const TwoFactorPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <TwoFactorForm email={email} onSuccess={handleSuccess} />
    </div>
  );
};

export default TwoFactorPage;