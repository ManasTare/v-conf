/**
 * Purpose: Authentication API service.
 * Handles login, password recovery, and user session token management.
 */
import api from './api';

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },

    forgotPassword: async (email, newPassword) => {
        const response = await api.put('/auth/forgot', { email, newPassword });
        return response.data;
    },

    logout: () => {
        // Redux action will handle cleanup.
        // If we need to call an API to kill session on server, do it here.
        // For JWT, client-side only is mostly fine.
    },

    // Legacy method for non-React components if needed, but Redux store.getState() is better.
    // Keeping for temporary compatibility if something else breaks.
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    }
};
