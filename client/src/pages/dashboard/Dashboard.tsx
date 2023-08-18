import { useEffect } from 'react';
import { useAuth } from '../../store/auth';
import { Outlet } from 'react-router-dom';
import Splash from '../splash/Splash';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

import './Dashboard.scss';

const Dashboard: React.FC<{}> = () => {
  const logout = useAuth((state) => state.logout);
  const verify = useAuth((state) => state.verify);

  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  useEffect(() => {
    const verifyUser = () => verify();
    verifyUser();
  }, []);

  if (!isAuthenticated) {
    logout();

    return <Splash />;
  }

  return (
    <div id="dashboard">
      <Header />
      <div id="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
