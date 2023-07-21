import { FC, ReactNode } from 'react';

import './Button.scss';

interface ButtonProps {
  varient?: 'shell' | 'fill';
  type?: 'button' | 'submit' | 'reset' | undefined;
  length?: 'long';
  label: string | ReactNode;
  clickAction: () => void;
}

const Button: FC<ButtonProps> = ({
  varient,
  type = 'button',
  label,
  clickAction,
  length,
}) => {
  return (
    <button
      type={type}
      className={`button ${varient ? varient : ''} ${length ? length : ''}`}
      onClick={clickAction}
    >
      {label}
    </button>
  );
};

export default Button;
