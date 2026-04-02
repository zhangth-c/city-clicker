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
        "influence": 0,
        "clickActionName": "Collect Taxes",
        "baseCoinsPerClick": 1,
        "residentsPerClickBonus": 25,
        "coinsPerClickPerResidentBonus": 1
      },
      "formulas": {
        "buildingCostGrowth": 1.15,
        "buildingCostFormula": "floor(baseCost[currency] * pow(buildingCostGrowth, owned))",
        "coinsPerClickFormula": "baseCoinsPerClick + floor(residents / residentsPerClickBonus) * coinsPerClickPerResidentBonus",
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
      "iconPath": "./public/art/generated/icons/resources/coins.svg",
      "description": "Tax revenue and liquid cash used for almost every project."
    },
    "residents": {
      "name": "Residents",
      "kind": "gate",
      "iconPath": "./public/art/generated/icons/resources/residents.svg",
      "description": "Population capacity. Residents unlock districts but are never spent."
    },
    "food": {
      "name": "Food",
      "kind": "supply",
      "description": "Harvests and pantry stock that keep homes, visitors, and advanced habitats running."
    },
    "timber": {
      "name": "Timber",
      "kind": "supply",
      "description": "Lumber for framing, mills, terraces, and midgame housing."
    },
    "stone": {
      "name": "Stone",
      "kind": "supply",
      "description": "Quarried masonry needed for civic, industrial, and landmark construction."
    },
    "goods": {
      "name": "Goods",
      "kind": "trade",
      "description": "Crafted wares and freight used by policy offices, tourism, and higher-tier builds."
    },
    "power": {
      "name": "Power",
      "kind": "utility",
      "description": "Electrical and mechanical capacity for modern and engineered districts."
    },
    "knowledge": {
      "name": "Knowledge",
      "kind": "research",
      "description": "Surveying, schooling, and technical expertise that unlocks advanced designs."
    },
    "appeal": {
      "name": "Appeal",
      "kind": "civic",
      "iconPath": "./public/art/generated/icons/resources/appeal.svg",
      "description": "Cultural pull generated by landmarks, resorts, and scenic districts."
    },
    "influence": {
      "name": "Influence",
      "kind": "civic",
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
    "influence": 0,
    "clickActionName": "Collect Taxes",
    "baseCoinsPerClick": 1,
    "residentsPerClickBonus": 25,
    "coinsPerClickPerResidentBonus": 1
  },
  "formulas": {
    "buildingCostGrowth": 1.15,
    "buildingCostFormula": "floor(baseCost[currency] * pow(buildingCostGrowth, owned))",
    "coinsPerClickFormula": "baseCoinsPerClick + floor(residents / residentsPerClickBonus) * coinsPerClickPerResidentBonus",
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
      "artPath": "./public/art/curated-houses/clockhouse-duplex.png",
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 15
      },
      "outputPerSecond": {
        "coins": 0.12
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
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 55
      },
      "outputPerSecond": {
        "coins": 0.35,
        "goods": 0.08
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
      "artPath": "./public/art/curated-houses/hearth-grotto.png",
      "category": "rural",
      "unlock": {},
      "baseCost": {
        "coins": 140
      },
      "outputPerSecond": {
        "timber": 0.18,
        "stone": 0.12
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
      "artPath": "./public/art/curated-houses/windmill-homestead.png",
      "category": "rural",
      "unlock": {
        "residents": 14
      },
      "baseCost": {
        "coins": 320,
        "timber": 10
      },
      "outputPerSecond": {
        "food": 0.55,
        "timber": 0.08
      },
      "maintenancePerSecond": {
        "coins": 0.06
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
      "artPath": "./public/art/curated-houses/observatory-villa.png",
      "category": "modern",
      "unlock": {
        "residents": 32,
        "timber": 18,
        "stone": 14
      },
      "baseCost": {
        "coins": 900,
        "timber": 20,
        "stone": 18
      },
      "outputPerSecond": {
        "coins": 0.8,
        "knowledge": 0.12
      },
      "maintenancePerSecond": {
        "food": 0.04,
        "goods": 0.03
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
      "artPath": "./public/art/curated-houses/pagoda-estate.png",
      "category": "prestige",
      "unlock": {
        "residents": 52,
        "goods": 6,
        "timber": 24
      },
      "baseCost": {
        "coins": 2800,
        "timber": 26,
        "goods": 10
      },
      "outputPerSecond": {
        "appeal": 0.18,
        "influence": 0.08
      },
      "maintenancePerSecond": {
        "food": 0.08,
        "coins": 0.12
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
      "artPath": "./public/art/curated-houses/lighthouse-lodge.png",
      "category": "tourism",
      "unlock": {
        "residents": 80,
        "appeal": 2,
        "goods": 12
      },
      "baseCost": {
        "coins": 6500,
        "stone": 28,
        "goods": 16
      },
      "outputPerSecond": {
        "coins": 1.4,
        "appeal": 0.14,
        "influence": 0.05
      },
      "maintenancePerSecond": {
        "food": 0.06,
        "goods": 0.04
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
      "category": "industrial",
      "unlock": {
        "residents": 115,
        "stone": 30,
        "timber": 24
      },
      "baseCost": {
        "coins": 11000,
        "stone": 42,
        "timber": 28
      },
      "outputPerSecond": {
        "goods": 0.65,
        "stone": 0.45,
        "power": 0.3
      },
      "maintenancePerSecond": {
        "coins": 0.5
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
      "artPath": "./public/art/curated-houses/ice-dome-habitat.png",
      "category": "future",
      "unlock": {
        "residents": 150,
        "power": 5,
        "knowledge": 4,
        "appeal": 3
      },
      "baseCost": {
        "coins": 24000,
        "stone": 60,
        "power": 8,
        "knowledge": 5
      },
      "outputPerSecond": {
        "power": 0.55,
        "knowledge": 0.22
      },
      "maintenancePerSecond": {
        "food": 0.1,
        "coins": 0.65
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
      "artPath": "./public/art/curated-houses/gothic-keep.png",
      "category": "heritage",
      "unlock": {
        "residents": 220,
        "stone": 120,
        "influence": 6,
        "appeal": 8
      },
      "baseCost": {
        "coins": 50000,
        "stone": 140,
        "influence": 8,
        "appeal": 10
      },
      "outputPerSecond": {
        "appeal": 0.32,
        "influence": 0.18
      },
      "maintenancePerSecond": {
        "coins": 0.7
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
      "artPath": "./public/art/curated-houses/treehouse-retreat.png",
      "category": "tourism",
      "unlock": {
        "residents": 300,
        "food": 20,
        "appeal": 14,
        "timber": 70
      },
      "baseCost": {
        "coins": 90000,
        "timber": 90,
        "food": 24,
        "appeal": 18
      },
      "outputPerSecond": {
        "appeal": 0.26,
        "food": 0.22,
        "coins": 0.75
      },
      "maintenancePerSecond": {
        "goods": 0.05
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
      "artPath": "./public/art/curated-houses/glass-highrise.png",
      "category": "modern",
      "unlock": {
        "residents": 400,
        "power": 18,
        "knowledge": 10,
        "influence": 16
      },
      "baseCost": {
        "coins": 180000,
        "stone": 150,
        "power": 20,
        "knowledge": 12,
        "influence": 18
      },
      "outputPerSecond": {
        "coins": 3.4,
        "knowledge": 0.18,
        "influence": 0.12
      },
      "maintenancePerSecond": {
        "food": 0.12,
        "power": 0.15
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
      "iconPath": "./public/art/generated/icons/policies/permit-desk.svg",
      "unlock": {},
      "cost": {
        "coins": 100
      },
      "effects": [
        {
          "type": "clickBonus",
          "currency": "coins",
          "amount": 1
        }
      ],
      "description": "A fast stamp line makes every manual tax round feel more official and more profitable."
    },
    {
      "id": "stone-roads",
      "name": "Stone Roads",
      "iconPath": "./public/art/generated/icons/policies/stone-roads.svg",
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
      "iconPath": "./public/art/generated/icons/policies/census-office.svg",
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
      "iconPath": "./public/art/generated/icons/policies/builders-guild.svg",
      "unlock": {
        "food": 4
      },
      "cost": {
        "coins": 1400,
        "food": 10,
        "timber": 8
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
          "multiplier": 0.85
        }
      ],
      "description": "Shared granaries reduce waste, smooth out harvest swings, and make feeding the borough much easier."
    },
    {
      "id": "supply-depot",
      "name": "Masons Guild",
      "iconPath": "./public/art/generated/icons/policies/supply-depot.svg",
      "unlock": {
        "stone": 8
      },
      "cost": {
        "coins": 2600,
        "timber": 16,
        "stone": 18
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
        }
      ],
      "description": "Standard cuts and shared crews lower the amount of raw material wasted on each new build."
    },
    {
      "id": "plumbing-grid",
      "name": "Workshop Standards",
      "iconPath": "./public/art/generated/icons/policies/plumbing-grid.svg",
      "unlock": {
        "goods": 6
      },
      "cost": {
        "coins": 4800,
        "goods": 14,
        "timber": 20,
        "stone": 20
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
        }
      ],
      "description": "With shared gauges, parts, and methods, the borough's workshops stop improvising and start compounding."
    },
    {
      "id": "heritage-program",
      "name": "Public Schools",
      "iconPath": "./public/art/generated/icons/policies/heritage-program.svg",
      "unlock": {
        "knowledge": 3
      },
      "cost": {
        "coins": 9000,
        "goods": 24,
        "knowledge": 8
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "knowledge"
          ],
          "buildingIds": [
            "cube-villa",
            "dome-habitat",
            "glass-condo"
          ],
          "multiplier": 1.5
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
        }
      ],
      "description": "Schools, libraries, and civic exams turn elegant districts into real engines of technical growth."
    },
    {
      "id": "tourism-board",
      "name": "Festival Calendar",
      "iconPath": "./public/art/generated/icons/policies/tourism-board.svg",
      "unlock": {
        "appeal": 3
      },
      "cost": {
        "coins": 15000,
        "goods": 30,
        "appeal": 5
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
        }
      ],
      "description": "Once celebrations are scheduled and marketed properly, scenic districts start paying back in both fame and cash."
    },
    {
      "id": "industrial-logistics",
      "name": "Power Authority",
      "iconPath": "./public/art/generated/icons/policies/industrial-logistics.svg",
      "unlock": {
        "power": 5
      },
      "cost": {
        "coins": 28000,
        "stone": 40,
        "goods": 35,
        "power": 10
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
        }
      ],
      "description": "A real grid makes modern districts less fragile and lets industrial power flow like a planned utility instead of a lucky accident."
    },
    {
      "id": "zoning-reform",
      "name": "Zoning Reform",
      "iconPath": "./public/art/generated/icons/policies/zoning-reform.svg",
      "unlock": {
        "residents": 240,
        "knowledge": 8,
        "influence": 8
      },
      "cost": {
        "coins": 75000,
        "stone": 80,
        "knowledge": 12,
        "influence": 10
      },
      "effects": [
        {
          "type": "uniqueBuildingIncomeBonus",
          "ratePerUniqueOwned": 0.04,
          "cap": 0.48
        }
      ],
      "description": "Mixed-use rules reward a balanced borough. The more distinct districts you actually operate, the stronger everything becomes."
    },
    {
      "id": "skyline-campaign",
      "name": "Civic Exchange",
      "iconPath": "./public/art/generated/icons/policies/skyline-campaign.svg",
      "unlock": {
        "influence": 4,
        "appeal": 4
      },
      "cost": {
        "coins": 52000,
        "goods": 42,
        "appeal": 8,
        "influence": 8
      },
      "effects": [
        {
          "type": "resourceToIncomeBonus",
          "sourceCurrency": "influence",
          "targetCurrency": "coins",
          "ratePerPoint": 0.012
        },
        {
          "type": "incomeMultiplier",
          "currencies": [
            "influence"
          ],
          "targets": "all",
          "multiplier": 1.3
        }
      ],
      "description": "When reputation becomes negotiable, influence stops being symbolic and starts driving the treasury directly."
    },
    {
      "id": "city-charter",
      "name": "City Charter",
      "iconPath": "./public/art/generated/icons/policies/city-charter.svg",
      "unlock": {
        "residents": 520,
        "appeal": 24,
        "influence": 18,
        "knowledge": 14
      },
      "cost": {
        "coins": 200000,
        "stone": 180,
        "knowledge": 14,
        "influence": 20,
        "appeal": 24
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
        "iconPath": "./public/art/generated/icons/resources/districts.svg"
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
