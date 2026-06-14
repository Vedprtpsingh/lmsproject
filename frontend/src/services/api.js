import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });

// Course Allocation APIs
export const courseAllocationApi = {
  getAll: () => api.get('/course-allocations').then(r => r.data),
  create: (data) => api.post('/course-allocations', data).then(r => r.data),
  delete: (id) => api.delete(`/course-allocations/${id}`),
  getLecturers: () => api.get('/course-allocations/lecturers').then(r => r.data),
};

// Programs APIs
export const programsApi = {
  getAll: () => api.get('/programs').then(r => r.data),
  getById: (id) => api.get(`/programs/${id}`).then(r => r.data),
  create: (data) => api.post('/programs', data).then(r => r.data),
  update: (id, data) => api.put(`/programs/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/programs/${id}`),
  search: (query) => api.get(`/programs/search?query=${query}`).then(r => r.data),
  getByLevel: (level) => api.get(`/programs/level/${level}`).then(r => r.data),
};

// Program Courses APIs
export const programCoursesApi = {
  getByProgramId: (programId) => api.get(`/programs/${programId}/courses`).then(r => r.data),
  create: (programId, data) => api.post(`/programs/${programId}/courses`, data).then(r => r.data),
  delete: (programId, courseId) => api.delete(`/programs/${programId}/courses/${courseId}`),
};

export default api;
