import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Notice, useNotice } from '../../store/notice';
import { BiX } from 'react-icons/bi';

import './Notice.scss';

const INTERVAL = 5;

const NoticeCard: FC<Notice> = ({ id, type, message }) => {
  const [count, setCount] = useState<number>(INTERVAL);
  const removeNotice = useNotice((state) => state.removeNotice);
  const timerRef = useRef();

  const handleRemove = () => {
    removeNotice(id);
  };

  const closeNotice = () => {
    handleRemove();
    setCount(0);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (!count) {
      closeNotice();
    }

    if (count === INTERVAL) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
  }, [count]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  if (!count) return null;

  return (
    <>
      <div className={`notice-card ${type}`}>
        <button type="button" onClick={handleRemove}>
          <BiX />
        </button>
        <div>{message}</div>
      </div>
    </>
  );
};

const NoticeModal: FC<{}> = () => {
  const notices = useNotice((state) => state.notice);

  if (notices.length < 1) return null;

  return ReactDOM.createPortal(
    <>
      <div id="notice-wrap">
        {notices.map((not) => (
          <NoticeCard
            key={not.id}
            id={not.id}
            type={not.type}
            message={not.message}
          />
        ))}
      </div>
    </>,
    document.getElementById('notice') as Element
  );
};

export default NoticeModal;
