<template>
  <div class="stats-panel">
    <h3>📊 Statistiques</h3>
    
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-label">Cookies par minute:</span>
        <span class="stat-value">{{ gameStore.cookiesPerMinute }}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">Production totale:</span>
        <span class="stat-value">{{ formatNumber(gameStore.totalProduction) }}/s</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">Multiplicateur total:</span>
        <span class="stat-value">x{{ gameStore.totalMultiplier }}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">Total clics:</span>
        <span class="stat-value">{{ gameStore.totalClicks }}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">Temps de jeu:</span>
        <span class="stat-value">{{ formatTime(playTime) }}</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-label">Succès débloqués:</span>
        <span class="stat-value">{{ gameStore.unlockedAchievements.length }}/{{ gameStore.achievements.length }}</span>
      </div>
    </div>
    
    <div class="progress-section">
      <h4>Progression des succès</h4>
      <div class="achievement-progress">
        <div 
          class="progress-bar"
          :style="{ width: achievementProgress + '%' }"
        ></div>
        <span class="progress-text">{{ gameStore.unlockedAchievements.length }}/{{ gameStore.achievements.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'StatsPanel',
  setup() {
    const gameStore = useGameStore()
    const playTime = ref(0)
    let timeInterval = null
    
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return Math.floor(num).toString()
    }
    
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = Math.floor(seconds % 60)
      
      if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`
      } else if (minutes > 0) {
        return `${minutes}m ${secs}s`
      } else {
        return `${secs}s`
      }
    }
    
    const achievementProgress = computed(() => {
      return (gameStore.unlockedAchievements.length / gameStore.achievements.length) * 100
    })
    
    onMounted(() => {
      timeInterval = setInterval(() => {
        playTime.value = Math.floor((Date.now() - gameStore.startTime) / 1000)
      }, 1000)
    })
    
    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })
    
    return {
      gameStore,
      playTime,
      formatNumber,
      formatTime,
      achievementProgress
    }
  }
}
</script>

<style scoped>
.stats-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.stats-panel h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #4a90e2;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-weight: bold;
  color: #333;
  font-size: 0.9rem;
}

.progress-section h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.achievement-progress {
  position: relative;
  background: #e9ecef;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #357abd);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
