<template>
  <div class="complete-container">
    <button class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>

    <button class="check-button" @click="handleSubmit" :disabled="isSubmitting">
      <svg v-if="!isSubmitting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M5 13l4 4L19 7"/>
      </svg>
      <div v-if="isSubmitting" class="loading-spinner"></div>
    </button>

    <div class="content">
      <div class="success-message">
        <p class="message-line success">Transaction successful</p>
        <p class="message-line-zh">交易成功</p>
        <p class="message-line erased">Memory Erased.</p>
        <p class="message-line-zh">记忆被抹去</p>
      </div>

      <div class="address-section">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <label class="address-label">
          <span class="label-en">Mailing Address</span>
          <br/>
          <span class="label-zh">邮寄地址</span>
        </label>
        <input 
          v-model="mailingAddress"
          type="text" 
          class="address-input"
          placeholder=""
          :disabled="isSubmitting"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addressService } from '@/services/address.js'
import { authService } from '@/services/auth.js'

const router = useRouter()
const mailingAddress = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const goBack = () => {
  router.push('/upload')
}

const handleSubmit = async () => {
  if (!mailingAddress.value.trim()) {
    alert('请输入邮寄地址')
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const currentUser = authService.getCurrentUser()
    
    const response = await addressService.submitAddress({
      mailingAddress: mailingAddress.value.trim(),
      userId: currentUser?.id || 'anonymous',
      transactionId: generateTransactionId()
    })

    if (response.code === 200) {
      console.log('Address submitted successfully:', response)
      
      // 保存地址到本地存储
      localStorage.setItem('mailingAddress', mailingAddress.value.trim())
      localStorage.setItem('addressSubmissionTime', new Date().toISOString())
      
      router.push('/loading')
    } else {
      errorMessage.value = response.message || '地址提交失败，请重试'
    }
  } catch (error) {
    console.error('Address submission failed:', error)
    errorMessage.value = error.message || '地址提交失败，请重试'
  } finally {
    isSubmitting.value = false
  }
}

// 生成交易ID
const generateTransactionId = () => {
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}
</script>

<style scoped>
.complete-container {
  width: 100%;
  min-height: 100vh;
  background: #0F0E20;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.back-button {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.check-button {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(34, 197, 94, 0.2);
  border: 2px solid rgba(34, 197, 94, 0.6);
  border-radius: 50%;
  color: #22c55e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.check-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.check-button svg {
  width: 28px;
  height: 28px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.success-message {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-line {
  font-size: 24px;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.message-line.success {
  color: rgba(34, 197, 94, 0.9);
}

.message-line.erased {
  color: rgba(34, 197, 94, 0.9);
  margin-top: 20px;
}

.message-line-zh {
  font-size: 16px;
  color: rgba(34, 197, 94, 0.7);
  margin: 0;
}

.address-section {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.address-label {
  text-align: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.label-en {
  font-size: 16px;
}

.label-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.address-input {
  width: 100%;
  padding: 18px 24px;
  background: transparent;
  border: 2px solid rgba(168, 85, 247, 0.5);
  border-radius: 50px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
  text-align: center;
}

.address-input:focus {
  border-color: rgba(168, 85, 247, 0.8);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.address-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 480px) {
  .content {
    padding-top: 60px;
    gap: 60px;
  }

  .message-line {
    font-size: 20px;
  }
}
</style>
