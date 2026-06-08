import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.data?.action === 'refresh_token' && !original._retry) {
      original._retry = true
      await api.post('/user/access-token')
      return api(original)
    }
    return Promise.reject(error)
  }
)

export default api
