#  Démonstration du Cookie Clicker Game

##  Fonctionnalités implémentées

### Système de base
- **State Pinia** : Gestion complète de l'état avec `cookies`, `productionAuto`, `multiplier`
- **Mutations** : Ajout de cookies, achat d'améliorations
- **Actions** : Production automatique, gestion des utilisateurs, sauvegarde
- **Getters** : Statistiques, classements, calculs de production

### Système d'utilisateur
- **Authentification simple** : Connexion avec nom d'utilisateur
- **Rôles** : Joueur et Admin avec permissions différentes
- **Sauvegarde** : Stockage local avec localStorage
- **Chargement** : Récupération automatique des données

###  Système de rôles et classement
- **Rôles** : Joueur (normal) et Admin (gestion complète)
- **Classement** : Meilleurs joueurs par cookies, clics, production
- **Défis** : Possibilité de défier d'autres joueurs
- **Statistiques** : Vue détaillée des performances

###  Multiplicateurs de cookies
- **4 multiplicateurs** : x2, x3, x5, x10
- **Coût progressif** : Double à chaque achat
- **Effet cumulatif** : Multiplicateurs s'additionnent
- **Interface dédiée** : Panneau séparé pour les multiplicateurs

###  Production automatique
- **5 améliorations** : Curseur, Grand-mère, Ferme, Mine, Usine
- **Production continue** : Cookies générés toutes les secondes
- **Coût croissant** : Augmentation de 15% à chaque achat
- **Calcul automatique** : Mise à jour en temps réel

###  Stockage local
- **localStorage** : Sauvegarde automatique des données
- **Récupération** : Chargement au démarrage
- **Synchronisation** : Données utilisateur et jeu sauvegardées

###  Statistiques du jeu
- **Cookies par minute** : Calcul automatique
- **Production totale** : Somme de toutes les améliorations
- **Multiplicateur total** : Calcul des multiplicateurs
- **Temps de jeu** : Suivi du temps passé
- **Progression** : Barre de progression des succès

###  Système de succès
- **7 succès** : De "Premier Cookie" à "Usine à Cookies"
- **Notifications** : Alertes visuelles pour les déblocages
- **Progression** : Suivi visuel des succès
- **Conditions** : Vérification automatique des objectifs

##  Guide d'utilisation

### Pour commencer
1. **Lancez l'application** : `npm run dev`
2. **Ouvrez votre navigateur** : `http://localhost:3000`
3. **Choisissez un nom d'utilisateur** et un rôle
4. **Commencez à cliquer** sur le cookie !

### Interface utilisateur
- **Cookie géant** : Cliquez pour générer des cookies
- **Panneau de gauche** : Cookie clicker et statistiques
- **Panneau de droite** : Améliorations, multiplicateurs, succès
- **Panneau du bas** : Classement et administration (si admin)

### Stratégies de jeu
1. **Commencez par cliquer** pour accumuler des cookies
2. **Achetez des améliorations** pour la production automatique
3. **Investissez dans les multiplicateurs** pour amplifier vos gains
4. **Débloquez des succès** pour des récompenses
5. **Consultez le classement** pour voir votre progression

### Fonctionnalités admin
- **Gestion des joueurs** : Modifier les scores, réinitialiser
- **Statistiques globales** : Vue d'ensemble du jeu
- **Actions système** : Export des données, gestion des notifications

##  Objectifs à atteindre

### Succès disponibles
1. **Premier Cookie** : Cliquez sur le cookie
2. **Centenaire** : 100 cookies
3. **Millénaire** : 1 000 cookies
4. **Millionnaire** : 1 000 000 cookies
5. **Premier Achat** : Achetez une amélioration
6. **Producteur** : 10 cookies/s
7. **Usine à Cookies** : 100 cookies/s

### Améliorations à acheter
- **Curseur** : 0.1/s (10 cookies)
- **Grand-mère** : 1/s (100 cookies)
- **Ferme** : 8/s (1 100 cookies)
- **Mine** : 47/s (12 000 cookies)
- **Usine** : 260/s (130 000 cookies)

### Multiplicateurs à acquérir
- **x2** : Double (100 cookies)
- **x3** : Triple (1 000 cookies)
- **x5** : Quintuple (10 000 cookies)
- **x10** : Décuple (100 000 cookies)

##  Fonctionnalités avancées

### Notifications
- **Toast notifications** : Alertes visuelles
- **Types** : Succès, avertissement, erreur, info
- **Auto-suppression** : Disparition après 3 secondes
- **Animations** : Transitions fluides

### Responsive Design
- **Mobile** : Interface adaptée aux petits écrans
- **Tablette** : Mise en page optimisée
- **Desktop** : Interface complète
- **Grilles flexibles** : Adaptation automatique

### Performance
- **Vue 3** : Framework moderne et performant
- **Pinia** : Gestion d'état optimisée
- **Vite** : Build rapide et HMR
- **CSS optimisé** : Animations fluides

##  Points forts du projet

1. **Architecture complète** : Store Pinia avec state, mutations, actions, getters
2. **Interface moderne** : Design responsive avec animations
3. **Fonctionnalités avancées** : Système d'utilisateurs, rôles, classement
4. **Code propre** : Composants Vue bien structurés
5. **Documentation** : README et démonstration détaillés
6. **Extensibilité** : Facile d'ajouter de nouvelles fonctionnalités

## 🔧 Améliorations possibles

- [ ] Mode multijoueur en temps réel
- [ ] Système de guildes
- [ ] Événements temporaires
- [ ] Plus de types d'améliorations
- [ ] Graphiques de progression
- [ ] Système de trading
- [ ] Récompenses quotidiennes

---

**Le jeu est maintenant prêt à être utilisé ! Amusez-vous bien ! 🍪✨**
