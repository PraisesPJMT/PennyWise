import { FC, useEffect } from 'react';

import { useStore } from '../../store/store';

import AppLink from '../../components/app-link/AppLink';

import './Groups.scss';
import { Link } from 'react-router-dom';

const Groups: FC<{}> = () => {
  const fetchGroups = useStore((state) => state.fetchGroups);
  const groups = useStore((state) => state.groups);

  const getGroups = () => fetchGroups();

  useEffect(() => {
    getGroups();
  }, []);

  // console.log('Groups: ', groups);

  return (
    <>
      <div id="groups">
        <h1>Groups</h1>
        <AppLink link="/groups/new" label="Create Group" />

        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {groups.map((group) => (
            <Link key={group.group_id} to={`/groups/${group.group_id}`}>
              <p>{group.title}</p>
              <p>{group.description}</p>
              {/* <button type="button">Edit</button> */}
              {/* <button type="button">Delete</button> */}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Groups;
