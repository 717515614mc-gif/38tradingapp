<template>
  <div class="final-container" @click="goToQuote">
    <button class="back-button" @click.stop="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>

    <div class="content">
      <div class="title-section">
        <h1 class="main-title">The Commercial Trade of Time</h1>
        <h2 class="microseconds">38 microseconds</h2>
        <p class="subtitle-zh">38微秒时间的贸易</p>
      </div>

      <div class="coin-section">
        <div class="coin-3d">
          <div class="coin-flipper">
            <div class="coin-front">
              <img src="@/images/yb-zheng.png" alt="Coin Front" />
            </div>
            <div class="coin-back">
              <img src="@/images/yb-fan.png" alt="Coin Back" />
            </div>
            <div v-for="n in 37" :key="n" class="coin-edge"></div>
          </div>
        </div>
        <p class="coin-label-en">Relativity Time Coin</p>
        <p class="coin-label-zh">相对论时间币</p>
      </div>

      <div class="carousel-section">
        <div class="carousel-container" 
             @click.stop
             @touchstart="handleTouchStart"
             @touchmove="handleTouchMove"
             @touchend="handleTouchEnd">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-item">
              <img src="@/images/zheng.jpg" alt="Carousel 1" class="carousel-image" />
            </div>
            <div class="carousel-item">
              <img src="@/images/fan.jpg" alt="Carousel 2" class="carousel-image" />
            </div>
          </div>
        </div>
        <div class="carousel-dots">
          <span 
            v-for="(item, index) in 2" 
            :key="index"
            class="dot" 
            :class="{ active: currentIndex === index }"
            @click.stop="setCarouselIndex(index)">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)

const goBack = () => {
  router.push('/upload')
}

const goToQuote = () => {
  router.push('/quote')
}

const setCarouselIndex = (index) => {
  currentIndex.value = index
}

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const threshold = 50

  if (Math.abs(diff) > threshold) {
    if (diff > 0 && currentIndex.value < 1) {
      currentIndex.value++
    } else if (diff < 0 && currentIndex.value > 0) {
      currentIndex.value--
    }
  }
}
</script>

<style scoped>
.final-container {
  width: 100%;
  min-height: 100vh;
  background: #0F0E20;
  position: relative;
  padding: 60px 20px 40px;
  overflow-y: auto;
  cursor: pointer;
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

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 20px;
}

.title-section {
  text-align: center;
}

.main-title {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px 0;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.microseconds {
  font-size: 32px;
  color: #06b6d4;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.subtitle-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.coin-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.coin-3d {
  width: 250px;
  height: 250px;
  perspective: 1000px;
  filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 45px rgba(192, 192, 192, 0.3));
}

.coin-flipper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: coinFlip 6s linear infinite;
}

@keyframes coinFlip {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

.coin-front,
.coin-back,
.coin-edge {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.coin-front,
.coin-back {
  backface-visibility: hidden;
  overflow: hidden;
}

.coin-front {
  transform: translateZ(6px);
  z-index: 2;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
}

.coin-back {
  transform: rotateY(180deg) translateZ(6px);
  z-index: 1;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
}

.coin-edge {
  background: linear-gradient(to right, #2c2f3a, #e0e0e0, #2c2f3a);
  backface-visibility: visible;
}

.coin-edge:nth-of-type(3) { transform: translateZ(5px); }
.coin-edge:nth-of-type(4) { transform: translateZ(4px); }
.coin-edge:nth-of-type(5) { transform: translateZ(3px); }
.coin-edge:nth-of-type(6) { transform: translateZ(2px); }
.coin-edge:nth-of-type(7) { transform: translateZ(1px); }
.coin-edge:nth-of-type(8) { transform: translateZ(0px); }
.coin-edge:nth-of-type(9) { transform: translateZ(-1px); }
.coin-edge:nth-of-type(10) { transform: translateZ(-2px); }
.coin-edge:nth-of-type(11) { transform: translateZ(-3px); }
.coin-edge:nth-of-type(12) { transform: translateZ(-4px); }
.coin-edge:nth-of-type(13) { transform: translateZ(-5px); }

.coin-front img,
.coin-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.coin-label-en {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.coin-label-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.carousel-section {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  touch-action: pan-y;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease-out;
}

.carousel-item {
  flex-shrink: 0;
  width: 100%;
}

.carousel-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #a855f7;
  width: 24px;
  border-radius: 5px;
}

@media (max-width: 480px) {
  .main-title {
    font-size: 18px;
  }

  .microseconds {
    font-size: 28px;
  }

  .coin-3d {
    width: 220px;
    height: 220px;
  }

  .carousel-section {
    max-width: 100%;
  }
}
</style>
