import { ChangeEvent, FC } from 'react';

import './InputField.scss';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  value: string;
  error: string;
  required?: boolean;
  changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  type = 'text',
  name,
  placeholder,
  value,
  error,
  required = false,
  changeAction,
}) => {
  return (
    <div className="field">
      <label className={error.length > 0 ? 'err' : ''}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={changeAction}
          required={required}
        />
      </label>
      {error.length > 0 ? <p className="error">{error}</p> : null}
    </div>
  );
};

export default InputField;
