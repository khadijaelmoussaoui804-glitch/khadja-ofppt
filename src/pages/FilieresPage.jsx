import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useStore } from '../store';
import Header from '../components/Header';
import { LoadingSpinner } from '../components/Shared';

const FilieresPage = () => {
  const { filieres, selectedYear, loading, fetchModules, setPage } = useStore();

  return (
    <div>
      <Header showBreadcrumb={true} />
      <div className="page-container">
        <div className="page-content">
          <button onClick={() => setPage('years')} className="back-button">
            <ChevronLeft size={20} /> Retour
          </button>

          <div className="page-header">
            <h1 className="page-title">Filières - {selectedYear?.name}</h1>
            <p className="page-subtitle">Choisissez votre filière de spécialisation</p>
          </div>

          {loading ? <LoadingSpinner /> : (
            <div className="grid-container grid-2">
              {filieres.map((filiere, index) => (
                <div key={filiere.id} className="card card-hover" onClick={() => fetchModules(filiere)}>
                  <div className="card-header">
                    <div className={`card-icon card-icon-${['green', 'blue', 'orange', 'purple', 'pink'][index % 5]}`}>🎓</div>
                    <div className="card-content">
                      <h3 className="card-title">{filiere.name}</h3>
                      {filiere.description && <p className="card-description">{filiere.description}</p>}
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

export default FilieresPage;