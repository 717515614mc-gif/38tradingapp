<template>
  <div class="loading-container">
    <div class="top-bar">
      <div class="icon-group">
        <div class="icon sigma">Σ</div>
        <div class="icon lightning">⚡</div>
        <div class="icon close">✕</div>
      </div>
      <div class="progress-indicator">
        <div class="progress-bar-top">
          <div class="progress-fill-top" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1
    } else {
      clearInterval(interval)
      setTimeout(() => {
        router.push('/final')
      }, 500)
    }
  }, 30)
})
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20 url('@/images/load.png') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.icon-group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.icon {
  font-size: 24px;
  color: #a855f7;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
  animation: iconGlow 2s ease-in-out infinite;
}

.icon.lightning {
  font-size: 28px;
}

@keyframes iconGlow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.progress-indicator {
  flex: 1;
  max-width: 200px;
  margin-left: 20px;
}

.progress-bar-top {
  width: 100%;
  height: 8px;
  background: rgba(26, 29, 46, 0.6);
  border-radius: 4px;
  border: 1px solid rgba(168, 85, 247, 0.4);
  overflow: hidden;
}

.progress-fill-top {
  height: 100%;
  background: linear-gradient(90deg, #a855f7 0%, #d946ef 100%);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
}

@media (max-width: 480px) {
  .icon {
    font-size: 20px;
  }

  .icon-group {
    gap: 15px;
  }

  .progress-indicator {
    max-width: 150px;
  }
}
</style>
