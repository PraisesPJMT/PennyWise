/* Helper Functions */

import { SetStateAction } from 'react';
import { LogDataErrType, LogDataType } from './types';

export const ValidateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const ValidatePassword = (password: string): boolean => {
  const MIN_PASSWORD_LENGTH = 4;

  return password.length >= MIN_PASSWORD_LENGTH;
};

export const validateLogin = (
  data: LogDataType,
  setError: {
    (value: SetStateAction<LogDataErrType>): void;
    (arg0: { email: string; password: string }): void;
  }
) => {
  let email = '',
    password = '',
    flag = true;

  if (!ValidateEmail(data.email)) {
    email = 'Enter a valid email!';
    flag = false;
  }

  if (!ValidatePassword(data.password)) {
    password = 'Password should be more than 3 characters!';
    flag = false;
  }

  setError({ email, password });

  return flag;
};
