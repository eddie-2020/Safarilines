import { useEffect, useState } from 'react';
import { getUserData } from '../services/api';
import useAuth  from '../hooks/useAuth';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, isLoggingOut } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p>Loading your dashboard...</p>
    </div>
  );

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Welcome, {userData?.username}</h1>
        <button 
          onClick={logout}
          disabled={isLoggingOut}
          className={styles.logoutButton}
        >
          {isLoggingOut ? 'Signing out...' : 'Logout'}
        </button>
      </div>
      
      <div className={styles.content}>
        {/* Render other user data */}
        {userData?.email && <p>Email: {userData.email}</p>}
        {userData?.date_joined && (
          <p>Member since: {new Date(userData.date_joined).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;