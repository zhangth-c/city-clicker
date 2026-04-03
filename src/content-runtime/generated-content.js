const GAME_CONTENT = {
  "meta": {
    "appId": "city-clicker",
    "id": "city-clicker",
    "appVersion": "2.0.0",
    "saveVersion": 3,
    "balanceVersion": "2.7.0",
    "eyebrow": "HTML5 City Clicker",
    "name": "Patchwork Borough"
  },
  "formulas": {
    "buildingCostGrowth": 1.19,
    "tickRateMs": 100,
    "autosaveMs": 10000,
    "offlineProgressCapSeconds": 14400
  },
  "defaultAreaId": "patchwork-borough",
  "sharedCurrencies": {
    "coins": {
      "id": "coins",
      "name": "Coins",
      "kind": "shared",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/coins.png",
      "description": "Shared money that moves between every unlocked area."
    },
    "districts": {
      "id": "districts",
      "name": "Districts",
      "kind": "prestige",
      "iconPath": "./public/art/icon-kits/patchwork-borough/prestige/districts.png",
      "description": "Total annexed districts across all areas."
    }
  },
  "areas": [
    {
      "id": "patchwork-borough",
      "runtimeId": "patchwork-borough-v2",
      "name": "Patchwork Borough",
      "theme": "A layered inland borough where housing, supply, industry, and prestige districts compete for space.",
      "goalText": "Grow a small borough into a city worth remembering.",
      "populationCurrencyId": "residents",
      "areaUnlockPolicyId": null,
      "localCurrencies": {
        "residents": {
          "id": "residents",
          "name": "Residents",
          "kind": "population",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/residents.png",
          "description": "Population capacity that unlocks more ambitious borough projects."
        },
        "food": {
          "id": "food",
          "name": "Food",
          "kind": "supply",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/food.png",
          "description": "Daily provisions consumed by homes, estates, and civic districts."
        },
        "timber": {
          "id": "timber",
          "name": "Timber",
          "kind": "supply",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/timber.png",
          "description": "Framing, lumber, and raw wood for housing and civic works."
        },
        "stone": {
          "id": "stone",
          "name": "Stone",
          "kind": "supply",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/stone.png",
          "description": "Masonry for terraces, civic halls, and late industrial works."
        },
        "goods": {
          "id": "goods",
          "name": "Goods",
          "kind": "trade",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/goods.png",
          "description": "Crafted wares that support trade, public services, and prestige districts."
        },
        "power": {
          "id": "power",
          "name": "Power",
          "kind": "utility",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/power.png",
          "description": "Mechanical and electrical capacity for advanced borough infrastructure."
        },
        "knowledge": {
          "id": "knowledge",
          "name": "Knowledge",
          "kind": "research",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/knowledge.png",
          "description": "Surveying, schooling, and technical skill."
        },
        "appeal": {
          "id": "appeal",
          "name": "Appeal",
          "kind": "prestige",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/appeal.png",
          "description": "Cultural draw created by landmarks, estates, and civic scenery."
        },
        "influence": {
          "id": "influence",
          "name": "Influence",
          "kind": "prestige",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/influence.png",
          "description": "Political leverage created by civic institutions and prestige districts."
        }
      },
      "startingCurrencies": {
        "residents": 0,
        "food": 0,
        "timber": 0,
        "stone": 0,
        "goods": 0,
        "power": 0,
        "knowledge": 0,
        "appeal": 0,
        "influence": 0
      },
      "manualActions": [
        {
          "id": "collect-taxes",
          "areaId": "patchwork-borough",
          "name": "Collect Taxes",
          "currency": "coins",
          "baseAmount": 1.3,
          "applyIncomeMultiplier": true,
          "populationScaling": {
            "perPopulation": 20,
            "amount": 1
          }
        },
        {
          "id": "gather-harvest",
          "areaId": "patchwork-borough",
          "name": "Gather Harvest",
          "currency": "food",
          "unlockBuildingId": "farmstead",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "granary-cooperative",
          "baseAmount": 1.25,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "farmstead",
              "amountPerOwned": 0.32
            },
            {
              "buildingId": "greenhouse-terrace",
              "amountPerOwned": 0.28
            }
          ]
        },
        {
          "id": "fell-timber",
          "areaId": "patchwork-borough",
          "name": "Fell Timber",
          "currency": "timber",
          "unlockBuildingId": "timber-cabin",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "quarry-standards",
          "baseAmount": 1.05,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "timber-cabin",
              "amountPerOwned": 0.2
            },
            {
              "buildingId": "quarry-yard",
              "amountPerOwned": 0.1
            }
          ]
        },
        {
          "id": "quarry-stone",
          "areaId": "patchwork-borough",
          "name": "Quarry Stone",
          "currency": "stone",
          "unlockBuildingId": "quarry-yard",
          "unlockPolicyId": "quarry-standards",
          "baseAmount": 0.9,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "timber-cabin",
              "amountPerOwned": 0.1
            },
            {
              "buildingId": "quarry-yard",
              "amountPerOwned": 0.24
            }
          ]
        },
        {
          "id": "pack-goods",
          "areaId": "patchwork-borough",
          "name": "Pack Goods",
          "currency": "goods",
          "unlockBuildingId": "freight-depot",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "workshop-standards",
          "baseAmount": 0.82,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "red-cottage",
              "amountPerOwned": 0.06
            },
            {
              "buildingId": "freight-depot",
              "amountPerOwned": 0.18
            },
            {
              "buildingId": "brick-factory",
              "amountPerOwned": 0.18
            }
          ]
        },
        {
          "id": "survey-records",
          "areaId": "patchwork-borough",
          "name": "Survey Records",
          "currency": "knowledge",
          "unlockBuildingId": "cube-villa",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "public-schools",
          "baseAmount": 0.42,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "cube-villa",
              "amountPerOwned": 0.1
            },
            {
              "buildingId": "public-archive",
              "amountPerOwned": 0.14
            },
            {
              "buildingId": "dome-habitat",
              "amountPerOwned": 0.08
            }
          ]
        },
        {
          "id": "route-current",
          "areaId": "patchwork-borough",
          "name": "Route Current",
          "currency": "power",
          "unlockBuildingId": "summit-powerhouse",
          "unlockPolicyId": "power-authority",
          "baseAmount": 0.48,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "brick-factory",
              "amountPerOwned": 0.05
            },
            {
              "buildingId": "summit-powerhouse",
              "amountPerOwned": 0.2
            }
          ]
        },
        {
          "id": "stage-festival",
          "areaId": "patchwork-borough",
          "name": "Stage Festival",
          "currency": "appeal",
          "unlockBuildingId": "grand-manor",
          "unlockPolicyId": "festival-office",
          "baseAmount": 0.2,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "grand-manor",
              "amountPerOwned": 0.05
            },
            {
              "buildingId": "hillside-lodge",
              "amountPerOwned": 0.07
            },
            {
              "buildingId": "skyline-galleria",
              "amountPerOwned": 0.08
            }
          ]
        },
        {
          "id": "broker-favors",
          "areaId": "patchwork-borough",
          "name": "Broker Favors",
          "currency": "influence",
          "unlockBuildingId": "borough-exchange",
          "unlockPolicyId": "guild-brokers",
          "baseAmount": 0.18,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "borough-exchange",
              "amountPerOwned": 0.05
            },
            {
              "buildingId": "stone-keep",
              "amountPerOwned": 0.08
            },
            {
              "buildingId": "skyline-galleria",
              "amountPerOwned": 0.05
            }
          ]
        }
      ],
      "prestigeScoreConfig": [
        {
          "currencyId": "residents",
          "per": 160,
          "gain": 1
        },
        {
          "currencyId": "appeal",
          "per": 10,
          "gain": 1
        },
        {
          "currencyId": "influence",
          "per": 8,
          "gain": 1
        }
      ],
      "annexationBonuses": [
        {
          "currencyId": "coins",
          "multiplierPerDistrict": 0.025
        },
        {
          "currencyId": "goods",
          "multiplierPerDistrict": 0.02
        },
        {
          "currencyId": "knowledge",
          "multiplierPerDistrict": 0.02
        },
        {
          "currencyId": "influence",
          "multiplierPerDistrict": 0.015
        }
      ],
      "buildings": [
        {
          "id": "suburban-duplex",
          "name": "Clockhouse Duplex",
          "artPath": "./public/art/house-kits/patchwork-borough/current/clockhouse-duplex.png",
          "category": "residential",
          "unlock": {},
          "baseCost": {
            "coins": 20
          },
          "outputPerSecond": {
            "coins": 0.16
          },
          "maintenancePerSecond": {
            "coins": 0.03
          },
          "statsPerOwned": {
            "residents": 2
          },
          "synergies": [
            {
              "label": "Shared porches",
              "targetType": "stat",
              "target": "residents",
              "sourceBuildingIds": [
                "red-cottage"
              ],
              "perOwned": 2,
              "bonus": 0.05,
              "cap": 0.25
            }
          ],
          "description": "A dependable starter address that grows the borough's first block and gives taxes somewhere to come from.",
          "codex": {
            "family": "clockhouse",
            "tier": 1,
            "summary": "Starter housing that establishes the first resident base.",
            "lore": "The clockhouse duplex is where the borough starts counting itself. Two families, one meter, and a street that finally keeps time.",
            "masteryTarget": 12,
            "sortKey": 10
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "red-cottage",
          "name": "Red Cottage",
          "artPath": "./public/art/house-kits/patchwork-borough/current/red-cottage.png",
          "category": "residential",
          "unlock": {
            "residents": 6
          },
          "baseCost": {
            "coins": 60
          },
          "outputPerSecond": {
            "coins": 0.24,
            "goods": 0.08
          },
          "maintenancePerSecond": {
            "coins": 0.04
          },
          "statsPerOwned": {
            "residents": 2
          },
          "synergies": [
            {
              "label": "Corner trade",
              "targetType": "output",
              "target": "goods",
              "sourceBuildingIds": [
                "suburban-duplex"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "Small homes start selling from the porch, turning population into the borough's first real goods stream.",
          "codex": {
            "family": "cottage",
            "tier": 1,
            "summary": "Early mixed housing that adds both residents and small trade.",
            "lore": "Every red cottage adds a little commerce to the street. Curtains stay shut, but the porch is always open for business.",
            "masteryTarget": 12,
            "sortKey": 20
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "timber-cabin",
          "name": "Hearth Grotto",
          "artPath": "./public/art/house-kits/patchwork-borough/current/hearth-grotto.png",
          "category": "rural",
          "unlock": {
            "residents": 10
          },
          "baseCost": {
            "coins": 110
          },
          "outputPerSecond": {
            "timber": 0.2,
            "stone": 0.08
          },
          "maintenancePerSecond": {
            "coins": 0.03
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Supply trail",
              "targetType": "output",
              "target": "timber",
              "sourceBuildingIds": [
                "farmstead"
              ],
              "perOwned": 1,
              "bonus": 0.1,
              "cap": 0.5
            }
          ],
          "description": "A rough hillside supply camp that cuts timber and drags stone into the borough.",
          "codex": {
            "family": "grotto",
            "tier": 1,
            "summary": "Starter supply district for timber and stone.",
            "lore": "The hearth grotto is cold, smoky, and essential. It is where the first serious building material leaves the hillside.",
            "masteryTarget": 12,
            "sortKey": 30
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "farmstead",
          "name": "Windmill Homestead",
          "artPath": "./public/art/house-kits/patchwork-borough/current/windmill-homestead.png",
          "category": "rural",
          "unlock": {
            "residents": 18,
            "timber": 8
          },
          "baseCost": {
            "coins": 240,
            "timber": 8
          },
          "outputPerSecond": {
            "food": 0.62
          },
          "maintenancePerSecond": {
            "coins": 0.05
          },
          "statsPerOwned": {
            "residents": 1
          },
          "synergies": [
            {
              "label": "Town orders",
              "targetType": "output",
              "target": "food",
              "sourceBuildingIds": [
                "red-cottage"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "The first food backbone. Once this comes online, later housing and civic districts stop starving the borough.",
          "codex": {
            "family": "homestead",
            "tier": 1,
            "summary": "Foundational food district that stabilizes the borough's upkeep.",
            "lore": "The windmill homestead turns a patch of land into a promise that the next district will be fed.",
            "masteryTarget": 12,
            "sortKey": 40
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "lane-bungalow",
          "name": "Lane Bungalow",
          "artPath": "./public/art/house-kits/patchwork-borough/current/lane-bungalow.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-top-1",
          "category": "residential",
          "unlock": {
            "residents": 22,
            "food": 8,
            "timber": 12
          },
          "baseCost": {
            "coins": 220,
            "food": 10,
            "timber": 90
          },
          "outputPerSecond": {
            "coins": 0.44,
            "goods": 0.05
          },
          "maintenancePerSecond": {
            "food": 0.42
          },
          "statsPerOwned": {
            "residents": 2
          },
          "synergies": [
            {
              "label": "Block traffic",
              "targetType": "output",
              "target": "coins",
              "sourceBuildingIds": [
                "red-cottage"
              ],
              "perOwned": 2,
              "bonus": 0.06,
              "cap": 0.3
            }
          ],
          "description": "Dense starter housing that trades a food burden for better tax traffic and a touch of commerce.",
          "codex": {
            "family": "bungalow",
            "tier": 2,
            "summary": "Mid-opening housing that pushes population and taxes while introducing food pressure.",
            "lore": "A lane full of bungalows feels like growth from a distance and crowding up close. The tax office loves it either way.",
            "masteryTarget": 10,
            "sortKey": 50
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "quarry-yard",
          "name": "Quarry Yard",
          "artPath": "./public/art/house-kits/patchwork-borough/current/quarry-yard.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-top-2",
          "category": "rural",
          "unlock": {
            "residents": 28,
            "timber": 24,
            "food": 12
          },
          "baseCost": {
            "coins": 320,
            "timber": 220,
            "food": 12
          },
          "outputPerSecond": {
            "stone": 0.66
          },
          "maintenancePerSecond": {
            "food": 0.36
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Hillside haul",
              "targetType": "output",
              "target": "stone",
              "sourceBuildingIds": [
                "timber-cabin"
              ],
              "perOwned": 1,
              "bonus": 0.09,
              "cap": 0.45
            }
          ],
          "description": "A dedicated stone yard that turns the early timber camp into a real construction chain.",
          "codex": {
            "family": "quarry",
            "tier": 2,
            "summary": "Dedicated stone producer for the borough's midgame bottleneck.",
            "lore": "The quarry yard is the moment the borough stops improvising with fieldstone and starts thinking in walls, terraces, and civic facades.",
            "masteryTarget": 10,
            "sortKey": 60
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "cube-villa",
          "name": "Observatory Villa",
          "artPath": "./public/art/house-kits/patchwork-borough/current/observatory-villa.png",
          "category": "civic",
          "unlock": {
            "residents": 34,
            "timber": 36,
            "stone": 30,
            "goods": 12
          },
          "baseCost": {
            "coins": 420,
            "timber": 260,
            "stone": 34,
            "goods": 14
          },
          "outputPerSecond": {
            "coins": 0.95,
            "knowledge": 0.22
          },
          "maintenancePerSecond": {
            "food": 0.34,
            "goods": 0.12
          },
          "statsPerOwned": {
            "residents": 1
          },
          "synergies": [
            {
              "label": "Field notes",
              "targetType": "output",
              "target": "knowledge",
              "sourceBuildingIds": [
                "quarry-yard"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "The borough's first knowledge district, turning materials and stocked wares into planning capacity.",
          "codex": {
            "family": "observatory",
            "tier": 2,
            "summary": "Early civic knowledge district with a modest tax return.",
            "lore": "From the observatory villa, the borough starts measuring itself instead of merely surviving itself.",
            "masteryTarget": 10,
            "sortKey": 70
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "freight-depot",
          "name": "Freight Depot",
          "artPath": "./public/art/house-kits/patchwork-borough/current/freight-depot.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-top-3",
          "category": "industrial",
          "unlock": {
            "residents": 40,
            "stone": 52,
            "goods": 18
          },
          "baseCost": {
            "coins": 420,
            "timber": 120,
            "stone": 82,
            "goods": 42
          },
          "outputPerSecond": {
            "goods": 0.56,
            "coins": 0.88
          },
          "maintenancePerSecond": {
            "food": 0.28
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Porch contracts",
              "targetType": "output",
              "target": "goods",
              "sourceBuildingIds": [
                "red-cottage",
                "lane-bungalow"
              ],
              "perOwned": 2,
              "bonus": 0.07,
              "cap": 0.35
            }
          ],
          "description": "A logistics district that turns local craft into organized trade and lays the groundwork for later industry.",
          "codex": {
            "family": "freight",
            "tier": 2,
            "summary": "Mid-opening logistics district that raises goods and tax flow together.",
            "lore": "Once the freight depot opens, the borough stops carrying its economy by hand.",
            "masteryTarget": 10,
            "sortKey": 80
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "grand-manor",
          "name": "Pagoda Estate",
          "artPath": "./public/art/house-kits/patchwork-borough/current/pagoda-estate.png",
          "category": "prestige",
          "unlock": {
            "residents": 48,
            "goods": 24,
            "knowledge": 8,
            "stone": 50
          },
          "baseCost": {
            "coins": 560,
            "timber": 420,
            "goods": 52,
            "knowledge": 16,
            "stone": 40
          },
          "outputPerSecond": {
            "appeal": 0.3,
            "influence": 0.1
          },
          "maintenancePerSecond": {
            "food": 0.72,
            "goods": 0.14
          },
          "statsPerOwned": {
            "residents": 1
          },
          "synergies": [
            {
              "label": "Ceremonial route",
              "targetType": "output",
              "target": "appeal",
              "sourceBuildingIds": [
                "hillside-lodge"
              ],
              "perOwned": 1,
              "bonus": 0.1,
              "cap": 0.5
            }
          ],
          "description": "A prestige estate that starts turning growth into civic gravity instead of basic throughput.",
          "codex": {
            "family": "estate",
            "tier": 3,
            "summary": "First prestige district and an early source of appeal and influence.",
            "lore": "The pagoda estate does not house many people, but it makes the borough feel important enough that people start taking it seriously.",
            "masteryTarget": 8,
            "sortKey": 90
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "greenhouse-terrace",
          "name": "Greenhouse Terrace",
          "artPath": "./public/art/house-kits/patchwork-borough/current/greenhouse-terrace.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-top-4",
          "category": "rural",
          "unlock": {
            "residents": 56,
            "stone": 90,
            "knowledge": 16
          },
          "baseCost": {
            "coins": 1300,
            "timber": 40,
            "stone": 130,
            "knowledge": 28
          },
          "outputPerSecond": {
            "food": 1.36,
            "goods": 0.1
          },
          "maintenancePerSecond": {
            "goods": 0.12
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Measured yields",
              "targetType": "output",
              "target": "food",
              "sourceBuildingIds": [
                "cube-villa"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "A scientific rural build that solves midgame food pressure without giving up the supply economy.",
          "codex": {
            "family": "greenhouse",
            "tier": 3,
            "summary": "Midgame food stabilizer that depends on stone and knowledge.",
            "lore": "The greenhouse terrace proves that a borough can apply planning to hunger and actually win.",
            "masteryTarget": 8,
            "sortKey": 100
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "brick-factory",
          "name": "Brick Factory",
          "artPath": "./public/art/house-kits/patchwork-borough/current/brick-factory.png",
          "category": "industrial",
          "unlock": {
            "residents": 64,
            "stone": 140,
            "timber": 60,
            "goods": 28
          },
          "baseCost": {
            "coins": 1550,
            "stone": 280,
            "timber": 110,
            "goods": 88
          },
          "outputPerSecond": {
            "goods": 1.2,
            "stone": 0.72,
            "power": 0.24
          },
          "maintenancePerSecond": {
            "food": 0.14,
            "goods": 0.12
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Quarry freight",
              "targetType": "output",
              "target": "power",
              "sourceBuildingIds": [
                "quarry-yard",
                "freight-depot"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "The industrial hinge of the borough. Goods and stone climb, and the power economy finally begins.",
          "codex": {
            "family": "factory",
            "tier": 3,
            "summary": "Industrial hinge that opens power and pushes the midgame forward.",
            "lore": "The brick factory makes the borough loud, dirty, and suddenly much more capable.",
            "masteryTarget": 8,
            "sortKey": 110
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "borough-exchange",
          "name": "Borough Exchange",
          "artPath": "./public/art/house-kits/patchwork-borough/current/borough-exchange.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-top-5",
          "category": "civic",
          "unlock": {
            "residents": 72,
            "goods": 90,
            "knowledge": 24,
            "power": 4
          },
          "baseCost": {
            "coins": 1800,
            "stone": 240,
            "goods": 420,
            "knowledge": 120
          },
          "outputPerSecond": {
            "coins": 4.8,
            "influence": 0.2
          },
          "maintenancePerSecond": {
            "power": 0.32,
            "food": 0.18,
            "goods": 0.9
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Broker network",
              "targetType": "output",
              "target": "coins",
              "sourceBuildingIds": [
                "freight-depot"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.48
            }
          ],
          "description": "A civic-commercial hub that converts organized trade into shared money and political leverage.",
          "codex": {
            "family": "exchange",
            "tier": 3,
            "summary": "Civic finance district that turns local trade into coins and influence.",
            "lore": "The borough exchange is where trade stops being a local habit and becomes a political fact.",
            "masteryTarget": 8,
            "sortKey": 120
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "hillside-lodge",
          "name": "Lighthouse Lodge",
          "artPath": "./public/art/house-kits/patchwork-borough/current/lighthouse-lodge.png",
          "category": "prestige",
          "unlock": {
            "residents": 78,
            "appeal": 12,
            "goods": 120,
            "stone": 120
          },
          "baseCost": {
            "coins": 2200,
            "stone": 260,
            "goods": 360,
            "appeal": 80
          },
          "outputPerSecond": {
            "coins": 4,
            "appeal": 0.3,
            "influence": 0.1
          },
          "maintenancePerSecond": {
            "food": 0.28,
            "goods": 0.7
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Beacon reputation",
              "targetType": "output",
              "target": "influence",
              "sourceBuildingIds": [
                "stone-keep"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "A scenic prestige district that monetizes the borough's status without doing much to solve its shortages.",
          "codex": {
            "family": "lodge",
            "tier": 3,
            "summary": "Prestige lodging that ties appeal, influence, and shared coin together.",
            "lore": "The lodge teaches the borough a useful lesson: scenery can be converted into money if someone is willing to charge for the view.",
            "masteryTarget": 8,
            "sortKey": 130
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "public-archive",
          "name": "Public Archive",
          "artPath": "./public/art/house-kits/patchwork-borough/current/public-archive.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-top-6",
          "category": "civic",
          "unlock": {
            "residents": 86,
            "knowledge": 50,
            "stone": 180,
            "goods": 120,
            "power": 8
          },
          "baseCost": {
            "coins": 2600,
            "stone": 1100,
            "goods": 900,
            "knowledge": 520,
            "power": 90
          },
          "outputPerSecond": {
            "knowledge": 0.9,
            "influence": 0.12
          },
          "maintenancePerSecond": {
            "power": 0.45,
            "goods": 0.6
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Survey office",
              "targetType": "output",
              "target": "knowledge",
              "sourceBuildingIds": [
                "cube-villa"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "A formal archive that turns knowledge into a durable civic resource rather than a byproduct of villas.",
          "codex": {
            "family": "archive",
            "tier": 4,
            "summary": "Institutional knowledge building that supports late civic growth.",
            "lore": "The public archive is what happens when a borough decides its records are worth protecting and its plans are worth keeping.",
            "masteryTarget": 6,
            "sortKey": 140
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "dome-habitat",
          "name": "Ice Dome Habitat",
          "artPath": "./public/art/house-kits/patchwork-borough/current/ice-dome-habitat.png",
          "category": "civic",
          "unlock": {
            "residents": 96,
            "power": 30,
            "knowledge": 64,
            "goods": 180
          },
          "baseCost": {
            "coins": 6200,
            "stone": 1180,
            "goods": 760,
            "power": 520,
            "knowledge": 460
          },
          "outputPerSecond": {
            "coins": 5.8,
            "knowledge": 0.8,
            "appeal": 0.15
          },
          "maintenancePerSecond": {
            "food": 0.35,
            "power": 0.82,
            "goods": 0.3
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Engineered climate",
              "targetType": "output",
              "target": "knowledge",
              "sourceBuildingIds": [
                "summit-powerhouse"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "An engineered civic district that transforms industrial power into late borough planning capacity.",
          "codex": {
            "family": "dome",
            "tier": 4,
            "summary": "Late civic district built on power, knowledge, and goods.",
            "lore": "The ice dome habitat is the borough announcing that it can now build for ideas, not just needs.",
            "masteryTarget": 6,
            "sortKey": 150
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "summit-powerhouse",
          "name": "Summit Powerhouse",
          "artPath": "./public/art/house-kits/patchwork-borough/current/summit-powerhouse.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-bottom-1",
          "category": "industrial",
          "unlock": {
            "residents": 104,
            "stone": 260,
            "goods": 180,
            "knowledge": 48
          },
          "baseCost": {
            "coins": 6800,
            "stone": 1500,
            "goods": 920,
            "knowledge": 420
          },
          "outputPerSecond": {
            "power": 1.55,
            "goods": 0.24
          },
          "maintenancePerSecond": {
            "food": 0.18,
            "goods": 0.32
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Industrial load",
              "targetType": "output",
              "target": "power",
              "sourceBuildingIds": [
                "brick-factory"
              ],
              "perOwned": 1,
              "bonus": 0.1,
              "cap": 0.4
            }
          ],
          "description": "The late industrial backbone. Once this exists, advanced districts stop competing over scraps of utility capacity.",
          "codex": {
            "family": "powerhouse",
            "tier": 4,
            "summary": "Late industrial utility district and the borough's main power source.",
            "lore": "The summit powerhouse is visible from almost everywhere, which is fitting because almost everything starts depending on it.",
            "masteryTarget": 6,
            "sortKey": 160
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "stone-keep",
          "name": "Gothic Keep",
          "artPath": "./public/art/house-kits/patchwork-borough/current/gothic-keep.png",
          "category": "prestige",
          "unlock": {
            "residents": 112,
            "appeal": 36,
            "influence": 24,
            "stone": 320
          },
          "baseCost": {
            "coins": 7600,
            "stone": 980,
            "goods": 460,
            "appeal": 360,
            "influence": 420
          },
          "outputPerSecond": {
            "appeal": 0.48,
            "influence": 0.58
          },
          "maintenancePerSecond": {
            "food": 0.32,
            "goods": 0.26
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Old authority",
              "targetType": "output",
              "target": "influence",
              "sourceBuildingIds": [
                "grand-manor"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "A severe prestige district that pushes influence harder than almost anything else in the borough.",
          "codex": {
            "family": "keep",
            "tier": 4,
            "summary": "Late prestige district centered on influence and civic weight.",
            "lore": "The gothic keep does not need to be useful in a practical sense. Its job is to remind everyone who gets heard.",
            "masteryTarget": 6,
            "sortKey": 170
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "palm-bungalow",
          "name": "Treehouse Retreat",
          "artPath": "./public/art/house-kits/patchwork-borough/current/treehouse-retreat.png",
          "category": "prestige",
          "unlock": {
            "residents": 120,
            "appeal": 24,
            "goods": 180,
            "food": 280
          },
          "baseCost": {
            "coins": 8200,
            "timber": 420,
            "goods": 560,
            "food": 1200,
            "appeal": 320
          },
          "outputPerSecond": {
            "coins": 5.4,
            "appeal": 0.36,
            "influence": 0.14
          },
          "maintenancePerSecond": {
            "food": 0.55,
            "goods": 0.42
          },
          "statsPerOwned": {
            "residents": 2
          },
          "synergies": [
            {
              "label": "Scenic circuit",
              "targetType": "output",
              "target": "appeal",
              "sourceBuildingIds": [
                "hillside-lodge"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "A high-end retreat that rewards a mature food economy and turns leisure into prestige.",
          "codex": {
            "family": "treehouse",
            "tier": 4,
            "summary": "Late prestige lodging that spends food to generate scenic value.",
            "lore": "The treehouse retreat is proof that by the late game the borough can afford to make beauty impractical on purpose.",
            "masteryTarget": 6,
            "sortKey": 180
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "glass-condo",
          "name": "Glass Highrise",
          "artPath": "./public/art/house-kits/patchwork-borough/current/glass-highrise.png",
          "category": "residential",
          "unlock": {
            "residents": 132,
            "power": 46,
            "knowledge": 72,
            "influence": 34
          },
          "baseCost": {
            "coins": 9600,
            "stone": 1900,
            "goods": 620,
            "power": 760,
            "knowledge": 700
          },
          "outputPerSecond": {
            "coins": 12.5,
            "influence": 0.34
          },
          "maintenancePerSecond": {
            "food": 0.4,
            "power": 0.95,
            "goods": 0.28
          },
          "statsPerOwned": {
            "residents": 6
          },
          "synergies": [
            {
              "label": "Financial skyline",
              "targetType": "output",
              "target": "coins",
              "sourceBuildingIds": [
                "borough-exchange"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "A late residential tax engine that turns power and knowledge into dense high-value housing.",
          "codex": {
            "family": "highrise",
            "tier": 5,
            "summary": "Late residential tower that pushes both population and shared money.",
            "lore": "The glass highrise reflects the rest of the borough back at itself: wealthier, denser, and far more fragile if the lights go out.",
            "masteryTarget": 4,
            "sortKey": 190
          },
          "areaId": "patchwork-borough"
        },
        {
          "id": "skyline-galleria",
          "name": "Skyline Galleria",
          "artPath": "./public/art/house-kits/patchwork-borough/current/skyline-galleria.png",
          "spriteSheetPath": "./public/art/houses4.png",
          "spriteRef": "houses-bottom-2",
          "category": "prestige",
          "unlock": {
            "residents": 144,
            "appeal": 54,
            "influence": 56,
            "power": 52,
            "goods": 220
          },
          "baseCost": {
            "coins": 11200,
            "stone": 1500,
            "goods": 1500,
            "power": 860,
            "appeal": 960,
            "influence": 1100
          },
          "outputPerSecond": {
            "coins": 15.2,
            "appeal": 0.66,
            "influence": 0.36
          },
          "maintenancePerSecond": {
            "food": 0.65,
            "goods": 1.05,
            "power": 0.62
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Skyline draw",
              "targetType": "output",
              "target": "appeal",
              "sourceBuildingIds": [
                "glass-condo",
                "stone-keep"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "A capstone prestige district that consumes the borough's late civic currencies and pays back in status and shared revenue.",
          "codex": {
            "family": "galleria",
            "tier": 5,
            "summary": "Late prestige capstone that spends power, appeal, and influence together.",
            "lore": "The skyline galleria is the borough at its most self-aware: expensive, visible, and built mainly to prove it can exist.",
            "masteryTarget": 4,
            "sortKey": 200
          },
          "areaId": "patchwork-borough"
        }
      ],
      "policies": [
        {
          "id": "census-registry",
          "areaId": "patchwork-borough",
          "treeId": "civic",
          "tier": 1,
          "category": "civic",
          "unlock": {
            "residents": 12
          },
          "cost": {
            "coins": 450
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "statMultiplier",
              "stat": "residents",
              "buildingIds": [
                "suburban-duplex",
                "red-cottage",
                "lane-bungalow",
                "glass-condo"
              ],
              "multiplier": 1.12
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "knowledge"
              ],
              "targets": "all",
              "multiplier": 1.08
            }
          ],
          "description": "Count households properly and the borough starts using its earliest housing much more efficiently.",
          "codex": {
            "family": "civic",
            "tier": 1,
            "summary": "Opening civic policy for population efficiency.",
            "lore": "Once the borough keeps a registry, housing stops being a guess and starts being a system.",
            "masteryTarget": 1,
            "sortKey": 10
          }
        },
        {
          "id": "public-schools",
          "areaId": "patchwork-borough",
          "treeId": "civic",
          "tier": 2,
          "category": "civic",
          "exclusiveGroupId": "borough-civic-service",
          "exclusiveGroupLabel": "Civic Service",
          "prerequisitePolicyIds": [
            "census-registry"
          ],
          "unlock": {
            "knowledge": 4
          },
          "cost": {
            "coins": 900,
            "goods": 34,
            "knowledge": 14
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "knowledge"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "patchwork-borough",
              "type": "statMultiplier",
              "stat": "residents",
              "buildingIds": [
                "cube-villa",
                "dome-habitat"
              ],
              "multiplier": 1.08
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "knowledge",
              "amount": 0.25
            }
          ],
          "description": "Invest in schools and surveys to accelerate the borough's knowledge engine.",
          "codex": {
            "family": "civic",
            "tier": 2,
            "summary": "Knowledge branch of the civic tree.",
            "lore": "Public schools make the borough think in decades instead of chores.",
            "masteryTarget": 1,
            "sortKey": 20
          }
        },
        {
          "id": "festival-office",
          "areaId": "patchwork-borough",
          "treeId": "civic",
          "tier": 2,
          "category": "civic",
          "exclusiveGroupId": "borough-civic-service",
          "exclusiveGroupLabel": "Civic Service",
          "prerequisitePolicyIds": [
            "census-registry"
          ],
          "unlock": {
            "appeal": 2
          },
          "cost": {
            "coins": 900,
            "goods": 30,
            "appeal": 10
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "appeal"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "grand-manor",
                "hillside-lodge",
                "palm-bungalow",
                "skyline-galleria"
              ],
              "multiplier": 1.12
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "appeal",
              "amount": 0.12
            }
          ],
          "description": "Lean into civic spectacle and the borough's prestige districts start paying back faster.",
          "codex": {
            "family": "civic",
            "tier": 2,
            "summary": "Appeal branch of the civic tree.",
            "lore": "A festival office does not build anything itself. It simply teaches the borough how to be watched.",
            "masteryTarget": 1,
            "sortKey": 30
          }
        },
        {
          "id": "neighborhood-councils",
          "areaId": "patchwork-borough",
          "treeId": "civic",
          "tier": 3,
          "category": "civic",
          "exclusiveGroupId": "borough-civic-reform",
          "exclusiveGroupLabel": "Civic Reform",
          "prerequisiteAnyPolicyIds": [
            "public-schools",
            "festival-office"
          ],
          "unlock": {
            "influence": 4
          },
          "cost": {
            "coins": 1400,
            "goods": 90,
            "knowledge": 42,
            "influence": 18
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "influence"
              ],
              "targets": "all",
              "multiplier": 1.4
            },
            {
              "areaId": "patchwork-borough",
              "type": "statMultiplier",
              "stat": "residents",
              "buildingIds": [
                "lane-bungalow",
                "glass-condo"
              ],
              "multiplier": 1.08
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "influence",
              "amount": 0.1
            }
          ],
          "description": "Decentralized councils produce more influence and make dense neighborhoods more efficient.",
          "codex": {
            "family": "civic",
            "tier": 3,
            "summary": "Influence-heavy reform branch.",
            "lore": "Councils turn local complaints into political weight. That matters more than most planning documents admit.",
            "masteryTarget": 1,
            "sortKey": 40
          }
        },
        {
          "id": "monument-committee",
          "areaId": "patchwork-borough",
          "treeId": "civic",
          "tier": 3,
          "category": "civic",
          "exclusiveGroupId": "borough-civic-reform",
          "exclusiveGroupLabel": "Civic Reform",
          "prerequisiteAnyPolicyIds": [
            "public-schools",
            "festival-office"
          ],
          "unlock": {
            "appeal": 10
          },
          "cost": {
            "coins": 1500,
            "stone": 180,
            "goods": 96,
            "appeal": 32
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "appeal"
              ],
              "buildingIds": [
                "grand-manor",
                "hillside-lodge",
                "stone-keep",
                "palm-bungalow",
                "skyline-galleria"
              ],
              "multiplier": 1.22
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "influence"
              ],
              "targets": "all",
              "multiplier": 1.12
            },
            {
              "areaId": "patchwork-borough",
              "type": "buildingCostMultiplier",
              "currency": "coins",
              "buildingIds": [
                "stone-keep",
                "skyline-galleria"
              ],
              "multiplier": 0.9
            }
          ],
          "description": "Monuments make prestige cheaper to scale and raise both appeal and influence.",
          "codex": {
            "family": "civic",
            "tier": 3,
            "summary": "Prestige-heavy civic reform branch.",
            "lore": "Committees do not merely fund monuments. They decide which parts of the borough deserve to become memory.",
            "masteryTarget": 1,
            "sortKey": 50
          }
        },
        {
          "id": "city-charter",
          "areaId": "patchwork-borough",
          "treeId": "civic",
          "tier": 4,
          "category": "civic",
          "prerequisiteAnyPolicyIds": [
            "neighborhood-councils",
            "monument-committee"
          ],
          "unlock": {
            "influence": 10,
            "appeal": 14
          },
          "cost": {
            "coins": 9000,
            "stone": 1000,
            "goods": 520,
            "knowledge": 220,
            "influence": 320,
            "appeal": 300
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "unlockSystem",
              "systemId": "annexation"
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins",
                "appeal",
                "influence"
              ],
              "targets": "all",
              "multiplier": 1.12
            }
          ],
          "description": "A formal city charter unlocks annexation and lifts the borough's whole prestige economy.",
          "codex": {
            "family": "civic",
            "tier": 4,
            "summary": "Civic capstone that unlocks annexation.",
            "lore": "The city charter is the borough's argument that it should stop thinking of itself as temporary.",
            "masteryTarget": 1,
            "sortKey": 60
          }
        },
        {
          "id": "masons-guild",
          "areaId": "patchwork-borough",
          "treeId": "industry",
          "tier": 1,
          "category": "industry",
          "unlock": {
            "timber": 20
          },
          "cost": {
            "coins": 650,
            "timber": 20,
            "stone": 16
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "buildingCostMultiplier",
              "currency": "timber",
              "targets": "all",
              "multiplier": 0.9
            },
            {
              "areaId": "patchwork-borough",
              "type": "buildingCostMultiplier",
              "currency": "stone",
              "targets": "all",
              "multiplier": 0.9
            }
          ],
          "description": "Shared standards make the borough waste less timber and stone on every project.",
          "codex": {
            "family": "industry",
            "tier": 1,
            "summary": "Opening industrial policy for material efficiency.",
            "lore": "A guild does not create stone, but it makes the borough stop losing so much of it between quarry and wall.",
            "masteryTarget": 1,
            "sortKey": 70
          }
        },
        {
          "id": "granary-cooperative",
          "areaId": "patchwork-borough",
          "treeId": "industry",
          "tier": 2,
          "category": "industry",
          "exclusiveGroupId": "borough-supply-route",
          "exclusiveGroupLabel": "Supply Route",
          "prerequisitePolicyIds": [
            "masons-guild"
          ],
          "unlock": {
            "food": 10
          },
          "cost": {
            "coins": 800,
            "food": 34,
            "timber": 30
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "food"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "patchwork-borough",
              "type": "maintenanceMultiplier",
              "currency": "food",
              "targets": "all",
              "multiplier": 0.84
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "food",
              "amount": 0.45
            }
          ],
          "description": "Shared storage stabilizes food and lowers the borough's hunger burden.",
          "codex": {
            "family": "industry",
            "tier": 2,
            "summary": "Food branch of the industrial tree.",
            "lore": "A cooperative granary is less romantic than a harvest and far more useful once the borough gets large.",
            "masteryTarget": 1,
            "sortKey": 80
          }
        },
        {
          "id": "quarry-standards",
          "areaId": "patchwork-borough",
          "treeId": "industry",
          "tier": 2,
          "category": "industry",
          "exclusiveGroupId": "borough-supply-route",
          "exclusiveGroupLabel": "Supply Route",
          "prerequisitePolicyIds": [
            "masons-guild"
          ],
          "unlock": {
            "stone": 18
          },
          "cost": {
            "coins": 820,
            "timber": 38,
            "stone": 46
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "timber",
                "stone"
              ],
              "targets": "all",
              "multiplier": 1.3
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "timber",
              "amount": 0.35
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "stone",
              "amount": 0.32
            }
          ],
          "description": "Standardized extraction and hauling push raw material growth much harder.",
          "codex": {
            "family": "industry",
            "tier": 2,
            "summary": "Raw-material branch of the industrial tree.",
            "lore": "Once the quarry crews agree on how to cut, stack, and move stone, the borough starts building like it means it.",
            "masteryTarget": 1,
            "sortKey": 90
          }
        },
        {
          "id": "workshop-standards",
          "areaId": "patchwork-borough",
          "treeId": "industry",
          "tier": 3,
          "category": "industry",
          "exclusiveGroupId": "borough-works-board",
          "exclusiveGroupLabel": "Works Board",
          "prerequisiteAnyPolicyIds": [
            "granary-cooperative",
            "quarry-standards"
          ],
          "unlock": {
            "goods": 20
          },
          "cost": {
            "coins": 1300,
            "goods": 90,
            "timber": 62,
            "stone": 120
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "goods"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "patchwork-borough",
              "type": "maintenanceMultiplier",
              "currency": "goods",
              "targets": "all",
              "multiplier": 0.86
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "freight-depot",
                "borough-exchange",
                "glass-condo"
              ],
              "multiplier": 1.12
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "goods",
              "amount": 0.28
            }
          ],
          "description": "Formal standards make local production more efficient and more profitable.",
          "codex": {
            "family": "industry",
            "tier": 3,
            "summary": "Goods branch of the industrial tree.",
            "lore": "Standards turn a collection of workshops into something close to an industrial sector.",
            "masteryTarget": 1,
            "sortKey": 100
          }
        },
        {
          "id": "power-authority",
          "areaId": "patchwork-borough",
          "treeId": "industry",
          "tier": 3,
          "category": "industry",
          "exclusiveGroupId": "borough-works-board",
          "exclusiveGroupLabel": "Works Board",
          "prerequisiteAnyPolicyIds": [
            "granary-cooperative",
            "quarry-standards"
          ],
          "unlock": {
            "power": 6
          },
          "cost": {
            "coins": 1400,
            "stone": 180,
            "goods": 110,
            "knowledge": 48
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "power"
              ],
              "targets": "all",
              "multiplier": 1.4
            },
            {
              "areaId": "patchwork-borough",
              "type": "maintenanceMultiplier",
              "currency": "power",
              "targets": "all",
              "multiplier": 0.82
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "power",
              "amount": 0.22
            }
          ],
          "description": "Central power planning lifts utility output and softens the late borough's power drain.",
          "codex": {
            "family": "industry",
            "tier": 3,
            "summary": "Utility branch of the industrial tree.",
            "lore": "A power authority is the borough admitting that electricity is too important to leave to improvisation.",
            "masteryTarget": 1,
            "sortKey": 110
          }
        },
        {
          "id": "borough-works-board",
          "areaId": "patchwork-borough",
          "treeId": "industry",
          "tier": 4,
          "category": "industry",
          "prerequisiteAnyPolicyIds": [
            "workshop-standards",
            "power-authority"
          ],
          "unlock": {
            "power": 12,
            "goods": 40
          },
          "cost": {
            "coins": 3200,
            "stone": 980,
            "goods": 760,
            "power": 260,
            "knowledge": 240
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "goods",
                "power",
                "stone"
              ],
              "targets": "all",
              "multiplier": 1.18
            },
            {
              "areaId": "patchwork-borough",
              "type": "buildingCostMultiplier",
              "currency": "coins",
              "buildingIds": [
                "dome-habitat",
                "summit-powerhouse",
                "skyline-galleria"
              ],
              "multiplier": 0.92
            }
          ],
          "description": "A full industrial board pushes every major borough production channel deeper into the late game.",
          "codex": {
            "family": "industry",
            "tier": 4,
            "summary": "Industrial capstone for late production.",
            "lore": "Once the borough runs itself through a works board, industry stops being a side effect of growth and becomes a strategy.",
            "masteryTarget": 1,
            "sortKey": 120
          }
        },
        {
          "id": "stone-roads",
          "areaId": "patchwork-borough",
          "treeId": "trade",
          "tier": 1,
          "category": "trade",
          "unlock": {
            "residents": 18
          },
          "cost": {
            "coins": 650
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "targets": "all",
              "multiplier": 1.15
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "coins",
              "amount": 0.6
            }
          ],
          "description": "Better roads make almost every tax route in the borough more reliable.",
          "codex": {
            "family": "trade",
            "tier": 1,
            "summary": "Opening trade policy for shared coin growth.",
            "lore": "You can measure a borough's ambition by how much stone it is willing to bury in its roads.",
            "masteryTarget": 1,
            "sortKey": 130
          }
        },
        {
          "id": "merchants-union",
          "areaId": "patchwork-borough",
          "treeId": "trade",
          "tier": 2,
          "category": "trade",
          "exclusiveGroupId": "borough-market-charter",
          "exclusiveGroupLabel": "Market Charter",
          "prerequisitePolicyIds": [
            "stone-roads"
          ],
          "unlock": {
            "goods": 8
          },
          "cost": {
            "coins": 1300,
            "goods": 28
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins",
                "goods"
              ],
              "targets": "all",
              "multiplier": 1.18
            },
            {
              "areaId": "patchwork-borough",
              "type": "buildingCostMultiplier",
              "currency": "coins",
              "buildingIds": [
                "borough-exchange",
                "hillside-lodge"
              ],
              "multiplier": 0.9
            }
          ],
          "description": "Favor organized merchants and trade becomes a steadier engine of both money and wares.",
          "codex": {
            "family": "trade",
            "tier": 2,
            "summary": "Merchant-led trade branch.",
            "lore": "A union of merchants does not need to own the borough to teach it how to price itself.",
            "masteryTarget": 1,
            "sortKey": 140
          }
        },
        {
          "id": "market-fairs",
          "areaId": "patchwork-borough",
          "treeId": "trade",
          "tier": 2,
          "category": "trade",
          "exclusiveGroupId": "borough-market-charter",
          "exclusiveGroupLabel": "Market Charter",
          "prerequisitePolicyIds": [
            "stone-roads"
          ],
          "unlock": {
            "appeal": 4
          },
          "cost": {
            "coins": 1300,
            "goods": 22,
            "appeal": 6
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins",
                "appeal"
              ],
              "buildingIds": [
                "grand-manor",
                "hillside-lodge",
                "palm-bungalow",
                "skyline-galleria"
              ],
              "multiplier": 1.22
            },
            {
              "areaId": "patchwork-borough",
              "type": "clickBonus",
              "currency": "coins",
              "amount": 0.35
            }
          ],
          "description": "Favor market events and the borough's prestige districts feed more money back into the treasury.",
          "codex": {
            "family": "trade",
            "tier": 2,
            "summary": "Festival-market trade branch.",
            "lore": "Fairs do not make trade efficient. They make it loud enough that more people notice it.",
            "masteryTarget": 1,
            "sortKey": 150
          }
        },
        {
          "id": "guild-brokers",
          "areaId": "patchwork-borough",
          "treeId": "trade",
          "tier": 3,
          "category": "trade",
          "exclusiveGroupId": "borough-zoning",
          "exclusiveGroupLabel": "Zoning",
          "prerequisiteAnyPolicyIds": [
            "merchants-union",
            "market-fairs"
          ],
          "unlock": {
            "influence": 6
          },
          "cost": {
            "coins": 2800,
            "goods": 70,
            "influence": 12
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "influence"
              ],
              "targets": "all",
              "multiplier": 1.25
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "borough-exchange",
                "stone-keep",
                "glass-condo"
              ],
              "multiplier": 1.14
            }
          ],
          "description": "Brokered permits turn organized influence into shared money and faster high-value districts.",
          "codex": {
            "family": "trade",
            "tier": 3,
            "summary": "Influence-led trade branch.",
            "lore": "Brokers live in the space between a permit and a favor. The borough eventually learns to profit from that space.",
            "masteryTarget": 1,
            "sortKey": 160
          }
        },
        {
          "id": "skyline-office",
          "areaId": "patchwork-borough",
          "treeId": "trade",
          "tier": 3,
          "category": "trade",
          "exclusiveGroupId": "borough-zoning",
          "exclusiveGroupLabel": "Zoning",
          "prerequisiteAnyPolicyIds": [
            "merchants-union",
            "market-fairs"
          ],
          "unlock": {
            "knowledge": 12,
            "power": 6
          },
          "cost": {
            "coins": 3000,
            "stone": 110,
            "knowledge": 28,
            "power": 18
          },
          "effects": [
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "knowledge",
                "coins"
              ],
              "buildingIds": [
                "cube-villa",
                "public-archive",
                "dome-habitat",
                "glass-condo",
                "skyline-galleria"
              ],
              "multiplier": 1.2
            },
            {
              "areaId": "patchwork-borough",
              "type": "buildingCostMultiplier",
              "currency": "coins",
              "buildingIds": [
                "glass-condo",
                "skyline-galleria"
              ],
              "multiplier": 0.9
            }
          ],
          "description": "Planning for towers and civic density shifts the borough toward late-game vertical growth.",
          "codex": {
            "family": "trade",
            "tier": 3,
            "summary": "Knowledge-led zoning branch.",
            "lore": "A skyline office is the borough deciding that land should stop being treated as if it were flat.",
            "masteryTarget": 1,
            "sortKey": 170
          }
        },
        {
          "id": "harbor-charter",
          "areaId": "patchwork-borough",
          "treeId": "trade",
          "tier": 4,
          "category": "trade",
          "prerequisiteAnyPolicyIds": [
            "guild-brokers",
            "skyline-office"
          ],
          "unlock": {
            "influence": 10,
            "knowledge": 18,
            "goods": 60
          },
          "cost": {
            "coins": 6500,
            "stone": 800,
            "goods": 500,
            "knowledge": 220,
            "influence": 240
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "unlockArea"
            },
            {
              "areaId": "patchwork-borough",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "borough-exchange",
                "hillside-lodge",
                "glass-condo"
              ],
              "multiplier": 1.15
            }
          ],
          "description": "Open the harbor charter and the second area enters the save as a parallel city economy.",
          "codex": {
            "family": "trade",
            "tier": 4,
            "summary": "Trade capstone that unlocks Port City.",
            "lore": "The harbor charter is where the borough stops being inland in everything but geography.",
            "masteryTarget": 1,
            "sortKey": 180
          }
        }
      ],
      "policyTrees": [
        {
          "id": "civic",
          "name": "Civic",
          "tiers": [
            {
              "tier": 1,
              "policyIds": [
                "census-registry"
              ]
            },
            {
              "tier": 2,
              "policyIds": [
                "public-schools",
                "festival-office"
              ]
            },
            {
              "tier": 3,
              "policyIds": [
                "neighborhood-councils",
                "monument-committee"
              ]
            },
            {
              "tier": 4,
              "policyIds": [
                "city-charter"
              ]
            }
          ]
        },
        {
          "id": "industry",
          "name": "Industry",
          "tiers": [
            {
              "tier": 1,
              "policyIds": [
                "masons-guild"
              ]
            },
            {
              "tier": 2,
              "policyIds": [
                "granary-cooperative",
                "quarry-standards"
              ]
            },
            {
              "tier": 3,
              "policyIds": [
                "workshop-standards",
                "power-authority"
              ]
            },
            {
              "tier": 4,
              "policyIds": [
                "borough-works-board"
              ]
            }
          ]
        },
        {
          "id": "trade",
          "name": "Trade",
          "tiers": [
            {
              "tier": 1,
              "policyIds": [
                "stone-roads"
              ]
            },
            {
              "tier": 2,
              "policyIds": [
                "merchants-union",
                "market-fairs"
              ]
            },
            {
              "tier": 3,
              "policyIds": [
                "guild-brokers",
                "skyline-office"
              ]
            },
            {
              "tier": 4,
              "policyIds": [
                "harbor-charter"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "port-city",
      "runtimeId": "port-city-v2",
      "name": "Port City",
      "theme": "A trade harbor where fisheries, docks, customs, and maritime prestige all fight over berths.",
      "goalText": "Turn a working harbor into a city of ships, charts, and public spectacle.",
      "populationCurrencyId": "crew",
      "areaUnlockPolicyId": "harbor-charter",
      "localCurrencies": {
        "crew": {
          "id": "crew",
          "name": "Crew",
          "kind": "population",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/residents.png",
          "description": "Dockhands, fishers, and sailors who staff the harbor."
        },
        "catch": {
          "id": "catch",
          "name": "Catch",
          "kind": "supply",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/food.png",
          "description": "Fresh fish and sea harvests that feed the harbor economy."
        },
        "lumber": {
          "id": "lumber",
          "name": "Lumber",
          "kind": "supply",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/timber.png",
          "description": "Pier timber, masts, and cut dock lumber."
        },
        "masonry": {
          "id": "masonry",
          "name": "Masonry",
          "kind": "supply",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/stone.png",
          "description": "Stonework for breakwaters, towers, and bonded yards."
        },
        "cargo": {
          "id": "cargo",
          "name": "Cargo",
          "kind": "trade",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/goods.png",
          "description": "Packed trade volume moving through the port."
        },
        "harbor_capacity": {
          "id": "harbor_capacity",
          "name": "Berths",
          "kind": "utility",
          "displayMode": "integer",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/power.png",
          "description": "Available berths for advanced harbor construction and late port operations."
        },
        "charts": {
          "id": "charts",
          "name": "Charts",
          "kind": "research",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/knowledge.png",
          "description": "Route maps, pilot records, and navigational knowledge."
        },
        "renown": {
          "id": "renown",
          "name": "Renown",
          "kind": "prestige",
          "iconPath": "./public/art/icon-kits/patchwork-borough/resources/appeal.png",
          "description": "Maritime prestige earned through civic spectacle and port reputation."
        }
      },
      "startingCurrencies": {
        "crew": 0,
        "catch": 0,
        "lumber": 0,
        "masonry": 0,
        "cargo": 0,
        "harbor_capacity": 0,
        "charts": 0,
        "renown": 0
      },
      "manualActions": [
        {
          "id": "collect-tariffs",
          "areaId": "port-city",
          "name": "Collect Tariffs",
          "currency": "coins",
          "baseAmount": 1.15,
          "applyIncomeMultiplier": true,
          "populationScaling": {
            "perPopulation": 18,
            "amount": 1
          },
          "buildingScaling": [
            {
              "buildingId": "chandlery-market",
              "amountPerOwned": 0.16
            },
            {
              "buildingId": "grand-terminal",
              "amountPerOwned": 0.18
            }
          ]
        },
        {
          "id": "haul-catch",
          "areaId": "port-city",
          "name": "Haul Catch",
          "currency": "catch",
          "unlockBuildingId": "fisher-huts",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "fish-auctions",
          "baseAmount": 1.15,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "fisher-huts",
              "amountPerOwned": 0.28
            },
            {
              "buildingId": "salt-smokehouse",
              "amountPerOwned": 0.22
            }
          ]
        },
        {
          "id": "cut-lumber",
          "areaId": "port-city",
          "name": "Cut Lumber",
          "currency": "lumber",
          "unlockBuildingId": "driftwood-yard",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "dock-ledgers",
          "baseAmount": 0.95,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "driftwood-yard",
              "amountPerOwned": 0.2
            },
            {
              "buildingId": "timber-pier",
              "amountPerOwned": 0.1
            }
          ]
        },
        {
          "id": "quarry-masonry",
          "areaId": "port-city",
          "name": "Quarry Masonry",
          "currency": "masonry",
          "unlockBuildingId": "barge-masons",
          "unlockBuildingCount": 2,
          "unlockPolicyId": "dock-ledgers",
          "baseAmount": 0.78,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "barge-masons",
              "amountPerOwned": 0.22
            },
            {
              "buildingId": "dredger-works",
              "amountPerOwned": 0.1
            }
          ]
        },
        {
          "id": "load-cargo",
          "areaId": "port-city",
          "name": "Load Cargo",
          "currency": "cargo",
          "unlockBuildingId": "bonded-warehouse",
          "unlockPolicyId": "bonded-logistics",
          "baseAmount": 0.92,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "timber-pier",
              "amountPerOwned": 0.1
            },
            {
              "buildingId": "bonded-warehouse",
              "amountPerOwned": 0.2
            },
            {
              "buildingId": "grand-terminal",
              "amountPerOwned": 0.18
            }
          ]
        },
        {
          "id": "dredge-harbor",
          "areaId": "port-city",
          "name": "Dredge Harbor",
          "currency": "harbor_capacity",
          "unlockBuildingId": "dredger-works",
          "unlockPolicyId": "longshift-piers",
          "baseAmount": 0.38,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "timber-pier",
              "amountPerOwned": 0.05
            },
            {
              "buildingId": "dredger-works",
              "amountPerOwned": 0.15
            }
          ]
        },
        {
          "id": "chart-routes",
          "areaId": "port-city",
          "name": "Chart Routes",
          "currency": "charts",
          "unlockBuildingId": "chart-house",
          "unlockPolicyId": "chart-academy",
          "baseAmount": 0.28,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "chart-house",
              "amountPerOwned": 0.1
            },
            {
              "buildingId": "customs-tower",
              "amountPerOwned": 0.07
            }
          ]
        },
        {
          "id": "host-regatta",
          "areaId": "port-city",
          "name": "Host Regatta",
          "currency": "renown",
          "unlockBuildingId": "regatta-quay",
          "unlockPolicyId": "regatta-commission",
          "baseAmount": 0.16,
          "applyIncomeMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "customs-tower",
              "amountPerOwned": 0.04
            },
            {
              "buildingId": "regatta-quay",
              "amountPerOwned": 0.08
            },
            {
              "buildingId": "grand-terminal",
              "amountPerOwned": 0.05
            }
          ]
        }
      ],
      "prestigeScoreConfig": [
        {
          "currencyId": "crew",
          "per": 120,
          "gain": 1
        },
        {
          "currencyId": "harbor_capacity",
          "per": 24,
          "gain": 1
        },
        {
          "currencyId": "charts",
          "per": 18,
          "gain": 1
        },
        {
          "currencyId": "renown",
          "per": 10,
          "gain": 1
        }
      ],
      "annexationBonuses": [
        {
          "currencyId": "coins",
          "multiplierPerDistrict": 0.025
        },
        {
          "currencyId": "cargo",
          "multiplierPerDistrict": 0.02
        },
        {
          "currencyId": "charts",
          "multiplierPerDistrict": 0.02
        },
        {
          "currencyId": "renown",
          "multiplierPerDistrict": 0.015
        }
      ],
      "buildings": [
        {
          "id": "fisher-huts",
          "name": "Fisher Huts",
          "artPath": "./public/art/house-kits/port-city/current/fisher-huts.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-top-1",
          "category": "fishery",
          "unlock": {},
          "baseCost": {
            "coins": 40
          },
          "outputPerSecond": {
            "catch": 0.46
          },
          "maintenancePerSecond": {
            "coins": 0.03
          },
          "statsPerOwned": {
            "crew": 2
          },
          "synergies": [
            {
              "label": "Salt contracts",
              "targetType": "output",
              "target": "catch",
              "sourceBuildingIds": [
                "salt-smokehouse"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "The first harbor district. It feeds the docks and establishes the first crews on the shoreline.",
          "codex": {
            "family": "fishery",
            "tier": 1,
            "summary": "Starter fishery that establishes the catch economy.",
            "lore": "The fisher huts are older than the harbor plan itself. If there is a port-city to build, it starts here.",
            "masteryTarget": 12,
            "sortKey": 10
          },
          "areaId": "port-city"
        },
        {
          "id": "driftwood-yard",
          "name": "Driftwood Yard",
          "artPath": "./public/art/house-kits/port-city/current/driftwood-yard.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-top-2",
          "category": "dockyard",
          "unlock": {
            "crew": 4
          },
          "baseCost": {
            "coins": 110
          },
          "outputPerSecond": {
            "lumber": 0.3
          },
          "maintenancePerSecond": {
            "coins": 0.03
          },
          "statsPerOwned": {
            "crew": 1
          },
          "synergies": [
            {
              "label": "Pier orders",
              "targetType": "output",
              "target": "lumber",
              "sourceBuildingIds": [
                "timber-pier"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "A rough-cut yard that turns shoreline scrap and cut timber into usable dock lumber.",
          "codex": {
            "family": "dockyard",
            "tier": 1,
            "summary": "Starter lumber producer for the harbor.",
            "lore": "Before the harbor can think about terminals or towers, someone has to drag good wood out of the tide line and make it square.",
            "masteryTarget": 12,
            "sortKey": 20
          },
          "areaId": "port-city"
        },
        {
          "id": "salt-smokehouse",
          "name": "Salt Smokehouse",
          "artPath": "./public/art/house-kits/port-city/current/salt-smokehouse.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-top-3",
          "category": "fishery",
          "unlock": {
            "crew": 10,
            "catch": 10
          },
          "baseCost": {
            "coins": 220,
            "lumber": 12,
            "catch": 14
          },
          "outputPerSecond": {
            "catch": 0.92,
            "cargo": 0.1
          },
          "maintenancePerSecond": {
            "coins": 0.05
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Net turnover",
              "targetType": "output",
              "target": "cargo",
              "sourceBuildingIds": [
                "fisher-huts"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "The harbor's first preserved export. It keeps more fish moving and starts the cargo economy.",
          "codex": {
            "family": "smokehouse",
            "tier": 1,
            "summary": "Early processor that turns catch into reliable cargo.",
            "lore": "A smokehouse makes the day's catch last long enough to leave the dock. That is the entire difference between subsistence and trade.",
            "masteryTarget": 12,
            "sortKey": 30
          },
          "areaId": "port-city"
        },
        {
          "id": "timber-pier",
          "name": "Timber Pier",
          "artPath": "./public/art/house-kits/port-city/current/timber-pier.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-top-4",
          "category": "dockyard",
          "unlock": {
            "crew": 14,
            "lumber": 20,
            "catch": 18
          },
          "baseCost": {
            "coins": 360,
            "lumber": 24,
            "catch": 20
          },
          "outputPerSecond": {
            "cargo": 0.28,
            "harbor_capacity": 0.1
          },
          "maintenancePerSecond": {
            "coins": 0.06
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Measured berths",
              "targetType": "output",
              "target": "harbor_capacity",
              "sourceBuildingIds": [
                "driftwood-yard"
              ],
              "perOwned": 1,
              "bonus": 0.1,
              "cap": 0.4
            }
          ],
          "description": "A working pier that creates the harbor's first real berth space and organized loading capacity.",
          "codex": {
            "family": "pier",
            "tier": 2,
            "summary": "Early dock infrastructure that starts the berth economy.",
            "lore": "A timber pier is a promise that ships can arrive and find somewhere deliberate to stand.",
            "masteryTarget": 10,
            "sortKey": 40
          },
          "areaId": "port-city"
        },
        {
          "id": "barge-masons",
          "name": "Barge Masons",
          "artPath": "./public/art/house-kits/port-city/current/barge-masons.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-top-5",
          "category": "dockyard",
          "unlock": {
            "crew": 18,
            "cargo": 10,
            "lumber": 28
          },
          "baseCost": {
            "coins": 520,
            "lumber": 32,
            "cargo": 10
          },
          "outputPerSecond": {
            "masonry": 0.42,
            "cargo": 0.1
          },
          "maintenancePerSecond": {
            "catch": 0.12,
            "cargo": 0.08
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Dredge contracts",
              "targetType": "output",
              "target": "masonry",
              "sourceBuildingIds": [
                "dredger-works"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "Stone crews on barges that finally let the port build durable harbor works instead of temporary timber fixes.",
          "codex": {
            "family": "masonry",
            "tier": 2,
            "summary": "Mid-opening masonry district for durable port construction.",
            "lore": "Barge masons do not make a harbor pretty; they make it survive the weather.",
            "masteryTarget": 10,
            "sortKey": 50
          },
          "areaId": "port-city"
        },
        {
          "id": "chandlery-market",
          "name": "Chandlery Market",
          "artPath": "./public/art/house-kits/port-city/current/chandlery-market.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-top-6",
          "category": "customs",
          "unlock": {
            "crew": 24,
            "cargo": 18,
            "masonry": 16
          },
          "baseCost": {
            "coins": 700,
            "lumber": 24,
            "masonry": 24,
            "cargo": 22
          },
          "outputPerSecond": {
            "coins": 2.8,
            "cargo": 0.2
          },
          "maintenancePerSecond": {
            "catch": 0.18,
            "cargo": 0.25
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Harbor demand",
              "targetType": "output",
              "target": "coins",
              "sourceBuildingIds": [
                "timber-pier",
                "bonded-warehouse"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "The first serious trade district, turning cargo movement into shared money for both cities.",
          "codex": {
            "family": "customs",
            "tier": 2,
            "summary": "Early customs-market district that monetizes port trade.",
            "lore": "The chandlery market is where the harbor stops selling fish and starts selling the right to keep sailing.",
            "masteryTarget": 10,
            "sortKey": 60
          },
          "areaId": "port-city"
        },
        {
          "id": "dredger-works",
          "name": "Dredger Works",
          "artPath": "./public/art/house-kits/port-city/current/dredger-works.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-bottom-1",
          "category": "dockyard",
          "unlock": {
            "crew": 32,
            "masonry": 36,
            "cargo": 32
          },
          "baseCost": {
            "coins": 1100,
            "masonry": 50,
            "cargo": 40
          },
          "outputPerSecond": {
            "harbor_capacity": 0.48,
            "cargo": 0.16
          },
          "maintenancePerSecond": {
            "catch": 0.16,
            "cargo": 0.35
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Stone channels",
              "targetType": "output",
              "target": "harbor_capacity",
              "sourceBuildingIds": [
                "barge-masons"
              ],
              "perOwned": 1,
              "bonus": 0.1,
              "cap": 0.4
            }
          ],
          "description": "Heavy harbor infrastructure that makes berth space the port's central strategic resource.",
          "codex": {
            "family": "dredger",
            "tier": 3,
            "summary": "Core infrastructure district for midgame berth growth.",
            "lore": "The dredger works is the point where the harbor stops accepting its coastline and begins editing it.",
            "masteryTarget": 8,
            "sortKey": 70
          },
          "areaId": "port-city"
        },
        {
          "id": "chart-house",
          "name": "Chart House",
          "artPath": "./public/art/house-kits/port-city/current/chart-house.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-bottom-2",
          "category": "customs",
          "unlock": {
            "crew": 40,
            "cargo": 46,
            "harbor_capacity": 20,
            "masonry": 24
          },
          "baseCost": {
            "coins": 1500,
            "masonry": 34,
            "cargo": 52,
            "harbor_capacity": 14
          },
          "outputPerSecond": {
            "charts": 0.34,
            "coins": 2.5
          },
          "maintenancePerSecond": {
            "catch": 0.2,
            "cargo": 0.4,
            "harbor_capacity": 0.12
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Warehouse logs",
              "targetType": "output",
              "target": "charts",
              "sourceBuildingIds": [
                "bonded-warehouse"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "A navigational office that turns cargo and berth space into route knowledge.",
          "codex": {
            "family": "charts",
            "tier": 3,
            "summary": "Midgame research district for route planning and navigation.",
            "lore": "The chart house is where the harbor learns that distance can be planned instead of endured.",
            "masteryTarget": 8,
            "sortKey": 80
          },
          "areaId": "port-city"
        },
        {
          "id": "bonded-warehouse",
          "name": "Bonded Warehouse",
          "artPath": "./public/art/house-kits/port-city/current/bonded-warehouse.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-bottom-3",
          "category": "customs",
          "unlock": {
            "crew": 48,
            "cargo": 80,
            "masonry": 80,
            "harbor_capacity": 34
          },
          "baseCost": {
            "coins": 2600,
            "masonry": 320,
            "cargo": 520,
            "harbor_capacity": 260
          },
          "outputPerSecond": {
            "cargo": 0.84,
            "coins": 4.2
          },
          "maintenancePerSecond": {
            "catch": 0.28,
            "cargo": 0.8,
            "harbor_capacity": 0.28
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Pier turnover",
              "targetType": "output",
              "target": "cargo",
              "sourceBuildingIds": [
                "timber-pier",
                "chandlery-market"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "A large logistics district that stabilizes cargo growth and turns port throughput into a true economy.",
          "codex": {
            "family": "warehouse",
            "tier": 3,
            "summary": "Late-mid customs warehouse that becomes a major cargo engine.",
            "lore": "Bonded warehouses make a harbor feel larger than it is because they let trade wait for the world to catch up.",
            "masteryTarget": 8,
            "sortKey": 90
          },
          "areaId": "port-city"
        },
        {
          "id": "customs-tower",
          "name": "Customs Tower",
          "artPath": "./public/art/house-kits/port-city/current/customs-tower.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-bottom-4",
          "category": "landmark",
          "unlock": {
            "crew": 58,
            "charts": 16,
            "harbor_capacity": 48,
            "cargo": 120,
            "masonry": 140
          },
          "baseCost": {
            "coins": 3400,
            "masonry": 720,
            "cargo": 920,
            "harbor_capacity": 520,
            "charts": 220
          },
          "outputPerSecond": {
            "renown": 0.34,
            "coins": 5.2
          },
          "maintenancePerSecond": {
            "catch": 0.3,
            "cargo": 0.6,
            "harbor_capacity": 0.35
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Harbor spectacle",
              "targetType": "output",
              "target": "renown",
              "sourceBuildingIds": [
                "regatta-quay"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.4
            }
          ],
          "description": "A maritime landmark that turns planning and berth space into civic prestige and reliable tariffs.",
          "codex": {
            "family": "tower",
            "tier": 4,
            "summary": "Late port landmark for renown and stable coin income.",
            "lore": "From the customs tower, the harbor can see who is arriving, what they are carrying, and how loudly to charge them.",
            "masteryTarget": 6,
            "sortKey": 100
          },
          "areaId": "port-city"
        },
        {
          "id": "regatta-quay",
          "name": "Regatta Quay",
          "artPath": "./public/art/house-kits/port-city/current/regatta-quay.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-bottom-5",
          "category": "landmark",
          "unlock": {
            "crew": 68,
            "renown": 10,
            "harbor_capacity": 62,
            "charts": 36,
            "cargo": 140
          },
          "baseCost": {
            "coins": 4500,
            "lumber": 260,
            "cargo": 900,
            "harbor_capacity": 760,
            "charts": 320,
            "renown": 180
          },
          "outputPerSecond": {
            "renown": 0.48,
            "coins": 6.8
          },
          "maintenancePerSecond": {
            "catch": 0.36,
            "cargo": 0.8,
            "harbor_capacity": 0.45
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Tower attention",
              "targetType": "output",
              "target": "renown",
              "sourceBuildingIds": [
                "customs-tower"
              ],
              "perOwned": 1,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "A civic shoreline build that converts port maturity into spectacle and public reputation.",
          "codex": {
            "family": "regatta",
            "tier": 4,
            "summary": "Late civic harbor district for renown growth.",
            "lore": "The regatta quay exists so the harbor can show off the traffic it has already earned.",
            "masteryTarget": 6,
            "sortKey": 110
          },
          "areaId": "port-city"
        },
        {
          "id": "grand-terminal",
          "name": "Grand Terminal",
          "artPath": "./public/art/house-kits/port-city/current/grand-terminal.png",
          "spriteSheetPath": "./public/art/houses2.png",
          "spriteRef": "houses-bottom-6",
          "category": "landmark",
          "unlock": {
            "crew": 82,
            "renown": 24,
            "charts": 54,
            "harbor_capacity": 90,
            "cargo": 220,
            "masonry": 180
          },
          "baseCost": {
            "coins": 6500,
            "masonry": 1200,
            "cargo": 1800,
            "harbor_capacity": 1500,
            "charts": 620,
            "renown": 360
          },
          "outputPerSecond": {
            "coins": 12.8,
            "renown": 0.6,
            "cargo": 0.48
          },
          "maintenancePerSecond": {
            "catch": 0.45,
            "cargo": 1.2,
            "harbor_capacity": 0.7
          },
          "statsPerOwned": {},
          "synergies": [
            {
              "label": "Through-line",
              "targetType": "output",
              "target": "coins",
              "sourceBuildingIds": [
                "bonded-warehouse",
                "customs-tower"
              ],
              "perOwned": 2,
              "bonus": 0.08,
              "cap": 0.32
            }
          ],
          "description": "The port's capstone district, built on berth space, routing, and civic reputation rather than raw cash alone.",
          "codex": {
            "family": "terminal",
            "tier": 5,
            "summary": "Port capstone that spends cargo, capacity, charts, and renown together.",
            "lore": "The grand terminal is the harbor proving that it no longer needs to ask whether ships will come. The question is where to put them all.",
            "masteryTarget": 4,
            "sortKey": 120
          },
          "areaId": "port-city"
        }
      ],
      "policies": [
        {
          "id": "dock-ledgers",
          "areaId": "port-city",
          "treeId": "harbor-operations",
          "tier": 1,
          "category": "harbor-operations",
          "unlock": {},
          "cost": {
            "coins": 900
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "cargo"
              ],
              "targets": "all",
              "multiplier": 1.12
            },
            {
              "areaId": "port-city",
              "type": "clickBonus",
              "currency": "coins",
              "amount": 0.4
            }
          ],
          "description": "Once the port keeps proper ledgers, cargo becomes easier to measure and monetize.",
          "codex": {
            "family": "harbor-operations",
            "tier": 1,
            "summary": "Opening operations policy for cargo discipline.",
            "lore": "Trade becomes a strategy the moment the harbor writes it down carefully enough to tax twice.",
            "masteryTarget": 1,
            "sortKey": 190
          }
        },
        {
          "id": "fish-auctions",
          "areaId": "port-city",
          "treeId": "harbor-operations",
          "tier": 2,
          "category": "harbor-operations",
          "exclusiveGroupId": "port-berth-policy",
          "exclusiveGroupLabel": "Berth Policy",
          "prerequisitePolicyIds": [
            "dock-ledgers"
          ],
          "unlock": {
            "catch": 14
          },
          "cost": {
            "coins": 1300,
            "catch": 32,
            "cargo": 18
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "catch"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "fisher-huts",
                "salt-smokehouse",
                "chandlery-market"
              ],
              "multiplier": 1.1
            },
            {
              "areaId": "port-city",
              "type": "clickBonus",
              "currency": "catch",
              "amount": 0.35
            }
          ],
          "description": "Favor the fish trade and the harbor leans into catch, market volume, and early tariffs.",
          "codex": {
            "family": "harbor-operations",
            "tier": 2,
            "summary": "Catch-heavy branch for harbor operations.",
            "lore": "Auctions do not catch more fish. They simply make the harbor hungry enough to use every fish it gets.",
            "masteryTarget": 1,
            "sortKey": 200
          }
        },
        {
          "id": "longshift-piers",
          "areaId": "port-city",
          "treeId": "harbor-operations",
          "tier": 2,
          "category": "harbor-operations",
          "exclusiveGroupId": "port-berth-policy",
          "exclusiveGroupLabel": "Berth Policy",
          "prerequisitePolicyIds": [
            "dock-ledgers"
          ],
          "unlock": {
            "harbor_capacity": 4
          },
          "cost": {
            "coins": 1400,
            "lumber": 28,
            "cargo": 20,
            "harbor_capacity": 6
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "harbor_capacity"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "port-city",
              "type": "maintenanceMultiplier",
              "currency": "harbor_capacity",
              "buildingIds": [
                "chart-house",
                "bonded-warehouse",
                "customs-tower",
                "regatta-quay",
                "grand-terminal"
              ],
              "multiplier": 0.82
            },
            {
              "areaId": "port-city",
              "type": "clickBonus",
              "currency": "harbor_capacity",
              "amount": 0.14
            }
          ],
          "description": "Push the port toward harder berth management and faster berth growth.",
          "codex": {
            "family": "harbor-operations",
            "tier": 2,
            "summary": "Capacity-heavy branch for harbor operations.",
            "lore": "Longshift piers are a simple idea with expensive consequences: keep every berth working longer than is polite.",
            "masteryTarget": 1,
            "sortKey": 210
          }
        },
        {
          "id": "bonded-logistics",
          "areaId": "port-city",
          "treeId": "harbor-operations",
          "tier": 3,
          "category": "harbor-operations",
          "exclusiveGroupId": "port-cargo-policy",
          "exclusiveGroupLabel": "Cargo Policy",
          "prerequisiteAnyPolicyIds": [
            "fish-auctions",
            "longshift-piers"
          ],
          "unlock": {
            "cargo": 40
          },
          "cost": {
            "coins": 2800,
            "cargo": 68,
            "masonry": 34,
            "harbor_capacity": 16
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "cargo"
              ],
              "targets": "all",
              "multiplier": 1.3
            },
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "chandlery-market",
                "bonded-warehouse",
                "grand-terminal"
              ],
              "multiplier": 1.15
            },
            {
              "areaId": "port-city",
              "type": "maintenanceMultiplier",
              "currency": "cargo",
              "buildingIds": [
                "chandlery-market",
                "dredger-works",
                "chart-house",
                "bonded-warehouse",
                "customs-tower",
                "regatta-quay",
                "grand-terminal"
              ],
              "multiplier": 0.84
            }
          ],
          "description": "Tighten customs and warehouse flow to push cargo and tariff efficiency harder.",
          "codex": {
            "family": "harbor-operations",
            "tier": 3,
            "summary": "Logistics-heavy cargo branch.",
            "lore": "Bound cargo is slow by design. Bonded logistics is the policy that learns how to make slow systems earn fast money.",
            "masteryTarget": 1,
            "sortKey": 220
          }
        },
        {
          "id": "signal-towers",
          "areaId": "port-city",
          "treeId": "harbor-operations",
          "tier": 3,
          "category": "harbor-operations",
          "exclusiveGroupId": "port-cargo-policy",
          "exclusiveGroupLabel": "Cargo Policy",
          "prerequisiteAnyPolicyIds": [
            "fish-auctions",
            "longshift-piers"
          ],
          "unlock": {
            "charts": 8
          },
          "cost": {
            "coins": 2900,
            "masonry": 48,
            "charts": 14,
            "harbor_capacity": 20
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "charts",
                "harbor_capacity"
              ],
              "targets": "all",
              "multiplier": 1.22
            },
            {
              "areaId": "port-city",
              "type": "clickBonus",
              "currency": "charts",
              "amount": 0.16
            }
          ],
          "description": "Invest in route signaling and the harbor starts growing through information as much as cargo.",
          "codex": {
            "family": "harbor-operations",
            "tier": 3,
            "summary": "Navigation-heavy cargo branch.",
            "lore": "Signal towers are how the harbor teaches the sea to queue properly.",
            "masteryTarget": 1,
            "sortKey": 230
          }
        },
        {
          "id": "freeport-authority",
          "areaId": "port-city",
          "treeId": "harbor-operations",
          "tier": 4,
          "category": "harbor-operations",
          "prerequisiteAnyPolicyIds": [
            "bonded-logistics",
            "signal-towers"
          ],
          "unlock": {
            "cargo": 70,
            "charts": 16,
            "harbor_capacity": 20
          },
          "cost": {
            "coins": 7200,
            "cargo": 300,
            "masonry": 220,
            "harbor_capacity": 120,
            "charts": 90
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins",
                "cargo",
                "harbor_capacity"
              ],
              "targets": "all",
              "multiplier": 1.14
            }
          ],
          "description": "A full harbor authority makes the port meaningfully richer and more scalable.",
          "codex": {
            "family": "harbor-operations",
            "tier": 4,
            "summary": "Operations capstone for the port economy.",
            "lore": "A freeport authority is the harbor deciding that every berth, crate, and route should finally answer to one table.",
            "masteryTarget": 1,
            "sortKey": 240
          }
        },
        {
          "id": "sailors-guild",
          "areaId": "port-city",
          "treeId": "maritime-society",
          "tier": 1,
          "category": "maritime-society",
          "unlock": {
            "crew": 24
          },
          "cost": {
            "coins": 1000,
            "catch": 20
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "statMultiplier",
              "stat": "crew",
              "buildingIds": [
                "fisher-huts",
                "driftwood-yard",
                "salt-smokehouse",
                "timber-pier"
              ],
              "multiplier": 1.15
            },
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "catch"
              ],
              "targets": "all",
              "multiplier": 1.1
            }
          ],
          "description": "Organized crews make the whole harbor more dependable and better staffed.",
          "codex": {
            "family": "maritime-society",
            "tier": 1,
            "summary": "Opening civic-maritime policy for crew growth.",
            "lore": "A sailors guild does not calm the sea, but it gives the harbor a way to bargain with the people who keep going out on it.",
            "masteryTarget": 1,
            "sortKey": 250
          }
        },
        {
          "id": "lighthouse-fund",
          "areaId": "port-city",
          "treeId": "maritime-society",
          "tier": 2,
          "category": "maritime-society",
          "exclusiveGroupId": "port-civic-harbor",
          "exclusiveGroupLabel": "Maritime Society",
          "prerequisitePolicyIds": [
            "sailors-guild"
          ],
          "unlock": {
            "renown": 2
          },
          "cost": {
            "coins": 1500,
            "masonry": 28,
            "charts": 6,
            "renown": 3
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "renown"
              ],
              "buildingIds": [
                "customs-tower",
                "regatta-quay",
                "grand-terminal"
              ],
              "multiplier": 1.25
            },
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "customs-tower"
              ],
              "multiplier": 1.1
            }
          ],
          "description": "Sponsor navigational prestige and the harbor's landmark districts become more important.",
          "codex": {
            "family": "maritime-society",
            "tier": 2,
            "summary": "Prestige branch of the social harbor tree.",
            "lore": "The lighthouse fund exists so the port can claim that safety and spectacle are the same public good.",
            "masteryTarget": 1,
            "sortKey": 260
          }
        },
        {
          "id": "tavern-leagues",
          "areaId": "port-city",
          "treeId": "maritime-society",
          "tier": 2,
          "category": "maritime-society",
          "exclusiveGroupId": "port-civic-harbor",
          "exclusiveGroupLabel": "Maritime Society",
          "prerequisitePolicyIds": [
            "sailors-guild"
          ],
          "unlock": {
            "crew": 40,
            "cargo": 12
          },
          "cost": {
            "coins": 1500,
            "catch": 28,
            "cargo": 22
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "chandlery-market",
                "bonded-warehouse"
              ],
              "multiplier": 1.18
            },
            {
              "areaId": "port-city",
              "type": "statMultiplier",
              "stat": "crew",
              "buildingIds": [
                "chandlery-market",
                "bonded-warehouse",
                "grand-terminal"
              ],
              "multiplier": 1.1
            }
          ],
          "description": "Leagues of taverns and hiring halls turn a looser harbor culture into staffing and trade efficiency.",
          "codex": {
            "family": "maritime-society",
            "tier": 2,
            "summary": "Crew-and-commerce branch of the social harbor tree.",
            "lore": "The tavern leagues are where the harbor admits that half its labor market is already happening over a table with bad light.",
            "masteryTarget": 1,
            "sortKey": 270
          }
        },
        {
          "id": "chart-academy",
          "areaId": "port-city",
          "treeId": "maritime-society",
          "tier": 3,
          "category": "maritime-society",
          "exclusiveGroupId": "port-prestige-currents",
          "exclusiveGroupLabel": "Prestige Currents",
          "prerequisiteAnyPolicyIds": [
            "lighthouse-fund",
            "tavern-leagues"
          ],
          "unlock": {
            "charts": 12
          },
          "cost": {
            "coins": 3000,
            "charts": 20,
            "cargo": 42,
            "harbor_capacity": 18
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "charts"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "renown"
              ],
              "buildingIds": [
                "customs-tower",
                "regatta-quay"
              ],
              "multiplier": 1.12
            },
            {
              "areaId": "port-city",
              "type": "clickBonus",
              "currency": "charts",
              "amount": 0.16
            }
          ],
          "description": "A formal academy makes charts the port's key late-game planning resource.",
          "codex": {
            "family": "maritime-society",
            "tier": 3,
            "summary": "Charts-heavy branch for late harbor planning.",
            "lore": "The chart academy exists for the uncomfortable truth that experienced pilots eventually need to be written down.",
            "masteryTarget": 1,
            "sortKey": 280
          }
        },
        {
          "id": "regatta-commission",
          "areaId": "port-city",
          "treeId": "maritime-society",
          "tier": 3,
          "category": "maritime-society",
          "exclusiveGroupId": "port-prestige-currents",
          "exclusiveGroupLabel": "Prestige Currents",
          "prerequisiteAnyPolicyIds": [
            "lighthouse-fund",
            "tavern-leagues"
          ],
          "unlock": {
            "renown": 8
          },
          "cost": {
            "coins": 3200,
            "renown": 14,
            "cargo": 44,
            "harbor_capacity": 16
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "renown"
              ],
              "targets": "all",
              "multiplier": 1.35
            },
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins"
              ],
              "buildingIds": [
                "regatta-quay",
                "grand-terminal"
              ],
              "multiplier": 1.12
            },
            {
              "areaId": "port-city",
              "type": "clickBonus",
              "currency": "renown",
              "amount": 0.08
            }
          ],
          "description": "Formalize maritime spectacle and the port turns public prestige into late tariffs and civic scale.",
          "codex": {
            "family": "maritime-society",
            "tier": 3,
            "summary": "Renown-heavy branch for late harbor prestige.",
            "lore": "A regatta commission is what happens when a harbor realizes that pageantry can be budgeted and then taxed.",
            "masteryTarget": 1,
            "sortKey": 290
          }
        },
        {
          "id": "harbor-senate",
          "areaId": "port-city",
          "treeId": "maritime-society",
          "tier": 4,
          "category": "maritime-society",
          "prerequisiteAnyPolicyIds": [
            "chart-academy",
            "regatta-commission"
          ],
          "unlock": {
            "renown": 16,
            "charts": 24,
            "harbor_capacity": 28
          },
          "cost": {
            "coins": 7600,
            "cargo": 360,
            "harbor_capacity": 160,
            "charts": 120,
            "renown": 100
          },
          "effects": [
            {
              "areaId": "port-city",
              "type": "incomeMultiplier",
              "currencies": [
                "coins",
                "renown",
                "charts"
              ],
              "targets": "all",
              "multiplier": 1.15
            }
          ],
          "description": "A harbor senate consolidates the port's civic power into a stronger late-game economy.",
          "codex": {
            "family": "maritime-society",
            "tier": 4,
            "summary": "Social-maritime capstone for the port.",
            "lore": "The harbor senate is the moment the port stops acting like an extension of the market and starts acting like a city in its own right.",
            "masteryTarget": 1,
            "sortKey": 300
          }
        }
      ],
      "policyTrees": [
        {
          "id": "harbor-operations",
          "name": "Harbor Operations",
          "tiers": [
            {
              "tier": 1,
              "policyIds": [
                "dock-ledgers"
              ]
            },
            {
              "tier": 2,
              "policyIds": [
                "fish-auctions",
                "longshift-piers"
              ]
            },
            {
              "tier": 3,
              "policyIds": [
                "bonded-logistics",
                "signal-towers"
              ]
            },
            {
              "tier": 4,
              "policyIds": [
                "freeport-authority"
              ]
            }
          ]
        },
        {
          "id": "maritime-society",
          "name": "Maritime Society",
          "tiers": [
            {
              "tier": 1,
              "policyIds": [
                "sailors-guild"
              ]
            },
            {
              "tier": 2,
              "policyIds": [
                "lighthouse-fund",
                "tavern-leagues"
              ]
            },
            {
              "tier": 3,
              "policyIds": [
                "chart-academy",
                "regatta-commission"
              ]
            },
            {
              "tier": 4,
              "policyIds": [
                "harbor-senate"
              ]
            }
          ]
        }
      ]
    }
  ],
  "buildings": [
    {
      "id": "suburban-duplex",
      "name": "Clockhouse Duplex",
      "artPath": "./public/art/house-kits/patchwork-borough/current/clockhouse-duplex.png",
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 20
      },
      "outputPerSecond": {
        "coins": 0.16
      },
      "maintenancePerSecond": {
        "coins": 0.03
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Shared porches",
          "targetType": "stat",
          "target": "residents",
          "sourceBuildingIds": [
            "red-cottage"
          ],
          "perOwned": 2,
          "bonus": 0.05,
          "cap": 0.25
        }
      ],
      "description": "A dependable starter address that grows the borough's first block and gives taxes somewhere to come from.",
      "codex": {
        "family": "clockhouse",
        "tier": 1,
        "summary": "Starter housing that establishes the first resident base.",
        "lore": "The clockhouse duplex is where the borough starts counting itself. Two families, one meter, and a street that finally keeps time.",
        "masteryTarget": 12,
        "sortKey": 10
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "red-cottage",
      "name": "Red Cottage",
      "artPath": "./public/art/house-kits/patchwork-borough/current/red-cottage.png",
      "category": "residential",
      "unlock": {
        "residents": 6
      },
      "baseCost": {
        "coins": 60
      },
      "outputPerSecond": {
        "coins": 0.24,
        "goods": 0.08
      },
      "maintenancePerSecond": {
        "coins": 0.04
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Corner trade",
          "targetType": "output",
          "target": "goods",
          "sourceBuildingIds": [
            "suburban-duplex"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "Small homes start selling from the porch, turning population into the borough's first real goods stream.",
      "codex": {
        "family": "cottage",
        "tier": 1,
        "summary": "Early mixed housing that adds both residents and small trade.",
        "lore": "Every red cottage adds a little commerce to the street. Curtains stay shut, but the porch is always open for business.",
        "masteryTarget": 12,
        "sortKey": 20
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "timber-cabin",
      "name": "Hearth Grotto",
      "artPath": "./public/art/house-kits/patchwork-borough/current/hearth-grotto.png",
      "category": "rural",
      "unlock": {
        "residents": 10
      },
      "baseCost": {
        "coins": 110
      },
      "outputPerSecond": {
        "timber": 0.2,
        "stone": 0.08
      },
      "maintenancePerSecond": {
        "coins": 0.03
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Supply trail",
          "targetType": "output",
          "target": "timber",
          "sourceBuildingIds": [
            "farmstead"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.5
        }
      ],
      "description": "A rough hillside supply camp that cuts timber and drags stone into the borough.",
      "codex": {
        "family": "grotto",
        "tier": 1,
        "summary": "Starter supply district for timber and stone.",
        "lore": "The hearth grotto is cold, smoky, and essential. It is where the first serious building material leaves the hillside.",
        "masteryTarget": 12,
        "sortKey": 30
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "farmstead",
      "name": "Windmill Homestead",
      "artPath": "./public/art/house-kits/patchwork-borough/current/windmill-homestead.png",
      "category": "rural",
      "unlock": {
        "residents": 18,
        "timber": 8
      },
      "baseCost": {
        "coins": 240,
        "timber": 8
      },
      "outputPerSecond": {
        "food": 0.62
      },
      "maintenancePerSecond": {
        "coins": 0.05
      },
      "statsPerOwned": {
        "residents": 1
      },
      "synergies": [
        {
          "label": "Town orders",
          "targetType": "output",
          "target": "food",
          "sourceBuildingIds": [
            "red-cottage"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The first food backbone. Once this comes online, later housing and civic districts stop starving the borough.",
      "codex": {
        "family": "homestead",
        "tier": 1,
        "summary": "Foundational food district that stabilizes the borough's upkeep.",
        "lore": "The windmill homestead turns a patch of land into a promise that the next district will be fed.",
        "masteryTarget": 12,
        "sortKey": 40
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "lane-bungalow",
      "name": "Lane Bungalow",
      "artPath": "./public/art/house-kits/patchwork-borough/current/lane-bungalow.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-top-1",
      "category": "residential",
      "unlock": {
        "residents": 22,
        "food": 8,
        "timber": 12
      },
      "baseCost": {
        "coins": 220,
        "food": 10,
        "timber": 90
      },
      "outputPerSecond": {
        "coins": 0.44,
        "goods": 0.05
      },
      "maintenancePerSecond": {
        "food": 0.42
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Block traffic",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "red-cottage"
          ],
          "perOwned": 2,
          "bonus": 0.06,
          "cap": 0.3
        }
      ],
      "description": "Dense starter housing that trades a food burden for better tax traffic and a touch of commerce.",
      "codex": {
        "family": "bungalow",
        "tier": 2,
        "summary": "Mid-opening housing that pushes population and taxes while introducing food pressure.",
        "lore": "A lane full of bungalows feels like growth from a distance and crowding up close. The tax office loves it either way.",
        "masteryTarget": 10,
        "sortKey": 50
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "quarry-yard",
      "name": "Quarry Yard",
      "artPath": "./public/art/house-kits/patchwork-borough/current/quarry-yard.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-top-2",
      "category": "rural",
      "unlock": {
        "residents": 28,
        "timber": 24,
        "food": 12
      },
      "baseCost": {
        "coins": 320,
        "timber": 220,
        "food": 12
      },
      "outputPerSecond": {
        "stone": 0.66
      },
      "maintenancePerSecond": {
        "food": 0.36
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Hillside haul",
          "targetType": "output",
          "target": "stone",
          "sourceBuildingIds": [
            "timber-cabin"
          ],
          "perOwned": 1,
          "bonus": 0.09,
          "cap": 0.45
        }
      ],
      "description": "A dedicated stone yard that turns the early timber camp into a real construction chain.",
      "codex": {
        "family": "quarry",
        "tier": 2,
        "summary": "Dedicated stone producer for the borough's midgame bottleneck.",
        "lore": "The quarry yard is the moment the borough stops improvising with fieldstone and starts thinking in walls, terraces, and civic facades.",
        "masteryTarget": 10,
        "sortKey": 60
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "cube-villa",
      "name": "Observatory Villa",
      "artPath": "./public/art/house-kits/patchwork-borough/current/observatory-villa.png",
      "category": "civic",
      "unlock": {
        "residents": 34,
        "timber": 36,
        "stone": 30,
        "goods": 12
      },
      "baseCost": {
        "coins": 420,
        "timber": 260,
        "stone": 34,
        "goods": 14
      },
      "outputPerSecond": {
        "coins": 0.95,
        "knowledge": 0.22
      },
      "maintenancePerSecond": {
        "food": 0.34,
        "goods": 0.12
      },
      "statsPerOwned": {
        "residents": 1
      },
      "synergies": [
        {
          "label": "Field notes",
          "targetType": "output",
          "target": "knowledge",
          "sourceBuildingIds": [
            "quarry-yard"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The borough's first knowledge district, turning materials and stocked wares into planning capacity.",
      "codex": {
        "family": "observatory",
        "tier": 2,
        "summary": "Early civic knowledge district with a modest tax return.",
        "lore": "From the observatory villa, the borough starts measuring itself instead of merely surviving itself.",
        "masteryTarget": 10,
        "sortKey": 70
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "freight-depot",
      "name": "Freight Depot",
      "artPath": "./public/art/house-kits/patchwork-borough/current/freight-depot.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-top-3",
      "category": "industrial",
      "unlock": {
        "residents": 40,
        "stone": 52,
        "goods": 18
      },
      "baseCost": {
        "coins": 420,
        "timber": 120,
        "stone": 82,
        "goods": 42
      },
      "outputPerSecond": {
        "goods": 0.56,
        "coins": 0.88
      },
      "maintenancePerSecond": {
        "food": 0.28
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Porch contracts",
          "targetType": "output",
          "target": "goods",
          "sourceBuildingIds": [
            "red-cottage",
            "lane-bungalow"
          ],
          "perOwned": 2,
          "bonus": 0.07,
          "cap": 0.35
        }
      ],
      "description": "A logistics district that turns local craft into organized trade and lays the groundwork for later industry.",
      "codex": {
        "family": "freight",
        "tier": 2,
        "summary": "Mid-opening logistics district that raises goods and tax flow together.",
        "lore": "Once the freight depot opens, the borough stops carrying its economy by hand.",
        "masteryTarget": 10,
        "sortKey": 80
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "grand-manor",
      "name": "Pagoda Estate",
      "artPath": "./public/art/house-kits/patchwork-borough/current/pagoda-estate.png",
      "category": "prestige",
      "unlock": {
        "residents": 48,
        "goods": 24,
        "knowledge": 8,
        "stone": 50
      },
      "baseCost": {
        "coins": 560,
        "timber": 420,
        "goods": 52,
        "knowledge": 16,
        "stone": 40
      },
      "outputPerSecond": {
        "appeal": 0.3,
        "influence": 0.1
      },
      "maintenancePerSecond": {
        "food": 0.72,
        "goods": 0.14
      },
      "statsPerOwned": {
        "residents": 1
      },
      "synergies": [
        {
          "label": "Ceremonial route",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "hillside-lodge"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.5
        }
      ],
      "description": "A prestige estate that starts turning growth into civic gravity instead of basic throughput.",
      "codex": {
        "family": "estate",
        "tier": 3,
        "summary": "First prestige district and an early source of appeal and influence.",
        "lore": "The pagoda estate does not house many people, but it makes the borough feel important enough that people start taking it seriously.",
        "masteryTarget": 8,
        "sortKey": 90
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "greenhouse-terrace",
      "name": "Greenhouse Terrace",
      "artPath": "./public/art/house-kits/patchwork-borough/current/greenhouse-terrace.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-top-4",
      "category": "rural",
      "unlock": {
        "residents": 56,
        "stone": 90,
        "knowledge": 16
      },
      "baseCost": {
        "coins": 1300,
        "timber": 40,
        "stone": 130,
        "knowledge": 28
      },
      "outputPerSecond": {
        "food": 1.36,
        "goods": 0.1
      },
      "maintenancePerSecond": {
        "goods": 0.12
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Measured yields",
          "targetType": "output",
          "target": "food",
          "sourceBuildingIds": [
            "cube-villa"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "A scientific rural build that solves midgame food pressure without giving up the supply economy.",
      "codex": {
        "family": "greenhouse",
        "tier": 3,
        "summary": "Midgame food stabilizer that depends on stone and knowledge.",
        "lore": "The greenhouse terrace proves that a borough can apply planning to hunger and actually win.",
        "masteryTarget": 8,
        "sortKey": 100
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "brick-factory",
      "name": "Brick Factory",
      "artPath": "./public/art/house-kits/patchwork-borough/current/brick-factory.png",
      "category": "industrial",
      "unlock": {
        "residents": 64,
        "stone": 140,
        "timber": 60,
        "goods": 28
      },
      "baseCost": {
        "coins": 1550,
        "stone": 280,
        "timber": 110,
        "goods": 88
      },
      "outputPerSecond": {
        "goods": 1.2,
        "stone": 0.72,
        "power": 0.24
      },
      "maintenancePerSecond": {
        "food": 0.14,
        "goods": 0.12
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Quarry freight",
          "targetType": "output",
          "target": "power",
          "sourceBuildingIds": [
            "quarry-yard",
            "freight-depot"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The industrial hinge of the borough. Goods and stone climb, and the power economy finally begins.",
      "codex": {
        "family": "factory",
        "tier": 3,
        "summary": "Industrial hinge that opens power and pushes the midgame forward.",
        "lore": "The brick factory makes the borough loud, dirty, and suddenly much more capable.",
        "masteryTarget": 8,
        "sortKey": 110
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "borough-exchange",
      "name": "Borough Exchange",
      "artPath": "./public/art/house-kits/patchwork-borough/current/borough-exchange.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-top-5",
      "category": "civic",
      "unlock": {
        "residents": 72,
        "goods": 90,
        "knowledge": 24,
        "power": 4
      },
      "baseCost": {
        "coins": 1800,
        "stone": 240,
        "goods": 420,
        "knowledge": 120
      },
      "outputPerSecond": {
        "coins": 4.8,
        "influence": 0.2
      },
      "maintenancePerSecond": {
        "power": 0.32,
        "food": 0.18,
        "goods": 0.9
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Broker network",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "freight-depot"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.48
        }
      ],
      "description": "A civic-commercial hub that converts organized trade into shared money and political leverage.",
      "codex": {
        "family": "exchange",
        "tier": 3,
        "summary": "Civic finance district that turns local trade into coins and influence.",
        "lore": "The borough exchange is where trade stops being a local habit and becomes a political fact.",
        "masteryTarget": 8,
        "sortKey": 120
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "hillside-lodge",
      "name": "Lighthouse Lodge",
      "artPath": "./public/art/house-kits/patchwork-borough/current/lighthouse-lodge.png",
      "category": "prestige",
      "unlock": {
        "residents": 78,
        "appeal": 12,
        "goods": 120,
        "stone": 120
      },
      "baseCost": {
        "coins": 2200,
        "stone": 260,
        "goods": 360,
        "appeal": 80
      },
      "outputPerSecond": {
        "coins": 4,
        "appeal": 0.3,
        "influence": 0.1
      },
      "maintenancePerSecond": {
        "food": 0.28,
        "goods": 0.7
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Beacon reputation",
          "targetType": "output",
          "target": "influence",
          "sourceBuildingIds": [
            "stone-keep"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "A scenic prestige district that monetizes the borough's status without doing much to solve its shortages.",
      "codex": {
        "family": "lodge",
        "tier": 3,
        "summary": "Prestige lodging that ties appeal, influence, and shared coin together.",
        "lore": "The lodge teaches the borough a useful lesson: scenery can be converted into money if someone is willing to charge for the view.",
        "masteryTarget": 8,
        "sortKey": 130
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "public-archive",
      "name": "Public Archive",
      "artPath": "./public/art/house-kits/patchwork-borough/current/public-archive.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-top-6",
      "category": "civic",
      "unlock": {
        "residents": 86,
        "knowledge": 50,
        "stone": 180,
        "goods": 120,
        "power": 8
      },
      "baseCost": {
        "coins": 2600,
        "stone": 1100,
        "goods": 900,
        "knowledge": 520,
        "power": 90
      },
      "outputPerSecond": {
        "knowledge": 0.9,
        "influence": 0.12
      },
      "maintenancePerSecond": {
        "power": 0.45,
        "goods": 0.6
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Survey office",
          "targetType": "output",
          "target": "knowledge",
          "sourceBuildingIds": [
            "cube-villa"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "A formal archive that turns knowledge into a durable civic resource rather than a byproduct of villas.",
      "codex": {
        "family": "archive",
        "tier": 4,
        "summary": "Institutional knowledge building that supports late civic growth.",
        "lore": "The public archive is what happens when a borough decides its records are worth protecting and its plans are worth keeping.",
        "masteryTarget": 6,
        "sortKey": 140
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "dome-habitat",
      "name": "Ice Dome Habitat",
      "artPath": "./public/art/house-kits/patchwork-borough/current/ice-dome-habitat.png",
      "category": "civic",
      "unlock": {
        "residents": 96,
        "power": 30,
        "knowledge": 64,
        "goods": 180
      },
      "baseCost": {
        "coins": 6200,
        "stone": 1180,
        "goods": 760,
        "power": 520,
        "knowledge": 460
      },
      "outputPerSecond": {
        "coins": 5.8,
        "knowledge": 0.8,
        "appeal": 0.15
      },
      "maintenancePerSecond": {
        "food": 0.35,
        "power": 0.82,
        "goods": 0.3
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Engineered climate",
          "targetType": "output",
          "target": "knowledge",
          "sourceBuildingIds": [
            "summit-powerhouse"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "An engineered civic district that transforms industrial power into late borough planning capacity.",
      "codex": {
        "family": "dome",
        "tier": 4,
        "summary": "Late civic district built on power, knowledge, and goods.",
        "lore": "The ice dome habitat is the borough announcing that it can now build for ideas, not just needs.",
        "masteryTarget": 6,
        "sortKey": 150
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "summit-powerhouse",
      "name": "Summit Powerhouse",
      "artPath": "./public/art/house-kits/patchwork-borough/current/summit-powerhouse.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-bottom-1",
      "category": "industrial",
      "unlock": {
        "residents": 104,
        "stone": 260,
        "goods": 180,
        "knowledge": 48
      },
      "baseCost": {
        "coins": 6800,
        "stone": 1500,
        "goods": 920,
        "knowledge": 420
      },
      "outputPerSecond": {
        "power": 1.55,
        "goods": 0.24
      },
      "maintenancePerSecond": {
        "food": 0.18,
        "goods": 0.32
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Industrial load",
          "targetType": "output",
          "target": "power",
          "sourceBuildingIds": [
            "brick-factory"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.4
        }
      ],
      "description": "The late industrial backbone. Once this exists, advanced districts stop competing over scraps of utility capacity.",
      "codex": {
        "family": "powerhouse",
        "tier": 4,
        "summary": "Late industrial utility district and the borough's main power source.",
        "lore": "The summit powerhouse is visible from almost everywhere, which is fitting because almost everything starts depending on it.",
        "masteryTarget": 6,
        "sortKey": 160
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "stone-keep",
      "name": "Gothic Keep",
      "artPath": "./public/art/house-kits/patchwork-borough/current/gothic-keep.png",
      "category": "prestige",
      "unlock": {
        "residents": 112,
        "appeal": 36,
        "influence": 24,
        "stone": 320
      },
      "baseCost": {
        "coins": 7600,
        "stone": 980,
        "goods": 460,
        "appeal": 360,
        "influence": 420
      },
      "outputPerSecond": {
        "appeal": 0.48,
        "influence": 0.58
      },
      "maintenancePerSecond": {
        "food": 0.32,
        "goods": 0.26
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Old authority",
          "targetType": "output",
          "target": "influence",
          "sourceBuildingIds": [
            "grand-manor"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "A severe prestige district that pushes influence harder than almost anything else in the borough.",
      "codex": {
        "family": "keep",
        "tier": 4,
        "summary": "Late prestige district centered on influence and civic weight.",
        "lore": "The gothic keep does not need to be useful in a practical sense. Its job is to remind everyone who gets heard.",
        "masteryTarget": 6,
        "sortKey": 170
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "palm-bungalow",
      "name": "Treehouse Retreat",
      "artPath": "./public/art/house-kits/patchwork-borough/current/treehouse-retreat.png",
      "category": "prestige",
      "unlock": {
        "residents": 120,
        "appeal": 24,
        "goods": 180,
        "food": 280
      },
      "baseCost": {
        "coins": 8200,
        "timber": 420,
        "goods": 560,
        "food": 1200,
        "appeal": 320
      },
      "outputPerSecond": {
        "coins": 5.4,
        "appeal": 0.36,
        "influence": 0.14
      },
      "maintenancePerSecond": {
        "food": 0.55,
        "goods": 0.42
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Scenic circuit",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "hillside-lodge"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "A high-end retreat that rewards a mature food economy and turns leisure into prestige.",
      "codex": {
        "family": "treehouse",
        "tier": 4,
        "summary": "Late prestige lodging that spends food to generate scenic value.",
        "lore": "The treehouse retreat is proof that by the late game the borough can afford to make beauty impractical on purpose.",
        "masteryTarget": 6,
        "sortKey": 180
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "glass-condo",
      "name": "Glass Highrise",
      "artPath": "./public/art/house-kits/patchwork-borough/current/glass-highrise.png",
      "category": "residential",
      "unlock": {
        "residents": 132,
        "power": 46,
        "knowledge": 72,
        "influence": 34
      },
      "baseCost": {
        "coins": 9600,
        "stone": 1900,
        "goods": 620,
        "power": 760,
        "knowledge": 700
      },
      "outputPerSecond": {
        "coins": 12.5,
        "influence": 0.34
      },
      "maintenancePerSecond": {
        "food": 0.4,
        "power": 0.95,
        "goods": 0.28
      },
      "statsPerOwned": {
        "residents": 6
      },
      "synergies": [
        {
          "label": "Financial skyline",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "borough-exchange"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "A late residential tax engine that turns power and knowledge into dense high-value housing.",
      "codex": {
        "family": "highrise",
        "tier": 5,
        "summary": "Late residential tower that pushes both population and shared money.",
        "lore": "The glass highrise reflects the rest of the borough back at itself: wealthier, denser, and far more fragile if the lights go out.",
        "masteryTarget": 4,
        "sortKey": 190
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "skyline-galleria",
      "name": "Skyline Galleria",
      "artPath": "./public/art/house-kits/patchwork-borough/current/skyline-galleria.png",
      "spriteSheetPath": "./public/art/houses4.png",
      "spriteRef": "houses-bottom-2",
      "category": "prestige",
      "unlock": {
        "residents": 144,
        "appeal": 54,
        "influence": 56,
        "power": 52,
        "goods": 220
      },
      "baseCost": {
        "coins": 11200,
        "stone": 1500,
        "goods": 1500,
        "power": 860,
        "appeal": 960,
        "influence": 1100
      },
      "outputPerSecond": {
        "coins": 15.2,
        "appeal": 0.66,
        "influence": 0.36
      },
      "maintenancePerSecond": {
        "food": 0.65,
        "goods": 1.05,
        "power": 0.62
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Skyline draw",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "glass-condo",
            "stone-keep"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "A capstone prestige district that consumes the borough's late civic currencies and pays back in status and shared revenue.",
      "codex": {
        "family": "galleria",
        "tier": 5,
        "summary": "Late prestige capstone that spends power, appeal, and influence together.",
        "lore": "The skyline galleria is the borough at its most self-aware: expensive, visible, and built mainly to prove it can exist.",
        "masteryTarget": 4,
        "sortKey": 200
      },
      "areaId": "patchwork-borough"
    },
    {
      "id": "fisher-huts",
      "name": "Fisher Huts",
      "artPath": "./public/art/house-kits/port-city/current/fisher-huts.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-top-1",
      "category": "fishery",
      "unlock": {},
      "baseCost": {
        "coins": 40
      },
      "outputPerSecond": {
        "catch": 0.46
      },
      "maintenancePerSecond": {
        "coins": 0.03
      },
      "statsPerOwned": {
        "crew": 2
      },
      "synergies": [
        {
          "label": "Salt contracts",
          "targetType": "output",
          "target": "catch",
          "sourceBuildingIds": [
            "salt-smokehouse"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The first harbor district. It feeds the docks and establishes the first crews on the shoreline.",
      "codex": {
        "family": "fishery",
        "tier": 1,
        "summary": "Starter fishery that establishes the catch economy.",
        "lore": "The fisher huts are older than the harbor plan itself. If there is a port-city to build, it starts here.",
        "masteryTarget": 12,
        "sortKey": 10
      },
      "areaId": "port-city"
    },
    {
      "id": "driftwood-yard",
      "name": "Driftwood Yard",
      "artPath": "./public/art/house-kits/port-city/current/driftwood-yard.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-top-2",
      "category": "dockyard",
      "unlock": {
        "crew": 4
      },
      "baseCost": {
        "coins": 110
      },
      "outputPerSecond": {
        "lumber": 0.3
      },
      "maintenancePerSecond": {
        "coins": 0.03
      },
      "statsPerOwned": {
        "crew": 1
      },
      "synergies": [
        {
          "label": "Pier orders",
          "targetType": "output",
          "target": "lumber",
          "sourceBuildingIds": [
            "timber-pier"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "A rough-cut yard that turns shoreline scrap and cut timber into usable dock lumber.",
      "codex": {
        "family": "dockyard",
        "tier": 1,
        "summary": "Starter lumber producer for the harbor.",
        "lore": "Before the harbor can think about terminals or towers, someone has to drag good wood out of the tide line and make it square.",
        "masteryTarget": 12,
        "sortKey": 20
      },
      "areaId": "port-city"
    },
    {
      "id": "salt-smokehouse",
      "name": "Salt Smokehouse",
      "artPath": "./public/art/house-kits/port-city/current/salt-smokehouse.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-top-3",
      "category": "fishery",
      "unlock": {
        "crew": 10,
        "catch": 10
      },
      "baseCost": {
        "coins": 220,
        "lumber": 12,
        "catch": 14
      },
      "outputPerSecond": {
        "catch": 0.92,
        "cargo": 0.1
      },
      "maintenancePerSecond": {
        "coins": 0.05
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Net turnover",
          "targetType": "output",
          "target": "cargo",
          "sourceBuildingIds": [
            "fisher-huts"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The harbor's first preserved export. It keeps more fish moving and starts the cargo economy.",
      "codex": {
        "family": "smokehouse",
        "tier": 1,
        "summary": "Early processor that turns catch into reliable cargo.",
        "lore": "A smokehouse makes the day's catch last long enough to leave the dock. That is the entire difference between subsistence and trade.",
        "masteryTarget": 12,
        "sortKey": 30
      },
      "areaId": "port-city"
    },
    {
      "id": "timber-pier",
      "name": "Timber Pier",
      "artPath": "./public/art/house-kits/port-city/current/timber-pier.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-top-4",
      "category": "dockyard",
      "unlock": {
        "crew": 14,
        "lumber": 20,
        "catch": 18
      },
      "baseCost": {
        "coins": 360,
        "lumber": 24,
        "catch": 20
      },
      "outputPerSecond": {
        "cargo": 0.28,
        "harbor_capacity": 0.1
      },
      "maintenancePerSecond": {
        "coins": 0.06
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Measured berths",
          "targetType": "output",
          "target": "harbor_capacity",
          "sourceBuildingIds": [
            "driftwood-yard"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.4
        }
      ],
      "description": "A working pier that creates the harbor's first real berth space and organized loading capacity.",
      "codex": {
        "family": "pier",
        "tier": 2,
        "summary": "Early dock infrastructure that starts the berth economy.",
        "lore": "A timber pier is a promise that ships can arrive and find somewhere deliberate to stand.",
        "masteryTarget": 10,
        "sortKey": 40
      },
      "areaId": "port-city"
    },
    {
      "id": "barge-masons",
      "name": "Barge Masons",
      "artPath": "./public/art/house-kits/port-city/current/barge-masons.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-top-5",
      "category": "dockyard",
      "unlock": {
        "crew": 18,
        "cargo": 10,
        "lumber": 28
      },
      "baseCost": {
        "coins": 520,
        "lumber": 32,
        "cargo": 10
      },
      "outputPerSecond": {
        "masonry": 0.42,
        "cargo": 0.1
      },
      "maintenancePerSecond": {
        "catch": 0.12,
        "cargo": 0.08
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Dredge contracts",
          "targetType": "output",
          "target": "masonry",
          "sourceBuildingIds": [
            "dredger-works"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "Stone crews on barges that finally let the port build durable harbor works instead of temporary timber fixes.",
      "codex": {
        "family": "masonry",
        "tier": 2,
        "summary": "Mid-opening masonry district for durable port construction.",
        "lore": "Barge masons do not make a harbor pretty; they make it survive the weather.",
        "masteryTarget": 10,
        "sortKey": 50
      },
      "areaId": "port-city"
    },
    {
      "id": "chandlery-market",
      "name": "Chandlery Market",
      "artPath": "./public/art/house-kits/port-city/current/chandlery-market.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-top-6",
      "category": "customs",
      "unlock": {
        "crew": 24,
        "cargo": 18,
        "masonry": 16
      },
      "baseCost": {
        "coins": 700,
        "lumber": 24,
        "masonry": 24,
        "cargo": 22
      },
      "outputPerSecond": {
        "coins": 2.8,
        "cargo": 0.2
      },
      "maintenancePerSecond": {
        "catch": 0.18,
        "cargo": 0.25
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Harbor demand",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "timber-pier",
            "bonded-warehouse"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The first serious trade district, turning cargo movement into shared money for both cities.",
      "codex": {
        "family": "customs",
        "tier": 2,
        "summary": "Early customs-market district that monetizes port trade.",
        "lore": "The chandlery market is where the harbor stops selling fish and starts selling the right to keep sailing.",
        "masteryTarget": 10,
        "sortKey": 60
      },
      "areaId": "port-city"
    },
    {
      "id": "dredger-works",
      "name": "Dredger Works",
      "artPath": "./public/art/house-kits/port-city/current/dredger-works.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-bottom-1",
      "category": "dockyard",
      "unlock": {
        "crew": 32,
        "masonry": 36,
        "cargo": 32
      },
      "baseCost": {
        "coins": 1100,
        "masonry": 50,
        "cargo": 40
      },
      "outputPerSecond": {
        "harbor_capacity": 0.48,
        "cargo": 0.16
      },
      "maintenancePerSecond": {
        "catch": 0.16,
        "cargo": 0.35
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Stone channels",
          "targetType": "output",
          "target": "harbor_capacity",
          "sourceBuildingIds": [
            "barge-masons"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.4
        }
      ],
      "description": "Heavy harbor infrastructure that makes berth space the port's central strategic resource.",
      "codex": {
        "family": "dredger",
        "tier": 3,
        "summary": "Core infrastructure district for midgame berth growth.",
        "lore": "The dredger works is the point where the harbor stops accepting its coastline and begins editing it.",
        "masteryTarget": 8,
        "sortKey": 70
      },
      "areaId": "port-city"
    },
    {
      "id": "chart-house",
      "name": "Chart House",
      "artPath": "./public/art/house-kits/port-city/current/chart-house.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-bottom-2",
      "category": "customs",
      "unlock": {
        "crew": 40,
        "cargo": 46,
        "harbor_capacity": 20,
        "masonry": 24
      },
      "baseCost": {
        "coins": 1500,
        "masonry": 34,
        "cargo": 52,
        "harbor_capacity": 14
      },
      "outputPerSecond": {
        "charts": 0.34,
        "coins": 2.5
      },
      "maintenancePerSecond": {
        "catch": 0.2,
        "cargo": 0.4,
        "harbor_capacity": 0.12
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Warehouse logs",
          "targetType": "output",
          "target": "charts",
          "sourceBuildingIds": [
            "bonded-warehouse"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "A navigational office that turns cargo and berth space into route knowledge.",
      "codex": {
        "family": "charts",
        "tier": 3,
        "summary": "Midgame research district for route planning and navigation.",
        "lore": "The chart house is where the harbor learns that distance can be planned instead of endured.",
        "masteryTarget": 8,
        "sortKey": 80
      },
      "areaId": "port-city"
    },
    {
      "id": "bonded-warehouse",
      "name": "Bonded Warehouse",
      "artPath": "./public/art/house-kits/port-city/current/bonded-warehouse.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-bottom-3",
      "category": "customs",
      "unlock": {
        "crew": 48,
        "cargo": 80,
        "masonry": 80,
        "harbor_capacity": 34
      },
      "baseCost": {
        "coins": 2600,
        "masonry": 320,
        "cargo": 520,
        "harbor_capacity": 260
      },
      "outputPerSecond": {
        "cargo": 0.84,
        "coins": 4.2
      },
      "maintenancePerSecond": {
        "catch": 0.28,
        "cargo": 0.8,
        "harbor_capacity": 0.28
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Pier turnover",
          "targetType": "output",
          "target": "cargo",
          "sourceBuildingIds": [
            "timber-pier",
            "chandlery-market"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "A large logistics district that stabilizes cargo growth and turns port throughput into a true economy.",
      "codex": {
        "family": "warehouse",
        "tier": 3,
        "summary": "Late-mid customs warehouse that becomes a major cargo engine.",
        "lore": "Bonded warehouses make a harbor feel larger than it is because they let trade wait for the world to catch up.",
        "masteryTarget": 8,
        "sortKey": 90
      },
      "areaId": "port-city"
    },
    {
      "id": "customs-tower",
      "name": "Customs Tower",
      "artPath": "./public/art/house-kits/port-city/current/customs-tower.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-bottom-4",
      "category": "landmark",
      "unlock": {
        "crew": 58,
        "charts": 16,
        "harbor_capacity": 48,
        "cargo": 120,
        "masonry": 140
      },
      "baseCost": {
        "coins": 3400,
        "masonry": 720,
        "cargo": 920,
        "harbor_capacity": 520,
        "charts": 220
      },
      "outputPerSecond": {
        "renown": 0.34,
        "coins": 5.2
      },
      "maintenancePerSecond": {
        "catch": 0.3,
        "cargo": 0.6,
        "harbor_capacity": 0.35
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Harbor spectacle",
          "targetType": "output",
          "target": "renown",
          "sourceBuildingIds": [
            "regatta-quay"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "A maritime landmark that turns planning and berth space into civic prestige and reliable tariffs.",
      "codex": {
        "family": "tower",
        "tier": 4,
        "summary": "Late port landmark for renown and stable coin income.",
        "lore": "From the customs tower, the harbor can see who is arriving, what they are carrying, and how loudly to charge them.",
        "masteryTarget": 6,
        "sortKey": 100
      },
      "areaId": "port-city"
    },
    {
      "id": "regatta-quay",
      "name": "Regatta Quay",
      "artPath": "./public/art/house-kits/port-city/current/regatta-quay.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-bottom-5",
      "category": "landmark",
      "unlock": {
        "crew": 68,
        "renown": 10,
        "harbor_capacity": 62,
        "charts": 36,
        "cargo": 140
      },
      "baseCost": {
        "coins": 4500,
        "lumber": 260,
        "cargo": 900,
        "harbor_capacity": 760,
        "charts": 320,
        "renown": 180
      },
      "outputPerSecond": {
        "renown": 0.48,
        "coins": 6.8
      },
      "maintenancePerSecond": {
        "catch": 0.36,
        "cargo": 0.8,
        "harbor_capacity": 0.45
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Tower attention",
          "targetType": "output",
          "target": "renown",
          "sourceBuildingIds": [
            "customs-tower"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "A civic shoreline build that converts port maturity into spectacle and public reputation.",
      "codex": {
        "family": "regatta",
        "tier": 4,
        "summary": "Late civic harbor district for renown growth.",
        "lore": "The regatta quay exists so the harbor can show off the traffic it has already earned.",
        "masteryTarget": 6,
        "sortKey": 110
      },
      "areaId": "port-city"
    },
    {
      "id": "grand-terminal",
      "name": "Grand Terminal",
      "artPath": "./public/art/house-kits/port-city/current/grand-terminal.png",
      "spriteSheetPath": "./public/art/houses2.png",
      "spriteRef": "houses-bottom-6",
      "category": "landmark",
      "unlock": {
        "crew": 82,
        "renown": 24,
        "charts": 54,
        "harbor_capacity": 90,
        "cargo": 220,
        "masonry": 180
      },
      "baseCost": {
        "coins": 6500,
        "masonry": 1200,
        "cargo": 1800,
        "harbor_capacity": 1500,
        "charts": 620,
        "renown": 360
      },
      "outputPerSecond": {
        "coins": 12.8,
        "renown": 0.6,
        "cargo": 0.48
      },
      "maintenancePerSecond": {
        "catch": 0.45,
        "cargo": 1.2,
        "harbor_capacity": 0.7
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Through-line",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "bonded-warehouse",
            "customs-tower"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.32
        }
      ],
      "description": "The port's capstone district, built on berth space, routing, and civic reputation rather than raw cash alone.",
      "codex": {
        "family": "terminal",
        "tier": 5,
        "summary": "Port capstone that spends cargo, capacity, charts, and renown together.",
        "lore": "The grand terminal is the harbor proving that it no longer needs to ask whether ships will come. The question is where to put them all.",
        "masteryTarget": 4,
        "sortKey": 120
      },
      "areaId": "port-city"
    }
  ],
  "policies": [
    {
      "id": "census-registry",
      "areaId": "patchwork-borough",
      "treeId": "civic",
      "tier": 1,
      "category": "civic",
      "unlock": {
        "residents": 12
      },
      "cost": {
        "coins": 450
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "statMultiplier",
          "stat": "residents",
          "buildingIds": [
            "suburban-duplex",
            "red-cottage",
            "lane-bungalow",
            "glass-condo"
          ],
          "multiplier": 1.12
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "knowledge"
          ],
          "targets": "all",
          "multiplier": 1.08
        }
      ],
      "description": "Count households properly and the borough starts using its earliest housing much more efficiently.",
      "codex": {
        "family": "civic",
        "tier": 1,
        "summary": "Opening civic policy for population efficiency.",
        "lore": "Once the borough keeps a registry, housing stops being a guess and starts being a system.",
        "masteryTarget": 1,
        "sortKey": 10
      }
    },
    {
      "id": "public-schools",
      "areaId": "patchwork-borough",
      "treeId": "civic",
      "tier": 2,
      "category": "civic",
      "exclusiveGroupId": "borough-civic-service",
      "exclusiveGroupLabel": "Civic Service",
      "prerequisitePolicyIds": [
        "census-registry"
      ],
      "unlock": {
        "knowledge": 4
      },
      "cost": {
        "coins": 900,
        "goods": 34,
        "knowledge": 14
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "knowledge"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "patchwork-borough",
          "type": "statMultiplier",
          "stat": "residents",
          "buildingIds": [
            "cube-villa",
            "dome-habitat"
          ],
          "multiplier": 1.08
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "knowledge",
          "amount": 0.25
        }
      ],
      "description": "Invest in schools and surveys to accelerate the borough's knowledge engine.",
      "codex": {
        "family": "civic",
        "tier": 2,
        "summary": "Knowledge branch of the civic tree.",
        "lore": "Public schools make the borough think in decades instead of chores.",
        "masteryTarget": 1,
        "sortKey": 20
      }
    },
    {
      "id": "festival-office",
      "areaId": "patchwork-borough",
      "treeId": "civic",
      "tier": 2,
      "category": "civic",
      "exclusiveGroupId": "borough-civic-service",
      "exclusiveGroupLabel": "Civic Service",
      "prerequisitePolicyIds": [
        "census-registry"
      ],
      "unlock": {
        "appeal": 2
      },
      "cost": {
        "coins": 900,
        "goods": 30,
        "appeal": 10
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "appeal"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "grand-manor",
            "hillside-lodge",
            "palm-bungalow",
            "skyline-galleria"
          ],
          "multiplier": 1.12
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "appeal",
          "amount": 0.12
        }
      ],
      "description": "Lean into civic spectacle and the borough's prestige districts start paying back faster.",
      "codex": {
        "family": "civic",
        "tier": 2,
        "summary": "Appeal branch of the civic tree.",
        "lore": "A festival office does not build anything itself. It simply teaches the borough how to be watched.",
        "masteryTarget": 1,
        "sortKey": 30
      }
    },
    {
      "id": "neighborhood-councils",
      "areaId": "patchwork-borough",
      "treeId": "civic",
      "tier": 3,
      "category": "civic",
      "exclusiveGroupId": "borough-civic-reform",
      "exclusiveGroupLabel": "Civic Reform",
      "prerequisiteAnyPolicyIds": [
        "public-schools",
        "festival-office"
      ],
      "unlock": {
        "influence": 4
      },
      "cost": {
        "coins": 1400,
        "goods": 90,
        "knowledge": 42,
        "influence": 18
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "influence"
          ],
          "targets": "all",
          "multiplier": 1.4
        },
        {
          "areaId": "patchwork-borough",
          "type": "statMultiplier",
          "stat": "residents",
          "buildingIds": [
            "lane-bungalow",
            "glass-condo"
          ],
          "multiplier": 1.08
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "influence",
          "amount": 0.1
        }
      ],
      "description": "Decentralized councils produce more influence and make dense neighborhoods more efficient.",
      "codex": {
        "family": "civic",
        "tier": 3,
        "summary": "Influence-heavy reform branch.",
        "lore": "Councils turn local complaints into political weight. That matters more than most planning documents admit.",
        "masteryTarget": 1,
        "sortKey": 40
      }
    },
    {
      "id": "monument-committee",
      "areaId": "patchwork-borough",
      "treeId": "civic",
      "tier": 3,
      "category": "civic",
      "exclusiveGroupId": "borough-civic-reform",
      "exclusiveGroupLabel": "Civic Reform",
      "prerequisiteAnyPolicyIds": [
        "public-schools",
        "festival-office"
      ],
      "unlock": {
        "appeal": 10
      },
      "cost": {
        "coins": 1500,
        "stone": 180,
        "goods": 96,
        "appeal": 32
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "appeal"
          ],
          "buildingIds": [
            "grand-manor",
            "hillside-lodge",
            "stone-keep",
            "palm-bungalow",
            "skyline-galleria"
          ],
          "multiplier": 1.22
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "influence"
          ],
          "targets": "all",
          "multiplier": 1.12
        },
        {
          "areaId": "patchwork-borough",
          "type": "buildingCostMultiplier",
          "currency": "coins",
          "buildingIds": [
            "stone-keep",
            "skyline-galleria"
          ],
          "multiplier": 0.9
        }
      ],
      "description": "Monuments make prestige cheaper to scale and raise both appeal and influence.",
      "codex": {
        "family": "civic",
        "tier": 3,
        "summary": "Prestige-heavy civic reform branch.",
        "lore": "Committees do not merely fund monuments. They decide which parts of the borough deserve to become memory.",
        "masteryTarget": 1,
        "sortKey": 50
      }
    },
    {
      "id": "city-charter",
      "areaId": "patchwork-borough",
      "treeId": "civic",
      "tier": 4,
      "category": "civic",
      "prerequisiteAnyPolicyIds": [
        "neighborhood-councils",
        "monument-committee"
      ],
      "unlock": {
        "influence": 10,
        "appeal": 14
      },
      "cost": {
        "coins": 9000,
        "stone": 1000,
        "goods": 520,
        "knowledge": 220,
        "influence": 320,
        "appeal": 300
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "unlockSystem",
          "systemId": "annexation"
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins",
            "appeal",
            "influence"
          ],
          "targets": "all",
          "multiplier": 1.12
        }
      ],
      "description": "A formal city charter unlocks annexation and lifts the borough's whole prestige economy.",
      "codex": {
        "family": "civic",
        "tier": 4,
        "summary": "Civic capstone that unlocks annexation.",
        "lore": "The city charter is the borough's argument that it should stop thinking of itself as temporary.",
        "masteryTarget": 1,
        "sortKey": 60
      }
    },
    {
      "id": "masons-guild",
      "areaId": "patchwork-borough",
      "treeId": "industry",
      "tier": 1,
      "category": "industry",
      "unlock": {
        "timber": 20
      },
      "cost": {
        "coins": 650,
        "timber": 20,
        "stone": 16
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "buildingCostMultiplier",
          "currency": "timber",
          "targets": "all",
          "multiplier": 0.9
        },
        {
          "areaId": "patchwork-borough",
          "type": "buildingCostMultiplier",
          "currency": "stone",
          "targets": "all",
          "multiplier": 0.9
        }
      ],
      "description": "Shared standards make the borough waste less timber and stone on every project.",
      "codex": {
        "family": "industry",
        "tier": 1,
        "summary": "Opening industrial policy for material efficiency.",
        "lore": "A guild does not create stone, but it makes the borough stop losing so much of it between quarry and wall.",
        "masteryTarget": 1,
        "sortKey": 70
      }
    },
    {
      "id": "granary-cooperative",
      "areaId": "patchwork-borough",
      "treeId": "industry",
      "tier": 2,
      "category": "industry",
      "exclusiveGroupId": "borough-supply-route",
      "exclusiveGroupLabel": "Supply Route",
      "prerequisitePolicyIds": [
        "masons-guild"
      ],
      "unlock": {
        "food": 10
      },
      "cost": {
        "coins": 800,
        "food": 34,
        "timber": 30
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "food"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "patchwork-borough",
          "type": "maintenanceMultiplier",
          "currency": "food",
          "targets": "all",
          "multiplier": 0.84
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "food",
          "amount": 0.45
        }
      ],
      "description": "Shared storage stabilizes food and lowers the borough's hunger burden.",
      "codex": {
        "family": "industry",
        "tier": 2,
        "summary": "Food branch of the industrial tree.",
        "lore": "A cooperative granary is less romantic than a harvest and far more useful once the borough gets large.",
        "masteryTarget": 1,
        "sortKey": 80
      }
    },
    {
      "id": "quarry-standards",
      "areaId": "patchwork-borough",
      "treeId": "industry",
      "tier": 2,
      "category": "industry",
      "exclusiveGroupId": "borough-supply-route",
      "exclusiveGroupLabel": "Supply Route",
      "prerequisitePolicyIds": [
        "masons-guild"
      ],
      "unlock": {
        "stone": 18
      },
      "cost": {
        "coins": 820,
        "timber": 38,
        "stone": 46
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "timber",
            "stone"
          ],
          "targets": "all",
          "multiplier": 1.3
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "timber",
          "amount": 0.35
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "stone",
          "amount": 0.32
        }
      ],
      "description": "Standardized extraction and hauling push raw material growth much harder.",
      "codex": {
        "family": "industry",
        "tier": 2,
        "summary": "Raw-material branch of the industrial tree.",
        "lore": "Once the quarry crews agree on how to cut, stack, and move stone, the borough starts building like it means it.",
        "masteryTarget": 1,
        "sortKey": 90
      }
    },
    {
      "id": "workshop-standards",
      "areaId": "patchwork-borough",
      "treeId": "industry",
      "tier": 3,
      "category": "industry",
      "exclusiveGroupId": "borough-works-board",
      "exclusiveGroupLabel": "Works Board",
      "prerequisiteAnyPolicyIds": [
        "granary-cooperative",
        "quarry-standards"
      ],
      "unlock": {
        "goods": 20
      },
      "cost": {
        "coins": 1300,
        "goods": 90,
        "timber": 62,
        "stone": 120
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "goods"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "patchwork-borough",
          "type": "maintenanceMultiplier",
          "currency": "goods",
          "targets": "all",
          "multiplier": 0.86
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "freight-depot",
            "borough-exchange",
            "glass-condo"
          ],
          "multiplier": 1.12
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "goods",
          "amount": 0.28
        }
      ],
      "description": "Formal standards make local production more efficient and more profitable.",
      "codex": {
        "family": "industry",
        "tier": 3,
        "summary": "Goods branch of the industrial tree.",
        "lore": "Standards turn a collection of workshops into something close to an industrial sector.",
        "masteryTarget": 1,
        "sortKey": 100
      }
    },
    {
      "id": "power-authority",
      "areaId": "patchwork-borough",
      "treeId": "industry",
      "tier": 3,
      "category": "industry",
      "exclusiveGroupId": "borough-works-board",
      "exclusiveGroupLabel": "Works Board",
      "prerequisiteAnyPolicyIds": [
        "granary-cooperative",
        "quarry-standards"
      ],
      "unlock": {
        "power": 6
      },
      "cost": {
        "coins": 1400,
        "stone": 180,
        "goods": 110,
        "knowledge": 48
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "power"
          ],
          "targets": "all",
          "multiplier": 1.4
        },
        {
          "areaId": "patchwork-borough",
          "type": "maintenanceMultiplier",
          "currency": "power",
          "targets": "all",
          "multiplier": 0.82
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "power",
          "amount": 0.22
        }
      ],
      "description": "Central power planning lifts utility output and softens the late borough's power drain.",
      "codex": {
        "family": "industry",
        "tier": 3,
        "summary": "Utility branch of the industrial tree.",
        "lore": "A power authority is the borough admitting that electricity is too important to leave to improvisation.",
        "masteryTarget": 1,
        "sortKey": 110
      }
    },
    {
      "id": "borough-works-board",
      "areaId": "patchwork-borough",
      "treeId": "industry",
      "tier": 4,
      "category": "industry",
      "prerequisiteAnyPolicyIds": [
        "workshop-standards",
        "power-authority"
      ],
      "unlock": {
        "power": 12,
        "goods": 40
      },
      "cost": {
        "coins": 3200,
        "stone": 980,
        "goods": 760,
        "power": 260,
        "knowledge": 240
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "goods",
            "power",
            "stone"
          ],
          "targets": "all",
          "multiplier": 1.18
        },
        {
          "areaId": "patchwork-borough",
          "type": "buildingCostMultiplier",
          "currency": "coins",
          "buildingIds": [
            "dome-habitat",
            "summit-powerhouse",
            "skyline-galleria"
          ],
          "multiplier": 0.92
        }
      ],
      "description": "A full industrial board pushes every major borough production channel deeper into the late game.",
      "codex": {
        "family": "industry",
        "tier": 4,
        "summary": "Industrial capstone for late production.",
        "lore": "Once the borough runs itself through a works board, industry stops being a side effect of growth and becomes a strategy.",
        "masteryTarget": 1,
        "sortKey": 120
      }
    },
    {
      "id": "stone-roads",
      "areaId": "patchwork-borough",
      "treeId": "trade",
      "tier": 1,
      "category": "trade",
      "unlock": {
        "residents": 18
      },
      "cost": {
        "coins": 650
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "targets": "all",
          "multiplier": 1.15
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "coins",
          "amount": 0.6
        }
      ],
      "description": "Better roads make almost every tax route in the borough more reliable.",
      "codex": {
        "family": "trade",
        "tier": 1,
        "summary": "Opening trade policy for shared coin growth.",
        "lore": "You can measure a borough's ambition by how much stone it is willing to bury in its roads.",
        "masteryTarget": 1,
        "sortKey": 130
      }
    },
    {
      "id": "merchants-union",
      "areaId": "patchwork-borough",
      "treeId": "trade",
      "tier": 2,
      "category": "trade",
      "exclusiveGroupId": "borough-market-charter",
      "exclusiveGroupLabel": "Market Charter",
      "prerequisitePolicyIds": [
        "stone-roads"
      ],
      "unlock": {
        "goods": 8
      },
      "cost": {
        "coins": 1300,
        "goods": 28
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins",
            "goods"
          ],
          "targets": "all",
          "multiplier": 1.18
        },
        {
          "areaId": "patchwork-borough",
          "type": "buildingCostMultiplier",
          "currency": "coins",
          "buildingIds": [
            "borough-exchange",
            "hillside-lodge"
          ],
          "multiplier": 0.9
        }
      ],
      "description": "Favor organized merchants and trade becomes a steadier engine of both money and wares.",
      "codex": {
        "family": "trade",
        "tier": 2,
        "summary": "Merchant-led trade branch.",
        "lore": "A union of merchants does not need to own the borough to teach it how to price itself.",
        "masteryTarget": 1,
        "sortKey": 140
      }
    },
    {
      "id": "market-fairs",
      "areaId": "patchwork-borough",
      "treeId": "trade",
      "tier": 2,
      "category": "trade",
      "exclusiveGroupId": "borough-market-charter",
      "exclusiveGroupLabel": "Market Charter",
      "prerequisitePolicyIds": [
        "stone-roads"
      ],
      "unlock": {
        "appeal": 4
      },
      "cost": {
        "coins": 1300,
        "goods": 22,
        "appeal": 6
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins",
            "appeal"
          ],
          "buildingIds": [
            "grand-manor",
            "hillside-lodge",
            "palm-bungalow",
            "skyline-galleria"
          ],
          "multiplier": 1.22
        },
        {
          "areaId": "patchwork-borough",
          "type": "clickBonus",
          "currency": "coins",
          "amount": 0.35
        }
      ],
      "description": "Favor market events and the borough's prestige districts feed more money back into the treasury.",
      "codex": {
        "family": "trade",
        "tier": 2,
        "summary": "Festival-market trade branch.",
        "lore": "Fairs do not make trade efficient. They make it loud enough that more people notice it.",
        "masteryTarget": 1,
        "sortKey": 150
      }
    },
    {
      "id": "guild-brokers",
      "areaId": "patchwork-borough",
      "treeId": "trade",
      "tier": 3,
      "category": "trade",
      "exclusiveGroupId": "borough-zoning",
      "exclusiveGroupLabel": "Zoning",
      "prerequisiteAnyPolicyIds": [
        "merchants-union",
        "market-fairs"
      ],
      "unlock": {
        "influence": 6
      },
      "cost": {
        "coins": 2800,
        "goods": 70,
        "influence": 12
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "influence"
          ],
          "targets": "all",
          "multiplier": 1.25
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "borough-exchange",
            "stone-keep",
            "glass-condo"
          ],
          "multiplier": 1.14
        }
      ],
      "description": "Brokered permits turn organized influence into shared money and faster high-value districts.",
      "codex": {
        "family": "trade",
        "tier": 3,
        "summary": "Influence-led trade branch.",
        "lore": "Brokers live in the space between a permit and a favor. The borough eventually learns to profit from that space.",
        "masteryTarget": 1,
        "sortKey": 160
      }
    },
    {
      "id": "skyline-office",
      "areaId": "patchwork-borough",
      "treeId": "trade",
      "tier": 3,
      "category": "trade",
      "exclusiveGroupId": "borough-zoning",
      "exclusiveGroupLabel": "Zoning",
      "prerequisiteAnyPolicyIds": [
        "merchants-union",
        "market-fairs"
      ],
      "unlock": {
        "knowledge": 12,
        "power": 6
      },
      "cost": {
        "coins": 3000,
        "stone": 110,
        "knowledge": 28,
        "power": 18
      },
      "effects": [
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "knowledge",
            "coins"
          ],
          "buildingIds": [
            "cube-villa",
            "public-archive",
            "dome-habitat",
            "glass-condo",
            "skyline-galleria"
          ],
          "multiplier": 1.2
        },
        {
          "areaId": "patchwork-borough",
          "type": "buildingCostMultiplier",
          "currency": "coins",
          "buildingIds": [
            "glass-condo",
            "skyline-galleria"
          ],
          "multiplier": 0.9
        }
      ],
      "description": "Planning for towers and civic density shifts the borough toward late-game vertical growth.",
      "codex": {
        "family": "trade",
        "tier": 3,
        "summary": "Knowledge-led zoning branch.",
        "lore": "A skyline office is the borough deciding that land should stop being treated as if it were flat.",
        "masteryTarget": 1,
        "sortKey": 170
      }
    },
    {
      "id": "harbor-charter",
      "areaId": "patchwork-borough",
      "treeId": "trade",
      "tier": 4,
      "category": "trade",
      "prerequisiteAnyPolicyIds": [
        "guild-brokers",
        "skyline-office"
      ],
      "unlock": {
        "influence": 10,
        "knowledge": 18,
        "goods": 60
      },
      "cost": {
        "coins": 6500,
        "stone": 800,
        "goods": 500,
        "knowledge": 220,
        "influence": 240
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "unlockArea"
        },
        {
          "areaId": "patchwork-borough",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "borough-exchange",
            "hillside-lodge",
            "glass-condo"
          ],
          "multiplier": 1.15
        }
      ],
      "description": "Open the harbor charter and the second area enters the save as a parallel city economy.",
      "codex": {
        "family": "trade",
        "tier": 4,
        "summary": "Trade capstone that unlocks Port City.",
        "lore": "The harbor charter is where the borough stops being inland in everything but geography.",
        "masteryTarget": 1,
        "sortKey": 180
      }
    },
    {
      "id": "dock-ledgers",
      "areaId": "port-city",
      "treeId": "harbor-operations",
      "tier": 1,
      "category": "harbor-operations",
      "unlock": {},
      "cost": {
        "coins": 900
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "cargo"
          ],
          "targets": "all",
          "multiplier": 1.12
        },
        {
          "areaId": "port-city",
          "type": "clickBonus",
          "currency": "coins",
          "amount": 0.4
        }
      ],
      "description": "Once the port keeps proper ledgers, cargo becomes easier to measure and monetize.",
      "codex": {
        "family": "harbor-operations",
        "tier": 1,
        "summary": "Opening operations policy for cargo discipline.",
        "lore": "Trade becomes a strategy the moment the harbor writes it down carefully enough to tax twice.",
        "masteryTarget": 1,
        "sortKey": 190
      }
    },
    {
      "id": "fish-auctions",
      "areaId": "port-city",
      "treeId": "harbor-operations",
      "tier": 2,
      "category": "harbor-operations",
      "exclusiveGroupId": "port-berth-policy",
      "exclusiveGroupLabel": "Berth Policy",
      "prerequisitePolicyIds": [
        "dock-ledgers"
      ],
      "unlock": {
        "catch": 14
      },
      "cost": {
        "coins": 1300,
        "catch": 32,
        "cargo": 18
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "catch"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "fisher-huts",
            "salt-smokehouse",
            "chandlery-market"
          ],
          "multiplier": 1.1
        },
        {
          "areaId": "port-city",
          "type": "clickBonus",
          "currency": "catch",
          "amount": 0.35
        }
      ],
      "description": "Favor the fish trade and the harbor leans into catch, market volume, and early tariffs.",
      "codex": {
        "family": "harbor-operations",
        "tier": 2,
        "summary": "Catch-heavy branch for harbor operations.",
        "lore": "Auctions do not catch more fish. They simply make the harbor hungry enough to use every fish it gets.",
        "masteryTarget": 1,
        "sortKey": 200
      }
    },
    {
      "id": "longshift-piers",
      "areaId": "port-city",
      "treeId": "harbor-operations",
      "tier": 2,
      "category": "harbor-operations",
      "exclusiveGroupId": "port-berth-policy",
      "exclusiveGroupLabel": "Berth Policy",
      "prerequisitePolicyIds": [
        "dock-ledgers"
      ],
      "unlock": {
        "harbor_capacity": 4
      },
      "cost": {
        "coins": 1400,
        "lumber": 28,
        "cargo": 20,
        "harbor_capacity": 6
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "harbor_capacity"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "port-city",
          "type": "maintenanceMultiplier",
          "currency": "harbor_capacity",
          "buildingIds": [
            "chart-house",
            "bonded-warehouse",
            "customs-tower",
            "regatta-quay",
            "grand-terminal"
          ],
          "multiplier": 0.82
        },
        {
          "areaId": "port-city",
          "type": "clickBonus",
          "currency": "harbor_capacity",
          "amount": 0.14
        }
      ],
      "description": "Push the port toward harder berth management and faster berth growth.",
      "codex": {
        "family": "harbor-operations",
        "tier": 2,
        "summary": "Capacity-heavy branch for harbor operations.",
        "lore": "Longshift piers are a simple idea with expensive consequences: keep every berth working longer than is polite.",
        "masteryTarget": 1,
        "sortKey": 210
      }
    },
    {
      "id": "bonded-logistics",
      "areaId": "port-city",
      "treeId": "harbor-operations",
      "tier": 3,
      "category": "harbor-operations",
      "exclusiveGroupId": "port-cargo-policy",
      "exclusiveGroupLabel": "Cargo Policy",
      "prerequisiteAnyPolicyIds": [
        "fish-auctions",
        "longshift-piers"
      ],
      "unlock": {
        "cargo": 40
      },
      "cost": {
        "coins": 2800,
        "cargo": 68,
        "masonry": 34,
        "harbor_capacity": 16
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "cargo"
          ],
          "targets": "all",
          "multiplier": 1.3
        },
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "chandlery-market",
            "bonded-warehouse",
            "grand-terminal"
          ],
          "multiplier": 1.15
        },
        {
          "areaId": "port-city",
          "type": "maintenanceMultiplier",
          "currency": "cargo",
          "buildingIds": [
            "chandlery-market",
            "dredger-works",
            "chart-house",
            "bonded-warehouse",
            "customs-tower",
            "regatta-quay",
            "grand-terminal"
          ],
          "multiplier": 0.84
        }
      ],
      "description": "Tighten customs and warehouse flow to push cargo and tariff efficiency harder.",
      "codex": {
        "family": "harbor-operations",
        "tier": 3,
        "summary": "Logistics-heavy cargo branch.",
        "lore": "Bound cargo is slow by design. Bonded logistics is the policy that learns how to make slow systems earn fast money.",
        "masteryTarget": 1,
        "sortKey": 220
      }
    },
    {
      "id": "signal-towers",
      "areaId": "port-city",
      "treeId": "harbor-operations",
      "tier": 3,
      "category": "harbor-operations",
      "exclusiveGroupId": "port-cargo-policy",
      "exclusiveGroupLabel": "Cargo Policy",
      "prerequisiteAnyPolicyIds": [
        "fish-auctions",
        "longshift-piers"
      ],
      "unlock": {
        "charts": 8
      },
      "cost": {
        "coins": 2900,
        "masonry": 48,
        "charts": 14,
        "harbor_capacity": 20
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "charts",
            "harbor_capacity"
          ],
          "targets": "all",
          "multiplier": 1.22
        },
        {
          "areaId": "port-city",
          "type": "clickBonus",
          "currency": "charts",
          "amount": 0.16
        }
      ],
      "description": "Invest in route signaling and the harbor starts growing through information as much as cargo.",
      "codex": {
        "family": "harbor-operations",
        "tier": 3,
        "summary": "Navigation-heavy cargo branch.",
        "lore": "Signal towers are how the harbor teaches the sea to queue properly.",
        "masteryTarget": 1,
        "sortKey": 230
      }
    },
    {
      "id": "freeport-authority",
      "areaId": "port-city",
      "treeId": "harbor-operations",
      "tier": 4,
      "category": "harbor-operations",
      "prerequisiteAnyPolicyIds": [
        "bonded-logistics",
        "signal-towers"
      ],
      "unlock": {
        "cargo": 70,
        "charts": 16,
        "harbor_capacity": 20
      },
      "cost": {
        "coins": 7200,
        "cargo": 300,
        "masonry": 220,
        "harbor_capacity": 120,
        "charts": 90
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins",
            "cargo",
            "harbor_capacity"
          ],
          "targets": "all",
          "multiplier": 1.14
        }
      ],
      "description": "A full harbor authority makes the port meaningfully richer and more scalable.",
      "codex": {
        "family": "harbor-operations",
        "tier": 4,
        "summary": "Operations capstone for the port economy.",
        "lore": "A freeport authority is the harbor deciding that every berth, crate, and route should finally answer to one table.",
        "masteryTarget": 1,
        "sortKey": 240
      }
    },
    {
      "id": "sailors-guild",
      "areaId": "port-city",
      "treeId": "maritime-society",
      "tier": 1,
      "category": "maritime-society",
      "unlock": {
        "crew": 24
      },
      "cost": {
        "coins": 1000,
        "catch": 20
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "statMultiplier",
          "stat": "crew",
          "buildingIds": [
            "fisher-huts",
            "driftwood-yard",
            "salt-smokehouse",
            "timber-pier"
          ],
          "multiplier": 1.15
        },
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "catch"
          ],
          "targets": "all",
          "multiplier": 1.1
        }
      ],
      "description": "Organized crews make the whole harbor more dependable and better staffed.",
      "codex": {
        "family": "maritime-society",
        "tier": 1,
        "summary": "Opening civic-maritime policy for crew growth.",
        "lore": "A sailors guild does not calm the sea, but it gives the harbor a way to bargain with the people who keep going out on it.",
        "masteryTarget": 1,
        "sortKey": 250
      }
    },
    {
      "id": "lighthouse-fund",
      "areaId": "port-city",
      "treeId": "maritime-society",
      "tier": 2,
      "category": "maritime-society",
      "exclusiveGroupId": "port-civic-harbor",
      "exclusiveGroupLabel": "Maritime Society",
      "prerequisitePolicyIds": [
        "sailors-guild"
      ],
      "unlock": {
        "renown": 2
      },
      "cost": {
        "coins": 1500,
        "masonry": 28,
        "charts": 6,
        "renown": 3
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "renown"
          ],
          "buildingIds": [
            "customs-tower",
            "regatta-quay",
            "grand-terminal"
          ],
          "multiplier": 1.25
        },
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "customs-tower"
          ],
          "multiplier": 1.1
        }
      ],
      "description": "Sponsor navigational prestige and the harbor's landmark districts become more important.",
      "codex": {
        "family": "maritime-society",
        "tier": 2,
        "summary": "Prestige branch of the social harbor tree.",
        "lore": "The lighthouse fund exists so the port can claim that safety and spectacle are the same public good.",
        "masteryTarget": 1,
        "sortKey": 260
      }
    },
    {
      "id": "tavern-leagues",
      "areaId": "port-city",
      "treeId": "maritime-society",
      "tier": 2,
      "category": "maritime-society",
      "exclusiveGroupId": "port-civic-harbor",
      "exclusiveGroupLabel": "Maritime Society",
      "prerequisitePolicyIds": [
        "sailors-guild"
      ],
      "unlock": {
        "crew": 40,
        "cargo": 12
      },
      "cost": {
        "coins": 1500,
        "catch": 28,
        "cargo": 22
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "chandlery-market",
            "bonded-warehouse"
          ],
          "multiplier": 1.18
        },
        {
          "areaId": "port-city",
          "type": "statMultiplier",
          "stat": "crew",
          "buildingIds": [
            "chandlery-market",
            "bonded-warehouse",
            "grand-terminal"
          ],
          "multiplier": 1.1
        }
      ],
      "description": "Leagues of taverns and hiring halls turn a looser harbor culture into staffing and trade efficiency.",
      "codex": {
        "family": "maritime-society",
        "tier": 2,
        "summary": "Crew-and-commerce branch of the social harbor tree.",
        "lore": "The tavern leagues are where the harbor admits that half its labor market is already happening over a table with bad light.",
        "masteryTarget": 1,
        "sortKey": 270
      }
    },
    {
      "id": "chart-academy",
      "areaId": "port-city",
      "treeId": "maritime-society",
      "tier": 3,
      "category": "maritime-society",
      "exclusiveGroupId": "port-prestige-currents",
      "exclusiveGroupLabel": "Prestige Currents",
      "prerequisiteAnyPolicyIds": [
        "lighthouse-fund",
        "tavern-leagues"
      ],
      "unlock": {
        "charts": 12
      },
      "cost": {
        "coins": 3000,
        "charts": 20,
        "cargo": 42,
        "harbor_capacity": 18
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "charts"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "renown"
          ],
          "buildingIds": [
            "customs-tower",
            "regatta-quay"
          ],
          "multiplier": 1.12
        },
        {
          "areaId": "port-city",
          "type": "clickBonus",
          "currency": "charts",
          "amount": 0.16
        }
      ],
      "description": "A formal academy makes charts the port's key late-game planning resource.",
      "codex": {
        "family": "maritime-society",
        "tier": 3,
        "summary": "Charts-heavy branch for late harbor planning.",
        "lore": "The chart academy exists for the uncomfortable truth that experienced pilots eventually need to be written down.",
        "masteryTarget": 1,
        "sortKey": 280
      }
    },
    {
      "id": "regatta-commission",
      "areaId": "port-city",
      "treeId": "maritime-society",
      "tier": 3,
      "category": "maritime-society",
      "exclusiveGroupId": "port-prestige-currents",
      "exclusiveGroupLabel": "Prestige Currents",
      "prerequisiteAnyPolicyIds": [
        "lighthouse-fund",
        "tavern-leagues"
      ],
      "unlock": {
        "renown": 8
      },
      "cost": {
        "coins": 3200,
        "renown": 14,
        "cargo": 44,
        "harbor_capacity": 16
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "renown"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "regatta-quay",
            "grand-terminal"
          ],
          "multiplier": 1.12
        },
        {
          "areaId": "port-city",
          "type": "clickBonus",
          "currency": "renown",
          "amount": 0.08
        }
      ],
      "description": "Formalize maritime spectacle and the port turns public prestige into late tariffs and civic scale.",
      "codex": {
        "family": "maritime-society",
        "tier": 3,
        "summary": "Renown-heavy branch for late harbor prestige.",
        "lore": "A regatta commission is what happens when a harbor realizes that pageantry can be budgeted and then taxed.",
        "masteryTarget": 1,
        "sortKey": 290
      }
    },
    {
      "id": "harbor-senate",
      "areaId": "port-city",
      "treeId": "maritime-society",
      "tier": 4,
      "category": "maritime-society",
      "prerequisiteAnyPolicyIds": [
        "chart-academy",
        "regatta-commission"
      ],
      "unlock": {
        "renown": 16,
        "charts": 24,
        "harbor_capacity": 28
      },
      "cost": {
        "coins": 7600,
        "cargo": 360,
        "harbor_capacity": 160,
        "charts": 120,
        "renown": 100
      },
      "effects": [
        {
          "areaId": "port-city",
          "type": "incomeMultiplier",
          "currencies": [
            "coins",
            "renown",
            "charts"
          ],
          "targets": "all",
          "multiplier": 1.15
        }
      ],
      "description": "A harbor senate consolidates the port's civic power into a stronger late-game economy.",
      "codex": {
        "family": "maritime-society",
        "tier": 4,
        "summary": "Social-maritime capstone for the port.",
        "lore": "The harbor senate is the moment the port stops acting like an extension of the market and starts acting like a city in its own right.",
        "masteryTarget": 1,
        "sortKey": 300
      }
    }
  ],
  "systems": {
    "annexation": {
      "id": "annexation",
      "name": "Annexation",
      "unlockPolicyId": "city-charter",
      "prestigeCurrencyId": "districts",
      "resetRule": "Reset buildings, policies, and all non-prestige resources. Keep earned districts by area and unlocked areas."
    },
    "shortages": {
      "food": {
        "threshold": 0,
        "outputMultiplier": 0.4,
        "label": "Food shortage"
      },
      "goods": {
        "threshold": 0,
        "outputMultiplier": 0.35,
        "label": "Goods shortage"
      },
      "power": {
        "threshold": 0,
        "outputMultiplier": 0,
        "label": "Power outage",
        "mode": "supplyGate",
        "maintainConsumption": true
      },
      "catch": {
        "threshold": 0,
        "outputMultiplier": 0.5,
        "label": "Catch shortage"
      },
      "cargo": {
        "threshold": 0,
        "outputMultiplier": 0.35,
        "label": "Cargo backlog"
      },
      "harbor_capacity": {
        "threshold": 0.999,
        "outputMultiplier": 0,
        "label": "Berth shortage",
        "mode": "bufferedShutdown",
        "recoveryThreshold": 3
      }
    }
  },
  "indexes": {
    "areaIds": [
      "patchwork-borough",
      "port-city"
    ],
    "allCurrencyIds": [
      "coins",
      "districts",
      "residents",
      "food",
      "timber",
      "stone",
      "goods",
      "power",
      "knowledge",
      "appeal",
      "influence",
      "crew",
      "catch",
      "lumber",
      "masonry",
      "cargo",
      "harbor_capacity",
      "charts",
      "renown"
    ],
    "currencyIndex": {
      "coins": {
        "id": "coins",
        "name": "Coins",
        "kind": "shared",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/coins.png",
        "description": "Shared money that moves between every unlocked area.",
        "scope": "shared",
        "areaId": null
      },
      "districts": {
        "id": "districts",
        "name": "Districts",
        "kind": "prestige",
        "iconPath": "./public/art/icon-kits/patchwork-borough/prestige/districts.png",
        "description": "Total annexed districts across all areas.",
        "scope": "shared",
        "areaId": null
      },
      "residents": {
        "id": "residents",
        "name": "Residents",
        "kind": "population",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/residents.png",
        "description": "Population capacity that unlocks more ambitious borough projects.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "food": {
        "id": "food",
        "name": "Food",
        "kind": "supply",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/food.png",
        "description": "Daily provisions consumed by homes, estates, and civic districts.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "timber": {
        "id": "timber",
        "name": "Timber",
        "kind": "supply",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/timber.png",
        "description": "Framing, lumber, and raw wood for housing and civic works.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "stone": {
        "id": "stone",
        "name": "Stone",
        "kind": "supply",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/stone.png",
        "description": "Masonry for terraces, civic halls, and late industrial works.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "goods": {
        "id": "goods",
        "name": "Goods",
        "kind": "trade",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/goods.png",
        "description": "Crafted wares that support trade, public services, and prestige districts.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "power": {
        "id": "power",
        "name": "Power",
        "kind": "utility",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/power.png",
        "description": "Mechanical and electrical capacity for advanced borough infrastructure.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "knowledge": {
        "id": "knowledge",
        "name": "Knowledge",
        "kind": "research",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/knowledge.png",
        "description": "Surveying, schooling, and technical skill.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "appeal": {
        "id": "appeal",
        "name": "Appeal",
        "kind": "prestige",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/appeal.png",
        "description": "Cultural draw created by landmarks, estates, and civic scenery.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "influence": {
        "id": "influence",
        "name": "Influence",
        "kind": "prestige",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/influence.png",
        "description": "Political leverage created by civic institutions and prestige districts.",
        "scope": "local",
        "areaId": "patchwork-borough"
      },
      "crew": {
        "id": "crew",
        "name": "Crew",
        "kind": "population",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/residents.png",
        "description": "Dockhands, fishers, and sailors who staff the harbor.",
        "scope": "local",
        "areaId": "port-city"
      },
      "catch": {
        "id": "catch",
        "name": "Catch",
        "kind": "supply",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/food.png",
        "description": "Fresh fish and sea harvests that feed the harbor economy.",
        "scope": "local",
        "areaId": "port-city"
      },
      "lumber": {
        "id": "lumber",
        "name": "Lumber",
        "kind": "supply",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/timber.png",
        "description": "Pier timber, masts, and cut dock lumber.",
        "scope": "local",
        "areaId": "port-city"
      },
      "masonry": {
        "id": "masonry",
        "name": "Masonry",
        "kind": "supply",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/stone.png",
        "description": "Stonework for breakwaters, towers, and bonded yards.",
        "scope": "local",
        "areaId": "port-city"
      },
      "cargo": {
        "id": "cargo",
        "name": "Cargo",
        "kind": "trade",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/goods.png",
        "description": "Packed trade volume moving through the port.",
        "scope": "local",
        "areaId": "port-city"
      },
      "harbor_capacity": {
        "id": "harbor_capacity",
        "name": "Berths",
        "kind": "utility",
        "displayMode": "integer",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/power.png",
        "description": "Available berths for advanced harbor construction and late port operations.",
        "scope": "local",
        "areaId": "port-city"
      },
      "charts": {
        "id": "charts",
        "name": "Charts",
        "kind": "research",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/knowledge.png",
        "description": "Route maps, pilot records, and navigational knowledge.",
        "scope": "local",
        "areaId": "port-city"
      },
      "renown": {
        "id": "renown",
        "name": "Renown",
        "kind": "prestige",
        "iconPath": "./public/art/icon-kits/patchwork-borough/resources/appeal.png",
        "description": "Maritime prestige earned through civic spectacle and port reputation.",
        "scope": "local",
        "areaId": "port-city"
      }
    },
    "buildingsByArea": {
      "patchwork-borough": [
        "suburban-duplex",
        "red-cottage",
        "timber-cabin",
        "farmstead",
        "lane-bungalow",
        "quarry-yard",
        "cube-villa",
        "freight-depot",
        "grand-manor",
        "greenhouse-terrace",
        "brick-factory",
        "borough-exchange",
        "hillside-lodge",
        "public-archive",
        "dome-habitat",
        "summit-powerhouse",
        "stone-keep",
        "palm-bungalow",
        "glass-condo",
        "skyline-galleria"
      ],
      "port-city": [
        "fisher-huts",
        "driftwood-yard",
        "salt-smokehouse",
        "timber-pier",
        "barge-masons",
        "chandlery-market",
        "dredger-works",
        "chart-house",
        "bonded-warehouse",
        "customs-tower",
        "regatta-quay",
        "grand-terminal"
      ]
    },
    "policiesByArea": {
      "patchwork-borough": [
        "census-registry",
        "public-schools",
        "festival-office",
        "neighborhood-councils",
        "monument-committee",
        "city-charter",
        "masons-guild",
        "granary-cooperative",
        "quarry-standards",
        "workshop-standards",
        "power-authority",
        "borough-works-board",
        "stone-roads",
        "merchants-union",
        "market-fairs",
        "guild-brokers",
        "skyline-office",
        "harbor-charter"
      ],
      "port-city": [
        "dock-ledgers",
        "fish-auctions",
        "longshift-piers",
        "bonded-logistics",
        "signal-towers",
        "freeport-authority",
        "sailors-guild",
        "lighthouse-fund",
        "tavern-leagues",
        "chart-academy",
        "regatta-commission",
        "harbor-senate"
      ]
    }
  },
  "startingSharedCurrencies": {
    "coins": 0,
    "districts": 0
  }
};

export default GAME_CONTENT;
