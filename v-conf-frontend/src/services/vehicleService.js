import api from './api';

export const vehicleService = {
    getSegments: async () => {
        const response = await api.get('/vehicles/segments');
        return response.data;
    },

    getManufacturers: async (segmentId) => {
        const response = await api.get(`/vehicles/manufacturers?segment=${segmentId}`);
        return response.data;
    },

    getModels: async (manufacturerId, segmentId) => {
        const response = await api.get(`/vehicles/models?manufacturer=${manufacturerId}&segment=${segmentId}`);
        return response.data;
    },

    getModelDetails: async (modelId) => {
        const response = await api.get(`/vehicles/models/${modelId}`);
        return response.data;
    },

    // New method to get configuration options (interior, exterior, etc.)
    getOptions: async (modelId) => {
        const response = await api.get(`/vehicles/models/${modelId}/options`);
        return response.data;
    },

    // Store initial selection to local/session storage or context
    saveSelection: (selection) => {
        localStorage.setItem('current_order_selection', JSON.stringify(selection));
    },

    getSelection: () => {
        const stored = localStorage.getItem('current_order_selection');
        return stored ? JSON.parse(stored) : null;
    }
};
