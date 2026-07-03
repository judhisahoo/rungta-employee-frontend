const TOKEN_KEY = 'rungta_access_token'
const REFRESH_KEY = 'rungta_refresh_token'
const USER_KEY = 'rungta_user'

export const authStore = {
  get token() {
    return localStorage.getItem(TOKEN_KEY)
  },
  get user() {
    const rawUser = localStorage.getItem(USER_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  },
  setSession(payload) {
    localStorage.setItem(TOKEN_KEY, payload.access_token)
    localStorage.setItem(REFRESH_KEY, payload.refresh_token || '')
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user || {}))
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
  },
  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY))
  },
}
