export const GAME_CONTENT = {
  "meta": {
    "appId": "city-clicker",
    "id": "patchwork-borough-v1",
    "areaId": "patchwork-borough",
    "eyebrow": "HTML5 City Clicker",
    "name": "Patchwork Borough",
    "theme": "A mixed-neighborhood city builder clicker built around interlocking supplies, prestige districts, and specialized borough roles.",
    "goalText": "Grow a small borough into a city worth remembering.",
    "artReference": {
      "file": "public/art/curated-houses/",
      "note": "District art now mixes the original `houses.jpg` sprites with curated standalone renders selected from the expanded house reference sheets."
    }
  },
  "areas": [
    {
      "id": "patchwork-borough",
      "runtimeId": "patchwork-borough-v1",
      "name": "Patchwork Borough",
      "theme": "A mixed-neighborhood city builder clicker built around interlocking supplies, prestige districts, and specialized borough roles.",
      "goalText": "Grow a small borough into a city worth remembering.",
      "artReference": {
        "file": "public/art/curated-houses/",
        "note": "District art now mixes the original `houses.jpg` sprites with curated standalone renders selected from the expanded house reference sheets."
      },
      "startingState": {
        "coins": 0,
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
          "name": "Collect Taxes",
          "currency": "coins",
          "baseAmount": 1.25,
          "applyGlobalMultiplier": true,
          "residentScaling": {
            "perResidents": 20,
            "amount": 1
          }
        },
        {
          "id": "gather-harvest",
          "name": "Gather Harvest",
          "currency": "food",
          "unlockUpgradeId": "builders-guild",
          "baseAmount": 1.45,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "farmstead",
              "amountPerOwned": 0.32
            },
            {
              "buildingId": "palm-bungalow",
              "amountPerOwned": 0.1
            }
          ]
        },
        {
          "id": "fell-timber",
          "name": "Fell Timber",
          "currency": "timber",
          "unlockUpgradeId": "supply-depot",
          "baseAmount": 1,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "timber-cabin",
              "amountPerOwned": 0.24
            },
            {
              "buildingId": "farmstead",
              "amountPerOwned": 0.05
            }
          ]
        },
        {
          "id": "quarry-stone",
          "name": "Quarry Stone",
          "currency": "stone",
          "unlockUpgradeId": "supply-depot",
          "baseAmount": 0.75,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "timber-cabin",
              "amountPerOwned": 0.16
            },
            {
              "buildingId": "brick-factory",
              "amountPerOwned": 0.1
            }
          ]
        },
        {
          "id": "pack-goods",
          "name": "Pack Goods",
          "currency": "goods",
          "unlockUpgradeId": "plumbing-grid",
          "baseAmount": 0.75,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "red-cottage",
              "amountPerOwned": 0.09
            },
            {
              "buildingId": "brick-factory",
              "amountPerOwned": 0.14
            }
          ]
        },
        {
          "id": "stage-festival",
          "name": "Stage Festival",
          "currency": "appeal",
          "unlockUpgradeId": "tourism-board",
          "baseAmount": 0.22,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "grand-manor",
              "amountPerOwned": 0.04
            },
            {
              "buildingId": "hillside-lodge",
              "amountPerOwned": 0.04
            },
            {
              "buildingId": "stone-keep",
              "amountPerOwned": 0.03
            },
            {
              "buildingId": "palm-bungalow",
              "amountPerOwned": 0.05
            }
          ]
        },
        {
          "id": "survey-archives",
          "name": "Survey Archives",
          "currency": "knowledge",
          "unlockUpgradeId": "heritage-program",
          "baseAmount": 0.38,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "cube-villa",
              "amountPerOwned": 0.08
            },
            {
              "buildingId": "dome-habitat",
              "amountPerOwned": 0.06
            },
            {
              "buildingId": "glass-condo",
              "amountPerOwned": 0.05
            }
          ]
        },
        {
          "id": "route-current",
          "name": "Route Current",
          "currency": "power",
          "unlockUpgradeId": "industrial-logistics",
          "baseAmount": 0.5,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "brick-factory",
              "amountPerOwned": 0.08
            },
            {
              "buildingId": "dome-habitat",
              "amountPerOwned": 0.12
            },
            {
              "buildingId": "glass-condo",
              "amountPerOwned": 0.04
            }
          ]
        },
        {
          "id": "broker-favors",
          "name": "Broker Favors",
          "currency": "influence",
          "unlockUpgradeId": "skyline-campaign",
          "baseAmount": 0.16,
          "applyGlobalMultiplier": true,
          "buildingScaling": [
            {
              "buildingId": "grand-manor",
              "amountPerOwned": 0.03
            },
            {
              "buildingId": "hillside-lodge",
              "amountPerOwned": 0.03
            },
            {
              "buildingId": "stone-keep",
              "amountPerOwned": 0.05
            },
            {
              "buildingId": "glass-condo",
              "amountPerOwned": 0.03
            }
          ]
        }
      ],
      "formulas": {
        "buildingCostGrowth": 1.18,
        "buildingCostFormula": "floor(baseCost[currency] * pow(buildingCostGrowth, owned))",
        "manualActionFormula": "baseAmount + resident scaling + owned-building scaling, then optional global income multipliers and click bonuses",
        "tickRateMs": 100,
        "autosaveMs": 10000,
        "offlineProgressCapSeconds": 14400
      },
      "pacing": {
        "firstMinuteGoal": "Establish housing, quarry supplies, and a food source before upkeep catches up.",
        "midgameShift": "The economy branches into stone, goods, power, and knowledge, forcing real specialization decisions.",
        "lateGameIdentity": "Influence, appeal, and infrastructure turn the borough from a tax base into a civic machine."
      }
    }
  ],
  "activeAreaId": "patchwork-borough",
  "indexes": {
    "areaIds": [
      "patchwork-borough"
    ],
    "buildingIds": [
      "suburban-duplex",
      "red-cottage",
      "timber-cabin",
      "farmstead",
      "cube-villa",
      "grand-manor",
      "hillside-lodge",
      "brick-factory",
      "dome-habitat",
      "stone-keep",
      "palm-bungalow",
      "glass-condo"
    ],
    "upgradeIds": [
      "permit-desk",
      "stone-roads",
      "census-office",
      "builders-guild",
      "supply-depot",
      "plumbing-grid",
      "heritage-program",
      "tourism-board",
      "industrial-logistics",
      "zoning-reform",
      "skyline-campaign",
      "city-charter"
    ],
    "manualActionIds": [
      "collect-taxes",
      "gather-harvest",
      "fell-timber",
      "quarry-stone",
      "pack-goods",
      "stage-festival",
      "survey-archives",
      "route-current",
      "broker-favors"
    ],
    "resourceIds": [
      "coins",
      "residents",
      "food",
      "timber",
      "stone",
      "goods",
      "power",
      "knowledge",
      "appeal",
      "influence"
    ],
    "buildingsByArea": {
      "patchwork-borough": [
        "suburban-duplex",
        "red-cottage",
        "timber-cabin",
        "farmstead",
        "cube-villa",
        "grand-manor",
        "hillside-lodge",
        "brick-factory",
        "dome-habitat",
        "stone-keep",
        "palm-bungalow",
        "glass-condo"
      ]
    }
  },
  "currencies": {
    "coins": {
      "name": "Coins",
      "kind": "primary",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/coins.png",
      "description": "Tax revenue and liquid cash used for almost every project."
    },
    "residents": {
      "name": "Residents",
      "kind": "gate",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/residents.png",
      "description": "Population capacity. Residents unlock districts but are never spent."
    },
    "food": {
      "name": "Food",
      "kind": "supply",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/food.png",
      "description": "Harvests and pantry stock that keep homes, visitors, and advanced habitats running."
    },
    "timber": {
      "name": "Timber",
      "kind": "supply",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/timber.png",
      "description": "Lumber for framing, mills, terraces, and midgame housing."
    },
    "stone": {
      "name": "Stone",
      "kind": "supply",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/stone.png",
      "description": "Quarried masonry needed for civic, industrial, and landmark construction."
    },
    "goods": {
      "name": "Goods",
      "kind": "trade",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/goods.png",
      "description": "Crafted wares and freight used by policy offices, tourism, and higher-tier builds."
    },
    "power": {
      "name": "Power",
      "kind": "utility",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/power.png",
      "description": "Electrical and mechanical capacity for modern and engineered districts."
    },
    "knowledge": {
      "name": "Knowledge",
      "kind": "research",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/knowledge.png",
      "description": "Surveying, schooling, and technical expertise that unlocks advanced designs."
    },
    "appeal": {
      "name": "Appeal",
      "kind": "civic",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/appeal.png",
      "description": "Cultural pull generated by landmarks, resorts, and scenic districts."
    },
    "influence": {
      "name": "Influence",
      "kind": "civic",
      "iconPath": "./public/art/icon-kits/patchwork-borough/resources/influence.png",
      "description": "Political and social leverage produced by the borough's most visible districts."
    }
  },
  "startingState": {
    "coins": 0,
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
      "name": "Collect Taxes",
      "currency": "coins",
      "baseAmount": 1.25,
      "applyGlobalMultiplier": true,
      "residentScaling": {
        "perResidents": 20,
        "amount": 1
      }
    },
    {
      "id": "gather-harvest",
      "name": "Gather Harvest",
      "currency": "food",
      "unlockUpgradeId": "builders-guild",
      "baseAmount": 1.45,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "farmstead",
          "amountPerOwned": 0.32
        },
        {
          "buildingId": "palm-bungalow",
          "amountPerOwned": 0.1
        }
      ]
    },
    {
      "id": "fell-timber",
      "name": "Fell Timber",
      "currency": "timber",
      "unlockUpgradeId": "supply-depot",
      "baseAmount": 1,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "timber-cabin",
          "amountPerOwned": 0.24
        },
        {
          "buildingId": "farmstead",
          "amountPerOwned": 0.05
        }
      ]
    },
    {
      "id": "quarry-stone",
      "name": "Quarry Stone",
      "currency": "stone",
      "unlockUpgradeId": "supply-depot",
      "baseAmount": 0.75,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "timber-cabin",
          "amountPerOwned": 0.16
        },
        {
          "buildingId": "brick-factory",
          "amountPerOwned": 0.1
        }
      ]
    },
    {
      "id": "pack-goods",
      "name": "Pack Goods",
      "currency": "goods",
      "unlockUpgradeId": "plumbing-grid",
      "baseAmount": 0.75,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "red-cottage",
          "amountPerOwned": 0.09
        },
        {
          "buildingId": "brick-factory",
          "amountPerOwned": 0.14
        }
      ]
    },
    {
      "id": "stage-festival",
      "name": "Stage Festival",
      "currency": "appeal",
      "unlockUpgradeId": "tourism-board",
      "baseAmount": 0.22,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "grand-manor",
          "amountPerOwned": 0.04
        },
        {
          "buildingId": "hillside-lodge",
          "amountPerOwned": 0.04
        },
        {
          "buildingId": "stone-keep",
          "amountPerOwned": 0.03
        },
        {
          "buildingId": "palm-bungalow",
          "amountPerOwned": 0.05
        }
      ]
    },
    {
      "id": "survey-archives",
      "name": "Survey Archives",
      "currency": "knowledge",
      "unlockUpgradeId": "heritage-program",
      "baseAmount": 0.38,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "cube-villa",
          "amountPerOwned": 0.08
        },
        {
          "buildingId": "dome-habitat",
          "amountPerOwned": 0.06
        },
        {
          "buildingId": "glass-condo",
          "amountPerOwned": 0.05
        }
      ]
    },
    {
      "id": "route-current",
      "name": "Route Current",
      "currency": "power",
      "unlockUpgradeId": "industrial-logistics",
      "baseAmount": 0.5,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "brick-factory",
          "amountPerOwned": 0.08
        },
        {
          "buildingId": "dome-habitat",
          "amountPerOwned": 0.12
        },
        {
          "buildingId": "glass-condo",
          "amountPerOwned": 0.04
        }
      ]
    },
    {
      "id": "broker-favors",
      "name": "Broker Favors",
      "currency": "influence",
      "unlockUpgradeId": "skyline-campaign",
      "baseAmount": 0.16,
      "applyGlobalMultiplier": true,
      "buildingScaling": [
        {
          "buildingId": "grand-manor",
          "amountPerOwned": 0.03
        },
        {
          "buildingId": "hillside-lodge",
          "amountPerOwned": 0.03
        },
        {
          "buildingId": "stone-keep",
          "amountPerOwned": 0.05
        },
        {
          "buildingId": "glass-condo",
          "amountPerOwned": 0.03
        }
      ]
    }
  ],
  "formulas": {
    "buildingCostGrowth": 1.18,
    "buildingCostFormula": "floor(baseCost[currency] * pow(buildingCostGrowth, owned))",
    "manualActionFormula": "baseAmount + resident scaling + owned-building scaling, then optional global income multipliers and click bonuses",
    "tickRateMs": 100,
    "autosaveMs": 10000,
    "offlineProgressCapSeconds": 14400
  },
  "pacing": {
    "firstMinuteGoal": "Establish housing, quarry supplies, and a food source before upkeep catches up.",
    "midgameShift": "The economy branches into stone, goods, power, and knowledge, forcing real specialization decisions.",
    "lateGameIdentity": "Influence, appeal, and infrastructure turn the borough from a tax base into a civic machine."
  },
  "buildings": [
    {
      "id": "suburban-duplex",
      "name": "Clockhouse Duplex",
      "spriteRef": "houses-top-1",
      "artPath": "./public/art/house-kits/patchwork-borough/current/clockhouse-duplex.png",
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 15
      },
      "outputPerSecond": {
        "coins": 0.14
      },
      "maintenancePerSecond": {
        "coins": 0.02
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
      "description": "The clockhouse duplex is the borough's first dependable address: modest tax revenue, a few new residents, and just enough daily upkeep to make food matter immediately.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "red-cottage",
      "name": "Red Cottage",
      "spriteRef": "houses-top-4",
      "artPath": "./public/art/house-kits/patchwork-borough/current/red-cottage.png",
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 50
      },
      "outputPerSecond": {
        "coins": 0.38,
        "goods": 0.1
      },
      "maintenancePerSecond": {
        "coins": 0.06
      },
      "statsPerOwned": {
        "residents": 3
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
      "description": "The red cottage is where domestic life becomes commerce. It still raises population, but porch stalls and side trades make it your first reliable source of goods.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "timber-cabin",
      "name": "Hearth Grotto",
      "spriteRef": "houses-top-2",
      "artPath": "./public/art/house-kits/patchwork-borough/current/hearth-grotto.png",
      "category": "rural",
      "unlock": {},
      "baseCost": {
        "coins": 120
      },
      "outputPerSecond": {
        "timber": 0.2,
        "stone": 0.14
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
          "bonus": 0.12,
          "cap": 0.6
        }
      ],
      "description": "The hearth grotto is not comfortable, but it is productive. It anchors the borough's first real supply chain by cutting timber and hauling stone out of the hillside.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "farmstead",
      "name": "Windmill Homestead",
      "spriteRef": "houses-bottom-2",
      "artPath": "./public/art/house-kits/patchwork-borough/current/windmill-homestead.png",
      "category": "rural",
      "unlock": {
        "residents": 18
      },
      "baseCost": {
        "coins": 260,
        "timber": 8
      },
      "outputPerSecond": {
        "food": 0.68,
        "timber": 0.06
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
      "description": "The windmill homestead keeps the borough from starving itself. It does not mint coins directly, but almost every later district depends on the food it grinds out.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "cube-villa",
      "name": "Observatory Villa",
      "spriteRef": "houses-top-3",
      "artPath": "./public/art/house-kits/patchwork-borough/current/observatory-villa.png",
      "category": "modern",
      "unlock": {
        "residents": 42,
        "timber": 28,
        "stone": 22,
        "goods": 6
      },
      "baseCost": {
        "coins": 750,
        "timber": 30,
        "stone": 24,
        "goods": 8
      },
      "outputPerSecond": {
        "coins": 1.05,
        "knowledge": 0.16
      },
      "maintenancePerSecond": {
        "food": 0.05,
        "goods": 0.04
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Field notes",
          "targetType": "output",
          "target": "knowledge",
          "sourceBuildingIds": [
            "timber-cabin"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The observatory villa is the borough's first knowledge district. It still pays taxes, but its real value is converting ordinary housing and local goods into technical capability.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "grand-manor",
      "name": "Pagoda Estate",
      "spriteRef": "houses-top-5",
      "artPath": "./public/art/house-kits/patchwork-borough/current/pagoda-estate.png",
      "category": "prestige",
      "unlock": {
        "residents": 70,
        "goods": 12,
        "timber": 40
      },
      "baseCost": {
        "coins": 1200,
        "timber": 56,
        "goods": 20
      },
      "outputPerSecond": {
        "appeal": 0.22,
        "influence": 0.09
      },
      "maintenancePerSecond": {
        "food": 0.1,
        "coins": 0.08
      },
      "statsPerOwned": {
        "residents": 1
      },
      "synergies": [
        {
          "label": "Ceremonial circuit",
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
      "description": "The pagoda estate does not solve shortages; it solves reputation. It is where the borough starts producing civic gravity instead of just rent.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "hillside-lodge",
      "name": "Lighthouse Lodge",
      "spriteRef": "houses-top-6",
      "artPath": "./public/art/house-kits/patchwork-borough/current/lighthouse-lodge.png",
      "category": "tourism",
      "unlock": {
        "residents": 105,
        "appeal": 4,
        "goods": 22,
        "stone": 34
      },
      "baseCost": {
        "coins": 2200,
        "stone": 75,
        "goods": 30
      },
      "outputPerSecond": {
        "coins": 2,
        "appeal": 0.16,
        "influence": 0.08
      },
      "maintenancePerSecond": {
        "food": 0.1,
        "goods": 0.06
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
      "description": "The lighthouse lodge monetizes scenery. It is one of the first districts where coins, appeal, and influence all move together, but it needs a steady stream of stocked goods to serve visitors properly.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "brick-factory",
      "name": "Brick Factory",
      "spriteRef": "houses-bottom-4",
      "artPath": "./public/art/house-kits/patchwork-borough/current/brick-factory.png",
      "category": "industrial",
      "unlock": {
        "residents": 145,
        "stone": 70,
        "timber": 50,
        "goods": 20
      },
      "baseCost": {
        "coins": 3200,
        "stone": 120,
        "timber": 70,
        "goods": 30
      },
      "outputPerSecond": {
        "goods": 0.8,
        "stone": 0.62,
        "power": 0.34
      },
      "maintenancePerSecond": {
        "coins": 0.28,
        "food": 0.04
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Quarry freight",
          "targetType": "output",
          "target": "stone",
          "sourceBuildingIds": [
            "timber-cabin"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.48
        }
      ],
      "description": "The brick factory is the borough's industrial hinge. It produces no population and little glamour, but it unlocks power and durable midgame throughput.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "dome-habitat",
      "name": "Ice Dome Habitat",
      "spriteRef": "houses-bottom-1",
      "artPath": "./public/art/house-kits/patchwork-borough/current/ice-dome-habitat.png",
      "category": "future",
      "unlock": {
        "residents": 210,
        "power": 12,
        "knowledge": 10,
        "appeal": 6,
        "goods": 16
      },
      "baseCost": {
        "coins": 5000,
        "stone": 220,
        "power": 36,
        "knowledge": 26,
        "goods": 24
      },
      "outputPerSecond": {
        "power": 0.72,
        "knowledge": 0.3
      },
      "maintenancePerSecond": {
        "food": 0.12,
        "coins": 0.35
      },
      "statsPerOwned": {
        "residents": 6
      },
      "synergies": [
        {
          "label": "Research grid",
          "targetType": "output",
          "target": "knowledge",
          "sourceBuildingIds": [
            "cube-villa",
            "glass-condo"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The ice dome habitat is engineered living. It adds residents, but more importantly it pushes the borough into a power-and-knowledge economy.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "stone-keep",
      "name": "Gothic Keep",
      "spriteRef": "houses-bottom-3",
      "artPath": "./public/art/house-kits/patchwork-borough/current/gothic-keep.png",
      "category": "heritage",
      "unlock": {
        "residents": 320,
        "stone": 220,
        "influence": 16,
        "appeal": 16
      },
      "baseCost": {
        "coins": 7000,
        "stone": 360,
        "influence": 28,
        "appeal": 30
      },
      "outputPerSecond": {
        "appeal": 0.38,
        "influence": 0.22
      },
      "maintenancePerSecond": {
        "coins": 0.35
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Ancestral prestige",
          "targetType": "output",
          "target": "influence",
          "sourceBuildingIds": [
            "grand-manor"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.5
        }
      ],
      "description": "The gothic keep is a prestige anchor. It does not carry the population count; it carries the borough's authority.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "palm-bungalow",
      "name": "Treehouse Retreat",
      "spriteRef": "houses-bottom-5",
      "artPath": "./public/art/house-kits/patchwork-borough/current/treehouse-retreat.png",
      "category": "tourism",
      "unlock": {
        "residents": 450,
        "food": 36,
        "appeal": 24,
        "timber": 160,
        "goods": 24
      },
      "baseCost": {
        "coins": 9000,
        "timber": 240,
        "food": 50,
        "appeal": 36,
        "goods": 30
      },
      "outputPerSecond": {
        "appeal": 0.31,
        "food": 0.3,
        "coins": 1.1,
        "influence": 0.06
      },
      "maintenancePerSecond": {
        "goods": 0.06
      },
      "statsPerOwned": {},
      "synergies": [
        {
          "label": "Holiday circuit",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "hillside-lodge"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The treehouse retreat turns comfort into destination spending. It feeds itself better than most tourism districts, but still leans on the rest of the borough for goods.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "glass-condo",
      "name": "Glass Highrise",
      "spriteRef": "houses-bottom-6",
      "artPath": "./public/art/house-kits/patchwork-borough/current/glass-highrise.png",
      "category": "modern",
      "unlock": {
        "residents": 620,
        "power": 42,
        "knowledge": 28,
        "influence": 30,
        "goods": 28
      },
      "baseCost": {
        "coins": 14000,
        "stone": 650,
        "power": 120,
        "knowledge": 80,
        "influence": 110,
        "goods": 40
      },
      "outputPerSecond": {
        "coins": 4.6,
        "knowledge": 0.24,
        "influence": 0.16
      },
      "maintenancePerSecond": {
        "food": 0.16,
        "power": 0.22,
        "goods": 0.08
      },
      "statsPerOwned": {
        "residents": 10
      },
      "synergies": [
        {
          "label": "Vertical core",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "cube-villa"
          ],
          "perOwned": 1,
          "bonus": 0.05,
          "cap": 0.35
        }
      ],
      "description": "The glass highrise is the final proof that the borough has become a city. It brings back tax revenue, but only because the rest of the economy can keep it powered and fed.",
      "areaId": "patchwork-borough"
    }
  ],
  "globalUpgrades": [
    {
      "id": "permit-desk",
      "name": "Permit Desk",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/permit-desk.png",
      "unlock": {},
      "cost": {
        "coins": 100
      },
      "effects": [
        {
          "type": "clickBonus",
          "currency": "coins",
          "amount": 1.25
        }
      ],
      "description": "A fast stamp line makes every manual tax round feel more official and more profitable."
    },
    {
      "id": "stone-roads",
      "name": "Stone Roads",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/stone-roads.png",
      "unlock": {
        "coins": 150
      },
      "cost": {
        "coins": 300
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "coins",
            "goods"
          ],
          "targets": "all",
          "multiplier": 1.15
        }
      ],
      "description": "Paved streets speed up trade, make tax routes predictable, and let local commerce scale."
    },
    {
      "id": "census-office",
      "name": "Census Office",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/census-office.png",
      "unlock": {
        "residents": 12
      },
      "cost": {
        "coins": 700
      },
      "effects": [
        {
          "type": "statMultiplier",
          "stat": "residents",
          "buildingIds": [
            "suburban-duplex",
            "red-cottage",
            "farmstead"
          ],
          "multiplier": 1.15
        }
      ],
      "description": "Once the borough counts households properly, small homes start housing people far more efficiently."
    },
    {
      "id": "builders-guild",
      "name": "Granary Cooperative",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/builders-guild.png",
      "unlock": {
        "food": 4
      },
      "cost": {
        "coins": 900,
        "food": 14,
        "timber": 12
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "food"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "type": "maintenanceMultiplier",
          "currency": "food",
          "targets": "all",
          "multiplier": 0.82
        },
        {
          "type": "clickBonus",
          "currency": "food",
          "amount": 0.7
        }
      ],
      "description": "Shared granaries reduce waste, smooth out harvest swings, and open a manual harvest round when food is tight."
    },
    {
      "id": "supply-depot",
      "name": "Masons Guild",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/supply-depot.png",
      "unlock": {
        "stone": 10
      },
      "cost": {
        "coins": 1500,
        "timber": 30,
        "stone": 30
      },
      "effects": [
        {
          "type": "buildingCostMultiplier",
          "currency": "timber",
          "targets": "all",
          "multiplier": 0.88
        },
        {
          "type": "buildingCostMultiplier",
          "currency": "stone",
          "targets": "all",
          "multiplier": 0.88
        },
        {
          "type": "incomeMultiplier",
          "currencies": [
            "timber"
          ],
          "targets": "all",
          "multiplier": 1.25
        },
        {
          "type": "clickBonus",
          "currency": "timber",
          "amount": 0.55
        },
        {
          "type": "clickBonus",
          "currency": "stone",
          "amount": 0.45
        }
      ],
      "description": "Standard cuts and shared crews lower wasted material and unlock direct timber and stone hauling when construction stalls."
    },
    {
      "id": "plumbing-grid",
      "name": "Workshop Standards",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/plumbing-grid.png",
      "unlock": {
        "goods": 8
      },
      "cost": {
        "coins": 2600,
        "goods": 26,
        "timber": 40,
        "stone": 40
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "goods"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "type": "buildingOutputMultiplier",
          "buildingIds": [
            "red-cottage",
            "brick-factory"
          ],
          "multiplier": 1.15
        },
        {
          "type": "resourceToIncomeBonus",
          "sourceCurrency": "goods",
          "targetCurrency": "coins",
          "ratePerPoint": 0.01
        },
        {
          "type": "clickBonus",
          "currency": "goods",
          "amount": 0.45
        }
      ],
      "description": "With shared gauges, parts, and methods, the borough's workshops stop improvising, manual goods packing becomes viable, and stocked wares start feeding the tax base."
    },
    {
      "id": "heritage-program",
      "name": "Public Schools",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/heritage-program.png",
      "unlock": {
        "knowledge": 3
      },
      "cost": {
        "coins": 4200,
        "goods": 36,
        "knowledge": 20
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "knowledge"
          ],
          "targets": "all",
          "multiplier": 1.35
        },
        {
          "type": "statMultiplier",
          "stat": "residents",
          "buildingIds": [
            "cube-villa",
            "dome-habitat",
            "glass-condo"
          ],
          "multiplier": 1.1
        },
        {
          "type": "clickBonus",
          "currency": "knowledge",
          "amount": 0.35
        },
        {
          "type": "resourceToIncomeBonus",
          "sourceCurrency": "knowledge",
          "targetCurrency": "coins",
          "ratePerPoint": 0.02
        }
      ],
      "description": "Schools, libraries, and civic exams turn elegant districts into real engines of technical growth, while opening a manual survey round when knowledge runs short."
    },
    {
      "id": "tourism-board",
      "name": "Festival Calendar",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/tourism-board.png",
      "unlock": {
        "appeal": 3
      },
      "cost": {
        "coins": 5600,
        "goods": 40,
        "appeal": 12
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "appeal"
          ],
          "buildingIds": [
            "grand-manor",
            "hillside-lodge",
            "palm-bungalow",
            "stone-keep"
          ],
          "multiplier": 1.4
        },
        {
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "hillside-lodge",
            "palm-bungalow"
          ],
          "multiplier": 1.2
        },
        {
          "type": "clickBonus",
          "currency": "appeal",
          "amount": 0.22
        }
      ],
      "description": "Once celebrations are scheduled and marketed properly, scenic districts start paying back in both fame and cash, and festivals can be staged by hand when appeal is the blocker."
    },
    {
      "id": "industrial-logistics",
      "name": "Power Authority",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/industrial-logistics.png",
      "unlock": {
        "power": 5
      },
      "cost": {
        "coins": 9000,
        "stone": 120,
        "goods": 70,
        "power": 28,
        "knowledge": 18
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "power"
          ],
          "targets": "all",
          "multiplier": 1.45
        },
        {
          "type": "maintenanceMultiplier",
          "currency": "power",
          "buildingIds": [
            "brick-factory",
            "dome-habitat",
            "glass-condo"
          ],
          "multiplier": 0.75
        },
        {
          "type": "buildingOutputMultiplier",
          "buildingIds": [
            "brick-factory",
            "dome-habitat",
            "glass-condo"
          ],
          "multiplier": 1.15
        },
        {
          "type": "clickBonus",
          "currency": "power",
          "amount": 0.4
        }
      ],
      "description": "A real grid makes modern districts less fragile, lets industrial power flow like a planned utility, and opens direct power routing when the borough is short on charge."
    },
    {
      "id": "zoning-reform",
      "name": "Zoning Reform",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/zoning-reform.png",
      "unlock": {
        "residents": 240,
        "knowledge": 8,
        "influence": 8
      },
      "cost": {
        "coins": 14000,
        "stone": 240,
        "knowledge": 40,
        "influence": 26,
        "appeal": 16
      },
      "effects": [
        {
          "type": "uniqueBuildingIncomeBonus",
          "ratePerUniqueOwned": 0.05,
          "cap": 0.6
        }
      ],
      "description": "Mixed-use rules reward a balanced borough. The more distinct districts you actually operate, the stronger everything becomes."
    },
    {
      "id": "skyline-campaign",
      "name": "Civic Exchange",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/skyline-campaign.png",
      "unlock": {
        "influence": 4,
        "appeal": 4
      },
      "cost": {
        "coins": 18000,
        "goods": 75,
        "appeal": 18,
        "influence": 30
      },
      "effects": [
        {
          "type": "resourceToIncomeBonus",
          "sourceCurrency": "influence",
          "targetCurrency": "coins",
          "ratePerPoint": 0.03
        },
        {
          "type": "incomeMultiplier",
          "currencies": [
            "influence"
          ],
          "targets": "all",
          "multiplier": 1.3
        },
        {
          "type": "clickBonus",
          "currency": "influence",
          "amount": 0.24
        }
      ],
      "description": "When reputation becomes negotiable, influence stops being symbolic and starts driving the treasury directly, pushing late-game pressure toward civic resources instead of raw cash and opening direct favor-brokering."
    },
    {
      "id": "city-charter",
      "name": "City Charter",
      "iconPath": "./public/art/icon-kits/patchwork-borough/policies/city-charter.png",
      "unlock": {
        "residents": 520,
        "appeal": 24,
        "influence": 18,
        "knowledge": 14,
        "power": 12
      },
      "cost": {
        "coins": 26000,
        "stone": 850,
        "knowledge": 120,
        "influence": 120,
        "appeal": 120,
        "power": 80
      },
      "effects": [
        {
          "type": "unlockSystem",
          "systemId": "annexation"
        }
      ],
      "description": "The charter is the moment the borough writes down what it has become and claims the right to start again on stronger terms."
    }
  ],
  "systems": {
    "annexation": {
      "id": "annexation",
      "name": "Annexation",
      "unlockUpgradeId": "city-charter",
      "prestigeCurrency": {
        "id": "districts",
        "name": "Districts",
        "iconPath": "./public/art/icon-kits/patchwork-borough/prestige/districts.png"
      },
      "gainFormula": "max(0, floor(peakResidents / 200) + floor(peakAppeal / 15))",
      "resetRule": "Reset buildings, upgrades, and all non-prestige resources. Keep annexation access and earned districts.",
      "permanentBonuses": [
        {
          "type": "incomeMultiplierPerPrestige",
          "currency": "coins",
          "multiplierPerPoint": 0.04
        },
        {
          "type": "incomeMultiplierPerPrestige",
          "currency": "food",
          "multiplierPerPoint": 0.03
        },
        {
          "type": "incomeMultiplierPerPrestige",
          "currency": "knowledge",
          "multiplierPerPoint": 0.02
        }
      ]
    }
  }
};
export default GAME_CONTENT;
