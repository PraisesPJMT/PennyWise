/* Helper Functions */

import { SetStateAction } from 'react';
import {
  ExpenseFormDataType,
  ExpenseFormErrDataType,
  GroupFormDataType,
  LogDataType,
  RegFormDataType,
} from './types';

export const ValidateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const ValidatePassword = (password: string): boolean => {
  const MIN_PASSWORD_LENGTH = 4;

  return password.length >= MIN_PASSWORD_LENGTH;
};

export const ValidateText = (text: string): boolean => {
  const MIN_TEXT_LENGTH = 3;

  return text.length >= MIN_TEXT_LENGTH;
};

export const ValidateAmount = (amount: number | string): boolean => {
  let flag = true;
  if (!Number(amount)) flag = false;
  if (Number(amount) < 0) flag = false;
  return flag;
};

export const validateLogin = (
  data: LogDataType,
  setError: {
    (value: SetStateAction<LogDataType>): void;
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

export const validateRegistration = (
  data: RegFormDataType,
  setError: {
    (value: SetStateAction<RegFormDataType>): void;
    (arg0: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }): void;
  }
) => {
  let first_name = '',
    last_name = '',
    email = '',
    password = '',
    confirmPassword = '',
    flag = true;

  if (!ValidateText(data.first_name)) {
    first_name = 'Enter a valid name!';
    flag = false;
  }

  if (!ValidateText(data.last_name)) {
    last_name = 'Enter a valid name!';
    flag = false;
  }

  if (!ValidateEmail(data.email)) {
    email = 'Enter a valid email!';
    flag = false;
  }

  if (!ValidatePassword(data.password)) {
    password = 'Password should be more than 3 characters!';
    flag = false;
  }

  if (
    !ValidatePassword(data.password) ||
    data.password !== data.confirmPassword
  ) {
    confirmPassword = 'Confirm password should be a match with valid password!';
    flag = false;
  }

  setError({ first_name, last_name, email, password, confirmPassword });

  return flag;
};

export const generateRandomID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
};

export const validateGroup = (
  groupData: GroupFormDataType,
  setGroupErr: {
    (value: SetStateAction<GroupFormDataType>): void;
    (arg0: {
      title: string;
      description: string;
      icon: string;
      theme: string;
    }): void;
  }
) => {
  let title = '',
    description = '',
    theme = '',
    icon = '',
    flag = true;

  if (!ValidateText(groupData.title)) {
    title = 'Invalid title value!';
    flag = false;
  }

  // if (!ValidateText(groupData.description)) {
  //   description = 'Invalid description value!';
  //   flag = false;
  // }

  if (!ValidateText(groupData.icon)) {
    icon = 'Invalid icon value!';
    flag = false;
  }

  if (!ValidateText(groupData.theme)) {
    theme = 'Invalid theme value!';
    flag = false;
  }

  setGroupErr({
    title,
    description,
    theme,
    icon,
  });

  return flag;
};

export const validateExpense = (
  expenseData: ExpenseFormDataType,
  setExpenseErr: {
    (value: SetStateAction<ExpenseFormErrDataType>): void;
    (arg0: {
      title: string;
      description: string;
      icon: string;
      amount: string;
    }): void;
  }
) => {
  let title = '',
    description = '',
    amount = '',
    icon = '',
    flag = true;

  if (!ValidateText(expenseData.title)) {
    title = 'Invalid title value!';
    flag = false;
  }

  // if (!ValidateText(expenseData.description)) {
  //   description = 'Invalid description value!';
  //   flag = false;
  // }

  if (!ValidateText(expenseData.icon)) {
    icon = 'Invalid icon value!';
    flag = false;
  }

  if (!ValidateAmount(expenseData.amount)) {
    amount = 'Invalid amount value!';
    flag = false;
  }

  setExpenseErr({
    title,
    description,
    amount,
    icon,
  });

  return flag;
};
