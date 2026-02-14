import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ApiService from './services/api';

export const useStore = create(
  persist(
    (set, get) => ({
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
      
      // --- Theme State ---
      theme: localStorage.getItem('theme') || 'light',

      // --- Theme Actions ---
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        set({ theme: newTheme });
      },

      initTheme: () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        set({ theme: savedTheme });
      },

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
    }),
    {
      name: 'ofppt-learning-storage', // nom unique pour le localStorage
      // On persiste tout sauf le loading
      partialize: (state) => ({
        currentPage: state.currentPage,
        years: state.years,
        filieres: state.filieres,
        modules: state.modules,
        courses: state.courses,
        ccs: state.ccs,
        efms: state.efms,
        effs: state.effs,
        selectedYear: state.selectedYear,
        selectedFiliere: state.selectedFiliere,
        selectedModule: state.selectedModule,
        selectedCourse: state.selectedCourse,
        theme: state.theme,
      }),
    }
  )
);