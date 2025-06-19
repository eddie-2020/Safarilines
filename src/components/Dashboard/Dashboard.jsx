import useAuth from '../../hooks/useAuth';
import styles from './Dashboard.module.css';

const Dashboard = ({ userData }) => {
  const { logout } = useAuth();

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.content}>
        <p className={styles.welcomeMessage}>You have successfully logged in.</p>
        <div className={styles.userInfo}>
          <h3>User Information</h3>
          <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
        <button onClick={logout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;