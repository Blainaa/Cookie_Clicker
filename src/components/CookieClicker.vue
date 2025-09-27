<template>
  <div class="cookie-clicker">
    <div class="cookie-stats">
      <h2>🍪 {{ formatNumber(gameStore.cookies) }} Cookies</h2>
      <p class="production-info">
        Production: {{ formatNumber(gameStore.productionAuto) }}/s
        <span v-if="gameStore.totalMultiplier > 1" class="multiplier">
          (x{{ gameStore.totalMultiplier }})
        </span>
      </p>
    </div>
    
    <div class="cookie-container">
      <button 
        @click="gameStore.clickCookie()" 
        class="cookie-btn"
        :class="{ 'clicking': isClicking }"
        @mousedown="isClicking = true"
        @mouseup="isClicking = false"
        @mouseleave="isClicking = false"
      >
        🍪
      </button>
      
      <div class="click-effects" v-if="clickEffects.length">
        <div 
          v-for="effect in clickEffects" 
          :key="effect.id"
          class="click-effect"
          :style="{ 
            left: effect.x + 'px', 
            top: effect.y + 'px' 
          }"
        >
          +{{ effect.amount }}
        </div>
      </div>
    </div>
    
    <div class="click-info">
      <p>{{ formatNumber(gameStore.cookiesPerClick * gameStore.totalMultiplier) }} cookies par clic</p>
      <p>Total clics: {{ gameStore.totalClicks }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'CookieClicker',
  setup() {
    const gameStore = useGameStore()
    const isClicking = ref(false)
    const clickEffects = ref([])
    
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return Math.floor(num).toString()
    }
    
    const createClickEffect = (event) => {
      const rect = event.target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const effect = {
        id: Date.now(),
        x: x - 20,
        y: y - 20,
        amount: gameStore.cookiesPerClick * gameStore.totalMultiplier
      }
      
      clickEffects.value.push(effect)
      
      // Supprimer l'effet après 1 seconde
      setTimeout(() => {
        clickEffects.value = clickEffects.value.filter(e => e.id !== effect.id)
      }, 1000)
    }
    
    const handleCookieClick = (event) => {
      createClickEffect(event)
    }
    
    onMounted(() => {
      // Ajouter l'écouteur d'événement pour les effets visuels
      const cookieBtn = document.querySelector('.cookie-btn')
      if (cookieBtn) {
        cookieBtn.addEventListener('click', handleCookieClick)
      }
    })
    
    onUnmounted(() => {
      const cookieBtn = document.querySelector('.cookie-btn')
      if (cookieBtn) {
        cookieBtn.removeEventListener('click', handleCookieClick)
      }
    })
    
    return {
      gameStore,
      isClicking,
      clickEffects,
      formatNumber
    }
  }
}
</script>

<style scoped>
.cookie-clicker {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.cookie-stats h2 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: #8b4513;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.production-info {
  font-size: 1.2rem;
  color: #666;
  margin: 0 0 1rem 0;
}

.multiplier {
  color: #ff6b6b;
  font-weight: bold;
}

.cookie-container {
  position: relative;
  margin: 2rem 0;
}

.cookie-btn {
  font-size: 8rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.1s ease;
  user-select: none;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.cookie-btn:hover {
  transform: scale(1.05);
}

.cookie-btn.clicking {
  transform: scale(0.95);
}

.cookie-btn:active {
  transform: scale(0.9);
}

.click-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.click-effect {
  position: absolute;
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.2rem;
  animation: floatUp 1s ease-out forwards;
  pointer-events: none;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.2);
  }
}

.click-info {
  margin-top: 1rem;
  color: #666;
}

.click-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
</style>
