import React from 'react';
import { Home, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';

const Header = ({ showBreadcrumb = false }) => {
  const { setPage, theme, toggleTheme } = useStore();

  return (
    <div className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>OFPPT Learning</span>
        </div>
        
        <div className="header-right">
          {/* Bouton Accueil uniquement si on n'est pas déjà sur la page d'accueil */}
          {showBreadcrumb && (
            <button 
              className="home-button"
              onClick={() => setPage('welcome')}
              aria-label="Retour à l'accueil"
            >
              <Home size={20} />
              <span>Accueil</span>
            </button>
          )}
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;