/**
 * Purpose: Auth Slice (Redux).
 * Manages user authentication state, token storage, and JWT decoding.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

// Thunks
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            // Using the service but expecting it to return data, not side-effect
            const response = await authService.login(username, password);
            return response; // Should be token or object containing token
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

// Initial State
// Try to hydrate from localStorage immediately
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('access_token');

const initialState = {
    user: storedUser || null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // Side effect: clean up persistent storage
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
        },
        // Action to manually set user if needed (e.g., after registration auto-login)
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('access_token', action.payload.token);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                // Logic duplicates authService parsing? 
                // We should ideally move parsing here or keep it in service and return pure object.
                // For now, let's rely on what we put in localStorage during service call (Wait, we're removing side effects!)

                // We need to parse the token here if the service doesn't return the user object directly.
                // Re-implementing parsing logic here for Redux purity:

                const token = typeof action.payload === 'string' ? action.payload : action.payload.token || action.payload; // Adapt to backend
                state.token = token;

                // Parse JWT
                try {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    const payload = JSON.parse(jsonPayload);

                    const userId = payload.userId || payload.id || payload.sub;
                    const username = payload.sub || "User"; // Fallback

                    state.user = {
                        username: username,
                        id: userId && !isNaN(parseInt(userId)) ? parseInt(userId) : 1,
                        companyName: payload.companyName
                    };
                } catch (e) {
                    console.error(e);
                    state.user = { username: "User", id: 1 };
                }

                // Persistence
                localStorage.setItem('access_token', state.token);
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
