/**
 * Purpose: Service for fetching the default configuration for a selected vehicle model.
 * Used to initialize the configurator state.
 */
import api from './api';

export const defaultConfigService = {
    // GET /api/default-config/conf/{modelId}
    getDefaultConfig: async (modelId) => {
        const response = await api.get(`/default-config/conf/${modelId}`);
        return response.data;
    }
};
