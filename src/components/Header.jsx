import React from 'react';
import { Home } from 'lucide-react';
import { useStore } from '../store';

const Header = ({ showBreadcrumb = false }) => {
  const { setPage, selectedYear, selectedFiliere, selectedModule } = useStore();

  return (
    <div className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>OFPPT Learning</span>
        </div>
        {showBreadcrumb && (
          <div className="nav-breadcrumb">
            <span className="breadcrumb-item" onClick={() => setPage('years')} style={{ cursor: 'pointer' }}>
              <Home size={16} /> Accueil
            </span>
            {selectedYear && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-item">{selectedYear.name}</span>
              </>
            )}
            {selectedFiliere && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-item">{selectedFiliere.name}</span>
              </>
            )}
            {selectedModule && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-item">{selectedModule.name}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;