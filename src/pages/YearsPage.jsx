import React, { useEffect } from 'react';
import { useStore } from '../store';
import Header from '../components/Header';
import { LoadingSpinner } from '../components/Shared';

const YearsPage = () => {
  const { years, loading, fetchYears, fetchFilieres } = useStore();

  useEffect(() => {
    fetchYears();
  }, []);

  return (
    <div>
      <Header showBreadcrumb={true} />
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">Choisissez votre année</h1>
            <p className="page-subtitle">Sélectionnez votre niveau d'études</p>
          </div>

          {loading ? <LoadingSpinner /> : (
            <div className="grid-container grid-3">
              {years.map((year, index) => (
                <div 
                  key={year.id} 
                  className="card card-hover" 
                  onClick={() => fetchFilieres(year)}
                >
                  <div className="card-header">
                    <div className={`card-icon card-icon-${['green', 'blue', 'orange'][index % 3]}`}>
                      {index + 1}
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{year.name}</h3>
                      <p className="card-description">Accédez aux filières disponibles</p>
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

export default YearsPage;