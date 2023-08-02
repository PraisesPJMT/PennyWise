import { FC } from 'react';

import './Groups.scss';
import AppLink from '../../components/app-link/AppLink';

const Groups: FC<{}> = () => {
  return (
    <>
      <div id="groups">
        <h1>Groups</h1>
        <AppLink link="/groups/new" label="Create Group" />
      </div>
    </>
  );
};

export default Groups;
