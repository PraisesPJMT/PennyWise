import { ChangeEvent, FC, FormEvent, useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { useNotice } from '../../store/notice';
import { validateLogin } from '../../utilities/helper';
import { LogFormDataType, LogDataType } from '../../utilities/types';
import { NoticeType, Status, initialLogFormData } from '../../utilities/variables';

import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import InputField from '../input-field/InputField';

import './LoginForm.scss';

const LoginForm: FC<{}> = () => {
  const [logData, setLogData] = useState<LogFormDataType>(initialLogFormData);
  const [logDataErr, setLogDataErr] = useState<LogDataType>(initialLogFormData);

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = useAuth((state) => state.login);
  const reset = useAuth((state) => state.reset);
  const setNotice = useNotice((state) => state.setNotice);
  const status = useAuth((state) => state.status);
  const stateError = useAuth((state) => state.error);
  const message = useAuth((state) => state.message);

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
      const { rememberMe, ...rest } = logData;
      login(rest);
      setInit(true);
    }
  };

  useEffect(() => {
    if (init && status === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      navigate('/');
    }

    if (init && stateError) {
      setError(message);
      setNotice({ type: NoticeType.SUCCESS, message });
    }
  }, [status, stateError, message]);

  useEffect(() => {
    const softReset = () => {
      setInit(false);
      setLogData(initialLogFormData);
      setError('');
      setInit(false);
      setLogDataErr(initialLogFormData);
    };

    return () => {
      reset();
      softReset();
    };
  }, []);

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
