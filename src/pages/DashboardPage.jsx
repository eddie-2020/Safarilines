import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import { getUserData } from '../services/api';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (!localStorage.getItem('token')) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return <Dashboard userData={userData} />;
};

export default DashboardPage;