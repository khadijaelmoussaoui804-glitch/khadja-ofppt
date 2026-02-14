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
  const { 
    currentPage, 
    fetchYears, 
    initTheme,
    selectedYear,
    selectedFiliere,
    selectedModule
  } = useStore();

  useEffect(() => {
    // Initialiser le thème au chargement
    initTheme();
    // Charger les années
    fetchYears();
  }, [fetchYears, initTheme]);

  // Mettre à jour le titre de la page et l'URL selon la navigation
  useEffect(() => {
    const updatePageInfo = () => {
      let title = 'OFPPT Learning';
      let path = '/';

      switch (currentPage) {
        case 'welcome':
          title = 'OFPPT Learning - Accueil';
          path = '/';
          break;
        case 'years':
          title = 'OFPPT Learning - Années';
          path = '/annees';
          break;
        case 'filieres':
          title = selectedYear?.name 
            ? `${selectedYear.name} - Filières` 
            : 'Filières';
          path = `/annees/${selectedYear?.id || ''}/filieres`;
          break;
        case 'modules':
          title = selectedFiliere?.name 
            ? `${selectedFiliere.name} - Modules` 
            : 'Modules';
          path = `/filieres/${selectedFiliere?.id || ''}/modules`;
          break;
        case 'categories':
          title = selectedModule?.name 
            ? `${selectedModule.name} - Catégories` 
            : 'Catégories';
          path = `/modules/${selectedModule?.id || ''}/categories`;
          break;
        case 'courses':
          title = selectedModule?.name 
            ? `${selectedModule.name} - Cours` 
            : 'Cours';
          path = `/modules/${selectedModule?.id || ''}/cours`;
          break;
        case 'exercises':
          title = selectedModule?.name 
            ? `${selectedModule.name} - Exercices` 
            : 'Exercices';
          path = `/modules/${selectedModule?.id || ''}/exercices`;
          break;
        case 'efm':
          title = selectedModule?.name 
            ? `${selectedModule.name} - EFM` 
            : 'EFM';
          path = `/modules/${selectedModule?.id || ''}/efm`;
          break;
        case 'eff':
          title = selectedFiliere?.name 
            ? `${selectedFiliere.name} - EFF` 
            : 'EFF';
          path = `/filieres/${selectedFiliere?.id || ''}/eff`;
          break;
        case 'course-detail':
          title = 'Détail du cours';
          path = '/cours/detail';
          break;
        default:
          title = 'OFPPT Learning';
          path = '/';
      }

      // Mettre à jour le titre de la page
      document.title = title;

      // Mettre à jour l'URL sans recharger la page
      window.history.pushState({}, '', path);
    };

    updatePageInfo();
  }, [currentPage, selectedYear, selectedFiliere, selectedModule]);

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