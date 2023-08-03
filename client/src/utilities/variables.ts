/* App Constants */
import {
  BsFillCarFrontFill,
  BsFillAirplaneFill,
  BsFillCartFill,
  BsFillCreditCardFill,
  BsFillGrid1X2Fill,
  BsFillHousesFill,
  BsHospital,
  BsFillMortarboardFill,
  BsFillPersonLinesFill,
  BsFillPiggyBankFill,
  BsBank2,
  BsBarChartLineFill,
  BsBuildingsFill,
  BsDribbble,
  BsShop,
} from 'react-icons/bs';

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

// Group Constants

export const inititalGroupData = {
  title: '',
  description: '',
  icon: 'IC01',
  theme: '#00539CFF',
};

export const inititalGroupDataErr = {
  title: '',
  description: '',
  icon: '',
  theme: '',
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

export const initialGroup = {
  group_id: '',
  title: '',
  description: '',
  icon: '',
  theme: '#317773',
  createdAt: new Date(),
  updatedAt: new Date(),
  expenses: [],
};

export const Status = {
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  IDLE: 'IDLE',
  FAILED: 'FAILED',
} as const;

export const NoticeType = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
} as const;

export const THEMES = [
  '#00539CFF',
  '#4831D4',
  // '#C5FAD5',
  '#F96167',
  // '#E2D1F9',
  '#317773',
  '#8AAAE5',
  '#FF69B4',
  '#99F443',
  '#00FFFF',
  '#596235',
];

export const ICONS = [
  { code: 'IC01', icon: BsFillGrid1X2Fill },
  { code: 'IC02', icon: BsFillCartFill },
  { code: 'IC03', icon: BsFillCreditCardFill },
  { code: 'IC04', icon: BsFillPersonLinesFill },
  { code: 'IC05', icon: BsFillPiggyBankFill },
  { code: 'IC06', icon: BsFillCarFrontFill },
  { code: 'IC07', icon: BsFillAirplaneFill },
  { code: 'IC08', icon: BsFillMortarboardFill },
  { code: 'IC09', icon: BsBarChartLineFill },
  { code: 'IC10', icon: BsDribbble },
  { code: 'IC11', icon: BsShop },
  { code: 'IC12', icon: BsFillHousesFill },
  { code: 'IC13', icon: BsBuildingsFill },
  { code: 'IC14', icon: BsHospital },
  { code: 'IC15', icon: BsBank2 },
];
