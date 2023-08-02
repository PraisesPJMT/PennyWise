import { FC } from 'react';

import { useAuth } from '../../store/auth';

import AppLink from '../../components/app-link/AppLink';

const Overview: FC<{}> = () => {
  const user = useAuth((state) => state.user);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        User: {user.first_name} {user.last_name}
      </p>
      <AppLink link="/groups" label="Groups" />
    </div>
  );
};

export default Overview;
