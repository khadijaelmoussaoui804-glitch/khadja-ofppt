import React from 'react';

export const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
    <p className="loading-text">Chargement en cours...</p>
  </div>
);

export const EmptyState = ({ icon, title, description }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3 className="empty-title">{title}</h3>
    <p className="empty-description">{description}</p>
  </div>
);