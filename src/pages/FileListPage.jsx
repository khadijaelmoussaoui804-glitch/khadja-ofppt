import React from "react";
import { ChevronLeft, Download, Eye } from "lucide-react";
import { useStore } from "../store";
import Header from "../components/Header";
import { LoadingSpinner, EmptyState } from "../components/Shared";
import ApiService from "../services/api";

const FileListPage = ({ type }) => {
  const {
    courses,
    ccs,
    efms,
    effs,
    loading,
    setPage,
    selectedModule,
    selectedFiliere,
  } = useStore();

  const dataMap = {
    courses: {
      title: "Cours",
      items: courses || [],
      back: "categories",
      icon: "📚",
      empty: "Aucun cours disponible",
    },
    exercises: {
      title: "Exercices (CC)",
      items: ccs || [],
      back: "categories",
      icon: "📝",
      empty: "Aucun exercice disponible",
    },
    efm: {
      title: "Examens (EFM)",
      items: efms || [],
      back: "categories",
      icon: "🎓",
      empty: "Aucun EFM disponible",
    },
    eff: {
      title: "Examens (EFF)",
      items: effs || [],
      back: "categories",
      icon: "🏆",
      empty: "Aucun EFF disponible",
    },
  };

  const current = dataMap[type];

  // 🔒 Sécurité si type invalide
  if (!current) {
    return (
      <div>
        <Header showBreadcrumb={true} />
        <div className="page-container">
          <EmptyState
            icon="⚠️"
            title="Type invalide"
            description="La page demandée n'existe pas."
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header showBreadcrumb={true} />

      <div className="page-container">
        <div className="page-content">

          {/* Bouton retour */}
          <button
            onClick={() => setPage(current.back)}
            className="back-button"
          >
            <ChevronLeft size={20} />
            Retour
          </button>

          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">{current.title}</h1>
            <p className="page-subtitle">
              {type === "eff"
                ? selectedFiliere?.name || ""
                : selectedModule?.name || ""}
            </p>
          </div>

          {/* Contenu */}
          {loading ? (
            <LoadingSpinner />
          ) : current.items.length === 0 ? (
            <EmptyState
              icon={current.icon}
              title={current.empty}
              description="Les fichiers seront bientôt disponibles."
            />
          ) : (
            <div className="content-grid">
              {current.items.map((item, index) => (
                <div key={item.id || index} className="content-card">
                  <div className="content-card-header">
                    
                    {/* Icône dynamique */}
                    <div
                      className={`content-card-icon content-card-icon-${
                        ["green", "blue", "orange", "purple", "pink"][
                          index % 5
                        ]
                      }`}
                    >
                      📄
                    </div>

                    <div className="content-card-body">
                      <h3 className="content-card-title">
                        {item.title || item.name}
                      </h3>

                      {item.description && (
                        <p className="content-card-description">
                          {item.description}
                        </p>
                      )}

                      {item.file_path && (
                        <span className="content-card-badge">
                          <Download size={14} />
                          Document disponible
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="content-card-actions">
                    {item.file_path && (
                      <a
                        href={ApiService.getFileUrl(item.file_path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-view"
                      >
                        <Eye size={18} />
                        Voir
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FileListPage;