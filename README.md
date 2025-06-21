# Mini CRM - Next.js & Tailwind CSS

Ce projet est une application web front-end pour un mini système de gestion de la relation client (CRM), développée avec Next.js et stylisée avec Tailwind CSS. Elle permet de consulter, d'ajouter et de visualiser des fiches clients détaillées.

## Fonctionnalités

*   **Page de Connexion (Simulation)**: Une page de connexion statique qui simule l'authentification de l'utilisateur.
*   **Tableau de Bord**: Une page principale qui affiche des statistiques clés (nombre total de clients, clients VIP, etc.).
*   **Liste des Clients**:
    *   Affichage tabulaire des clients avec recherche et tri en temps réel.
    *   Les colonnes incluent le nom, l'email, le téléphone et la date de création.
*   **Fiche Client Détaillée**:
    *   Vue complète des informations d'un client.
    *   Historique des activités (appels, emails, réunions).
*   **Formulaire d'Ajout**:
    *   Formulaire utilisant `react-hook-form` pour une validation robuste côté client.
    *   Ajout de nouveaux clients avec persistance des données dans le `localStorage`.
*   **Design Responsive**: L'interface est entièrement responsive et s'adapte aux appareils mobiles.

## Stack Technique

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Langage**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Gestion de Formulaires**: [React Hook Form](https://react-hook-form.com/)
*   **Gestion de State**: Hooks React (`useState`, `useEffect`) et `localStorage`

## Installation et Lancement

Suivez ces étapes pour lancer le projet en local.

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/mayversion/Nextjs-app.git
    cd Nextjs-app
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```

4.  Ouvrez votre navigateur et allez sur [http://localhost:3000](http://localhost:3000). 