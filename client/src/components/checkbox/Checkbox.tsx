import { ChangeEvent, FC } from 'react';

import './Checkbox.scss';

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  checkAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, name, checked, checkAction }) => {
  return (
    <label className="check-field">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={checkAction}
      />

      <span className={checked ? 'checked' : ''}>{checked ? '✔' : null}</span>
      {label}
    </label>
  );
};

export default Checkbox;
