import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { LoginCredentials, AuthResponse } from '@/types/auth';

// JWT Secret Key (in a real app, this would be in an environment variable)
const JWT_SECRET = 'your-secret-key';
const TOKEN_EXPIRY = '30d';

// Create an axios instance
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on 401 responses
      authService.logout();
    }
    return Promise.reject(error);
  }
);

export const authService = {
  generateToken(payload: { email: string; id: string; role: string }) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    } catch {
      return null;
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Authentication failed';
        throw new Error(message);
      }
      throw error;
    }
  },

  async logout() {
    try {
      // Call logout endpoint to clear HTTP-only cookie
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear client-side cookie
      Cookies.remove('auth_token', { path: '/' });
    }
  },

  getToken() {
    return Cookies.get('auth_token') || null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    const payload = this.verifyToken(token);
    if (!payload) return null;

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  },
}; 