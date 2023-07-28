import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { useNotice } from '../../store/notice';
import { validateRegistration } from '../../utilities/helper';
import { RegFormDataType } from '../../utilities/types';
import { NoticeType, Status, initialRegData } from '../../utilities/variables';

import Button from '../button/Button';
import InputField from '../input-field/InputField';

import './RegistrationForm.scss';

const RegistrationForm: FC<{}> = () => {
  const [regData, setRegData] = useState<RegFormDataType>(initialRegData);
  const [regDataErr, setRegDataErr] = useState<RegFormDataType>(initialRegData);

  const [error, setError] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  const navigate = useNavigate();

  const register = useAuth((state) => state.register);
  const reset = useAuth((state) => state.reset);
  const setNotice = useNotice((state) => state.setNotice);
  const status = useAuth((state) => state.status);
  const stateError = useAuth((state) => state.error);
  const message = useAuth((state) => state.message);

  const handeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setInit(false);
    setRegDataErr(initialRegData);

    const { name, value } = event.target;

    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setInit(false);

    if (validateRegistration(regData, setRegDataErr)) {
      const { confirmPassword, ...rest } = regData;
      register(rest);
      setInit(true);
    }
  };

  useEffect(() => {
    if (init && status === Status.SUCCEEDED) {
      setNotice({ type: NoticeType.SUCCESS, message });
      navigate('/login');
    }

    if (init && stateError) {
      setError(message);
      setNotice({ type: NoticeType.ERROR, message });
    }
  }, [status, stateError, message]);

  useEffect(() => {
    const softReset = () => {
      setInit(false);
      setRegData(initialRegData);
      setError('');
      setInit(false);
      setRegDataErr(initialRegData);
    };

    return () => {
      reset();
      softReset();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register Account</h1>

      {error.length > 0 ? <p className="error">{error}</p> : null}

      <div className="col">
        <InputField
          name="first_name"
          placeholder="First Name"
          value={regData.first_name}
          error={regDataErr.first_name}
          changeAction={handeChange}
          required={true}
        />

        <InputField
          name="last_name"
          placeholder="Last Name"
          value={regData.last_name}
          error={regDataErr.last_name}
          changeAction={handeChange}
          required={true}
        />
      </div>
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={regData.email}
        error={regDataErr.email}
        changeAction={handeChange}
        required={true}
      />

      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={regData.password}
        error={regDataErr.password}
        changeAction={handeChange}
        required={true}
      />

      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={regData.confirmPassword}
        error={regDataErr.confirmPassword}
        changeAction={handeChange}
        required={true}
      />

      <div>
        <Button
          type="submit"
          varient="fill"
          label="Register"
          clickAction={() => {}}
          length="long"
        />
      </div>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
