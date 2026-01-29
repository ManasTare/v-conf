/**
 * Purpose: Redux Store configuration.
 * Combines auth and config slices.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import configReducer from './slices/configSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        config: configReducer,
    },
    // Middleware to disable serializable check if we accidentally store non-serializable data (though we shouldn't)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
