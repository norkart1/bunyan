import { create } from 'zustand';

interface DynamicStore {
  data: Record<string, any[]>;
  errors: Record<string, string | null>;
  setData: (key: string, value: any[]) => void;
  setError: (key: string, error: string | null) => void;
}

export const useDynamicStore = create<DynamicStore>((set) => ({
  data: {},
  errors: {},
  setData: (key, value) => set((state) => ({ ...state, data: { ...state.data, [key]: value } })),
  setError: (key, error) => set((state) => ({ ...state, errors: { ...state.errors, [key]: error } })),
}));
