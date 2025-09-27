<template>
  <div class="notification-container">
    <transition-group name="notification" tag="div">
      <div 
        v-for="notification in gameStore.notifications" 
        :key="notification.id"
        class="notification"
        :class="notification.type"
        @click="gameStore.removeNotification(notification.id)"
      >
        <div class="notification-icon">
          <span v-if="notification.type === 'success'">✅</span>
          <span v-else-if="notification.type === 'warning'">⚠️</span>
          <span v-else-if="notification.type === 'error'">❌</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="notification-content">
          <p class="notification-message">{{ notification.message }}</p>
        </div>
        <button 
          @click.stop="gameStore.removeNotification(notification.id)"
          class="notification-close"
        >
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'NotificationContainer',
  setup() {
    const gameStore = useGameStore()
    
    return {
      gameStore
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.notification {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 300px;
}

.notification:hover {
  transform: translateX(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.notification.success {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-left: 4px solid #28a745;
  color: #155724;
}

.notification.warning {
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border-left: 4px solid #ffc107;
  color: #856404;
}

.notification.error {
  background: linear-gradient(135deg, #f8d7da, #f5c6cb);
  border-left: 4px solid #dc3545;
  color: #721c24;
}

.notification.info {
  background: linear-gradient(135deg, #d1ecf1, #bee5eb);
  border-left: 4px solid #17a2b8;
  color: #0c5460;
}

.notification-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-message {
  margin: 0;
  font-weight: 500;
  font-size: 0.9rem;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.notification-close:hover {
  opacity: 1;
}

/* Animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .notification-container {
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification {
    min-width: auto;
  }
}
</style>
