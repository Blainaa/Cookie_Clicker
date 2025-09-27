<template>
  <div id="app">
    <header class="header">
      <h1>🍪 Cookie Clicker Game</h1>
      <div class="user-info" v-if="gameStore.isAuthenticated">
        <span>Connecté en tant que: {{ gameStore.currentUser?.username }}</span>
        <span class="role-badge" :class="gameStore.currentUser?.role">
          {{ gameStore.currentUser?.role === 'admin' ? 'Admin' : 'Joueur' }}
        </span>
        <button @click="gameStore.logout()" class="logout-btn">Déconnexion</button>
      </div>
    </header>

    <main class="main-content">
      <!-- Authentification -->
      <UserAuth v-if="!gameStore.isAuthenticated" />
      
      <!-- Jeu principal -->
      <div v-else class="game-container">
        <!-- Notifications -->
        <NotificationContainer />
        
        <!-- Interface de jeu -->
        <div class="game-interface">
          <div class="left-panel">
            <CookieClicker />
            <StatsPanel />
          </div>
          
          <div class="right-panel">
            <UpgradesPanel />
            <MultipliersPanel />
            <AchievementsPanel />
          </div>
        </div>
        
        <!-- Panneaux supplémentaires -->
        <div class="bottom-panels">
          <Leaderboard />
          <AdminPanel v-if="gameStore.currentUser?.role === 'admin'" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useGameStore } from './stores/gameStore'
import UserAuth from './components/UserAuth.vue'
import CookieClicker from './components/CookieClicker.vue'
import StatsPanel from './components/StatsPanel.vue'
import UpgradesPanel from './components/UpgradesPanel.vue'
import MultipliersPanel from './components/MultipliersPanel.vue'
import AchievementsPanel from './components/AchievementsPanel.vue'
import Leaderboard from './components/Leaderboard.vue'
import AdminPanel from './components/AdminPanel.vue'
import NotificationContainer from './components/NotificationContainer.vue'

export default {
  name: 'App',
  components: {
    UserAuth,
    CookieClicker,
    StatsPanel,
    UpgradesPanel,
    MultipliersPanel,
    AchievementsPanel,
    Leaderboard,
    AdminPanel,
    NotificationContainer
  },
  setup() {
    const gameStore = useGameStore()
    
    // Démarrer la production automatique au chargement
    gameStore.startAutoProduction()
    
    return {
      gameStore
    }
  }
}
</script>
