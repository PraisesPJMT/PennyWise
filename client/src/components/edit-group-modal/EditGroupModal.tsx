import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BiX } from 'react-icons/bi';
// import { useNavigate } from 'react-router-dom';

import { useNotice } from '../../store/notice';
import { useStore } from '../../store/store';
import {
  // initialGroup,
  inititalGroupData,
  inititalGroupDataErr,
  NoticeType,
  Status,
} from '../../utilities/variables';
import { validateGroup } from '../../utilities/helper';
import { GroupType } from '../../utilities/types';

import InputField from '../input-field/InputField';
import MessageField from '../message-field/MessageField';
import SelectTheme from '../select-theme/SelectTheme';
import SelectIcon from '../select-icon/SelectIcon';
import Button from '../button/Button';

import './EditGroupModal.scss';

interface EditGroupModalInterface {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  group: GroupType;
}

const EditGroupModal: FC<EditGroupModalInterface> = ({
  modalState,
  setModalState,
  group,
}) => {
  const [groupData, setGroupData] =
    useState<typeof inititalGroupData>(inititalGroupData);
  const [groupId, setGroupId] = useState<string>('');
  const [groupDataErr, setGroupDataErr] =
    useState<typeof inititalGroupData>(inititalGroupDataErr);

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  //   const navigate = useNavigate();

  const setNotice = useNotice((state) => state.setNotice);
  const editGroup = useStore((state) => state.editGroup);
  const status = useStore((state) => state.status);
  const storeError = useStore((state) => state.error);
  const message = useStore((state) => state.message);

  const closeModal = () => setModalState(false);

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
    // setGroupData(inititalGroupData);
    setGroupDataErr(inititalGroupDataErr);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInit(false);

    if (validateGroup(groupData, setGroupDataErr)) {
      //   console.log('Group Data: ', groupData);
      editGroup(groupId, groupData);
      setInit(true);
    }
  };

  const handleCanel = () => {
    resetForm();
    closeModal();
  };

  const setForm = () => {
    if (group) {
      const { group_id, title, description, icon, theme } = group;
      setGroupData({ title, icon, description, theme });
      setGroupId(group_id);
    }
  };

  useEffect(() => {
    setForm();
  }, [group]);

  useEffect(() => {
    if (init && status === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      //   navigate('/groups');
      closeModal();
      setInit(false);
    }

    if (init && storeError) {
      setError(message);
      setNotice({ type: NoticeType.ERROR, message });
    }
  }, [status, storeError, message]);

  useEffect(() => {
    setForm();
    return () => resetForm();
  }, []);

  if (!modalState) return null;

  return ReactDOM.createPortal(
    <>
      <div id="modal-wrap">
        <div className="content">
          <button className="close" type="button" onClick={closeModal}>
            <BiX />
          </button>

          <form id="edit-group" onSubmit={handleSubmit}>
            <h1>Edit Group</h1>

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
              <Button
                varient="shell"
                label="Cancel"
                clickAction={handleCanel}
              />
              <Button
                type="submit"
                varient="fill"
                label={status === Status.LOADING ? 'Saving...' : 'Save'}
                clickAction={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal') as Element
  );
};

export default EditGroupModal;
