import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BiX } from 'react-icons/bi';

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
import { GroupType } from '../../utilities/types';

import InputField from '../input-field/InputField';
import MessageField from '../message-field/MessageField';
import SelectIcon from '../select-icon/SelectIcon';
import Button from '../button/Button';

import './CreateExpenseModal.scss';

interface CreateExpenseModalProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  group: GroupType;
}

const CreateExpenseModal: FC<CreateExpenseModalProps> = ({
  group,
  setModalState,
  modalState,
}) => {
  const [expenseData, setExpenseData] =
    useState<typeof inititalExpenseData>(inititalExpenseData);
  const [expenseDataErr, setExpenseDataErr] = useState<
    typeof inititalExpenseErrData
  >(inititalExpenseErrData);
  const [groupId, setGroupId] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  const setNotice = useNotice((state) => state.setNotice);
  const createExpense = useStore((state) => state.createExpense);
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
    setExpenseData(inititalExpenseData);
    setExpenseDataErr(inititalExpenseErrData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInit(false);

    if (validateExpense(expenseData, setExpenseDataErr)) {
      console.log('Expense Data: ', expenseData);
      createExpense(groupId, expenseData);
      setInit(true);
    }
  };

  const handleCanel = () => {
    resetForm();
    closeModal();
  };

  const setGroupData = () => {
    if (group) {
      const { group_id } = group;
      setGroupId(group_id);
    }
  };

  useEffect(() => {
    setGroupData();
  }, [group]);

  useEffect(() => {
    if (init && status === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      closeModal();
      resetForm();
      setInit(false);
    }

    if (init && storeError) {
      setError(message);
      setNotice({ type: NoticeType.SUCCESS, message });
    }
  }, [status, storeError, message]);

  useEffect(() => {
    setGroupData();
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
            <h1>Create Expense</h1>

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
                label={status === Status.LOADING ? 'Creating...' : 'Create'}
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

export default CreateExpenseModal;
