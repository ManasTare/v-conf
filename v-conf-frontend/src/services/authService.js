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

                // Keep existing user structure or create new one from token
                // Try to decode JWT to get User ID if available
                try {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    const payload = JSON.parse(jsonPayload);

                    // Assuming payload has userId or id. 
                    // Adjust key based on backend JWT structure.
                    const userId = payload.userId || payload.id || payload.sub; // sub is usually username

                    // We also have username from the login request 'username' arg
                    const userObj = {
                        username: username,
                        id: userId && !isNaN(parseInt(userId)) ? parseInt(userId) : 1, // Fallback to 1 if not numeric
                        // Store other claims if useful
                        companyName: payload.companyName || username
                    };

                    localStorage.setItem('user', JSON.stringify(userObj));
                } catch (e) {
                    // Fallback if not JWT or decode fails
                    const userObj = { username: username, id: 1 };
                    localStorage.setItem('user', JSON.stringify(userObj));
                }
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
