import api from './api.js'

export const statisticsService = {
  // 获取每日审核通过的提交统计
  async getDailyApprovedSubmissions(startDate, endDate) {
    try {
      const response = await api.get('/statistics/daily-approved', {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      })
      return response
    } catch (error) {
      console.error('获取每日统计数据失败:', error)
      throw error
    }
  },

  // 获取指定日期范围内的提交统计概览
  async getSubmissionOverview(startDate, endDate) {
    try {
      const response = await api.get('/statistics/overview', {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      })
      return response
    } catch (error) {
      console.error('获取统计概览失败:', error)
      throw error
    }
  }
}

export default statisticsService
