import React from 'react';
import { ChevronLeft, Download, Eye } from 'lucide-react';
import { useStore } from '../store';
import Header from '../components/Header';
import { LoadingSpinner, EmptyState } from '../components/Shared';
import ApiService from '../services/api';

const FileListPage = ({ type }) => {
  const { 
    courses, ccs, efms, effs, 
    loading, setPage, selectedModule, selectedFiliere 
  } = useStore();

  const dataMap = {
    courses: { title: 'Cours', items: courses, back: 'categories', icon: '📚', empty: 'Aucun cours disponible' },
    exercises: { title: 'Exercices (CC)', items: ccs, back: 'categories', icon: '📝', empty: 'Aucun exercice disponible' },
    efm: { title: 'Examens (EFM)', items: efms, back: 'categories', icon: '🎓', empty: 'Aucun EFM disponible' },
    eff: { title: 'Examens (EFF)', items: effs, back: 'categories', icon: '🏆', empty: 'Aucun EFF disponible' }
  };

  const current = dataMap[type];

  // Fonction pour générer un nom de fichier propre basé sur le titre
  const getCleanFileName = (item) => {
    const title = item.title || item.name || 'document';
    return title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s\-]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase() + '.pdf';
  };

  // ACTION : Téléchargement forcé avec le NOM DU COURS
  const handleDownload = async (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fileUrl = ApiService.getFileUrl(item.file_path);
    const fileName = getCleanFileName(item);

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      window.open(fileUrl, '_blank');
    }
  };

  // ACTION : Voir le document avec nom propre
  const handleView = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileUrl = ApiService.getFileUrl(item.file_path);
    
    // Créer un nom de fichier propre pour l'affichage
    const cleanTitle = (item.title || item.name || 'document')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s\-]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    // Ouvrir avec un nom propre dans l'URL (pour l'affichage dans le navigateur)
    const newWindow = window.open(fileUrl, '_blank');
    if (newWindow) {
      // Changer le titre de l'onglet
      newWindow.document.title = item.title || item.name || 'Document';
    }
  };

  return (
    <div className="app-container">
      <Header showBreadcrumb={true} />
      <div className="page-container">
        <div className="page-content">
          {/* Layout vertical amélioré */}
          <div className="page-header-with-back">
            <button onClick={() => setPage(current.back)} className="back-button">
              <ChevronLeft size={20} /> Retour
            </button>

            <div className="page-header">
              <h1 className="page-title">{current.title}</h1>
              <p className="page-subtitle">
                {type === 'eff' ? selectedFiliere?.name : selectedModule?.name}
              </p>
            </div>
          </div>

          {loading ? <LoadingSpinner /> : (
            current.items.length === 0 ? (
              <EmptyState 
                icon={current.icon} 
                title={current.empty}
                description="Les fichiers seront bientôt disponibles" 
              />
            ) : (
              <div className="content-grid">
                {current.items.map((item, index) => (
                  <div key={item.id} className="content-card">
                    <div className="content-card-header">
                      <div className={`content-card-icon content-card-icon-${['green', 'blue', 'orange', 'purple', 'pink'][index % 5]}`}>
                        📄
                      </div>
                      <div className="content-card-body">
                        <h3 className="content-card-title">{item.title || item.name}</h3>
                        <span className="content-card-badge">
                          PDF • {current.title}
                        </span>
                      </div>
                    </div>
                    
                    <div className="content-card-actions">
                      <button
                        onClick={(e) => handleView(item, e)}
                        className="btn-view"
                      >
                        <Eye size={18} />
                        Voir
                      </button>
                      <button
                        onClick={(e) => handleDownload(item, e)}
                        className="btn-download-small"
                      >
                        <Download size={18} />
                        Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FileListPage;