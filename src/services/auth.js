// 用户认证API服务
import api from './api.js'

export const authService = {
  // 用户登录
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', {
        username: credentials.phoneNumber,
        password: credentials.password
      })
      
      // 检查登录成功并保存token
      if (response.code === 200 && response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user_info', JSON.stringify(response.data.user || {}))
      }
      
      return response
    } catch (error) {
      throw error
    }
  },

  // 用户注册
  async register(userData) {
    try {
      const response = await api.post('/auth/register', {
        username: userData.phoneNumber,
        password: userData.password
      })
      
      return response
    } catch (error) {
      throw error
    }
  },

  // 社交登录
  async socialLogin(platform) {
    try {
      const response = await api.post('/auth/social-login', {
        platform: platform
      })
      
      // 检查登录成功并保存token
      if (response.code === 200 && response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user_info', JSON.stringify(response.data.user || {}))
      }
      
      return response
    } catch (error) {
      throw error
    }
  },

  // 退出登录
  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
  },

  // 获取当前用户信息
  getCurrentUser() {
    const userInfo = localStorage.getItem('user_info')
    return userInfo ? JSON.parse(userInfo) : null
  },

  // 检查是否已登录
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  }
}
