import { create } from 'zustand';

interface useSearchParamsStore {
  pageNumber: number;
  title: string;
  author: string;
  setPageNumber: (pageNumber: number) => void;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
}

const useSearchParamsStore = create<useSearchParamsStore>((set) => ({
  pageNumber: 1,
  title: '',
  author: '',
  setTitle: (title) => set({ title }),
  setAuthor: (author) => set({ author }),
  setPageNumber: (pageNumber) => set({ pageNumber }),
}));

export default useSearchParamsStore;
