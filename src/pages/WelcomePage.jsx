import React from 'react';
import { useStore } from '../store';

const WelcomePage = () => {
  const { setPage } = useStore();

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-left">
          <h1 className="welcome-title">
            Master your<br />
            <span className="title-gradient">skills online</span>
          </h1>
          <p className="welcome-subtitle">Plateforme d'apprentissage moderne pour les étudiants OFPPT</p>
          <div className="features-grid">
            <div className="feature-box"><div className="feature-icon">📚</div><span>Cours interactifs OFPPT</span></div>
            <div className="feature-box"><div className="feature-icon">📥</div><span>Ressources téléchargeables</span></div>
            <div className="feature-box"><div className="feature-icon">🎯</div><span>Examens et EFM/EFF</span></div>
            <div className="feature-box"><div className="feature-icon">⏰</div><span>Horaire flexible</span></div>
          </div>
          <button className="btn-continuer" onClick={() => setPage('years')}>
            CONTINUER →
          </button>
        </div>
        <div className="welcome-right">
          <div className="character-circle">
            <img src="/boy.jpg" alt="Student" className="character-img" />
            <div className="floating-badge badge-1">📖 Cours</div>
            <div className="floating-badge badge-2">✅ Exercices</div>
            <div className="floating-badge badge-3">🎓 Examens</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;