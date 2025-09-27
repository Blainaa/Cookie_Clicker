import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    // État principal du jeu
    cookies: 0,
    productionAuto: 0,
    cookiesPerClick: 1,
    multiplier: 1,
    
    // Système d'utilisateur
    currentUser: null,
    users: [],
    isAuthenticated: false,
    
    // Améliorations
    upgrades: [
      { id: 1, name: 'Curseur', cost: 10, production: 0.1, owned: 0, description: 'Produit 0.1 cookie par seconde' },
      { id: 2, name: 'Grand-mère', cost: 100, production: 1, owned: 0, description: 'Produit 1 cookie par seconde' },
      { id: 3, name: 'Ferme', cost: 1100, production: 8, owned: 0, description: 'Produit 8 cookies par seconde' },
      { id: 4, name: 'Mine', cost: 12000, production: 47, owned: 0, description: 'Produit 47 cookies par seconde' },
      { id: 5, name: 'Usine', cost: 130000, production: 260, owned: 0, description: 'Produit 260 cookies par seconde' }
    ],
    
    // Multiplicateurs
    multipliers: [
      { id: 1, name: 'x2 Multiplicateur', cost: 100, multiplier: 2, owned: 0 },
      { id: 2, name: 'x3 Multiplicateur', cost: 1000, multiplier: 3, owned: 0 },
      { id: 3, name: 'x5 Multiplicateur', cost: 10000, multiplier: 5, owned: 0 },
      { id: 4, name: 'x10 Multiplicateur', cost: 100000, multiplier: 10, owned: 0 }
    ],
    
    // Succès
    achievements: [
      { id: 1, name: 'Premier Cookie', description: 'Cliquez sur le cookie', unlocked: false, condition: () => this.cookies >= 1 },
      { id: 2, name: 'Centenaire', description: 'Obtenez 100 cookies', unlocked: false, condition: () => this.cookies >= 100 },
      { id: 3, name: 'Millénaire', description: 'Obtenez 1 000 cookies', unlocked: false, condition: () => this.cookies >= 1000 },
      { id: 4, name: 'Millionnaire', description: 'Obtenez 1 000 000 cookies', unlocked: false, condition: () => this.cookies >= 1000000 },
      { id: 5, name: 'Premier Achat', description: 'Achetez votre première amélioration', unlocked: false, condition: () => this.upgrades.some(u => u.owned > 0) },
      { id: 6, name: 'Producteur', description: 'Produisez 10 cookies par seconde', unlocked: false, condition: () => this.productionAuto >= 10 },
      { id: 7, name: 'Usine à Cookies', description: 'Produisez 100 cookies par seconde', unlocked: false, condition: () => this.productionAuto >= 100 }
    ],
    
    // Notifications
    notifications: [],
    
    // Statistiques
    totalClicks: 0,
    startTime: Date.now(),
    lastSave: Date.now()
  }),

  getters: {
    // Statistiques du jeu
    cookiesPerMinute: (state) => {
      const timeElapsed = (Date.now() - state.startTime) / 60000
      return timeElapsed > 0 ? Math.floor(state.cookies / timeElapsed) : 0
    },
    
    totalProduction: (state) => {
      return state.upgrades.reduce((total, upgrade) => 
        total + (upgrade.production * upgrade.owned), 0
      )
    },
    
    totalMultiplier: (state) => {
      return state.multipliers.reduce((total, multiplier) => 
        total + (multiplier.multiplier * multiplier.owned), 0
      ) + 1
    },
    
    // Classement des joueurs
    leaderboard: (state) => {
      return [...state.users]
        .sort((a, b) => b.cookies - a.cookies)
        .slice(0, 10)
    },
    
    // Succès débloqués
    unlockedAchievements: (state) => {
      return state.achievements.filter(achievement => achievement.unlocked)
    },
    
    // Prochaines améliorations disponibles
    availableUpgrades: (state) => {
      return state.upgrades.filter(upgrade => state.cookies >= upgrade.cost)
    },
    
    // Prochains multiplicateurs disponibles
    availableMultipliers: (state) => {
      return state.multipliers.filter(multiplier => state.cookies >= multiplier.cost)
    }
  },

  actions: {
    // Actions de base
    addCookies(amount) {
      this.cookies += Math.floor(amount * this.totalMultiplier)
      this.totalClicks++
      this.checkAchievements()
    },
    
    clickCookie() {
      this.addCookies(this.cookiesPerClick)
    },
    
    // Production automatique
    startAutoProduction() {
      setInterval(() => {
        if (this.productionAuto > 0) {
          this.addCookies(this.productionAuto)
        }
      }, 1000)
    },
    
    // Achat d'améliorations
    buyUpgrade(upgradeId) {
      const upgrade = this.upgrades.find(u => u.id === upgradeId)
      if (upgrade && this.cookies >= upgrade.cost) {
        this.cookies -= upgrade.cost
        upgrade.owned++
        upgrade.cost = Math.floor(upgrade.cost * 1.15) // Augmentation du coût
        this.productionAuto = this.totalProduction
        this.saveGame()
      }
    },
    
    // Achat de multiplicateurs
    buyMultiplier(multiplierId) {
      const multiplier = this.multipliers.find(m => m.id === multiplierId)
      if (multiplier && this.cookies >= multiplier.cost) {
        this.cookies -= multiplier.cost
        multiplier.owned++
        multiplier.cost = Math.floor(multiplier.cost * 2) // Double le coût
        this.saveGame()
      }
    },
    
    // Système d'utilisateur
    login(username, role = 'player') {
      let user = this.users.find(u => u.username === username)
      if (!user) {
        user = {
          id: Date.now(),
          username,
          role,
          cookies: 0,
          productionAuto: 0,
          totalClicks: 0,
          joinDate: new Date().toISOString()
        }
        this.users.push(user)
      }
      this.currentUser = user
      this.isAuthenticated = true
      this.loadUserGame()
    },
    
    logout() {
      this.saveGame()
      this.currentUser = null
      this.isAuthenticated = false
    },
    
    // Chargement et sauvegarde
    loadUserGame() {
      if (this.currentUser) {
        this.cookies = this.currentUser.cookies
        this.productionAuto = this.currentUser.productionAuto
        this.totalClicks = this.currentUser.totalClicks
        this.loadFromLocalStorage()
      }
    },
    
    saveGame() {
      if (this.currentUser) {
        this.currentUser.cookies = this.cookies
        this.currentUser.productionAuto = this.productionAuto
        this.currentUser.totalClicks = this.totalClicks
        this.saveToLocalStorage()
      }
    },
    
    // Stockage local
    saveToLocalStorage() {
      const gameData = {
        cookies: this.cookies,
        productionAuto: this.productionAuto,
        upgrades: this.upgrades,
        multipliers: this.multipliers,
        achievements: this.achievements,
        totalClicks: this.totalClicks,
        lastSave: Date.now()
      }
      localStorage.setItem('cookieClickerGame', JSON.stringify(gameData))
    },
    
    loadFromLocalStorage() {
      const savedData = localStorage.getItem('cookieClickerGame')
      if (savedData) {
        const gameData = JSON.parse(savedData)
        this.cookies = gameData.cookies || 0
        this.productionAuto = gameData.productionAuto || 0
        this.upgrades = gameData.upgrades || this.upgrades
        this.multipliers = gameData.multipliers || this.multipliers
        this.achievements = gameData.achievements || this.achievements
        this.totalClicks = gameData.totalClicks || 0
      }
    },
    
    // Succès
    checkAchievements() {
      this.achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition.call(this)) {
          achievement.unlocked = true
          this.showNotification(`Succès débloqué: ${achievement.name}`, 'success')
        }
      })
    },
    
    // Notifications
    showNotification(message, type = 'info') {
      const notification = {
        id: Date.now(),
        message,
        type,
        timestamp: Date.now()
      }
      this.notifications.push(notification)
      
      // Supprimer la notification après 3 secondes
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 3000)
    },
    
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    
    // Actions d'admin
    resetPlayer(playerId) {
      const user = this.users.find(u => u.id === playerId)
      if (user) {
        user.cookies = 0
        user.productionAuto = 0
        user.totalClicks = 0
        this.showNotification(`Partie réinitialisée pour ${user.username}`, 'warning')
      }
    },
    
    modifyPlayerScore(playerId, newScore) {
      const user = this.users.find(u => u.id === playerId)
      if (user) {
        user.cookies = newScore
        this.showNotification(`Score modifié pour ${user.username}: ${newScore} cookies`, 'info')
      }
    },
    
    // Défi entre joueurs
    challengePlayer(playerId) {
      const opponent = this.users.find(u => u.id === playerId)
      if (opponent) {
        this.showNotification(`Défi envoyé à ${opponent.username}!`, 'info')
        // Ici on pourrait implémenter un système de défi plus complexe
      }
    }
  }
})
