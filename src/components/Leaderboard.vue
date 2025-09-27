<template>
  <div class="leaderboard">
    <h3>🏆 Classement</h3>
    
    <div class="leaderboard-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ 'active': activeTab === tab.id }"
        class="tab-btn"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <div class="leaderboard-content">
      <!-- Classement général -->
      <div v-if="activeTab === 'global'" class="leaderboard-list">
        <div 
          v-for="(player, index) in gameStore.leaderboard" 
          :key="player.id"
          class="leaderboard-item"
          :class="{ 'current-user': player.id === gameStore.currentUser?.id }"
        >
          <div class="rank">
            <span v-if="index < 3" class="medal">{{ medals[index] }}</span>
            <span v-else class="rank-number">{{ index + 1 }}</span>
          </div>
          
          <div class="player-info">
            <div class="player-name">
              {{ player.username }}
              <span v-if="player.id === gameStore.currentUser?.id" class="you-badge">(Vous)</span>
            </div>
            <div class="player-stats">
              <span class="cookies">{{ formatNumber(player.cookies) }} cookies</span>
              <span class="production">{{ formatNumber(player.productionAuto) }}/s</span>
            </div>
          </div>
          
          <div class="player-actions" v-if="player.id !== gameStore.currentUser?.id">
            <button 
              @click="gameStore.challengePlayer(player.id)"
              class="challenge-btn"
            >
              Défier
            </button>
          </div>
        </div>
      </div>
      
      <!-- Classement des clics -->
      <div v-if="activeTab === 'clicks'" class="leaderboard-list">
        <div 
          v-for="(player, index) in clicksLeaderboard" 
          :key="player.id"
          class="leaderboard-item"
          :class="{ 'current-user': player.id === gameStore.currentUser?.id }"
        >
          <div class="rank">
            <span class="rank-number">{{ index + 1 }}</span>
          </div>
          
          <div class="player-info">
            <div class="player-name">
              {{ player.username }}
              <span v-if="player.id === gameStore.currentUser?.id" class="you-badge">(Vous)</span>
            </div>
            <div class="player-stats">
              <span class="clicks">{{ formatNumber(player.totalClicks) }} clics</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Classement de production -->
      <div v-if="activeTab === 'production'" class="leaderboard-list">
        <div 
          v-for="(player, index) in productionLeaderboard" 
          :key="player.id"
          class="leaderboard-item"
          :class="{ 'current-user': player.id === gameStore.currentUser?.id }"
        >
          <div class="rank">
            <span class="rank-number">{{ index + 1 }}</span>
          </div>
          
          <div class="player-info">
            <div class="player-name">
              {{ player.username }}
              <span v-if="player.id === gameStore.currentUser?.id" class="you-badge">(Vous)</span>
            </div>
            <div class="player-stats">
              <span class="production">{{ formatNumber(player.productionAuto) }}/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="leaderboard-stats">
      <div class="stat-item">
        <span class="stat-label">Votre rang:</span>
        <span class="stat-value">#{{ userRank }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Total joueurs:</span>
        <span class="stat-value">{{ gameStore.users.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'Leaderboard',
  setup() {
    const gameStore = useGameStore()
    const activeTab = ref('global')
    
    const tabs = [
      { id: 'global', name: 'Cookies' },
      { id: 'clicks', name: 'Clics' },
      { id: 'production', name: 'Production' }
    ]
    
    const medals = ['🥇', '🥈', '🥉']
    
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return Math.floor(num).toString()
    }
    
    const clicksLeaderboard = computed(() => {
      return [...gameStore.users]
        .sort((a, b) => b.totalClicks - a.totalClicks)
        .slice(0, 10)
    })
    
    const productionLeaderboard = computed(() => {
      return [...gameStore.users]
        .sort((a, b) => b.productionAuto - a.productionAuto)
        .slice(0, 10)
    })
    
    const userRank = computed(() => {
      const sortedUsers = [...gameStore.users].sort((a, b) => b.cookies - a.cookies)
      const userIndex = sortedUsers.findIndex(user => user.id === gameStore.currentUser?.id)
      return userIndex + 1
    })
    
    return {
      gameStore,
      activeTab,
      tabs,
      medals,
      formatNumber,
      clicksLeaderboard,
      productionLeaderboard,
      userRank
    }
  }
}
</script>

<style scoped>
.leaderboard {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.leaderboard h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.leaderboard-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  color: #4a90e2;
}

.tab-btn.active {
  color: #4a90e2;
  border-bottom-color: #4a90e2;
}

.leaderboard-content {
  max-height: 400px;
  overflow-y: auto;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.leaderboard-item.current-user {
  border-color: #4a90e2;
  background: #f8f9ff;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
}

.rank {
  min-width: 40px;
  text-align: center;
  margin-right: 1rem;
}

.medal {
  font-size: 1.5rem;
}

.rank-number {
  font-weight: bold;
  font-size: 1.2rem;
  color: #666;
}

.player-info {
  flex: 1;
}

.player-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
}

.you-badge {
  color: #4a90e2;
  font-size: 0.8rem;
  font-weight: normal;
}

.player-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.cookies {
  color: #8b4513;
  font-weight: 500;
}

.production {
  color: #28a745;
  font-weight: 500;
}

.clicks {
  color: #6c757d;
  font-weight: 500;
}

.player-actions {
  margin-left: 1rem;
}

.challenge-btn {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.challenge-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.leaderboard-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e9ecef;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

/* Scrollbar styling */
.leaderboard-content::-webkit-scrollbar {
  width: 6px;
}

.leaderboard-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.leaderboard-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.leaderboard-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
