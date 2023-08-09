/* Application Types */

import {
  Status,
  // initialGroup
} from './variables';

// Gen Types

export type UserType = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  funds: number;
  show_funds: boolean;
  compute_funds: boolean;
  currency: string;
};

export type ExpenseType = {
  expense_id: string;
  title: string;
  description: string;
  icon: string;
  amount: number;
  updatedAt: string | Date;
  createdAt: string | Date;
};

export type GroupType = {
  group_id: string;
  title: string;
  description: string;
  icon: string;
  theme: string;
  updatedAt: string | Date;
  createdAt: string | Date;
  expenses: ExpenseType[];
};

// Login Types

export interface LogDataType {
  email: string;
  password: string;
}

export interface LogFormDataType extends LogDataType {
  rememberMe: boolean;
}

// Registration Types

export interface RegDataType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegFormDataType extends RegDataType {
  confirmPassword: string;
}

// Group Types

export type GroupFormDataType = {
  title: string;
  description: string;
  icon: string;
  theme: string;
};

// Expense Types

export type ExpenseFormDataType = {
  title: string;
  description: string;
  icon: string;
  amount: number | string;
};

export type ExpenseFormErrDataType = {
  title: string;
  description: string;
  icon: string;
  amount: string;
};

// API Types
export type FormDataType =
  | LogDataType
  | RegFormDataType
  | GroupFormDataType
  | ExpenseFormDataType;

export type UserResponse = {
  data: UserType;
  message: string;
  token: string;
};

// export type ExpenseResponse = {
//   data: ExpenseType;
//   message: string;
//   token: string;
// };

export type StdApiResponse = {
  data: GroupType[] | ExpenseType | boolean;
  message: string;
};

export type VerifyResponse = {
  data: boolean;
  message: string;
};

export interface APIResponse {
  message: string;
  error: boolean;
  status: keyof typeof Status;
}

export interface APIExpenseResponse extends APIResponse {
  data: ExpenseType | null;
}

export interface APIGroupResponse extends APIResponse {
  data: GroupType | null;
}

export interface APIGroupsResponse extends APIResponse {
  data: GroupType[] | null;
}

export type Response = UserResponse | StdApiResponse;
