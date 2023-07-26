import { create } from 'zustand';
import { generateRandomID } from '../utilities/helper';

type NoticeType = 'success' | 'error' | 'warning' | 'idle';

export interface NoticeParam {
  message: string;
  type: NoticeType;
}
export interface Notice extends NoticeParam {
  id: string;
}

interface NoticeInterface {
  notice: Notice[];
  //   resetNotice: () => void;
  setNotice: (notice: NoticeParam) => void;
  removeNotice: (noticeId: string) => void;
  clearNotice: () => void;
}

export const useNotice = create<NoticeInterface>()((set, get) => ({
  notice: [
    // { id: 'ABDC', type: 'success', message: 'Login successful!' },
    // { id: 'EFGH', type: 'error', message: 'Invalid credentials!' },
  ],
  //   resetNotice: () => {},
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
