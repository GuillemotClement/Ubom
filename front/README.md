## Architecture

```
src/
└── app/
    ├── core/
    ├── | authentication
    |   │   ├── auth.service.ts
    |   │   ├── auth.store.ts
    |   │   └── token.service.ts
    |   │
    |   ├── guards
    |   │   └── auth.guard.ts
    |   │
    |   ├── interceptors
    |   │   ├── jwt.interceptor.ts
    |   │   └── error.interceptor.ts
    |   │
    |   |-- config
    |   |   |-- api.config.ts
    |   |   |-- environment.developments.ts
    |   |
    |   └── layout
    |        ├── navbar
    |        ├── sidebar
    |        └── footer
    ├── shared/
    ├── components
    │     ├── button
    │     ├── modal
    │     ├── card
    │     ├── confirm-dialog
    │     ├── badge
    │     └── empty-state
    │   ├── directives/
    │   ├── pipes/
    │   ├── validators/
    │   └── utils/
    │
    ├── features/
    │   │
    │   ├── assets/
    │   │   ├── pages/
            ├── asset-list
                ├── SearchBarComponent
                ├── FilterComponent
                ├── AssetListComponent
                └── FloatingButtonComponent
            ├── asset-detail
            ├── asset-create
            └── asset-edit
    │   │   ├── components/
                ├── asset-card
                ├── asset-form
                ├── asset-table
                ├── asset-status
                ├── asset-timeline
                └── asset-price-history
    │   │   ├── services/
                └── asset.service.ts
    │   │   ├── models/
              ├── asset.ts
              ├── create-asset.ts
              ├── update-asset.ts
              └── asset-response.ts
    │   │   ├── enums/
                └── asset-status.enum.ts
    │   │   └── assets.routes.ts
    │   │
    │   ├── inventory/
    │   ├── meals/
    │   ├── events/
    │   ├── household/
    │   └── watchlist/
    │
    ├── app.routes.ts
    ├── app.component.ts
    └── app.config.ts
```

---

`core`: tout ce qui est utilisé une seule fois dans le projet

- `layout`: compose l'interface principale
- `services` : contient les services globaux
- `config`: contiens les configurations globales du projet

---

# Convention



## Typage 

Chaque features suit une structure pour implémenter les typages.

```
features/{domain}/
├── types/
│   ├── domain/
│   ├── api/
│   └── ui/
```

### `domain`
Représente l'entité du domaine

```ts
//features/assets/types/domain/asset.ts
export type Asset = {
  id: number;
  name: string;
  purchasePrice: number;
  status: AssetStatus;
};
```

### `api`

Représente les échange avec le backend.

**Convention de nommage**
```
create-asset.request.ts
update-asset.request.ts
asset.response.ts
```

**Exemple**
Par exemple, le typage pour la request permettant de créer un nouvel asset
```ts
//features/assets/types/api/create-asset.request.ts
export type CreateAssetRequest = {
  name: string;
  purchasePrice: number;
};
```

### `ui`

Représente les données utilisées par l'interface utilisateur (formulaire, tableaux, filtres, affichage formaté)

**Convention de nommage**
```
AssetForm
AssetTableRow
AssetFilter
```

**Exemple**
```ts
//features/assets/types/ui/asset-form.ts
export type AssetForm = {
  name: string;
  purchasePrice: string; // input HTML
  invoiceFile?: File;
};
```