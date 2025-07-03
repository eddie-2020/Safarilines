import React from 'react';
import styles from './EmailVerificationPage.module.css';
import EmailVerificationForm from '../../components/auth/EmailVerificationForm';

const EmailVerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (otp) => {
    try {
      await api.post('/auth/verify-email/', { email, otp });
      navigate('/login', { state: { email } });
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <EmailVerificationForm email={email} onVerify={handleVerify} />
    </div>
  );
};

export default EmailVerificationPage;