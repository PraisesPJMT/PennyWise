import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FormDataType, GroupType } from '../utilities/types';
import { Status } from '../utilities/variables';
import { API } from './api';

interface StoreStateInterface {
  groups: GroupType[];
  status: keyof typeof Status;
  message: string;
  error: boolean;
  reset: () => void;
  createGroup: (formData: FormDataType) => void;
  editGroup: (formData: FormDataType) => void;
  deleteGroup: (groupId: string) => void;
  fetchGroups: () => void;
}

export const useStore = create<StoreStateInterface>()(
  devtools((set, get) => ({
    groups: [],
    status: Status.IDLE,
    message: '',
    error: false,
    //   Reset Store
    reset: () =>
      set((state) => ({
        ...state,
        status: Status.IDLE,
        message: '',
        error: false,
      })),
    //   Create Group
    createGroup: async (formData) => {
      get().reset();

      const { status, group, message, error } = await API.createGroup(formData);

      if (group) {
        set((state) => ({
          ...state,
          groups: [...state.groups, group],
          status,
          message,
          error,
        }));
        return;
      }

      set((state) => ({
        ...state,
        groups: [...state.groups],
        status,
        message,
        error,
      }));
    },
    //   Edit Group
    editGroup: () => {},
    //   Delete Group
    deleteGroup: () => {},
    //   Fetch Groups
    fetchGroups: () => {},
  }))
);
