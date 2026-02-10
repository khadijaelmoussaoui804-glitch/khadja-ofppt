import { create } from 'zustand';
import ApiService from './services/api';

export const useStore = create((set, get) => ({
  // --- States ---
  currentPage: 'welcome',
  loading: false,
  years: [],
  filieres: [],
  modules: [],
  courses: [],
  ccs: [],
  efms: [],
  effs: [],
  selectedYear: null,
  selectedFiliere: null,
  selectedModule: null,
  selectedCourse: null,

  // --- Actions (Navigation) ---
  setPage: (page) => set({ currentPage: page }),

  // --- Actions (Data Loading) ---
  fetchYears: async () => {
    set({ loading: true });
    const data = await ApiService.getYears();
    set({ years: data, loading: false });
  },

  fetchFilieres: async (year) => {
    set({ loading: true, selectedYear: year });
    const data = await ApiService.getFilieresByYear(year.id);
    set({ filieres: data, loading: false, currentPage: 'filieres' });
  },

  fetchModules: async (filiere) => {
    set({ loading: true, selectedFiliere: filiere });
    const data = await ApiService.getModulesByFiliere(filiere.id);
    set({ modules: data, loading: false, currentPage: 'modules' });
  },

  fetchCourses: async (moduleId) => {
    set({ loading: true });
    const data = await ApiService.getCoursesByModule(moduleId);
    set({ courses: data, loading: false, currentPage: 'courses' });
  },

  // Zid hna loadCCs, loadEFMs... b nefss l-mantiq
  fetchCCs: async (moduleId) => {
    set({ loading: true });
    const data = await ApiService.getCCsByModule(moduleId);
    set({ ccs: data, loading: false, currentPage: 'exercises' });
  },
  
  fetchEFMs: async (moduleId) => {
    set({ loading: true });
    const data = await ApiService.getEFMsByModule(moduleId);
    set({ efms: data, loading: false, currentPage: 'efm' });
  },

  fetchEFFs: async (filiereId) => {
    set({ loading: true });
    const data = await ApiService.getEFFsByFiliere(filiereId);
    set({ effs: data, loading: false, currentPage: 'eff' });
  },

  selectModule: (module) => set({ selectedModule: module, currentPage: 'categories' }),
  selectCourse: (course) => set({ selectedCourse: course, currentPage: 'course-detail' }),
}));