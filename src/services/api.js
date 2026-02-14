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
   */
  getFileUrl(filePath) {
    if (!filePath) return null;

    // Si c'est déjà une URL complète, la retourner
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }

    // Nettoyer le chemin
    let cleanPath = filePath;

    // Retirer les préfixes courants
    cleanPath = cleanPath.replace(/^\/storage\//, '');
    cleanPath = cleanPath.replace(/^storage\//, '');
    cleanPath = cleanPath.replace(/^\//, '');

    // Construire l'URL complète
    // Assurez-vous que ceci correspond à votre configuration backend
    return `https://podo.b1.ma/storage/${cleanPath}`;
  }
}

export default new ApiService();