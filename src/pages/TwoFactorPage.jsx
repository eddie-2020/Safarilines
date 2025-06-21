import TwoFactorForm from '../components/auth/TwoFactorForm';
import styles from './TwoFactorPage.module.css';

const TwoFactorPage = () => {
  return (
    <div className={styles.twoFactorPage}>
      <div className={styles.authContainer}>
        <TwoFactorForm />
      </div>
    </div>
  );
};

export default TwoFactorPage;