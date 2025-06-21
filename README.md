# 🎯 Mini CRM - Next.js & Tailwind CSS

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

*Une application CRM moderne et élégante pour la gestion de la relation client*

</div>

---

## 📋 Table des Matières

- [🎯 À Propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🔧 Stack Technique](#-stack-technique)
- [🚀 Installation et Lancement](#-installation-et-lancement)
- [📁 Structure du Projet](#-structure-du-projet)
- [🧪 Scripts Disponibles](#-scripts-disponibles)
- [📄 Licence](#-licence)

---

## 🎯 À Propos

Ce projet est une **application web front-end** pour un mini système de gestion de la relation client (CRM), développée avec **Next.js** et stylisée avec **Tailwind CSS**. Elle offre une interface moderne et intuitive pour gérer efficacement vos relations clients, en se basant uniquement sur des technologies front-end et la persistance des données dans le `localStorage`.

---

## ✨ Fonctionnalités

-   **Page de Connexion (Simulation)**: Une page de connexion statique qui simule l'authentification de l'utilisateur.
-   **Tableau de Bord**: Une page principale qui affiche des statistiques clés basées sur les données mockées.
-   **Liste des Clients**:
    -   Affichage tabulaire des clients.
    -   Recherche en temps réel par nom, email, etc.
    -   Tri dynamique sur plusieurs colonnes.
-   **Fiche Client Détaillée**:
    -   Vue complète des informations d'un client.
    -   Historique des activités (appels, emails, réunions).
-   **Formulaire d'Ajout**:
    -   Formulaire utilisant `react-hook-form` pour une validation robuste côté client.
    -   Ajout de nouveaux clients avec persistance des données dans le `localStorage`.
-   **Design Responsive**: L'interface est entièrement responsive et s'adapte aux appareils mobiles.

---

## 🔧 Stack Technique

<table>
<tr>
<td align="center"><strong>Frontend</strong></td>
<td align="center"><strong>Outils & Librairies</strong></td>
</tr>
<tr>
<td>

- **[Next.js 14](https://nextjs.org/)** - Framework React
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS

</td>
<td>

- **App Router** - Routing moderne
- **[React Hook Form](https://react-hook-form.com/)** - Gestion de formulaires
- **React Hooks** - Gestion d'état
- **`localStorage`** - Persistance des données en local

</td>
</tr>
</table>

---

## 🚀 Installation et Lancement

### Prérequis
- **Node.js** (version 18+ recommandée)
- **npm** ou **yarn**
- **Git**

### 🔧 Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/mayversion/Nextjs-app.git
   cd Nextjs-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir l'application**
   
   Naviguez vers [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📁 Structure du Projet

```
Mini-CRM/
├── 📂 src/
│   ├── 📂 app/                      # App Router (Next.js 13+)
│   │   ├── 📂 dashboard/
│   │   │   ├── 📂 clients/
│   │   │   │   ├── 📄 [id]/page.tsx # Détail client
│   │   │   │   └── 📄 page.tsx      # Liste des clients
│   │   │   ├── 📂 add-client/
│   │   │   │   └── 📄 page.tsx      # Ajout client
│   │   │   ├── 📄 layout.tsx        # Layout du dashboard
│   │   │   └── 📄 page.tsx          # Page du tableau de bord
│   │   ├── 📄 globals.css           # Styles globaux
│   │   ├── 📄 layout.tsx            # Layout principal
│   │   └── 📄 page.tsx              # Page de connexion
│   ├── 📂 components/               # Composants réutilisables
│   │   ├── 📂 ui/                   # Composants UI (Button, Card, etc.)
│   │   ├── 📂 Layout/               # Composants de mise en page (Navbar)
│   │   ├── 📄 ClientForm.tsx
│   │   ├── 📄 ClientTable.tsx
│   │   └── 📄 SearchBar.tsx
│   ├── 📂 data/
│   │   └── 📄 mockClients.ts       # Données de simulation
│   ├── 📂 hooks/
│   │   └── 📄 useLocalStorage.ts   # Hook pour le localStorage
│   └── 📂 types/
│       └── 📄 client.ts            # Définitions de types
├── 📄 .gitignore
├── 📄 next.config.js
├── 📄 package.json
├── 📄 tailwind.config.js
└── 📄 tsconfig.json
```

---

## 🧪 Scripts Disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Construire l'application pour la production
npm run build

# Lancer en mode production
npm run start

# Linter le code
npm run lint
```

---

## 📄 Licence

Ce projet est sous licence **MIT**.

---

<div align="center">
**Développé par [mayversion](https://github.com/mayversion)**
</div> 