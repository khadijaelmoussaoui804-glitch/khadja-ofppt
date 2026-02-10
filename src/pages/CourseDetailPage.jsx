import React from 'react';
import { ChevronLeft, Download, Calendar, Users, Eye } from 'lucide-react';
import { useStore } from '../store';
import Header from '../components/Header';
import ApiService from '../services/api';

const CourseDetailPage = () => {
  const { selectedCourse, selectedModule, setPage } = useStore();

  if (!selectedCourse) return null;

  return (
    <div>
      <Header showBreadcrumb={true} />
      <div className="page-container">
        <div className="page-content">
          <button onClick={() => setPage('courses')} className="back-button">
            <ChevronLeft size={20} /> Retour
          </button>

          <div className="course-detail">
            <div className="course-header">
              <h1 className="course-title">{selectedCourse.title}</h1>
              <div className="course-meta">
                <div className="course-meta-item">
                  <Calendar size={16} />
                  <span>Module: {selectedModule?.name}</span>
                </div>
                {selectedModule?.instructor && (
                  <div className="course-meta-item">
                    <Users size={16} />
                    <span>{selectedModule.instructor}</span>
                  </div>
                )}
              </div>
              {selectedCourse.description && (
                <p className="course-description-text">{selectedCourse.description}</p>
              )}
            </div>

            <div className="course-body">
              {selectedCourse.content_type === 'video' && selectedCourse.video_url ? (
                <div className="video-container">
                  <div className="video-wrapper">
                    <iframe 
                      src={selectedCourse.video_url} 
                      title={selectedCourse.title}
                      frameBorder="0" 
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                </div>
              ) : selectedCourse.content_html ? (
                <div className="html-content" dangerouslySetInnerHTML={{ __html: selectedCourse.content_html }} />
              ) : (
                <div className="course-placeholder">
                  <div className="course-placeholder-icon">📚</div>
                  <h2>Contenu du document</h2>
                  <p>
                    Consultez le document PDF ci-dessous pour accéder au contenu complet du cours.
                  </p>
                </div>
              )}
            </div>

            {selectedCourse.file_path && (
              <div className="course-actions">
                <a 
                  href={ApiService.getFileUrl(selectedCourse.file_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-view-document"
                >
                  <Eye size={20} />
                  Voir le document
                </a>
                <a 
                  href={ApiService.getFileUrl(selectedCourse.file_path)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-download-document"
                >
                  <Download size={20} />
                  Télécharger
                </a>
              </div>
            )}
          </div>

          <div className="button-group">
            <button 
              className="btn-secondary"
              onClick={() => setPage('categories')}
            >
              Retour aux catégories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;