/**
 * Purpose: Context provider for Internationalization.
 * Fetches and provides localized strings for the application.
 */
import { createContext, useState, useEffect, useContext } from 'react';
import i18nService from '../services/i18nService';

/* eslint-disable react-refresh/only-export-components */
const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [i18nData, setI18nData] = useState({
        navbar: {},
        footer: {},
        login: {},
        welcome: {},
        features: {},
        contact: {},
        registration: {}
    });
    const [loading, setLoading] = useState(true);

    const fetchTranslations = async (lang) => {
        setLoading(true);
        try {
            const [navbar, footer, login, welcome, features, contact, registration] = await Promise.all([
                i18nService.getNavbar(lang),
                i18nService.getFooter(lang),
                i18nService.getLogin(lang),
                i18nService.getWelcome(lang),
                i18nService.getFeatures(lang),
                i18nService.getContact(lang),
                i18nService.getRegistration(lang)
            ]);

            setI18nData({
                navbar,
                footer,
                login,
                welcome,
                features,
                contact,
                registration
            });
        } catch (error) {
            console.error("Failed to fetch translations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTranslations(language);
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <I18nContext.Provider value={{ language, changeLanguage, i18n: i18nData, loading }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext);
