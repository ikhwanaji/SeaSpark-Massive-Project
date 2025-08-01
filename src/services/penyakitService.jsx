import axios from 'axios';

// Create an axios instance with base URL
const API_URL = import.meta.env.VITE_BACKEND_URL ;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API services for penyakit
export const penyakitService = {
  // Get all penyakit
  getAllPenyakit: async () => {
    try {
      const response = await apiClient.get('/penyakit/getallPenyakit');
      return response.data;
    } catch (error) {
      console.error('Error fetching penyakit data:', error);
      throw error;
    }
  },

  // Get a specific penyakit by ID
  getPenyakitById: async (penyakitId) => {
    try {
      const response = await apiClient.get(`/penyakit/getById/${penyakitId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching penyakit with ID ${penyakitId}:`, error);
      throw error;
    }
  },

  // Create a new penyakit
  createPenyakit: async (penyakitData) => {
    try {
      // For FormData with files
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(penyakitData).forEach(key => {
        if (key !== 'gambar') {
          formData.append(key, penyakitData[key]);
        }
      });
      
      // Append file if present
      if (penyakitData.gambar instanceof File) {
        formData.append('image', penyakitData.gambar);
      }

      const response = await apiClient.post('/penyakit/tambah-penyakit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating penyakit:', error);
      throw error;
    }
  },

  // Update an existing penyakit
  updatePenyakit: async (penyakitId, penyakitData) => {
    try {
      // For FormData with files
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(penyakitData).forEach(key => {
        if (key !== 'gambar') {
          formData.append(key, penyakitData[key]);
        }
      });
      
      // Append file if present
      if (penyakitData.gambar instanceof File) {
        formData.append('image', penyakitData.gambar);
      } else if (typeof penyakitData.gambar === 'string') {
        formData.append('existingGambar', penyakitData.gambar);
      }

      const response = await apiClient.put(`/penyakit/put/${penyakitId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating penyakit with ID ${penyakitId}:`, error);
      throw error;
    }
  },

  // Delete a penyakit
  deletePenyakit: async (penyakitId) => {
    try {
      const response = await apiClient.delete(`/penyakit/delete-penyakit/${penyakitId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting penyakit with ID ${penyakitId}:`, error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (filename) => {
    return `${API_URL}/penyakit/images/${filename}`;
  }
};