import { useEffect } from 'react';
import { useAuth } from '../../store/auth';
import Splash from '../splash/Splash';

const Dashboard: React.FC<{}> = () => {
  const logout = useAuth((state) => state.logout);
  const verify = useAuth((state) => state.verify);

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  useEffect(() => {
    const verifyUser = () => verify();
    verifyUser();
  }, []);

  if (!isAuthenticated) {
    logout();

    return <Splash />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        User: {user.first_name} {user.last_name}
      </p>
    </div>
  );
};

export default Dashboard;
