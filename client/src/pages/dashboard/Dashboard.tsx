import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import Splash from '../splash/Splash';
import AddGroupModal from '../../components/add-group-modal/AddGroupModal';

const Dashboard: React.FC<{}> = () => {
  const [isGroupModal, SetIsGroupModal] = useState(false);
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
    <>
      <div>
        <h1>Dashboard</h1>
        <p>
          User: {user.first_name} {user.last_name}
        </p>
        <button type="button" onClick={() => SetIsGroupModal(true)}>
          Add Group
        </button>
      </div>
      <AddGroupModal
        modalState={isGroupModal}
        setModalState={SetIsGroupModal}
      />
    </>
  );
};

export default Dashboard;
