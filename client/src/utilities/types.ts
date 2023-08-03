/* Application Types */

import { Status, initialGroup } from './variables';

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

export type GroupType = {
  group_id: string;
  title: string;
  description: string;
  icon: string;
  theme: string;
  updatedAt: string;
  createdAt: string;
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

// API Types
export type FormDataType = LogDataType | RegFormDataType | GroupFormDataType;

export type UserResponse = {
  data: UserType;
  message: string;
  token: string;
};

export type StdApiResponse = {
  data: typeof initialGroup | (typeof initialGroup)[] | boolean;
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

export interface APIGroupResponse extends APIResponse {
  data: typeof initialGroup | null;
}

export interface APIGroupsResponse extends APIResponse {
  data: (typeof initialGroup)[] | null;
}

export type Response = UserResponse | StdApiResponse;
