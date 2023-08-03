import { FC, useEffect, useState } from 'react';
import { NoticeType, Status, initialGroup } from '../../utilities/variables';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store/store';

import EditGroupModal from '../../components/edit-group-modal/EditGroupModal';
import { useNotice } from '../../store/notice';

const GroupDetails: FC<{}> = () => {
  const [group, setGroup] = useState<typeof initialGroup>(initialGroup);
  const [editModal, setEditModal] = useState(false);
  const [initDel, setInitDel] = useState(false);

  const { groupId } = useParams();
  const navigate = useNavigate();

  const setNotice = useNotice((state) => state.setNotice);
  const fetchGroup = useStore((state) => state.fetchGroup);
  const deleteGroup = useStore((state) => state.deleteGroup);
  const fetchedGroup = useStore((state) => state.group);
  const storeStatus = useStore((state) => state.status);
  const message = useStore((state) => state.message);

  const handleGroupDel = () => {
    deleteGroup(group.group_id);
    setInitDel(true);
  };

  useEffect(() => {
    if (initDel && storeStatus === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      navigate('/groups');
    }
  }, [initDel, storeStatus, message]);

  useEffect(() => {
    if (fetchedGroup) setGroup(fetchedGroup);
  }, [fetchedGroup]);

  useEffect(() => {
    if (groupId) fetchGroup(groupId);
  }, []);

  return (
    <>
      <div>
        <h1>Group</h1>
        <p>{group.title}</p>
        <p>{group.description}</p>
        <p>{new Date(group.createdAt).toDateString()}</p>
        <button type="button" onClick={() => setEditModal(true)}>
          Edit
        </button>
        <button type="button" onClick={handleGroupDel}>
          Delete
        </button>
      </div>
      <EditGroupModal
        modalState={editModal}
        setModalState={setEditModal}
        group={group}
      />
    </>
  );
};

export default GroupDetails;
