import { create } from 'zustand';
import { generateRandomID } from '../utilities/helper';
import { NoticeType } from '../utilities/variables';

export interface NoticeParam {
  message: string;
  type: keyof typeof NoticeType;
}
export interface Notice extends NoticeParam {
  id: string;
}

interface NoticeInterface {
  notice: Notice[];
  setNotice: (notice: NoticeParam) => void;
  removeNotice: (noticeId: string) => void;
  clearNotice: () => void;
}

export const useNotice = create<NoticeInterface>()((set) => ({
  notice: [
    // { id: 'ABDC', type: 'success', message: 'Login successful!' },
    // { id: 'EFGH', type: 'error', message: 'Invalid credentials!' },
  ],
  setNotice: (notice) => {
    const { type, message } = notice;
    set((state) => ({
      ...state,
      notice: [...state.notice, { id: generateRandomID(), type, message }],
    }));
  },
  removeNotice: (noticeId: string) => {
    set((state) => ({
      ...state,
      notice: [...state.notice.filter((notice) => notice.id !== noticeId)],
    }));
  },
  clearNotice: () => {
    set((state) => ({
      ...state,
      notice: [],
    }));
  },
}));
