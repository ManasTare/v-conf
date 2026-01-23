import api from './api';

export const authService = {
    login: async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            // The backend returns the token string directly in the body, or potentially wrapped.
            // Based on UserController.java: return ResponseEntity.ok(token); (String)
            // Axios data will be the string itself if it's plain text, or object if JSON.
            // Let's assume it returns a raw string or valid JSON string.
            const token = response.data;
            if (token) {
                localStorage.setItem('access_token', token);
                // The backend doesn't return user object in login response, so we might need to decode token or fetch user details separately.
                // For now, we'll store what we have.
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('access_token');
    }
};
