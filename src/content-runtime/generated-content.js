export const GAME_CONTENT = {
  "meta": {
    "appId": "city-clicker",
    "id": "patchwork-borough-v1",
    "areaId": "patchwork-borough",
    "eyebrow": "HTML5 City Clicker",
    "name": "Patchwork Borough",
    "theme": "A mixed-neighborhood city builder clicker based on the house art set in houses.jpg.",
    "goalText": "Grow a small borough into a city worth remembering.",
    "artReference": {
      "file": "public/art/houses.jpg",
      "note": "Sprite order and building flavor map to the visible house, dome, factory, manor, cabin, and bungalow silhouettes."
    }
  },
  "areas": [
    {
      "id": "patchwork-borough",
      "runtimeId": "patchwork-borough-v1",
      "name": "Patchwork Borough",
      "theme": "A mixed-neighborhood city builder clicker based on the house art set in houses.jpg.",
      "goalText": "Grow a small borough into a city worth remembering.",
      "artReference": {
        "file": "public/art/houses.jpg",
        "note": "Sprite order and building flavor map to the visible house, dome, factory, manor, cabin, and bungalow silhouettes."
      },
      "startingState": {
        "coins": 0,
        "residents": 0,
        "materials": 0,
        "appeal": 0,
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
        "firstMinuteGoal": "Buy 3 starter homes and the first manual click upgrade.",
        "midgameShift": "Players transition from cottage taxes into materials and appeal management.",
        "lateGameIdentity": "Premium districts convert appeal into strong city-wide tax growth."
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
      "materials",
      "appeal"
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
      "description": "Main spend currency from clicks and passive taxes."
    },
    "residents": {
      "name": "Residents",
      "kind": "gate",
      "description": "Population used for unlock thresholds. Residents are not spent."
    },
    "materials": {
      "name": "Materials",
      "kind": "secondary",
      "description": "Construction goods generated mostly by rustic and industrial districts."
    },
    "appeal": {
      "name": "Appeal",
      "kind": "special",
      "description": "Slow prestige-like civic currency from tourism and premium districts."
    }
  },
  "startingState": {
    "coins": 0,
    "residents": 0,
    "materials": 0,
    "appeal": 0,
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
    "firstMinuteGoal": "Buy 3 starter homes and the first manual click upgrade.",
    "midgameShift": "Players transition from cottage taxes into materials and appeal management.",
    "lateGameIdentity": "Premium districts convert appeal into strong city-wide tax growth."
  },
  "buildings": [
    {
      "id": "suburban-duplex",
      "name": "Suburban Duplex",
      "spriteRef": "houses-top-1",
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 15
      },
      "outputPerSecond": {
        "coins": 0.2
      },
      "maintenancePerSecond": {
        "coins": 0.03
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Cottage lanes",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "red-cottage"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The duplex is where the borough begins: two doors, two porch lights, and the first hint that this road might become a neighborhood.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "red-cottage",
      "name": "Red Cottage",
      "spriteRef": "houses-top-4",
      "category": "residential",
      "unlock": {},
      "baseCost": {
        "coins": 60
      },
      "outputPerSecond": {
        "coins": 0.65
      },
      "maintenancePerSecond": {
        "coins": 0.07
      },
      "statsPerOwned": {
        "residents": 4
      },
      "synergies": [
        {
          "label": "Neighborly blocks",
          "targetType": "stat",
          "target": "residents",
          "sourceBuildingIds": [
            "suburban-duplex"
          ],
          "perOwned": 2,
          "bonus": 0.05,
          "cap": 0.25
        }
      ],
      "description": "These red cottages arrive when families decide the borough feels permanent. Their gardens and painted fences make the whole street look settled.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "timber-cabin",
      "name": "Timber Cabin",
      "spriteRef": "houses-top-2",
      "category": "rural",
      "unlock": {},
      "baseCost": {
        "coins": 150
      },
      "outputPerSecond": {
        "coins": 0.25,
        "materials": 0.05
      },
      "maintenancePerSecond": {
        "coins": 0.05
      },
      "statsPerOwned": {
        "residents": 3
      },
      "synergies": [
        {
          "label": "Lumber route",
          "targetType": "output",
          "target": "materials",
          "sourceBuildingIds": [
            "farmstead"
          ],
          "perOwned": 1,
          "bonus": 0.12,
          "cap": 0.6
        }
      ],
      "description": "Built from timber hauled in from the edge of town, each cabin marks the line between rough ground and a place people intend to keep.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "farmstead",
      "name": "Farmstead",
      "spriteRef": "houses-bottom-2",
      "category": "rural",
      "unlock": {
        "residents": 20
      },
      "baseCost": {
        "coins": 400
      },
      "outputPerSecond": {
        "coins": 0.75,
        "materials": 0.2
      },
      "maintenancePerSecond": {
        "coins": 0.12
      },
      "statsPerOwned": {
        "residents": 6
      },
      "synergies": [
        {
          "label": "Market wagons",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "timber-cabin"
          ],
          "perOwned": 2,
          "bonus": 0.1,
          "cap": 0.5
        }
      ],
      "description": "Once the farmsteads appear, the borough stops living day to day. Storehouses fill, carts roll in, and builders stop worrying about the next shipment.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "cube-villa",
      "name": "Cube Villa",
      "spriteRef": "houses-top-3",
      "category": "modern",
      "unlock": {
        "residents": 40,
        "materials": 10
      },
      "baseCost": {
        "coins": 1200,
        "materials": 15
      },
      "outputPerSecond": {
        "coins": 2,
        "appeal": 0.03
      },
      "maintenancePerSecond": {
        "coins": 0.4
      },
      "statsPerOwned": {
        "residents": 5
      },
      "synergies": [
        {
          "label": "Prestige spillover",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "grand-manor"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The first cube villa always looks slightly ahead of its time. Clean lines, broad windows, and careful landscaping announce that wealth has noticed the borough.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "grand-manor",
      "name": "Grand Manor",
      "spriteRef": "houses-top-5",
      "category": "prestige",
      "unlock": {
        "residents": 60,
        "materials": 25
      },
      "baseCost": {
        "coins": 3500,
        "materials": 40
      },
      "outputPerSecond": {
        "coins": 4.2,
        "appeal": 0.12
      },
      "maintenancePerSecond": {
        "coins": 0.6
      },
      "statsPerOwned": {
        "residents": 8
      },
      "synergies": [
        {
          "label": "Society season",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "hillside-lodge"
          ],
          "perOwned": 1,
          "bonus": 0.12,
          "cap": 0.6
        }
      ],
      "description": "A grand manor does not just house residents; it rewrites the reputation of the whole district. Carriages, parties, and quiet envy follow close behind.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "hillside-lodge",
      "name": "Hillside Lodge",
      "spriteRef": "houses-top-6",
      "category": "tourism",
      "unlock": {
        "residents": 90,
        "materials": 40
      },
      "baseCost": {
        "coins": 8000,
        "materials": 90
      },
      "outputPerSecond": {
        "coins": 4.8,
        "appeal": 0.22
      },
      "maintenancePerSecond": {
        "coins": 0.75
      },
      "statsPerOwned": {
        "residents": 6
      },
      "synergies": [
        {
          "label": "Castle views",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "stone-keep"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.5
        }
      ],
      "description": "The lodge turns scenery into business. Visitors come for the view, then start asking whether the borough has room for more.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "brick-factory",
      "name": "Brick Factory",
      "spriteRef": "houses-bottom-4",
      "category": "industrial",
      "unlock": {
        "residents": 130,
        "materials": 60
      },
      "baseCost": {
        "coins": 15000,
        "materials": 140
      },
      "outputPerSecond": {
        "coins": 1.2,
        "materials": 0.9
      },
      "maintenancePerSecond": {
        "coins": 0.95
      },
      "statsPerOwned": {
        "residents": 3
      },
      "synergies": [
        {
          "label": "Rural freight",
          "targetType": "output",
          "target": "materials",
          "sourceBuildingIds": [
            "farmstead"
          ],
          "perOwned": 1,
          "bonus": 0.08,
          "cap": 0.48
        }
      ],
      "description": "Smoke from the brick factory means the borough has chosen scale over charm. The streets grumble, but the construction crews never wait long for materials again.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "dome-habitat",
      "name": "Dome Habitat",
      "spriteRef": "houses-bottom-1",
      "category": "future",
      "unlock": {
        "residents": 180,
        "materials": 120,
        "appeal": 4
      },
      "baseCost": {
        "coins": 30000,
        "materials": 250
      },
      "outputPerSecond": {
        "coins": 6,
        "materials": 0.35,
        "appeal": 0.08
      },
      "maintenancePerSecond": {
        "coins": 1.4
      },
      "statsPerOwned": {
        "residents": 10
      },
      "synergies": [
        {
          "label": "Smart grid",
          "targetType": "output",
          "target": "coins",
          "sourceBuildingIds": [
            "cube-villa",
            "glass-condo"
          ],
          "perOwned": 2,
          "bonus": 0.08,
          "cap": 0.4
        }
      ],
      "description": "The dome habitat is what people build when they stop asking whether the borough belongs on the map and start asking how large it can become.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "stone-keep",
      "name": "Stone Keep",
      "spriteRef": "houses-bottom-3",
      "category": "heritage",
      "unlock": {
        "residents": 250,
        "materials": 220,
        "appeal": 10
      },
      "baseCost": {
        "coins": 70000,
        "materials": 450
      },
      "outputPerSecond": {
        "coins": 2.5,
        "appeal": 0.45
      },
      "maintenancePerSecond": {
        "coins": 1.25
      },
      "statsPerOwned": {
        "residents": 2
      },
      "synergies": [
        {
          "label": "Ancestral ties",
          "targetType": "output",
          "target": "appeal",
          "sourceBuildingIds": [
            "grand-manor"
          ],
          "perOwned": 1,
          "bonus": 0.1,
          "cap": 0.5
        }
      ],
      "description": "The keep is older than the borough and somehow still ends up at its center. Once restored, it gives every surrounding street a sense of history.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "palm-bungalow",
      "name": "Palm Bungalow",
      "spriteRef": "houses-bottom-5",
      "category": "tourism",
      "unlock": {
        "residents": 330,
        "materials": 320,
        "appeal": 18
      },
      "baseCost": {
        "coins": 120000,
        "materials": 800
      },
      "outputPerSecond": {
        "coins": 4.8,
        "appeal": 0.4
      },
      "maintenancePerSecond": {
        "coins": 1.2
      },
      "statsPerOwned": {
        "residents": 4
      },
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
      "description": "The bungalow sells a softer dream: shade, warm evenings, and guests who stay longer than they planned.",
      "areaId": "patchwork-borough"
    },
    {
      "id": "glass-condo",
      "name": "Glass Condo",
      "spriteRef": "houses-bottom-6",
      "category": "modern",
      "unlock": {
        "residents": 450,
        "materials": 550,
        "appeal": 30
      },
      "baseCost": {
        "coins": 250000,
        "materials": 1400
      },
      "outputPerSecond": {
        "coins": 12,
        "appeal": 0.18
      },
      "maintenancePerSecond": {
        "coins": 2.8
      },
      "statsPerOwned": {
        "residents": 12
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
      "description": "Glass condos turn the skyline into a statement. They pull in residents, investors, and the quiet feeling that the borough has become a city.",
      "areaId": "patchwork-borough"
    }
  ],
  "globalUpgrades": [
    {
      "id": "permit-desk",
      "name": "Permit Desk",
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
      "description": "A clerk with a stamp and a ledger can move a city faster than a dozen speeches."
    },
    {
      "id": "stone-roads",
      "name": "Stone Roads",
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
            "coins"
          ],
          "targets": "all",
          "multiplier": 1.2
        }
      ],
      "description": "Once the mud is gone, traffic finds its rhythm. Every route in town starts to pay a little better."
    },
    {
      "id": "census-office",
      "name": "Census Office",
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
            "timber-cabin",
            "farmstead"
          ],
          "multiplier": 1.15
        }
      ],
      "description": "The first proper census teaches the borough its own size, and suddenly planners start building with confidence."
    },
    {
      "id": "builders-guild",
      "name": "Builder's Guild",
      "unlock": {
        "materials": 8
      },
      "cost": {
        "coins": 1500,
        "materials": 10
      },
      "effects": [
        {
          "type": "buildingCostMultiplier",
          "currency": "coins",
          "targets": "all",
          "multiplier": 0.9
        },
        {
          "type": "maintenanceMultiplier",
          "currency": "coins",
          "targets": "all",
          "multiplier": 0.92
        }
      ],
      "description": "When the guild arrives, crews stop reinventing each project from scratch. Costs fall because competence becomes common."
    },
    {
      "id": "supply-depot",
      "name": "Supply Depot",
      "unlock": {
        "materials": 20
      },
      "cost": {
        "coins": 3000,
        "materials": 35
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "materials"
          ],
          "targets": "all",
          "multiplier": 1.25
        }
      ],
      "description": "A depot means spare parts, stored lumber, and fewer days lost waiting on a cart."
    },
    {
      "id": "plumbing-grid",
      "name": "Plumbing & Grid",
      "unlock": {
        "residents": 55,
        "materials": 35
      },
      "cost": {
        "coins": 6000,
        "materials": 60
      },
      "effects": [
        {
          "type": "buildingOutputMultiplier",
          "buildingIds": [
            "cube-villa",
            "dome-habitat",
            "glass-condo"
          ],
          "multiplier": 1.25
        },
        {
          "type": "maintenanceMultiplier",
          "currency": "coins",
          "buildingIds": [
            "cube-villa",
            "dome-habitat",
            "glass-condo"
          ],
          "multiplier": 0.8
        }
      ],
      "description": "Modern districts only feel modern after the pipes and wires disappear into the walls and simply work."
    },
    {
      "id": "heritage-program",
      "name": "Heritage Program",
      "unlock": {
        "appeal": 1
      },
      "cost": {
        "coins": 12000,
        "materials": 90,
        "appeal": 2
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
            "stone-keep"
          ],
          "multiplier": 1.5
        },
        {
          "type": "maintenanceMultiplier",
          "currency": "coins",
          "buildingIds": [
            "grand-manor",
            "hillside-lodge",
            "stone-keep",
            "palm-bungalow"
          ],
          "multiplier": 0.85
        }
      ],
      "description": "The heritage board learns how to turn age into value instead of repair bills."
    },
    {
      "id": "tourism-board",
      "name": "Tourism Board",
      "unlock": {
        "appeal": 3
      },
      "cost": {
        "coins": 20000,
        "materials": 150,
        "appeal": 5
      },
      "effects": [
        {
          "type": "appealToIncomeBonus",
          "sourceCurrency": "appeal",
          "targetCurrency": "coins",
          "ratePerPoint": 0.005
        }
      ],
      "description": "The borough stops being a place people pass through and starts becoming a place they mention by name."
    },
    {
      "id": "industrial-logistics",
      "name": "Industrial Logistics",
      "unlock": {
        "residents": 130,
        "materials": 80
      },
      "cost": {
        "coins": 35000,
        "materials": 280,
        "appeal": 8
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "materials"
          ],
          "buildingIds": [
            "farmstead",
            "brick-factory"
          ],
          "multiplier": 1.5
        },
        {
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "farmstead",
            "brick-factory"
          ],
          "multiplier": 1.25
        },
        {
          "type": "maintenanceMultiplier",
          "currency": "coins",
          "buildingIds": [
            "farmstead",
            "brick-factory"
          ],
          "multiplier": 0.8
        }
      ],
      "description": "Schedules, sidings, and freight ledgers make the rough parts of the borough suddenly efficient."
    },
    {
      "id": "zoning-reform",
      "name": "Zoning Reform",
      "unlock": {
        "residents": 220,
        "materials": 200,
        "appeal": 8
      },
      "cost": {
        "coins": 60000,
        "materials": 500,
        "appeal": 15
      },
      "effects": [
        {
          "type": "uniqueBuildingIncomeBonus",
          "ratePerUniqueOwned": 0.05,
          "cap": 0.6
        }
      ],
      "description": "Clear rules let unlike neighborhoods grow beside each other without tripping over every permit."
    },
    {
      "id": "skyline-campaign",
      "name": "Skyline Campaign",
      "unlock": {
        "residents": 380,
        "appeal": 18
      },
      "cost": {
        "coins": 100000,
        "materials": 900,
        "appeal": 25
      },
      "effects": [
        {
          "type": "incomeMultiplier",
          "currencies": [
            "coins"
          ],
          "buildingIds": [
            "cube-villa",
            "glass-condo"
          ],
          "multiplier": 1.6
        },
        {
          "type": "statMultiplier",
          "stat": "residents",
          "buildingIds": [
            "cube-villa",
            "glass-condo"
          ],
          "multiplier": 1.2
        }
      ],
      "description": "Developers love a vision they can point to from across town."
    },
    {
      "id": "city-charter",
      "name": "City Charter",
      "unlock": {
        "residents": 520,
        "appeal": 28
      },
      "cost": {
        "coins": 200000,
        "materials": 1600,
        "appeal": 40
      },
      "effects": [
        {
          "type": "unlockSystem",
          "systemId": "annexation"
        }
      ],
      "description": "The charter is the moment the borough writes down what it has become and claims the right to grow further."
    }
  ],
  "systems": {
    "annexation": {
      "id": "annexation",
      "name": "Annexation",
      "unlockUpgradeId": "city-charter",
      "prestigeCurrency": {
        "id": "districts",
        "name": "Districts"
      },
      "gainFormula": "max(0, floor(peakResidents / 200) + floor(peakAppeal / 15))",
      "resetRule": "Reset buildings, upgrades, coins, residents, and materials. Keep unlocked annexation and earned districts.",
      "permanentBonuses": [
        {
          "type": "incomeMultiplierPerPrestige",
          "currency": "coins",
          "multiplierPerPoint": 0.05
        },
        {
          "type": "incomeMultiplierPerPrestige",
          "currency": "materials",
          "multiplierPerPoint": 0.02
        }
      ]
    }
  }
};
export default GAME_CONTENT;
