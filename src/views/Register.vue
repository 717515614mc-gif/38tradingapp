<template>
  <div class="register-container">
    <div class="register-content">
      <div class="back-button" @click="goBack">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </div>

      <div class="logo">
        <img src="@/images/logo.png" alt="Logo">
      </div>

      <div class="title-section">
        <h1 class="title">Create Account</h1>
        <span style="color: #FFFFFF">创建账户</span>
        <p class="subtitle">Join 38μs Trading Platform</p>
        <p class="subtitle">加入38μs交易平台</p>
      </div>

      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="success-message" v-if="successMessage">{{ successMessage }}</div>

      <form @submit.prevent="handleRegister" class="form-container">
        <div class="input-wrapper">
          <input 
            v-model="formData.phoneNumber"
            type="text" 
            id="phoneNumber" 
            class="input-field" 
            placeholder="Your number/你的账号"
            required
          >
        </div>

        <div class="input-wrapper">
          <input 
            v-model="formData.password"
            type="password"
            id="password" 
            class="input-field" 
            placeholder="Your password/你的密码"
            required
          >
        </div>

        <button type="submit" class="register-button" :disabled="isSubmitting">
          <span>{{ isSubmitting ? 'Signing up...' : 'Sign Up/注册' }}</span>
        </button>
      </form>

      <div class="login-link">
        Already have an account? <router-link to="/login">Log in</router-link>
        <br>
        <span class="chinese">已有账户？<router-link to="/login">立即登录</router-link></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.js'

const router = useRouter()

const formData = ref({
  phoneNumber: '',
  password: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const showError = (message) => {
  errorMessage.value = message
  successMessage.value = ''
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}

const showSuccess = (message) => {
  successMessage.value = message
  errorMessage.value = ''
}

const handleRegister = async () => {
  const { phoneNumber, password } = formData.value

  if (!phoneNumber || !password) {
    showError('Please fill in all fields')
    return
  }

  isSubmitting.value = true

  try {
    const response = await authService.register({
      phoneNumber,
      password
    })
    
    // 检查后端返回的状态
    if (response.code === 200) {
      showSuccess('Registration successful! Redirecting to login page...')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      // 显示后端返回的具体错误信息
      showError(response.message || 'Registration failed, please try again')
    }
  } catch (error) {
    showError(error.message || 'Registration failed, please try again')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  width: 100%;
  min-height: 100vh;
  background: #0F0E20;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.register-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(26, 29, 46, 0.8);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.back-button:active {
  transform: scale(0.95);
  background: rgba(88, 80, 236, 0.3);
}

.back-button svg {
  width: 24px;
  height: 24px;
  fill: #ffffff;
}

.logo {
  width: 120px;
  height: 120px;
  margin: 40px auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%);
  border-radius: 50%;
  filter: blur(30px);
  z-index: 0;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.5));
}

.title-section {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
}

.form-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 16px 20px;
  background: rgba(26, 29, 46, 0.8);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 50px;
  color: #ffffff !important;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
  -webkit-text-fill-color: #ffffff !important;
  caret-color: #ffffff;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
  opacity: 1;
}

.input-field:-webkit-autofill,
.input-field:-webkit-autofill:hover,
.input-field:-webkit-autofill:focus,
.input-field:-webkit-autofill:active {
  -webkit-text-fill-color: #ffffff !important;
  -webkit-box-shadow: 0 0 0px 1000px rgba(26, 29, 46, 0.8) inset !important;
  box-shadow: 0 0 0px 1000px rgba(26, 29, 46, 0.8) inset !important;
  transition: background-color 5000s ease-in-out 0s;
  color: #ffffff !important;
  caret-color: #ffffff !important;
}

.input-field:focus {
  border-color: rgba(168, 85, 247, 0.8);
  background: rgba(88, 80, 236, 0.2);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  padding: 0 10px;
}

.terms-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #a855f7;
  margin-top: 2px;
  flex-shrink: 0;
}

.terms-checkbox label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.terms-checkbox a {
  color: #a855f7;
  text-decoration: none;
  font-weight: 600;
}

.register-button {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 70%, #d946ef 100%);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.register-button:active:not(:disabled) {
  transform: scale(0.98);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
}

.register-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 20px;
}

.login-link a {
  color: #a855f7;
  text-decoration: none;
  font-weight: 600;
}

.error-message {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #fca5a5;
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.success-message {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: #86efac;
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

@media (max-width: 480px) {
  .register-content {
    padding: 30px 20px;
  }
}
</style>
