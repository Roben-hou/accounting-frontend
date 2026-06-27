import { defineStore } from 'pinia'

export const userAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: localStorage.getItem('token') || ''
    }
    },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    setToken(newToken: string) {
      this.token = newToken
      localStorage.setItem('token', newToken)
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})