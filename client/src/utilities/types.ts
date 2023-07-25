/* Application Types */

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

// API Types
export type FormDataType = LogDataType | RegFormDataType;

// Gen Types
export type StatusType = 'idle' | 'succeeded' | 'failed' | 'loading';

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
