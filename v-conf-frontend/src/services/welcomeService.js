import api from './api';

export const welcomeService = {
    // GET /api/welcome/segments
    getSegments: async () => {
        const response = await api.get('/welcome/segments');
        return response.data;
    },

    // GET /api/welcome/manufacturers/{segId}
    getManufacturers: async (segId) => {
        const response = await api.get(`/welcome/manufacturers/${segId}`);
        return response.data;
    },

    // GET /api/welcome/models?segId=X&mfgId=Y
    getModels: async (segId, mfgId) => {
        const response = await api.get('/welcome/models', {
            params: { segId, mfgId }
        });
        return response.data;
    }
};
