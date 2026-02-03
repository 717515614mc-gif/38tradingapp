<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo">
        <img src="@/images/logo.png" alt="Logo" />
      </div>

      <div class="form-container">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="input-wrapper">
          <input 
            v-model="phoneNumber"
            type="text" 
            placeholder="number/账号"
            class="input-field"
            :disabled="isLoading"
          />
        </div>

        <div class="input-wrapper">
          <input 
            v-model="password"
            type="password" 
            placeholder="password/密码"
            class="input-field"
            :disabled="isLoading"
            @keyup.enter="handleLogin"
          />
        </div>

        <button class="login-button" @click="handleLogin" :disabled="isLoading">
          <span v-if="!isLoading" class="button-text-en">Log In</span>
          <span v-if="!isLoading" class="button-text-zh">登录</span>
          <span v-if="isLoading" class="button-text-en">Logging in...</span>
          <span v-if="isLoading" class="button-text-zh">登录中...</span>
        </button>
      </div>

      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-text">Or</span>
        <span class="divider-line"></span>
      </div>

      <div class="social-login">
        <button class="social-button" @click="handleSocialLogin('qq')">
          <img src="@/images/qq.png" alt="QQ" />
        </button>
        <button class="social-button" @click="handleSocialLogin('wechat')">
          <img src="@/images/wx.png" alt="WeChat" />
        </button>
        <button class="social-button" @click="handleSocialLogin('steam')">
          <img src="@/images/go.png" alt="Steam" />
        </button>
      </div>

      <div class="footer-text">
        <p>Not time</p>
        <p>but freedom <span class="highlight">38 microseconds stolen from gravity's cage.</span></p>
        <p class="chinese">卖给你的不是时间，而是从引力监狱中偷来的38微秒自由</p>
      </div>

      <div class="register-link">
        <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
        <p class="chinese">还没有账户？<router-link to="/register">立即注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.js'

const router = useRouter()
const phoneNumber = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!phoneNumber.value || !password.value) {
    errorMessage.value = '请输入手机号和密码'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await authService.login({
      phoneNumber: phoneNumber.value,
      password: password.value
    })
    
    // 检查登录是否成功
    if (response.code === 200 && response.data && response.data.token) {
      // 登录成功，跳转到下一页
      router.push('/transition-gap')
    } else {
      // 显示后端返回的错误信息
      errorMessage.value = response.message || '登录失败，请重试'
    }
  } catch (error) {
    errorMessage.value = error.message || '登录失败，请重试'
  } finally {
    isLoading.value = false
  }
}

const handleSocialLogin = async (platform) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await authService.socialLogin(platform)
    router.push('/transition-gap')
  } catch (error) {
    errorMessage.value = error.message || '社交登录失败，请重试'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.login-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px 40px;
  overflow-y: auto;
}

.logo {
  width: 200px;
  height: 200px;
  margin: 80px auto 60px;
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
  width: 250px;
  height: 250px;
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

.form-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  color: #ef4444;
  font-size: 14px;
  text-align: center;
}

.input-wrapper {
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 18px 24px;
  background: rgba(26, 29, 46, 0.8);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 50px;
  color: #ffffff !important;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  -webkit-text-fill-color: #ffffff !important;
  caret-color: #ffffff;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
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

.login-button {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 70%, #d946ef 100%);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.6);
}

.login-button:active {
  transform: translateY(0);
}

.button-text-en {
  font-size: 18px;
}

.button-text-zh {
  font-size: 14px;
  opacity: 0.9;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 30px 0;
  gap: 16px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.divider-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
}

.social-login {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.social-button {
  width: 60px;
  height: 60px;
  background: rgba(88, 80, 236, 0.15);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-button:hover {
  background: rgba(88, 80, 236, 0.25);
  border-color: rgba(139, 92, 246, 0.6);
  transform: translateY(-2px);
}

.social-button img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.footer-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  line-height: 1.6;
  max-width: 400px;
}

.footer-text p {
  margin: 4px 0;
}

.footer-text .highlight {
  color: #06b6d4;
  font-weight: 500;
}

.footer-text .chinese {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 8px;
}

@media (max-width: 480px) {
  .login-content {
    padding: 20px 20px;
  }

  .logo {
    width: 120px;
    height: 120px;
    margin-bottom: 40px;
  }

  .input-field {
    padding: 16px 20px;
    font-size: 15px;
  }

  .login-button {
    padding: 16px 20px;
  }

  .social-button {
    width: 55px;
    height: 55px;
  }
}

.register-link {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.register-link a {
  color: #a855f7;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.register-link a:hover {
  color: #d946ef;
  text-decoration: underline;
}
</style>
