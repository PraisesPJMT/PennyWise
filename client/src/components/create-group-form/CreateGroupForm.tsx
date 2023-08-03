import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotice } from '../../store/notice';
import { useStore } from '../../store/store';
import {
  inititalGroupData,
  inititalGroupDataErr,
  NoticeType,
  Status,
} from '../../utilities/variables';
import { validateGroup } from '../../utilities/helper';

import InputField from '../input-field/InputField';
import MessageField from '../message-field/MessageField';
import SelectTheme from '../select-theme/SelectTheme';
import SelectIcon from '../select-icon/SelectIcon';
import Button from '../button/Button';

import './CreateGroupForm.scss';

const CreateGroupForm: FC<{}> = () => {
  const [groupData, setGroupData] =
    useState<typeof inititalGroupData>(inititalGroupData);
  const [groupDataErr, setGroupDataErr] =
    useState<typeof inititalGroupData>(inititalGroupDataErr);

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  const navigate = useNavigate();

  const setNotice = useNotice((state) => state.setNotice);
  const createGroup = useStore((state) => state.createGroup);
  const status = useStore((state) => state.status);
  const storeError = useStore((state) => state.error);
  const message = useStore((state) => state.message);

  const handeChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setError('');
    setInit(false);
    setGroupDataErr(inititalGroupDataErr);

    const { name, value } = event.target;

    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setError('');
    setInit(false);
    setGroupData(inititalGroupData);
    setGroupDataErr(inititalGroupDataErr);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInit(false);

    if (validateGroup(groupData, setGroupDataErr)) {
      console.log('Group Data: ', groupData);
      createGroup(groupData);
      setInit(true);
    }
  };

  const handleCanel = () => {
    resetForm();
    navigate(-1);
  };

  useEffect(() => {
    if (init && status === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      navigate('/groups');
    }

    if (init && storeError) {
      setError(message);
      setNotice({ type: NoticeType.SUCCESS, message });
    }
  }, [status, storeError, message]);

  useEffect(() => {
    return () => resetForm();
  }, []);

  return (
    <form id="add-group" onSubmit={handleSubmit}>
      <h1>Create Group</h1>

      {error.length > 0 ? <p className="error">{error}</p> : null}

      <InputField
        name="title"
        placeholder="Group title *"
        value={groupData.title}
        error={groupDataErr.title}
        changeAction={handeChange}
        required={true}
      />

      <MessageField
        name="description"
        placeholder="Group description"
        value={groupData.description}
        error={groupDataErr.description}
        changeAction={handeChange}
      />

      <div className="col">
        <SelectIcon
          name="icon"
          placeholder="Select Group Icon"
          value={groupData.icon}
          theme={groupData.theme}
          error={groupDataErr.icon}
          changeAction={handeChange}
        />

        <SelectTheme
          name="theme"
          placeholder="Select Group Theme"
          value={groupData.theme}
          error={groupDataErr.theme}
          changeAction={handeChange}
        />
      </div>

      <div className="btn-wrap">
        <Button varient="shell" label="Cancel" clickAction={handleCanel} />
        <Button
          type="submit"
          varient="fill"
          label={status === Status.LOADING ? 'Creating...' : 'Create'}
          clickAction={() => {}}
        />
      </div>
    </form>
  );
};

export default CreateGroupForm;
