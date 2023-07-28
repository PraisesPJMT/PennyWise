import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { FormDataType, UserType } from '../utilities/types';
import { Status, initialUser } from '../utilities/variables';
import { API } from './api';

interface AuthStateInterface {
  user: UserType;
  status: Status;
  isAuthenticated: boolean;
  message: string;
  error: boolean;
  reset: () => void;
  logout: () => void;
  login: (formData: FormDataType) => Promise<void>;
  register: (formData: FormDataType) => Promise<void>;
  verify: () => Promise<void>;
}

export const useAuth = create<AuthStateInterface>()(
  devtools(
    persist(
      (set, get) => ({
        user: initialUser,
        status: Status.IDLE,
        isAuthenticated: false,
        message: '',
        error: false,
        reset: () =>
          set((state) => ({
            ...state,
            status: Status.IDLE,
            message: '',
            error: false,
          })),
        verify: async () => {
          get().reset();
          const { status, isAuthenticated, message, error } =
            await API.verifyUser();
          set((state) => ({
            ...state,
            status,
            isAuthenticated,
            message,
            error,
          }));
        },
        login: async (formData) => {
          get().reset();
          const { status, user, isAuthenticated, message, error } =
            await API.login(formData);
          set((state) => ({
            ...state,
            user,
            status,
            isAuthenticated,
            message,
            error,
          }));
        },
        logout: () => {
          get().reset();
          API.logOut();
          set((state) => ({
            ...state,
            user: initialUser,
            status: Status.IDLE,
            isAuthenticated: false,
            message: '',
            error: false,
          }));
        },
        register: async (formData) => {
          get().reset();
          const { status, message, error } = await API.register(formData);
          set((state) => ({
            ...state,
            status,
            message,
            error,
          }));
        },
      }),
      {
        name: 'auth-store',
      }
    )
  )
);
