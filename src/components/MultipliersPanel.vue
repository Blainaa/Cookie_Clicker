<template>
  <div class="multipliers-panel">
    <h3>⚡ Multiplicateurs</h3>
    
    <div class="multipliers-list">
      <div 
        v-for="multiplier in gameStore.multipliers" 
        :key="multiplier.id"
        class="multiplier-item"
        :class="{ 
          'available': gameStore.cookies >= multiplier.cost,
          'owned': multiplier.owned > 0
        }"
      >
        <div class="multiplier-info">
          <h4>{{ multiplier.name }}</h4>
          <div class="multiplier-stats">
            <span class="multiplier-value">x{{ multiplier.multiplier }}</span>
            <span class="owned-count" v-if="multiplier.owned > 0">Possédé: {{ multiplier.owned }}</span>
          </div>
        </div>
        
        <div class="multiplier-actions">
          <div class="multiplier-cost">
            🍪 {{ formatNumber(multiplier.cost) }}
          </div>
          <button 
            @click="gameStore.buyMultiplier(multiplier.id)"
            :disabled="gameStore.cookies < multiplier.cost"
            class="buy-btn"
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
    
    <div class="multiplier-summary">
      <h4>Multiplicateur total: x{{ gameStore.totalMultiplier }}</h4>
      <p class="multiplier-description">
        Multiplie tous les cookies générés par {{ gameStore.totalMultiplier }}
      </p>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'MultipliersPanel',
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
.multipliers-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.multipliers-panel h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.multipliers-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.multiplier-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.multiplier-item.available {
  border-color: #ff6b6b;
  background: #fff8f8;
}

.multiplier-item.owned {
  border-color: #28a745;
  background: #f8fff9;
}

.multiplier-info {
  flex: 1;
}

.multiplier-info h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
}

.multiplier-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.multiplier-value {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.1rem;
}

.owned-count {
  color: #666;
}

.multiplier-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.multiplier-cost {
  font-weight: bold;
  color: #8b4513;
  font-size: 0.9rem;
}

.buy-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
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
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.buy-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.multiplier-summary {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.multiplier-summary h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
}

.multiplier-description {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* Scrollbar styling */
.multipliers-list::-webkit-scrollbar {
  width: 6px;
}

.multipliers-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.multipliers-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.multipliers-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
