import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FormDataType } from '../utilities/types';
import { Status, initialGroup } from '../utilities/variables';
import { API } from './api';

interface StoreStateInterface {
  groups: (typeof initialGroup)[];
  group: typeof initialGroup | null;
  status: keyof typeof Status;
  message: string;
  error: boolean;
  reset: () => void;
  createGroup: (formData: FormDataType) => void;
  editGroup: (groupId: string, formData: FormDataType) => void;
  deleteGroup: (groupId: string) => void;
  fetchGroups: () => void;
  fetchGroup: (groupId: string) => void;
}

export const useStore = create<StoreStateInterface>()(
  devtools((set, get) => ({
    groups: [],
    group: null,
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

      set((state) => ({
        ...state,
        groups: group ? [...state.groups, group] : [...state.groups],
        status,
        message,
        error,
      }));
    },
    //   Edit Group
    editGroup: async (groupId, formData) => {
      get().reset();

      const { status, group, message, error } = await API.editGroup(
        groupId,
        formData
      );

      set((state) => ({
        ...state,
        groups: group
          ? [
              ...state.groups.map((item) =>
                item.group_id === group.group_id ? group : item
              ),
            ]
          : [...state.groups],
        group: group ? group : state.group,
        status,
        message,
        error,
      }));
    },
    //   Delete Group
    deleteGroup: async (groupId) => {
      get().reset();

      const { status, group, message, error } = await API.deleteGroup(groupId);

      set((state) => ({
        ...state,
        groups: group
          ? [...state.groups.filter((item) => item.group_id !== group.group_id)]
          : [...state.groups],
        group: group ? null : state.group,
        status,
        message,
        error,
      }));
    },
    //   Fetch Groups
    fetchGroups: async () => {
      get().reset();

      const { status, groups, message, error } = await API.fetchGroups();

      set((state) => ({
        ...state,
        groups: groups ? [...groups] : [...state.groups],
        status,
        message,
        error,
      }));
    },
    //   Fetch Group
    fetchGroup: async (groupId) => {
      get().reset();

      const { status, group, message, error } = await API.fetchGroup(groupId);

      set((state) => ({
        ...state,
        group: group ? group : state.group,
        status,
        message,
        error,
      }));
    },
  }))
);
