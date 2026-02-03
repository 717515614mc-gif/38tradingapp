<template>
  <div class="dashboard-container" @click="goToNext">
    <div class="content">
      <section class="chart-section top-chart">
        <h2 class="section-title">Causal Rift Fluctuation</h2>
        <p class="section-subtitle">因果裂缝波动图</p>
        
        <div class="chart-container">
          <canvas ref="chartCanvas" class="chart-canvas"></canvas>
        </div>
      </section>

      <section class="dashboard-title-section">
        <h1 class="main-title">Daily Submission Statistics</h1>
        <p class="main-subtitle">每日提交统计</p>
      </section>

      <!-- 日期选择器 -->
      <section class="date-selector-section" @click.stop>
        <div class="date-controls">
          <div class="date-input-group">
            <label>开始日期/Start Date:</label>
            <input 
              type="date" 
              v-model="startDate" 
              @change="fetchData"
              @click.stop
              class="date-input"
            />
          </div>
          <div class="date-input-group">
            <label>结束日期/End Date :</label>
            <input 
              type="date" 
              v-model="endDate" 
              @change="fetchData"
              @click.stop
              class="date-input"
            />
          </div>
          <button @click.stop="setQuickRange('7days')" class="quick-btn">最近7天/Last 7 days</button>
          <button @click.stop="setQuickRange('14days')" class="quick-btn">最近14天/Last 14 days</button>
          <button @click.stop="setQuickRange('30days')" class="quick-btn">最近30天/Last 30 days</button>
        </div>
      </section>

      <section class="chart-section bottom-chart">
        <div class="glitch-overlay"></div>
        
        <div class="chart-container large">
          <div v-if="loading" class="loading-overlay">
            <div class="loading-spinner"></div>
            <p>加载数据中...</p>
          </div>
          <canvas ref="bottomChartCanvas" class="bottom-chart-canvas"></canvas>
        </div>
        
        <div class="chart-description">
          <p class="desc-en">Daily approved submissions (Max: 38)</p>
          <p class="desc-zh">每日审核通过的提交数量（最高：38）</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dashboardService } from '@/services/dashboard.js'
import { statisticsService } from '@/services/statistics.js'

const router = useRouter()
const chartCanvas = ref(null)
const bottomChartCanvas = ref(null)
const isLoading = ref(true)
const loading = ref(false)
const causalRiftData = ref([])
const sovereigntyData = ref([])
const chartData = ref([])

// 日期选择
const startDate = ref('')
const endDate = ref('')

const goToNext = () => {
  router.push('/upload')
}

// 设置快速日期范围
const setQuickRange = (range) => {
  const today = new Date()
  const end = new Date(today)
  let start = new Date(today)
  
  switch (range) {
    case '7days':
      start.setDate(today.getDate() - 6)
      break
    case '14days':
      start.setDate(today.getDate() - 13)
      break
    case '30days':
      start.setDate(today.getDate() - 29)
      break
  }
  
  startDate.value = start.toISOString().split('T')[0]
  endDate.value = end.toISOString().split('T')[0]
  fetchData()
}

// 获取真实数据
const fetchData = async () => {
  if (!startDate.value || !endDate.value) return
  
  loading.value = true
  try {
    const response = await statisticsService.getDailyApprovedSubmissions(
      startDate.value, 
      endDate.value
    )
    
    if (response.code === 200 && response.data) {
      chartData.value = response.data
    } else {
      // 如果API返回错误或无数据，使用模拟数据
      chartData.value = generateFallbackData()
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    // API调用失败时使用模拟数据
    chartData.value = generateFallbackData()
  } finally {
    loading.value = false
    animateBottomChart()
  }
}

// 生成模拟数据作为后备
const generateFallbackData = () => {
  const data = []
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const value = Math.floor(Math.random() * 39) // 0-38
    const isHighlight = value >= 35
    
    data.push({
      date: new Date(d),
      time: `${d.getMonth() + 1}/${d.getDate()}`,
      value: value,
      highlight: isHighlight
    })
  }
  
  return data
}

onMounted(async () => {
  // 初始化为最近14天
  setQuickRange('14days')
  
  try {
    // 获取第一个图表数据
    const causalRift = await dashboardService.getCausalRiftData()
    causalRiftData.value = causalRift.data || []
    
    isLoading.value = false
    
    // 数据加载完成后开始动画
    setTimeout(() => {
      animateChart()
    }, 100)
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    isLoading.value = false
    
    // 即使数据加载失败，也显示默认动画
    setTimeout(() => {
      animateChart()
    }, 100)
  }
})

const animateChart = () => {
  let progress = 0
  const duration = 2000
  const startTime = Date.now()
  
  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    progress = Math.min(elapsed / duration, 1)
    
    drawChart(progress)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  animate()
}

const animateBottomChart = () => {
  let progress = 0
  const duration = 2500
  const startTime = Date.now()
  
  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    progress = Math.min(elapsed / duration, 1)
    
    drawBottomChart(progress)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  animate()
}

const generateChartData = () => {
  // 如果有API数据，使用API数据
  if (causalRiftData.value.length > 0) {
    return causalRiftData.value.map(item => item.value)
  }
  
  // 否则使用默认模拟数据
  const data = []
  const points = 200
  
  for (let i = 0; i < points; i++) {
    let value = 0
    
    if (i >= 70 && i <= 110) {
      const localPos = (i - 70) / 40
      value = Math.random() * 3000 + Math.sin(localPos * Math.PI * 8) * 5000 + 5000
    } else if (i >= 115 && i <= 125) {
      const localPos = (i - 115) / 10
      value = Math.sin(localPos * Math.PI) * 6000 + 4000
    } else if (i >= 140 && i <= 175) {
      const localPos = (i - 140) / 35
      value = Math.random() * 2000 + Math.sin(localPos * Math.PI * 6) * 4000 + 4000
    } else {
      value = Math.random() * 200 + 100
    }
    
    data.push(Math.max(0, value))
  }
  
  return data
}

const drawChart = (progress = 1) => {
  const canvas = chartCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  
  const width = rect.width
  const height = rect.height
  
  ctx.clearRect(0, 0, width, height)
  ctx.globalAlpha = progress
  
  // 绘制网格线
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.lineWidth = 0.5
  
  for (let i = 0; i <= 6; i++) {
    const y = (height / 6) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  for (let i = 0; i <= 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  // Y轴标签
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.font = '11px Arial'
  ctx.textAlign = 'left'
  const yLabels = [12000, 10000, 8000, 6000, 4000, 2000, 0]
  yLabels.forEach((label, i) => {
    const y = (height / 6) * i
    ctx.fillText(label.toString(), 5, y + 15)
  })
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.font = '10px Arial'
  ctx.fillText('Microseconds (μs)', 5, 25)
  
  // 绘制参考虚线
  const refY = height * 0.65
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(0, refY)
  ctx.lineTo(width, refY)
  ctx.stroke()
  ctx.setLineDash([])
  
  // 标注文字
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = '11px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('地球共识时间 (UTC)', 50, 50)
  ctx.font = '9px Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('(虚线)', 50, 62)
  
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('主权时间', width * 0.5, 35)
  ctx.font = '10px Arial'
  ctx.fillText('(sovereign time)', width * 0.5, 48)
  ctx.font = '9px Arial'
  ctx.fillStyle = 'rgba(168, 85, 247, 0.7)'
  ctx.fillText('↓ 紫色曲线', width * 0.5, 60)
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = '11px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('因果裂缝', width - 50, refY - 15)
  ctx.font = '10px Arial'
  ctx.fillText('(Causal Crack)', width - 50, refY - 3)
  ctx.font = '9px Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('← 折线波动', width - 50, refY + 10)
  
  // 绘制波形数据
  const data = generateChartData()
  const maxValue = 12000
  
  ctx.strokeStyle = '#a855f7'
  ctx.lineWidth = 1.5
  ctx.shadowBlur = 8
  ctx.shadowColor = 'rgba(168, 85, 247, 0.8)'
  
  ctx.beginPath()
  const drawPoints = Math.floor(data.length * progress)
  data.forEach((value, i) => {
    if (i > drawPoints) return
    
    const x = (width / (data.length - 1)) * i
    const y = height - (value / maxValue) * height
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}

const drawBottomChart = (progress = 1) => {
  const canvas = bottomChartCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  
  const width = rect.width
  const height = rect.height
  const padding = { top: 60, right: 40, bottom: 50, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  
  ctx.clearRect(0, 0, width, height)
  ctx.globalAlpha = progress
  
  // 绘制网格
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = 1
  
  for (let i = 0; i <= 5; i++) {
    const x = padding.left + (chartWidth / 5) * i
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, height - padding.bottom)
    ctx.stroke()
  }
  
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartHeight / 4) * i
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.stroke()
  }
  
  // 使用真实数据或模拟数据
  const data = chartData.value.length > 0 ? chartData.value : []
  if (data.length === 0) return
  
  const minValue = 0
  const maxValue = 38
  const valueRange = maxValue - minValue
  
  // 绘制渐变填充区域
  const drawPoints = Math.floor(data.length * progress)
  if (drawPoints > 1) {
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)')
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.05)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    
    data.slice(0, drawPoints).forEach((point, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i
      const y = height - padding.bottom - ((point.value - minValue) / valueRange) * chartHeight
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.lineTo(padding.left + (chartWidth / (data.length - 1)) * (drawPoints - 1), height - padding.bottom)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.closePath()
    ctx.fill()
  }
  
  // 绘制主折线
  ctx.strokeStyle = '#a855f7'
  ctx.lineWidth = 2.5
  ctx.shadowBlur = 15
  ctx.shadowColor = 'rgba(168, 85, 247, 0.9)'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  
  ctx.beginPath()
  data.slice(0, drawPoints).forEach((point, i) => {
    const x = padding.left + (chartWidth / (data.length - 1)) * i
    const y = height - padding.bottom - ((point.value - minValue) / valueRange) * chartHeight
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  ctx.shadowBlur = 0
  
  // 绘制数据点和标注
  data.slice(0, drawPoints).forEach((point, i) => {
    const x = padding.left + (chartWidth / (data.length - 1)) * i
    const y = height - padding.bottom - ((point.value - minValue) / valueRange) * chartHeight
    
    if (point.highlight) {
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
      glowGradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)')
      glowGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)')
      glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)')
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.strokeStyle = '#a855f7'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`${point.value}`, x, y - 20)
    }
  })
  
  // 显示所有日期标签
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.textAlign = 'center'
  
  data.forEach((point, index) => {
    const x = padding.left + (chartWidth / (data.length - 1)) * index
    
    // 根据数据长度调整字体大小
    if (data.length <= 7) {
      ctx.font = '12px Arial'
    } else if (data.length <= 14) {
      ctx.font = '10px Arial'
    } else {
      ctx.font = '8px Arial'
    }
    
    ctx.fillText(point.time, x, height - padding.bottom + 30)
  })
  
  // 显示今日(最后一天)的提交数
  const todayValue = data[data.length - 1]?.value || 0
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'
  ctx.fillRect(width - 120, 20, 100, 60)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('今日/Today', width - 70, 40)
  ctx.font = 'bold 24px Arial'
  ctx.fillText(`${todayValue}μs`, width - 70, 65)
  
  ctx.globalAlpha = 1
}
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  overflow-y: auto;
  position: relative;
  cursor: pointer;
}

.content {
  padding: 100px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.chart-section {
  position: relative;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 4px;
  padding: 0 15px;
}

.section-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
  padding: 0 15px;
}

.chart-container {
  background: rgba(26, 29, 46, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 0;
  padding: 0;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.chart-canvas {
  width: 100%;
  height: 220px;
  display: block;
}

.bottom-chart-canvas {
  width: 100%;
  height: 400px;
  display: block;
}

.dashboard-title-section {
  text-align: center;
  padding: 20px 0;
}

.date-selector-section {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
}

.date-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(26, 29, 46, 0.5);
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  flex-wrap: wrap;
  justify-content: center;
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-input-group label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  white-space: nowrap;
}

.date-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.4);
  border-radius: 4px;
  padding: 6px 10px;
  color: #fff;
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s;
}

.date-input:focus {
  border-color: #a855f7;
}

.quick-btn {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.5);
  border-radius: 4px;
  padding: 6px 12px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-btn:hover {
  background: rgba(168, 85, 247, 0.4);
  border-color: #a855f7;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 14, 32, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(168, 85, 247, 0.3);
  border-top: 2px solid #a855f7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
}

.main-title {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.main-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.chart-container.large {
  min-height: 250px;
  height: auto;
}

.glitch-overlay {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 200px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(6, 182, 212, 0.1) 20%,
    rgba(217, 70, 239, 0.2) 40%,
    rgba(168, 85, 247, 0.1) 60%,
    transparent 100%
  );
  animation: glitchScan 2s linear infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes glitchScan {
  0% {
    transform: translateY(-50%) translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50%) translateX(100%);
    opacity: 0;
  }
}

.chart-description {
  margin-top: 20px;
  text-align: center;
}

.desc-en,
.desc-zh {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 4px 0;
}

.desc-zh {
  font-size: 11px;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .content {
    padding: 80px 15px 30px;
  }

  .section-title {
    font-size: 16px;
  }

  .main-title {
    font-size: 18px;
  }
}
</style>
