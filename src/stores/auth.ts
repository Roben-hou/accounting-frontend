import { defineStore } from 'pinia'

export const userAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: localStorage.getItem('token') || ''
    }
    },
  getters: {
    isLogin: (state) => !!state.token,
    username: (state): string => {
      if (!state.token) return ''
      try {
        const base64Url = state.token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const pad = base64.length % 4
        const paddedBase64 = pad ? base64 + '='.repeat(4 - pad) : base64
        const jsonPayload = decodeURIComponent(
          window.atob(paddedBase64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        const payload = JSON.parse(jsonPayload)
        return payload.username || payload.name || payload.sub || ''
      } catch (e) {
        console.error('Failed to decode token for username', e)
        return ''
      }
    }
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