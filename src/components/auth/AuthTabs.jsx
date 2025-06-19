import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './AuthTabs.module.css';

const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'register' ? styles.active : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'login' ? styles.active : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
      </div>

      {activeTab === 'register' ? <RegisterForm /> : <LoginForm />}
    </>
  );
};

export default AuthTabs;