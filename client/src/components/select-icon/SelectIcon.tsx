import { ChangeEvent, FC } from 'react';
// import { BsFillCarFrontFill } from 'react-icons/bs';

import './SelectIcon.scss';
import { ICONS } from '../../utilities/variables';

// const ICONS = [
//   { code: 'IC01', icon: BsFillCarFrontFill },
//   { code: 'IC02', icon: BsFillCarFrontFill },
//   { code: 'IC03', icon: BsFillCarFrontFill },
//   { code: 'IC04', icon: BsFillCarFrontFill },
//   { code: 'IC05', icon: BsFillCarFrontFill },
// ];

interface SelectIconProps {
  name: string;
  theme: string;
  placeholder: string;
  value: string;
  error: string;
  changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SelectIcon: FC<SelectIconProps> = ({
  name,
  placeholder,
  theme,
  value,
  error,
  changeAction,
}) => {
  return (
    <div className="select-field">
      <div className={error.length > 0 ? 'label err' : 'label'}>
        <p className="placeholder">{placeholder}</p>

        <div className="label-wrap">
          {ICONS.map((icon) => (
            <div key={icon.code}>
              <label>
                <input
                  type="radio"
                  name={name}
                  value={icon.code}
                  checked={value === icon.code}
                  onChange={changeAction}
                />

                <div className="icon-box" style={{ color: theme }}>
                  <icon.icon />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      {error.length > 0 ? <p className="error">{error}</p> : null}
    </div>
  );
};

export default SelectIcon;
