<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Connexion</h2>
      <form @submit.prevent="login" class="auth-form">
        <div class="form-group">
          <label for="username">Nom d'utilisateur:</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            required 
            placeholder="Entrez votre nom d'utilisateur"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="role">Rôle:</label>
          <select v-model="role" id="role" class="form-select">
            <option value="player">Joueur</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <button type="submit" class="login-btn" :disabled="!username">
          Se connecter
        </button>
      </form>
      
      <div class="auth-info">
        <p>💡 <strong>Joueur:</strong> Jouez normalement et participez au classement</p>
        <p>🔧 <strong>Admin:</strong> Gérez les joueurs et modifiez les scores</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'UserAuth',
  setup() {
    const gameStore = useGameStore()
    const username = ref('')
    const role = ref('player')
    
    const login = () => {
      if (username.value.trim()) {
        gameStore.login(username.value.trim(), role.value)
      }
    }
    
    return {
      username,
      role,
      login
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #4a90e2;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
}

.auth-info p {
  margin: 0.5rem 0;
}
</style>
