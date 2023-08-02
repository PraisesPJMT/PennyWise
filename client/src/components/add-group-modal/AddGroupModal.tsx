import { FC } from 'react';
import ReactDOM from 'react-dom';
import { BiX } from 'react-icons/bi';

import AddGroupForm from '../add-group-form/AddGroupForm';

import './AddGroupModal.scss';

interface AddGroupModalInterface {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

const AddGroupModal: FC<AddGroupModalInterface> = ({
  modalState,
  setModalState,
}) => {
  const closeModal = () => setModalState(false);

  if (!modalState) return null;

  return ReactDOM.createPortal(
    <>
      <div id="modal-wrap">
        <div className="content">
          <button className="close" type="button" onClick={closeModal}>
            <BiX />
          </button>
          <AddGroupForm closeModal={closeModal} />
        </div>
      </div>
    </>,
    document.getElementById('modal') as Element
  );
};

export default AddGroupModal;
