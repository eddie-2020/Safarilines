import { useLocation } from 'react-router-dom';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import styles from './ResetPasswordPage.module.css'; 

const ResetPasswordPage = () => {
  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Reset Your Password</h1>
        <p className={styles.subtitle}>Enter your new password below</p>
        <ResetPasswordForm email={state?.email} token={state?.token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;