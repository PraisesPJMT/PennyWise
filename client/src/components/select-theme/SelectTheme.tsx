import { ChangeEvent, FC } from 'react';

import './SelectTheme.scss';
import { THEMES } from '../../utilities/variables';

interface SelectThemeProps {
  name: string;
  placeholder: string;
  value: string;
  error: string;
  changeAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SelectTheme: FC<SelectThemeProps> = ({
  name,
  placeholder,
  value,
  error,
  changeAction,
}) => {
  return (
    <div className="select-field">
      <div className={error.length > 0 ? 'label err' : 'label'}>
        <p className="placeholder">{placeholder}</p>

        <div className="label-wrap">
          {THEMES.map((theme) => (
            <div key={theme}>
              <label>
                <input
                  type="radio"
                  name={name}
                  value={theme}
                  checked={value === theme}
                  onChange={changeAction}
                />

                <div className="theme-box" style={{ background: theme }} />
              </label>
            </div>
          ))}
        </div>
      </div>
      {error.length > 0 ? <p className="error">{error}</p> : null}
    </div>
  );
};

export default SelectTheme;
