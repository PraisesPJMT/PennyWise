import { FC } from 'react';

import CreateGroupForm from '../../components/create-group-form/CreateGroupForm';

import './CreateGroup.scss';

const CreateGroup: FC<{}> = ({}) => {
  return (
    <>
      <div id="group-wrap">
        <div className="content">
          <CreateGroupForm />
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
