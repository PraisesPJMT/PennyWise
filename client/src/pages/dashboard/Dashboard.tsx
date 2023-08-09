import { useEffect } from 'react';
import { useAuth } from '../../store/auth';
import Splash from '../splash/Splash';
import { Outlet } from 'react-router-dom';

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
    <>
      <Outlet />
    </>
  );
};

export default Dashboard;
