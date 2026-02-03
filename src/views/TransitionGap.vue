<template>
  <div class="transition-container" @click="goToNext">
    <!-- 退出登录按钮 -->
    <button @click.stop="handleLogout" class="logout-btn">
      <span class="logout-icon">⏻</span>
      <span class="logout-text">退出登录</span>
    </button>
    
    <div class="content">
      <div class="header-section">
        <h1 class="main-title">38-microsecond gap</h1>
        <p class="subtitle-zh">38微秒的缝隙</p>
      </div>

      <div class="diagram-section">
        <div class="satellite-section">
          <div class="satellite">
            <div class="satellite-body"></div>
            <div class="satellite-panel left"></div>
            <div class="satellite-panel right"></div>
          </div>
          <div class="label satellite-label">
            <span class="icon">🛰</span>
            <span>卫星时间(Satellite Time)</span>
          </div>
        </div>

        <div class="connection-line">
          <div class="arrow arrow-down"></div>
          <div class="time-badge">引力势阱差异</div>
          <div class="time-badge">(Gravitational Potential Anomaly)</div>
          <div class="arrow arrow-up"></div>
        </div>

        <div class="earth-section">
          <div class="earth">
            <div class="earth-glow"></div>
            <div class="earth-core"></div>
            <div class="earth-ring"></div>
            <div class="earth-ring ring-2"></div>
            <div class="earth-ring ring-3"></div>
          </div>
          <div class="label earth-label">
            <span class="icon">🌍</span>
            <span>地球时间(Earth Time)</span>
          </div>
        </div>

        <div class="tech-elements">
          <div class="tech-line line-1"></div>
          <div class="tech-line line-2"></div>
          <div class="tech-line line-3"></div>
          <div class="data-point point-1">
            <span class="dot"></span>
            <span class="value">+38μs</span>
          </div>
        </div>
      </div>

      <div class="decorative-circles">
        <div class="deco-circle circle-1"></div>
        <div class="deco-circle circle-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.js'

const router = useRouter()

const goToNext = () => {
  router.push('/transition-platform')
}

const handleLogout = async () => {
  try {
    // 调用登出服务
    await authService.logout()
    
    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // 跳转到登录页
    router.push('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
    // 即使API调用失败，也清除本地数据并跳转
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }
}
</script>

<style scoped>
.transition-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.logout-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: rgba(239, 68, 68, 0.9);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.logout-icon {
  font-size: 16px;
  font-weight: bold;
}

.logout-text {
  font-weight: 500;
}

.transition-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  z-index: 10;
}

.header-section {
  text-align: center;
  margin-bottom: 60px;
  margin-top: 40px;
}

.main-title {
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.subtitle-zh {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
}

.diagram-section {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.satellite-section,
.earth-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.satellite {
  position: relative;
  width: 120px;
  height: 80px;
  animation: float 4s ease-in-out infinite;
}

.satellite-body {
  position: absolute;
  width: 40px;
  height: 60px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.satellite-panel {
  position: absolute;
  width: 35px;
  height: 50px;
  background: linear-gradient(90deg, 
    rgba(139, 92, 246, 0.8) 0%, 
    rgba(139, 92, 246, 0.4) 50%,
    rgba(139, 92, 246, 0.8) 100%);
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid rgba(139, 92, 246, 0.6);
}

.satellite-panel.left {
  left: -5px;
}

.satellite-panel.right {
  right: -5px;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.earth {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.earth-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.earth-core {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #3b82f6 0%, #1e40af 100%);
  box-shadow: 
    inset -10px -10px 20px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(59, 130, 246, 0.5);
  z-index: 2;
}

.earth-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(6, 182, 212, 0.4);
  animation: rotate 10s linear infinite;
}

.earth-ring:nth-child(3) {
  width: 120px;
  height: 120px;
}

.earth-ring.ring-2 {
  width: 140px;
  height: 140px;
  animation-duration: 15s;
  animation-direction: reverse;
}

.earth-ring.ring-3 {
  width: 160px;
  height: 160px;
  animation-duration: 20s;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.connection-line {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 120px;
}

.arrow {
  width: 2px;
  height: 40px;
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 0.3));
  position: relative;
}

.arrow::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  left: 50%;
  transform: translateX(-50%);
}

.arrow-down::after {
  bottom: -6px;
  border-top: 8px solid rgba(239, 68, 68, 0.8);
}

.arrow-up {
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.8));
}

.arrow-up::after {
  top: -6px;
  border-bottom: 8px solid rgba(34, 197, 94, 0.8);
}

.time-badge {
  padding: 8px 16px;
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.5);
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
}

.label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.label .icon {
  font-size: 20px;
}

.satellite-label {
  color: rgba(168, 85, 247, 0.9);
}

.earth-label {
  color: rgba(6, 182, 212, 0.9);
}

.tech-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tech-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent);
  animation: lineScan 3s ease-in-out infinite;
}

.tech-line.line-1 {
  width: 150px;
  top: 30%;
  left: -20px;
  animation-delay: 0s;
}

.tech-line.line-2 {
  width: 120px;
  top: 50%;
  right: -10px;
  animation-delay: 1s;
}

.tech-line.line-3 {
  width: 100px;
  bottom: 30%;
  left: 10px;
  animation-delay: 2s;
}

@keyframes lineScan {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(10px);
  }
}

.data-point {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(239, 68, 68, 0.9);
  font-size: 12px;
  font-family: monospace;
}

.data-point.point-1 {
  right: 20px;
  top: 45%;
}

.dot {
  width: 8px;
  height: 8px;
  background: rgba(239, 68, 68, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.decorative-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.deco-circle.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  animation: rotate 30s linear infinite;
}

.deco-circle.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
  animation: rotate 25s linear infinite reverse;
}

@media (max-width: 480px) {
  .logout-btn {
    top: 15px;
    right: 15px;
    padding: 8px 12px;
    font-size: 12px;
  }
  
  .logout-icon {
    font-size: 14px;
  }
  
  .main-title {
    font-size: 24px;
  }

  .subtitle-zh {
    font-size: 16px;
  }

  .diagram-section {
    height: 450px;
  }

  .satellite {
    width: 100px;
    height: 70px;
  }

  .earth {
    width: 120px;
    height: 120px;
  }

  .earth-core {
    width: 80px;
    height: 80px;
  }
}
</style>
