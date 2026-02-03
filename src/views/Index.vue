<template>
  <div class="splash-container">
    <div class="content">
      <div class="logo-section">
        <div class="logo">
          <img src="@/images/logo.png" alt="Logo" />
        </div>
        
        <div class="title-section">
          <h1 class="main-title">38μs Trading Platform</h1>
          <p class="subtitle">38μs交易平台</p>
        </div>
      </div>

      <div class="footer-section">
        <p class="footer-text-en">Sovereignty-related causal intervention mobile terminal</p>
        <p class="footer-text-zh">针对主权的因果干预移动终端</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/login')
  }, 2500)
})
</script>

<style scoped>
.splash-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 60px 30px 40px;
}

.logo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.logo {
  width: 180px;
  height: 180px;
  animation: fadeInScale 1s ease-out;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 30px rgba(147, 51, 234, 0.6));
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.title-section {
  text-align: center;
  animation: fadeInUp 1s ease-out 0.3s both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title {
  font-size: 24px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
}

.footer-section {
  text-align: center;
  animation: fadeIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.footer-text-en,
.footer-text-zh {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin: 4px 0;
}

.footer-text-zh {
  font-size: 12px;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .content {
    padding: 40px 20px 30px;
  }

  .logo {
    width: 150px;
    height: 150px;
  }

  .main-title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 14px;
  }

  .footer-text-en,
  .footer-text-zh {
    font-size: 12px;
  }
}
</style>
