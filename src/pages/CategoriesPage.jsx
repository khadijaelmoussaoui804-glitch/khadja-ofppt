import React from 'react';
import { ChevronLeft, BookOpen, Edit, GraduationCap, TrendingUp } from 'lucide-react';
import { useStore } from '../store';
import Header from '../components/Header';

const CategoriesPage = () => {
  const { selectedModule, selectedFiliere, setPage, fetchCourses, fetchCCs, fetchEFMs, fetchEFFs } = useStore();

  const categories = [
    { id: 1, name: 'Cours', icon: BookOpen, color: 'green', description: 'Documents et supports de cours', action: () => fetchCourses(selectedModule.id)},
    { id: 2, name: 'Exercices (CC)', icon: Edit, color: 'blue', description: 'Contrôles continus et exercices', action: () => fetchCCs(selectedModule.id)},
    { id: 3, name: 'EFM', icon: GraduationCap, color: 'purple', description: 'Examens de fin de module', action: () => fetchEFMs(selectedModule.id)},
    { id: 4, name: 'EFF', icon: TrendingUp, color: 'pink', description: 'Examens de fin de formation', action: () => fetchEFFs(selectedFiliere.id)}
  ];

  return (
    <div>
      <Header showBreadcrumb={true} />
      <div className="page-container">
        <div className="page-content">
          <button onClick={() => setPage('modules')} className="back-button">
            <ChevronLeft size={20} /> Retour
          </button>
          <div className="page-header">
            <h1 className="page-title">Catégories</h1>
            <p className="page-subtitle">{selectedModule?.name}</p>
          </div>
          <div className="grid-container grid-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="card card-hover" onClick={cat.action}>
                  <div className="card-header">
                    <div className={`card-icon card-icon-${cat.color}`}><Icon size={28} /></div>
                    <div className="card-content">
                      <h3 className="card-title">{cat.name}</h3>
                      <p className="card-description">{cat.description}</p>
                    </div>
                  </div>
                  <div className="card-arrow">→</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;