// Service API pour l'intégration avec podo.b1.ma
const API_BASE_URL = 'https://podo.b1.ma/api/public';

class ApiService {
  async getYears() {
    try {
      const response = await fetch(`${API_BASE_URL}/years`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des années:', error);
      return [];
    }
  }

  async getFilieresByYear(yearId) {
    try {
      const response = await fetch(`${API_BASE_URL}/years/${yearId}/filieres`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des filières:', error);
      return [];
    }
  }

  async getModulesByFiliere(filiereId) {
    try {
      const response = await fetch(`${API_BASE_URL}/filieres/${filiereId}/modules`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des modules:', error);
      return [];
    }
  }

  async getCCsByModule(moduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/ccs`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des CC:', error);
      return [];
    }
  }

  async getEFMsByModule(moduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/efms`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des EFM:', error);
      return [];
    }
  }

  async getCoursesByModule(moduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/courses`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      return [];
    }
  }

  async getEFFsByFiliere(filiereId) {
    try {
      const response = await fetch(`${API_BASE_URL}/filieres/${filiereId}/effs`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des EFF:', error);
      return [];
    }
  }

  /**
   * Convertit un chemin de fichier en URL complète
   * Gère plusieurs formats possibles de file_path
   */
  getFileUrl(filePath) {
    if (!filePath) return null;

    // Si c'est déjà une URL complète, on la retourne telle quelle
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }

    // Nettoyer le chemin
    let cleanPath = filePath;

    // Retirer les préfixes courants
    cleanPath = cleanPath.replace(/^\/storage\//, '');
    cleanPath = cleanPath.replace(/^storage\//, '');
    cleanPath = cleanPath.replace(/^\//, '');

    // OPTION 1: Si vos fichiers sont dans https://podo.b1.ma/storage/
    // return `https://podo.b1.ma/storage/${cleanPath}`;

    // OPTION 2: Si vos fichiers sont directement accessibles via l'API
    // return `${API_BASE_URL}/files/${cleanPath}`;

    // OPTION 3: Si vos fichiers sont dans un dossier public spécifique
    // Basé sur votre erreur, essayez d'abord celle-ci:
    return `https://podo.b1.ma/storage/${cleanPath}`;
  }

  /**
   * Télécharge un fichier directement
   * Alternative si les liens directs ne fonctionnent pas
   */
  async downloadFile(filePath, fileName) {
    try {
      const url = this.getFileUrl(filePath);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Impossible de télécharger le fichier. Veuillez réessayer.');
    }
  }
}

export default new ApiService();