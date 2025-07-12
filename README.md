# Page de Confirmation d'Inscription - TeamUp

Cette application Next.js permet de valider les inscriptions par email via Supabase.

## Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Configurer les variables d'environnement** :
Créez un fichier `.env.local` à la racine du projet avec :
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Configuration Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet ou utilisez un projet existant
3. Dans les paramètres du projet, récupérez :
   - L'URL du projet (Settings > API)
   - La clé anon/public (Settings > API)

## Utilisation

1. **Démarrer le serveur de développement** :
```bash
npm run dev
```

2. **Accéder à la page de confirmation** :
```
http://localhost:3000/confirm?token=xxx&type=xxx
```

## Fonctionnement

La page `/confirm` :
1. Récupère les paramètres `token` et `type` depuis l'URL
2. Vérifie le token avec Supabase via `verifyOtp()`
3. En cas de succès : redirige vers `myapp://onboarding?confirmed=true`
4. En cas d'erreur : affiche "Lien invalide ou expiré"

## Structure du projet

```
src/
  app/
    confirm/
      page.tsx    # Page de confirmation
    layout.tsx    # Layout principal
    page.tsx      # Page d'accueil
```

## Déploiement

Pour déployer sur Vercel :
1. Connectez votre repository GitHub
2. Configurez les variables d'environnement dans Vercel
3. Déployez automatiquement

## Support

Pour toute question, consultez la documentation Supabase ou contactez l'équipe de développement.
