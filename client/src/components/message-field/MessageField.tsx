import { ChangeEvent, FC } from 'react';

import './MessageField.scss';

interface MessageFieldProps {
  name: string;
  placeholder: string;
  value: string;
  error: string;
  rows?: number;
  required?: boolean;
  changeAction: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageField: FC<MessageFieldProps> = ({
  name,
  placeholder,
  value,
  error,
  required = false,
  rows = 3,
  changeAction,
}) => {
  return (
    <div className="field">
      <label className={error.length > 0 ? 'err' : ''}>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={changeAction}
          required={required}
          rows={rows}
        />
      </label>
      {error.length > 0 ? <p className="error">{error}</p> : null}
    </div>
  );
};

export default MessageField;
