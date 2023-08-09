import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BiX } from 'react-icons/bi';
// import { useNavigate } from 'react-router-dom';

import { useNotice } from '../../store/notice';
import { useStore } from '../../store/store';
import {
  // initialGroup,
  inititalExpenseData,
  inititalExpenseErrData,
  NoticeType,
  Status,
} from '../../utilities/variables';
import { validateExpense } from '../../utilities/helper';
import {
  ExpenseFormDataType,
  ExpenseFormErrDataType,
  ExpenseType,
  GroupType,
} from '../../utilities/types';

import InputField from '../input-field/InputField';
import MessageField from '../message-field/MessageField';
// import SelectTheme from '../select-theme/SelectTheme';
import SelectIcon from '../select-icon/SelectIcon';
import Button from '../button/Button';

import './EditExpenseModal.scss';

interface EditExpenseModalInterface {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  group: GroupType;
  expense: ExpenseType;
}

const EditExpenseModal: FC<EditExpenseModalInterface> = ({
  modalState,
  setModalState,
  group,
  expense,
}) => {
  const [expenseData, setExpenseData] =
    useState<ExpenseFormDataType>(inititalExpenseData);
  const [groupId, setGroupId] = useState<string>('');
  const [expenseId, setExpenseId] = useState<string>('');
  const [expenseDataErr, setExpenseDataErr] = useState<ExpenseFormErrDataType>(
    inititalExpenseErrData
  );

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  //   const navigate = useNavigate();

  const setNotice = useNotice((state) => state.setNotice);
  const editExpense = useStore((state) => state.editExpense);
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
    setExpenseDataErr(inititalExpenseErrData);

    const { name, value } = event.target;

    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setError('');
    setInit(false);
    // setExpenseData(inititalExpenseData);
    setExpenseDataErr(inititalExpenseErrData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInit(false);

    if (validateExpense(expenseData, setExpenseDataErr)) {
      //   console.log('Group Data: ', expenseData);
      editExpense(groupId, expenseId, expenseData);
      setInit(true);
    }
  };

  const handleCanel = () => {
    resetForm();
    closeModal();
  };

  const setForm = () => {
    if (group) {
      const { group_id } = group;
      const { expense_id, title, icon, description, amount } = expense;

      setExpenseData({ title, icon, description, amount });
      setGroupId(group_id);
      setExpenseId(expense_id);
    }
  };

  useEffect(() => {
    setForm();
  }, [group, expense]);

  useEffect(() => {
    if (init && status === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      //   navigate('/groups');
      closeModal();
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
            <h1>Edit Expense</h1>

            {error.length > 0 ? <p className="error">{error}</p> : null}

            <div className="col">
              <InputField
                name="title"
                placeholder="Expense *"
                value={expenseData.title}
                error={expenseDataErr.title}
                changeAction={handeChange}
                required={true}
              />

              <InputField
                name="amount"
                type="number"
                placeholder="Amount *"
                value={expenseData.amount}
                error={expenseDataErr.amount}
                changeAction={handeChange}
                required={true}
              />
            </div>

            <MessageField
              name="description"
              placeholder="Description"
              value={expenseData.description}
              error={expenseDataErr.description}
              changeAction={handeChange}
            />

            <SelectIcon
              name="icon"
              placeholder="Select Expense Icon"
              value={expenseData.icon}
              theme={group.theme}
              error={expenseDataErr.icon}
              changeAction={handeChange}
            />

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

export default EditExpenseModal;
