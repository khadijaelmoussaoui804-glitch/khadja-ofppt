import { create } from 'zustand';
import ApiService from '../services/api';

export const useStore = create((set) => ({
  currentPage: 'welcome',
  years: [],
  selectedYear: null,
  loading: false,

  setPage: (page) => set({ currentPage: page }),
  
  fetchYears: async () => {
    set({ loading: true });
    const data = await ApiService.getYears();
    set({ years: data, loading: false });
  },

  selectYear: (year) => set({ selectedYear: year, currentPage: 'filieres' }),
}));