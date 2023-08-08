import { FC, useEffect, useState } from 'react';
import {
  NoticeType,
  Status,
  initialExpense,
  initialGroup,
} from '../../utilities/variables';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store/store';
import { useNotice } from '../../store/notice';
import { ExpenseType, GroupType } from '../../utilities/types';

import EditGroupModal from '../../components/edit-group-modal/EditGroupModal';
import CreateExpenseModal from '../../components/create-expense-form/CreateExpenseModal';
import EditExpenseModal from '../../components/edit-expense-modal/EditExpenseModal';

const GroupDetails: FC<{}> = () => {
  const [group, setGroup] = useState<GroupType>(initialGroup);
  const [expense, setExpense] = useState<ExpenseType>(initialExpense);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [createExpenseModal, setCreateExpenseModal] = useState(false);
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

  const handleExpenseEdit = (expense: ExpenseType) => {
    setEditGroupModal(false);
    setExpense(expense);
    setEditExpenseModal(true);
    setInitDel(false);
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
        <button type="button" onClick={() => setEditGroupModal(true)}>
          Edit
        </button>
        <button type="button" onClick={handleGroupDel}>
          Delete
        </button>
        <button type="button" onClick={() => setCreateExpenseModal(true)}>
          Create Expense
        </button>
      </div>

      <br />
      <br />

      <div>
        <hr />
        {group.expenses.map((expense) => (
          <div key={expense.expense_id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <p>
                {expense.title}
                <br />
                {expense.description}
                <br />
                {expense.icon}
                <br />
                {expense.amount}
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => handleExpenseEdit(expense)}
                >
                  Edit
                </button>
                <br />
                <button type="button">Delete</button>
              </div>
            </div>

            <hr />
          </div>
        ))}
      </div>
      <EditGroupModal
        modalState={editGroupModal}
        setModalState={setEditGroupModal}
        group={group}
      />

      <CreateExpenseModal
        modalState={createExpenseModal}
        setModalState={setCreateExpenseModal}
        group={group}
      />

      <EditExpenseModal
        modalState={editExpenseModal}
        setModalState={setEditExpenseModal}
        group={group}
        expense={expense}
      />
    </>
  );
};

export default GroupDetails;
