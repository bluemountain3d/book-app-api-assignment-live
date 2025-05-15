import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // state: () => ({
  //   user: JSON.parse(localStorage.getItem('user')) || null,
  //   token: localStorage.getItem('token') || null,
  // }),

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
      token: localStorage.getItem('token') || null,
    }
  },
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.is_admin === true,
  },

  actions: {
    login(userData, token) {
      this.user = userData
      this.token = token
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
