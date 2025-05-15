import { defineStore } from 'pinia'
const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null;
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        user = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Restore localStorage if data is corrupted
      localStorage.removeItem('user');
    }

    return {
      user: user,
      // We don't store the token anymore since we'll use the cookie
      // just store a flag to track login status
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    }
  },

  getters: {
    // Instead of token, we use the isAuthenticated flag
    isLoggedIn: (state) => state.isAuthenticated,
    isAdmin: (state) => state.user?.is_admin === true,
  },

  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;

      // Store only user data in localStorage, not the token
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');

      console.log('Login complete. Using cookie authentication.');
    },

    logout() {
      // Clear local state
      this.user = null;
      this.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      // Call logout endpoint to clear the cookie
      // const API_URL = import.meta.env.VITE_API_URL || '';

      // Make a request to clear the cookie on logout
      fetch(`${API_URL}auth/logout`, {
        method: 'POST',
        credentials: 'include'
      }).catch(err => {
        console.error('Error during logout:', err);
      });
    },

    // Method to check if the user is still authenticated with the server
    async checkAuthStatus() {
      try {
        // const API_URL = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${API_URL}auth/status`, {
          credentials: 'include'  // Important for sending cookies
        });

        if (!response.ok) {
          // If not authenticated, clear the local state
          this.logout();
          return false;
        }

        // If authenticated, maintain the state
        return true;
      } catch (error) {
        console.error('Error checking authentication status:', error);
        return false;
      }
    }
  },
})
