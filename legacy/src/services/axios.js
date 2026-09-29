import axios from 'axios'

const configuredBase = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5000'
const apiBase = configuredBase.replace(/\/+$/, '')
const apiBaseUrl = apiBase.endsWith('/api/v1') ? apiBase : `${apiBase}/api/v1`

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bablons_admin_token') || localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      localStorage.removeItem('bablons_admin_token')
      localStorage.removeItem('bablons_admin_user')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    if (status === 403 && window.location.pathname.startsWith('/admin')) {
      window.dispatchEvent(new CustomEvent('admin:forbidden'))
    }
    return Promise.reject(error)
  }
)

export default api
