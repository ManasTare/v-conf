/**
 * Purpose: Service for fetching internationalization (i18n) content from the backend for various UI components.
 * Fetches localized text for Navbar, Footer, Login, etc.
 */
import api from './api';

const i18nService = {
    getNavbar: async (lang) => {
        const response = await api.get('/i18n/navbar', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    },
    getFooter: async (lang) => {
        const response = await api.get('/i18n/footer', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    },
    getLogin: async (lang) => {
        const response = await api.get('/i18n/login', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    },
    getWelcome: async (lang) => {
        const response = await api.get('/i18n/welcome', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    },
    getFeatures: async (lang) => {
        const response = await api.get('/i18n/features', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    },
    getContact: async (lang) => {
        const response = await api.get('/i18n/contact', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    },
    getRegistration: async (lang) => {
        const response = await api.get('/i18n/registration', {
            headers: { 'Accept-Language': lang }
        });
        return response.data;
    }
};

export default i18nService;
