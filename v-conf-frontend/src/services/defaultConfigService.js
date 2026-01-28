import api from './api';

export const defaultConfigService = {
    // GET /api/default-config/conf/{modelId}
    getDefaultConfig: async (modelId) => {
        const response = await api.get(`/default-config/conf/${modelId}`);
        return response.data;
    }
};
