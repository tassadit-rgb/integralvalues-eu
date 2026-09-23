# Integral Values Psy & Co

Application web d’Integral Values Psy & Co, construite avec React, TanStack Start, Vite, Supabase et un adaptateur de réservation remplaçable.

## Architecture de référence

- GitHub : source canonique du code.
- Hostinger : environnement d’exécution et de déploiement.
- Supabase : authentification et données appartenant à Integral Values.
- Amelia : moteur de réservation cible, hébergé séparément dans WordPress.
- Calendly : solution de repli tant qu’Amelia n’a pas passé la validation de production.

Lovable n’est ni une source de vérité, ni un fournisseur d’authentification, ni un moteur de réservation.

## Développement local

Prérequis : Bun et une version de Node.js compatible avec Vite.

```sh
git clone https://github.com/tassadit-rgb/integralvalues-eu.git
cd integralvalues-eu
cp .env.example .env.local
bun install
bun run dev
```

## Vérifications

```sh
bun run typecheck
bun run lint
bun run test
bun run build
bun run check:no-lovable
```

## Réservation

Le fournisseur actif est choisi avec `VITE_BOOKING_PROVIDER` :

- `calendly` : valeur de repli par défaut ;
- `amelia` : utilise uniquement l’URL publique définie par `VITE_AMELIA_PUBLIC_BASE_URL` ;
- `legacy` : redirige vers `/contact`.

Aucun secret Amelia, WordPress, Stripe ou PayPal ne doit être placé dans une variable `VITE_*`.

Voir `docs/AMELIA-LOVABLE-EXIT.md` pour les critères de sortie et de validation.
