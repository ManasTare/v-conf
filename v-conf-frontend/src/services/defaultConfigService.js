import api from './api';

export const defaultConfigService = {
    // GET /api/default-config/{modelId}?qty=X
    getDefaultConfig: async (modelId, qty) => {
        const response = await api.get(`/default-config/${modelId}`, {
            params: { qty }
        });
        return response.data;
    }
};
