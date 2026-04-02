# Patchwork Borough

Patchwork Borough is now structured as a small content-driven game engine instead of a single script plus a single economy file. The current playable borough lives as the first `area pack`, and future areas can be added under `content/areas/` without reopening the whole runtime.

## Layout

```txt
city-clicker/
  public/
    art/
      houses.jpg
      house-kits/
        patchwork-borough/
          current/
          future/
          library/
          kit.json
      icon-kits/
        patchwork-borough/
          policies/
          prestige/
          resources/
          library/
          kit.json
      generated/
        manifest.json
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
  scripts/
    content-lib.mjs
    generate-pixel-art.mjs
    validate-content.mjs
    build-content.mjs
  src/
    content-runtime/
      generated-content.js
    core/
      config.js
      format.js
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

- `content/base/game.json`
  Selects the active area and stores app-level metadata, including `appVersion`, `saveVersion`, and `balanceVersion`.
- `content/base/resources.json`
  Global resource definitions.
- `content/base/policies.json`
  Shared policy catalog.
- `content/base/systems.json`
  Cross-area systems such as annexation.
- `content/areas/<area-id>/manifest.json`
  Area identity, pacing, formulas, and starting state.
- `content/areas/<area-id>/districts.json`
  Area-specific district catalog.

The browser does not read those JSON files directly. Instead, `scripts/build-content.mjs` validates and compiles them into [`src/content-runtime/generated-content.js`](/Users/tianhao/Documents/New%20project/city-clicker/src/content-runtime/generated-content.js), which is what the runtime imports.

## Runtime Split

- `src/core`
  Generic app constants, formatting, and save-state normalization.
- `src/systems`
  Economy math, modifiers, unlock progression, and annexation logic.
- `src/ui`
  DOM binding and rendering only.
- `src/main.js`
  The app entry point and frame loop.

This split is meant to scale to many areas, districts, resources, and events by keeping gameplay data declarative and the engine generic.

## Versioning

- `appVersion`
  The player-facing release version. Use semantic versioning such as `1.0.0`, `1.1.0`, or `2.0.0`.
- `saveVersion`
  The save-schema version used by the migration pipeline. Increment this when save structure changes.
- `balanceVersion`
  The economy/content tuning version. Increment this when costs, pacing, or formulas change substantially without necessarily breaking saves.

New saves are written as versioned envelopes, and older raw saves are migrated forward through [`src/core/save-migrations.js`](/Users/tianhao/Documents/New%20project/city-clicker/src/core/save-migrations.js).

## Commands

Run from [`city-clicker`](/Users/tianhao/Documents/New%20project/city-clicker):

```bash
npm run build:art
npm run validate:content
npm run build:content
```

Or directly:

```bash
node scripts/generate-pixel-art.mjs
node scripts/validate-content.mjs
node scripts/build-content.mjs
```

`build:art` regenerates the SVG pixel assets under [`public/art/generated/`](/Users/tianhao/Documents/New%20project/city-clicker/public/art/generated) and refreshes the generated art manifest.

## House Kits

Patchwork Borough now keeps its finalized house art in [`public/art/house-kits/patchwork-borough/`](/Users/tianhao/Documents/New%20project/city-clicker/public/art/house-kits/patchwork-borough):

- `current/`
  Extracted house sprites used by the live district cards.
- `library/`
  The approved source sheet used to derive the live sprites.
- `future/`
  Curated expansion sheets and upgrade ladders for later areas or district-upgrade systems.
- `kit.json`
  A small manifest pointing at the approved sheet selection.

The raw generation workflow stays outside this upload folder in `gemini-art-lab`. Only approved outputs should be copied into `house-kits/`.

## Icon Kits

Patchwork Borough also keeps its finalized HUD and policy icons in [`public/art/icon-kits/patchwork-borough/`](/Users/tianhao/Documents/New%20project/city-clicker/public/art/icon-kits/patchwork-borough):

- `resources/`
  The live currency icons used in the top HUD and district output labels.
- `prestige/`
  The live annexation prestige icon.
- `policies/`
  The live policy icons used in the market and active-policy panel.
- `library/`
  The approved source sheets selected from the batch icon generations.
- `kit.json`
  A manifest recording which sheet variant was chosen for each icon family.

As with the house kits, raw generation remains in `gemini-art-lab`; only curated sheets and exported icons belong here.

## Adding Another Area

1. Create `content/areas/<new-area-id>/manifest.json`.
2. Create `content/areas/<new-area-id>/districts.json`.
3. Point `content/base/game.json` at the new `activeAreaId`.
4. Run `npm run validate:content`.
5. Run `npm run build:content`.

If the new area needs its own art, place it under `public/art/` and reference it from the area manifest.

## Next Scaling Steps

- Split lore strings from mechanics so text can be localized separately.
- Add event catalogs under `content/areas/<area-id>/events.json`.
- Add precomputed indexes in the build step for large district and event pools.
- Add a headless balance simulator under `scripts/` for long-run tuning.
