<template>
  <div class="upgrades-panel">
    <h3>🏭 Améliorations</h3>
    
    <div class="upgrades-list">
      <div 
        v-for="upgrade in gameStore.upgrades" 
        :key="upgrade.id"
        class="upgrade-item"
        :class="{ 
          'available': gameStore.cookies >= upgrade.cost,
          'owned': upgrade.owned > 0
        }"
      >
        <div class="upgrade-info">
          <h4>{{ upgrade.name }}</h4>
          <p class="upgrade-description">{{ upgrade.description }}</p>
          <div class="upgrade-stats">
            <span class="production">+{{ upgrade.production }}/s</span>
            <span class="owned-count" v-if="upgrade.owned > 0">Possédé: {{ upgrade.owned }}</span>
          </div>
        </div>
        
        <div class="upgrade-actions">
          <div class="upgrade-cost">
            🍪 {{ formatNumber(upgrade.cost) }}
          </div>
          <button 
            @click="gameStore.buyUpgrade(upgrade.id)"
            :disabled="gameStore.cookies < upgrade.cost"
            class="buy-btn"
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
    
    <div class="upgrade-summary">
      <h4>Production totale: {{ formatNumber(gameStore.totalProduction) }}/s</h4>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'UpgradesPanel',
  setup() {
    const gameStore = useGameStore()
    
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return Math.floor(num).toString()
    }
    
    return {
      gameStore,
      formatNumber
    }
  }
}
</script>

<style scoped>
.upgrades-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.upgrades-panel h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.upgrades-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.upgrade-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.upgrade-item.available {
  border-color: #4a90e2;
  background: #f8f9ff;
}

.upgrade-item.owned {
  border-color: #28a745;
  background: #f8fff9;
}

.upgrade-info {
  flex: 1;
}

.upgrade-info h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1.1rem;
}

.upgrade-description {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.upgrade-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.production {
  color: #28a745;
  font-weight: bold;
}

.owned-count {
  color: #666;
}

.upgrade-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upgrade-cost {
  font-weight: bold;
  color: #8b4513;
  font-size: 0.9rem;
}

.buy-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.buy-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.buy-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.upgrade-summary {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.upgrade-summary h4 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

/* Scrollbar styling */
.upgrades-list::-webkit-scrollbar {
  width: 6px;
}

.upgrades-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.upgrades-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.upgrades-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
