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
