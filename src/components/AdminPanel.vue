<template>
  <div class="admin-panel">
    <h3>🔧 Panneau d'Administration</h3>
    
    <div class="admin-tabs">
      <button 
        v-for="tab in adminTabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ 'active': activeTab === tab.id }"
        class="tab-btn"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <div class="admin-content">
      <!-- Gestion des joueurs -->
      <div v-if="activeTab === 'players'" class="admin-section">
        <h4>Gestion des Joueurs</h4>
        
        <div class="players-list">
          <div 
            v-for="player in gameStore.users" 
            :key="player.id"
            class="player-item"
            :class="{ 'current-user': player.id === gameStore.currentUser?.id }"
          >
            <div class="player-info">
              <div class="player-name">
                {{ player.username }}
                <span class="role-badge" :class="player.role">{{ player.role }}</span>
                <span v-if="player.id === gameStore.currentUser?.id" class="you-badge">(Vous)</span>
              </div>
              <div class="player-stats">
                <span>{{ formatNumber(player.cookies) }} cookies</span>
                <span>{{ formatNumber(player.productionAuto) }}/s</span>
                <span>{{ player.totalClicks }} clics</span>
              </div>
            </div>
            
            <div class="player-actions" v-if="player.id !== gameStore.currentUser?.id">
              <input 
                v-model="playerScores[player.id]"
                type="number"
                :placeholder="player.cookies.toString()"
                class="score-input"
              />
              <button 
                @click="modifyPlayerScore(player.id, playerScores[player.id])"
                class="modify-btn"
                :disabled="!playerScores[player.id]"
              >
                Modifier
              </button>
              <button 
                @click="resetPlayer(player.id)"
                class="reset-btn"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Statistiques globales -->
      <div v-if="activeTab === 'stats'" class="admin-section">
        <h4>Statistiques Globales</h4>
        
        <div class="global-stats">
          <div class="stat-card">
            <h5>Total des Cookies</h5>
            <p class="stat-value">{{ formatNumber(totalCookies) }}</p>
          </div>
          
          <div class="stat-card">
            <h5>Production Totale</h5>
            <p class="stat-value">{{ formatNumber(totalProduction) }}/s</p>
          </div>
          
          <div class="stat-card">
            <h5>Total des Clics</h5>
            <p class="stat-value">{{ formatNumber(totalClicks) }}</p>
          </div>
          
          <div class="stat-card">
            <h5>Joueurs Actifs</h5>
            <p class="stat-value">{{ gameStore.users.length }}</p>
          </div>
        </div>
      </div>
      
      <!-- Actions système -->
      <div v-if="activeTab === 'system'" class="admin-section">
        <h4>Actions Système</h4>
        
        <div class="system-actions">
          <button @click="resetAllPlayers" class="danger-btn">
            Réinitialiser tous les joueurs
          </button>
          
          <button @click="exportData" class="export-btn">
            Exporter les données
          </button>
          
          <button @click="clearNotifications" class="clear-btn">
            Vider les notifications
          </button>
        </div>
        
        <div class="system-info">
          <h5>Informations Système</h5>
          <p>Dernière sauvegarde: {{ formatDate(gameStore.lastSave) }}</p>
          <p>Notifications actives: {{ gameStore.notifications.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'AdminPanel',
  setup() {
    const gameStore = useGameStore()
    const activeTab = ref('players')
    const playerScores = ref({})
    
    const adminTabs = [
      { id: 'players', name: 'Joueurs' },
      { id: 'stats', name: 'Statistiques' },
      { id: 'system', name: 'Système' }
    ]
    
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return Math.floor(num).toString()
    }
    
    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleString('fr-FR')
    }
    
    const totalCookies = computed(() => {
      return gameStore.users.reduce((total, user) => total + user.cookies, 0)
    })
    
    const totalProduction = computed(() => {
      return gameStore.users.reduce((total, user) => total + user.productionAuto, 0)
    })
    
    const totalClicks = computed(() => {
      return gameStore.users.reduce((total, user) => total + user.totalClicks, 0)
    })
    
    const modifyPlayerScore = (playerId, newScore) => {
      if (newScore && newScore >= 0) {
        gameStore.modifyPlayerScore(playerId, parseInt(newScore))
        playerScores.value[playerId] = ''
      }
    }
    
    const resetPlayer = (playerId) => {
      if (confirm('Êtes-vous sûr de vouloir réinitialiser ce joueur ?')) {
        gameStore.resetPlayer(playerId)
      }
    }
    
    const resetAllPlayers = () => {
      if (confirm('Êtes-vous sûr de vouloir réinitialiser TOUS les joueurs ? Cette action est irréversible !')) {
        gameStore.users.forEach(player => {
          if (player.id !== gameStore.currentUser?.id) {
            gameStore.resetPlayer(player.id)
          }
        })
        gameStore.showNotification('Tous les joueurs ont été réinitialisés', 'warning')
      }
    }
    
    const exportData = () => {
      const data = {
        users: gameStore.users,
        timestamp: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cookie-clicker-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      gameStore.showNotification('Données exportées avec succès', 'success')
    }
    
    const clearNotifications = () => {
      gameStore.notifications = []
      gameStore.showNotification('Notifications vidées', 'info')
    }
    
    return {
      gameStore,
      activeTab,
      adminTabs,
      playerScores,
      formatNumber,
      formatDate,
      totalCookies,
      totalProduction,
      totalClicks,
      modifyPlayerScore,
      resetPlayer,
      resetAllPlayers,
      exportData,
      clearNotifications
    }
  }
}
</script>

<style scoped>
.admin-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.admin-panel h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.admin-tabs {
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
  color: #dc3545;
}

.tab-btn.active {
  color: #dc3545;
  border-bottom-color: #dc3545;
}

.admin-content {
  max-height: 500px;
  overflow-y: auto;
}

.admin-section h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.player-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.player-item.current-user {
  border-color: #4a90e2;
  background: #f8f9ff;
}

.player-info {
  flex: 1;
}

.player-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

.role-badge.admin {
  background: #dc3545;
  color: white;
}

.role-badge.player {
  background: #6c757d;
  color: white;
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

.player-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.score-input {
  width: 100px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.8rem;
}

.modify-btn, .reset-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modify-btn {
  background: #4a90e2;
  color: white;
}

.modify-btn:hover:not(:disabled) {
  background: #357abd;
}

.modify-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reset-btn {
  background: #dc3545;
  color: white;
}

.reset-btn:hover {
  background: #c82333;
}

.global-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #dc3545;
}

.stat-card h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 0.9rem;
}

.stat-value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #dc3545;
}

.system-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.danger-btn, .export-btn, .clear-btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.danger-btn {
  background: #dc3545;
  color: white;
}

.danger-btn:hover {
  background: #c82333;
}

.export-btn {
  background: #28a745;
  color: white;
}

.export-btn:hover {
  background: #218838;
}

.clear-btn {
  background: #6c757d;
  color: white;
}

.clear-btn:hover {
  background: #5a6268;
}

.system-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.system-info h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.system-info p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

/* Scrollbar styling */
.admin-content::-webkit-scrollbar {
  width: 6px;
}

.admin-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.admin-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.admin-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
