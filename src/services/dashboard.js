// 仪表板数据API服务
import api from './api.js'

export const dashboardService = {
  // 获取因果裂缝波动数据
  async getCausalRiftData() {
    try {
      const response = await api.get('/dashboard/causal-rift')
      return response
    } catch (error) {
      throw error
    }
  },

  // 获取38微秒主权监控数据
  async getSovereigntyData() {
    try {
      const response = await api.get('/dashboard/sovereignty')
      return response
    } catch (error) {
      throw error
    }
  },

  // 获取实时时间差数据
  async getTimeDifferenceData() {
    try {
      const response = await api.get('/dashboard/time-difference')
      return response
    } catch (error) {
      throw error
    }
  },

  // 获取STIME代币价格
  async getStimePrice() {
    try {
      const response = await api.get('/dashboard/stime-price')
      return response
    } catch (error) {
      throw error
    }
  }
}
