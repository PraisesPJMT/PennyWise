import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  // useEffect,
} from 'react';

import { Link } from 'react-router-dom';
import { validateLogin } from '../../utilities/helper';
import { LogFormDataType, LogDataType } from '../../utilities/types';
import { initialLogFormData } from '../../utilities/variables';

import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import InputField from '../input-field/InputField';

import './LoginForm.scss';

const LoginForm: FC<{}> = () => {
  const [logData, setLogData] = useState<LogFormDataType>(initialLogFormData);
  const [logDataErr, setLogDataErr] =
    useState<LogDataType>(initialLogFormData);

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  const handeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setInit(false);
    setLogDataErr(initialLogFormData);

    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      setLogData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
      return;
    }

    setLogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInit(false);

    if (validateLogin(logData, setLogDataErr)) {
      console.log('Submitted: ', logData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Account</h1>

      {error.length > 0 ? <p className="error">{error}</p> : null}

      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={logData.email}
        error={logDataErr.email}
        changeAction={handeChange}
        required={true}
      />

      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={logData.password}
        error={logDataErr.password}
        changeAction={handeChange}
        required={true}
      />

      <div>
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={logData.rememberMe}
          checkAction={handeChange}
        />
      </div>

      <div>
        <Button
          type="submit"
          varient="fill"
          label="Login"
          clickAction={() => {}}
          length="long"
        />
      </div>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
