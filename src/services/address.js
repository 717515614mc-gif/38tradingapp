// 地址记录API服务
import api from './api.js'

export const addressService = {
  // 提交邮寄地址
  async submitAddress(addressData) {
    try {
      const response = await api.post('/submission/submit', {
        address: addressData.mailingAddress,
        userId: addressData.userId,
        transactionId: addressData.transactionId,
        timestamp: new Date().toISOString()
      })
      
      return response
    } catch (error) {
      throw error
    }
  },

  // 获取提交记录历史
  async getSubmissionHistory() {
    try {
      const response = await api.get('/submission/history')
      return response
    } catch (error) {
      throw error
    }
  },

  // 更新提交信息
  async updateSubmission(submissionId, submissionData) {
    try {
      const response = await api.put(`/submission/${submissionId}`, {
        mailingAddress: submissionData.mailingAddress,
        updatedAt: new Date().toISOString()
      })
      
      return response
    } catch (error) {
      throw error
    }
  }
}
