<template>
  <div class="transition-container" @click="goToNext">
    <div class="content">
      <div class="space-background">
        <div class="planet planet-1"></div>
        <div class="planet planet-2"></div>
        <div class="planet planet-3"></div>
      </div>

      <div class="circles-container">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
        <div class="circle circle-4"></div>
        <div class="circle circle-5"></div>
      </div>

      <div class="main-content">
        <div class="logo-text">38μs</div>
        <div class="subtitle">Trading Platform</div>
        <div class="subtitle-zh">交易平台</div>
      </div>

      <div class="glitch-section">
        <div class="glitch-bars"></div>
        <div class="glitch-text">
          <p class="glitch-line">Disconnecting synchronization...</p>
          <p class="glitch-line">Casting 38μs sovereignty...</p>
          <p class="glitch-line-zh">断开同步...</p>
          <p class="glitch-line-zh">铸造38μs主权...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToNext = () => {
  router.push('/transition-dashboard')
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

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.space-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.planet {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.1));
  animation: float 8s ease-in-out infinite;
}

.planet-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  background: radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.2));
  animation-delay: 0s;
}

.planet-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.planet-3 {
  width: 40px;
  height: 40px;
  bottom: 20%;
  left: 20%;
  background: radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.3), rgba(124, 58, 237, 0.1));
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

.circles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(168, 85, 247, 0.3);
  animation: pulse 3s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  border-color: rgba(168, 85, 247, 0.6);
  border-width: 2px;
}

.circle-2 {
  width: 280px;
  height: 280px;
  animation-delay: 0.3s;
}

.circle-3 {
  width: 360px;
  height: 360px;
  animation-delay: 0.6s;
}

.circle-4 {
  width: 440px;
  height: 440px;
  animation-delay: 0.9s;
}

.circle-5 {
  width: 520px;
  height: 520px;
  animation-delay: 1.2s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
}

.main-content {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 200px;
}

.logo-text {
  font-size: 80px;
  font-weight: 700;
  background: linear-gradient(135deg, #a855f7 0%, #d946ef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2s ease-in-out infinite;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  margin-top: 10px;
}

.subtitle-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
  letter-spacing: 1px;
}

@keyframes glow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3);
  }
}

.glitch-section {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  z-index: 20;
}

.glitch-bars {
  position: absolute;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.1) 20%,
    rgba(217, 70, 239, 0.2) 40%,
    rgba(168, 85, 247, 0.1) 60%,
    transparent 100%
  );
  animation: glitchMove 2s linear infinite;
  opacity: 0.6;
}

@keyframes glitchMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.glitch-text {
  position: relative;
  text-align: center;
  padding: 20px;
}

.glitch-line {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 8px 0;
  animation: textGlitch 0.3s infinite;
  text-shadow: 
    2px 0 rgba(168, 85, 247, 0.7),
    -2px 0 rgba(6, 182, 212, 0.7);
}

.glitch-line-zh {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 8px 0;
  animation: textGlitch 0.3s infinite;
  text-shadow: 
    2px 0 rgba(168, 85, 247, 0.7),
    -2px 0 rgba(6, 182, 212, 0.7);
}

.glitch-line:nth-child(2) {
  animation-delay: 0.15s;
}

@keyframes textGlitch {
  0%, 90%, 100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-2px);
  }
  40% {
    transform: translateX(2px);
  }
  60% {
    transform: translateX(-1px);
  }
  80% {
    transform: translateX(1px);
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 60px;
  }

  .subtitle {
    font-size: 16px;
  }

  .glitch-line {
    font-size: 14px;
  }
}
</style>
