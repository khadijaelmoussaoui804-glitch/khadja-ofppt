import React, { useEffect } from 'react';
import { useStore } from './store';
import './App.css';

// Pages
import WelcomePage from './pages/WelcomePage';
import YearsPage from './pages/YearsPage';
import FilieresPage from './pages/FilieresPage';
import ModulesPage from './pages/ModulesPage';
import CategoriesPage from './pages/CategoriesPage';
import FileListPage from './pages/FileListPage';
import CourseDetailPage from './pages/CourseDetailPage';

const App = () => {
  const { currentPage, fetchYears } = useStore();

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome': return <WelcomePage />;
      case 'years': return <YearsPage />;
      case 'filieres': return <FilieresPage />;
      case 'modules': return <ModulesPage />;
      case 'categories': return <CategoriesPage />;
      case 'courses': return <FileListPage type="courses" />;
      case 'exercises': return <FileListPage type="exercises" />;
      case 'efm': return <FileListPage type="efm" />;
      case 'eff': return <FileListPage type="eff" />;
      case 'course-detail': return <CourseDetailPage />;
      default: return <WelcomePage />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
};

export default App;