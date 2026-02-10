import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useStore } from '../store';
import Header from '../components/Header';
import { LoadingSpinner } from '../components/Shared';

const ModulesPage = () => {
  const { modules, selectedFiliere, loading, selectModule, setPage } = useStore();

  return (
    <div>
      <Header showBreadcrumb={true} />
      <div className="page-container">
        <div className="page-content">
          <button onClick={() => setPage('filieres')} className="back-button">
            <ChevronLeft size={20} /> Retour
          </button>

          <div className="page-header">
            <h1 className="page-title">Modules</h1>
            <p className="page-subtitle">{selectedFiliere?.name}</p>
          </div>

          {loading ? <LoadingSpinner /> : (
            <div className="grid-container grid-2">
              {modules.map((module, index) => (
                <div key={module.id} className="card card-hover" onClick={() => selectModule(module)}>
                  <div className="card-header">
                    <div className={`card-icon card-icon-${['green', 'blue', 'orange', 'purple', 'pink'][index % 5]}`}>📖</div>
                    <div className="card-content">
                      <h3 className="card-title">{module.name}</h3>
                      <p className="card-description">{module.code} • {module.credits} crédits</p>
                      {module.instructor && <span className="card-badge">👨‍🏫 {module.instructor}</span>}
                    </div>
                  </div>
                  <div className="card-arrow">→</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModulesPage;