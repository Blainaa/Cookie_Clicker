

# 🍪 Cookie Clicker Game

A complete Cookie Clicker–style game built with **Vue.js 3** and **Pinia**, featuring users, roles, leaderboards, achievements, and more!

##  Main Features

###  Core Gameplay

* **Click the cookie** to generate cookies.
* **Buy upgrades** to produce cookies automatically.
* **Use multipliers** to boost your production.
* **Unlock achievements** by reaching milestones.

###  User System

* Simple **login with a username**.
* **Roles**: Player or Admin.
* **Auto-save**: your progress is saved locally.
* **Load your game** anytime.

### Leaderboards & Competition

* **Global rankings** to compare with others.
* Multiple leaderboards: total cookies, clicks, production.
* **Challenge friends** and view detailed stats.

###  Admin Panel

* Manage players: edit scores or reset games.
* View **global game statistics**.
* System actions: export data, handle notifications.

###  Achievements & Rewards

* **7 achievements** from *“First Cookie”* to *“Cookie Factory”*.
* **Notifications** when you unlock new goals.
* Track progress with a **progress bar**.

---

##  Setup & Usage

### Requirements

* Node.js (v16+)
* npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build
```

### How to Play

1. Open `http://localhost:3000` in your browser.
2. Pick a username and role.
3. Start playing!

* **Players**: click, buy upgrades, use multipliers, unlock achievements, and climb the leaderboard.
* **Admins**: log in as admin, access the panel, manage players, view global stats, and export data.

---

##  Technical Overview

### Tech Stack

* **Vue.js 3** – reactive framework
* **Vite** – fast dev/build tool
* **CSS3** – styles with animations & gradients

### Project Structure

```
src/
├── components/   # Vue components
│   ├── UserAuth.vue
│   ├── CookieClicker.vue
│   ├── StatsPanel.vue
│   ├── UpgradesPanel.vue
│   ├── MultipliersPanel.vue
│   ├── AchievementsPanel.vue
│   ├── Leaderboard.vue
│   ├── AdminPanel.vue
│   └── NotificationContainer.vue
├── stores/
│   └── gameStore.js
├── App.vue
├── main.js
└── style.css
```

### Store (Pinia)

* **State**: cookies, production, users, upgrades, etc.
* **Getters**: rankings, stats, derived values.
* **Actions**: clicks, purchases, authentication, etc.

---

##  Game Goals

**Achievements**

* First Cookie, Centenary (100), Millenary (1,000), Millionaire (1,000,000), First Upgrade, Producer (10 cps), Cookie Factory (100 cps).

**Upgrades**

* Cursor (0.1 cps, cost 10)
* Grandma (1 cps, cost 100)
* Farm (8 cps, cost 1,100)
* Mine (47 cps, cost 12,000)
* Factory (260 cps, cost 130,000)

**Multipliers**

* x2, x3, x5, x10 production (cost scaling from 100 to 100,000).


##  Advanced Features

* **Auto-save** with localStorage.
* **Toast notifications** for events.
* **Responsive design** for mobile, tablet, and desktop.








