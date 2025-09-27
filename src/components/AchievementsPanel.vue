<template>
  <div class="achievements-panel">
    <h3>🏆 Succès</h3>
    
    <div class="achievements-stats">
      <div class="achievement-progress">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: achievementProgress + '%' }"
          ></div>
        </div>
        <span class="progress-text">{{ gameStore.unlockedAchievements.length }}/{{ gameStore.achievements.length }}</span>
      </div>
    </div>
    
    <div class="achievements-list">
      <div 
        v-for="achievement in gameStore.achievements" 
        :key="achievement.id"
        class="achievement-item"
        :class="{ 'unlocked': achievement.unlocked }"
      >
        <div class="achievement-icon">
          <span v-if="achievement.unlocked">🏆</span>
          <span v-else>🔒</span>
        </div>
        
        <div class="achievement-info">
          <h4>{{ achievement.name }}</h4>
          <p>{{ achievement.description }}</p>
        </div>
        
        <div class="achievement-status">
          <span v-if="achievement.unlocked" class="unlocked-badge">Débloqué</span>
          <span v-else class="locked-badge">Verrouillé</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'AchievementsPanel',
  setup() {
    const gameStore = useGameStore()
    
    const achievementProgress = computed(() => {
      return (gameStore.unlockedAchievements.length / gameStore.achievements.length) * 100
    })
    
    return {
      gameStore,
      achievementProgress
    }
  }
}
</script>

<style scoped>
.achievements-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.achievements-panel h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.achievements-stats {
  margin-bottom: 1.5rem;
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
  background: #e9ecef;
  border-radius: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
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
  color: #333;
}

.achievements-list {
  max-height: 400px;
  overflow-y: auto;
}

.achievement-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.achievement-item.unlocked {
  border-color: #ffd700;
  background: linear-gradient(135deg, #fff9e6, #fffbf0);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
}

.achievement-icon {
  font-size: 2rem;
  margin-right: 1rem;
  min-width: 40px;
  text-align: center;
}

.achievement-info {
  flex: 1;
}

.achievement-info h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
}

.achievement-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.achievement-status {
  margin-left: 1rem;
}

.unlocked-badge {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.locked-badge {
  background: #6c757d;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Scrollbar styling */
.achievements-list::-webkit-scrollbar {
  width: 6px;
}

.achievements-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.achievements-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.achievements-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
