/* Application Types */

// Login Types

export interface LogDataType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LogDataErrType {
  email: string;
  password: string;
}

export const initialLogData = {
  email: '',
  password: '',
  rememberMe: false,
};

export const initialLogDataErr = {
  email: '',
  password: '',
};
