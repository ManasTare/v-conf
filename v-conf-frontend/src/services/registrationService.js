import api from './api';

export const registrationService = {
    // GET /api/registration
    getAll: async () => {
        const response = await api.get('/registration');
        return response.data;
    },

    // POST /api/registration
    save: async (userData) => {
        const response = await api.post('/registration', userData);
        return response.data;
    }
};
