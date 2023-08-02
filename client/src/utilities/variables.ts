/* App Constants */

// Login Constants

export const initialLogData = {
  email: '',
  password: '',
};

export const initialLogFormData = {
  ...initialLogData,
  rememberMe: false,
};

// Registration Constants

export const initialRegData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// Gen Constants
export const initialUser = {
  user_id: '',
  first_name: '',
  last_name: '',
  email: '',
  funds: 0,
  show_funds: false,
  compute_funds: false,
  currency: 'USD',
};

export enum Status {
  LOADING= "LOADING",
  SUCCEEDED= "SUCCEEDED",
  IDLE= "IDLE",
  FAILED= "FAILED",
}

export enum NoticeType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}
