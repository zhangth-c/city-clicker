# Patchwork Borough

Patchwork Borough v2 is a content-driven multi-area clicker game engine. The runtime now supports:

- `2` shared currencies: `coins` and `districts`
- area-local economies for each unlocked area
- parallel passive production across multiple areas
- policy trees with permanent branch choices per run
- an encyclopedia / codex that tracks buildings and policies across areas

## Layout

```txt
city-clicker/
  public/
    art/
      houses.jpg
      houses2.png
      houses4.png
      house-kits/
      icon-kits/
  content/
    base/
      game.json
      resources.json
      policies.json
      systems.json
    areas/
      patchwork-borough/
        manifest.json
        districts.json
      port-city/
        manifest.json
        districts.json
  scripts/
    content-lib.mjs
    validate-content.mjs
    build-content.mjs
    balance-smoke.mjs
  src/
    content-runtime/
      generated-content.js
    core/
      config.js
      format.js
      save-migrations.js
      state.js
    systems/
      economy.js
      progression.js
    ui/
      elements.js
      render.js
    main.js
  index.html
  styles.css
  package.json
```

## Content Model

### `content/base/game.json`
- app version metadata
- save schema version
- balance version
- default area id
- global formulas

### `content/base/resources.json`
- `sharedCurrencies` only
- v2 keeps exactly `coins` and `districts` shared

### `content/base/policies.json`
- all policies for all areas
- required fields:
  `areaId`, `treeId`, `tier`, `unlock`, `cost`, `effects`, `codex`
- branch fields:
  `exclusiveGroupId`, `exclusiveGroupLabel`, `prerequisitePolicyIds`, `prerequisiteAnyPolicyIds`

### `content/areas/<area>/manifest.json`
- area identity and goal text
- `populationCurrencyId`
- `localCurrencies`
- `manualActions`
- `areaUnlockPolicyId`
- `prestigeScoreConfig`

### `content/areas/<area>/districts.json`
- all buildings for that area
- required fields:
  `unlock`, `baseCost`, `outputPerSecond`, `maintenancePerSecond`, `codex`

## Runtime Model

`scripts/build-content.mjs` compiles the JSON files into [`src/content-runtime/generated-content.js`](/Users/tianhao/Documents/New%20project/city-clicker/src/content-runtime/generated-content.js).

The runtime content shape is now:

- `meta`
- `formulas`
- `sharedCurrencies`
- `areas[]`
- `buildings[]`
- `policies[]`
- `systems`
- `indexes.currencyIndex`
- `indexes.buildingsByArea`
- `indexes.policiesByArea`

## Save Model

v2 bumps the save schema to `2`.

Key state shape:

```js
{
  sharedCurrencies: { coins, districts },
  areas: {
    activeAreaId,
    unlockedAreaIds,
    "patchwork-borough": { currencies: { ... } },
    "port-city": { currencies: { ... } }
  },
  ownedBuildings,
  purchasedPolicies,
  policyChoices,
  encyclopedia,
  systems,
  stats
}
```

The migration pipeline in [`src/core/save-migrations.js`](/Users/tianhao/Documents/New%20project/city-clicker/src/core/save-migrations.js) now migrates:

- raw legacy saves -> schema `1`
- v1 borough saves -> schema `2`

v1 migration keeps:

- shared `coins`
- shared `districts`
- borough building ownership
- major borough progress
- codex seeding

Port City remains locked on migrated v1 saves until `Harbor Charter` is purchased.

## Areas

### Patchwork Borough
- `20` buildings
- local currencies:
  `residents`, `food`, `timber`, `stone`, `goods`, `power`, `knowledge`, `appeal`, `influence`
- policy trees:
  `Civic`, `Industry`, `Trade`

### Port City
- unlocked by `Harbor Charter`
- `12` buildings
- local currencies:
  `crew`, `catch`, `lumber`, `masonry`, `cargo`, `harbor_capacity`, `charts`, `renown`
- signature bottleneck:
  `harbor_capacity`
- policy trees:
  `Harbor Operations`, `Maritime Society`

## Commands

Run from [`city-clicker`](/Users/tianhao/Documents/New%20project/city-clicker):

```bash
npm run validate:content
npm run build:content
npm run smoke:balance
```

Local static preview:

```bash
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Validation and Safety

`validate:content` checks:

- duplicate ids across areas
- bad area references
- illegal cross-area currency references
- missing codex metadata
- malformed exclusivity groups
- missing unlock policies
- invalid prestige score config
- policy prerequisite cycles

`smoke:balance` is a headless sanity pass for:

- fresh borough
- borough midgame
- Port City unlock
- Port City midgame
- annexation gain

## Notes for Future Expansion

- add more areas under `content/areas/`
- keep only `coins` and `districts` shared unless the economy is intentionally re-scoped
- keep new local currencies area-bound
- use `codex` metadata on every new building and policy
- add new tree branches with exclusive groups instead of extending the flat market model
