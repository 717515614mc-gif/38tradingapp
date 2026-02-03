<template>
  <div class="quote-container">
    <div class="overlay-content">
      <button class="back-button" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <div class="content">
        <div class="quote-section">
          <p class="quote-text-en">We capture the 38 microseconds caused by</p>
          <p class="quote-text-en">the gravitational difference</p>
          <p class="quote-text-en">This is the only time untouched by consensus</p>
          <p class="quote-text-zh">我们捕捉因引力差产生的38微秒</p>
          <p class="quote-text-zh">这是唯一未被共识污染的时间</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/final')
}
</script>

<style scoped>
.quote-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #0F0E20 url('@/images/end.png') center/cover no-repeat;
}

.quote-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 14, 32, 0.7) 0%,
    rgba(15, 14, 32, 0.5) 30%,
    rgba(15, 14, 32, 0.3) 60%,
    rgba(15, 14, 32, 0.6) 100%
  );
  z-index: 1;
  pointer-events: none;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.3;
  filter: brightness(1.3);
}

.overlay-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.back-button {
  position: absolute;
  top: 40px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: all 0.3s;
  pointer-events: auto;
}

.back-button:active {
  transform: scale(0.95);
  background: rgba(0, 0, 0, 0.7);
}

.back-button:hover {
  opacity: 0.7;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 3;
}

.quote-section {
  text-align: center;
  padding: 20px;
  max-width: 500px;
}

.quote-text-en {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 6px 0;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(192, 192, 192, 0.8), 0 0 20px rgba(192, 192, 192, 0.4);
}

.quote-text-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 6px 0;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(192, 192, 192, 0.8), 0 0 20px rgba(192, 192, 192, 0.4);
}

@media (max-width: 480px) {
  .content {
    padding: 80px 15px 30px;
  }

  .quote-text-en {
    font-size: 14px;
  }

  .quote-text-zh {
    font-size: 14px;
  }
}
</style>
