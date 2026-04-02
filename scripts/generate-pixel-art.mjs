import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputRoot = path.join(projectRoot, "public", "art", "generated");

const palette = {
  outline: "#34241d",
  cream: "#f3e3c7",
  brick: "#b55243",
  coral: "#da7b5b",
  rose: "#cf6f73",
  wood: "#8f6039",
  darkWood: "#64422a",
  teal: "#4f8f92",
  sea: "#5ea8c8",
  navy: "#42546c",
  slate: "#59606a",
  green: "#638f4c",
  leaf: "#88b55d",
  gold: "#ddb553",
  sand: "#c99a68",
  adobe: "#b97b53",
  stone: "#8c8782",
  fog: "#dae2ea",
  glass: "#a8ddf5",
  sky: "#d5eef7",
  shadow: "#dfceb5",
  water: "#5ca3d8",
  purple: "#7b5b86"
};

const pixelScale = 6;

await fs.mkdir(path.join(outputRoot, "houses"), { recursive: true });
await fs.mkdir(path.join(outputRoot, "icons", "resources"), { recursive: true });
await fs.mkdir(path.join(outputRoot, "icons", "policies"), { recursive: true });

const houseAssets = buildHouseAssets();
const resourceIcons = buildResourceIcons();
const policyIcons = buildPolicyIcons();

for (const asset of [...houseAssets, ...resourceIcons, ...policyIcons]) {
  await fs.writeFile(path.join(outputRoot, asset.path), asset.svg);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  houses: houseAssets.map(({ id, name, path: assetPath, tags }) => ({
    id,
    name,
    path: `./public/art/generated/${assetPath}`,
    tags
  })),
  resources: resourceIcons.map(({ id, path: assetPath }) => ({
    id,
    path: `./public/art/generated/${assetPath}`
  })),
  policies: policyIcons.map(({ id, path: assetPath }) => ({
    id,
    path: `./public/art/generated/${assetPath}`
  }))
};

await fs.writeFile(path.join(outputRoot, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `Generated ${houseAssets.length} houses, ${resourceIcons.length} resource icons, and ${policyIcons.length} policy icons.`
);

function buildHouseAssets() {
  return [
    houseAsset("artisan-rowhouse", "Artisan Rowhouse", ["urban", "starter"], [
      ground(),
      steppedRoof(8, 10, 24, 6, palette.slate),
      rect(10, 16, 20, 18, palette.cream),
      rect(14, 20, 4, 4, palette.glass),
      rect(22, 20, 4, 4, palette.glass),
      rect(18, 27, 4, 7, palette.teal),
      rect(9, 15, 2, 7, palette.brick),
      plant(7, 33),
      plant(31, 33),
      trimLine(10, 25, 20, palette.shadow)
    ]),
    houseAsset("canal-townhouse", "Canal Townhouse", ["urban", "waterfront"], [
      waterStrip(),
      steppedRoof(13, 8, 18, 7, palette.teal),
      rect(16, 15, 12, 20, palette.fog),
      rect(12, 20, 4, 15, palette.coral),
      rect(18, 19, 3, 4, palette.glass),
      rect(23, 19, 3, 4, palette.glass),
      rect(20, 27, 4, 8, palette.darkWood),
      trimLine(16, 25, 12, palette.shadow),
      rect(12, 17, 3, 2, palette.gold),
      rect(28, 33, 3, 2, palette.wood)
    ]),
    houseAsset("corner-bakery", "Corner Bakery", ["commercial", "cozy"], [
      ground(),
      steppedRoof(7, 11, 26, 5, palette.brick),
      rect(8, 16, 24, 16, palette.cream),
      rect(8, 25, 24, 4, palette.rose),
      rect(10, 19, 4, 4, palette.glass),
      rect(17, 19, 4, 4, palette.glass),
      rect(24, 19, 4, 4, palette.glass),
      rect(18, 27, 5, 5, palette.darkWood),
      rect(14, 14, 12, 2, palette.gold),
      rect(4, 30, 4, 2, palette.wood),
      plant(33, 33)
    ]),
    houseAsset("clocktower-manor", "Clocktower Manor", ["prestige", "landmark"], [
      ground(),
      steppedRoof(8, 12, 20, 5, palette.navy),
      rect(10, 17, 18, 15, palette.cream),
      rect(28, 13, 8, 19, palette.stone),
      steppedRoof(28, 8, 8, 5, palette.navy),
      pixelCircle(32, 20, 3, palette.gold),
      rect(14, 20, 4, 4, palette.glass),
      rect(21, 20, 4, 4, palette.glass),
      rect(17, 27, 5, 5, palette.purple),
      rect(31, 25, 2, 5, palette.darkWood),
      plant(8, 33),
      plant(34, 33)
    ]),
    houseAsset("glass-greenhouse", "Glass Greenhouse", ["modern", "garden"], [
      ground(),
      steppedRoof(8, 12, 18, 5, palette.green),
      rect(10, 17, 14, 15, palette.cream),
      rect(24, 20, 10, 12, palette.glass),
      glassFrame(24, 20, 10, 12),
      rect(14, 21, 4, 4, palette.glass),
      rect(16, 27, 4, 5, palette.darkWood),
      rect(8, 33, 28, 2, palette.green),
      plant(25, 33),
      plant(30, 33)
    ]),
    houseAsset("shrine-courtyard", "Shrine Courtyard", ["heritage", "ornate"], [
      ground(),
      curvedRoof(8, 10, 24, 7, palette.darkWood, palette.coral),
      rect(11, 17, 18, 15, palette.sand),
      rect(15, 21, 4, 4, palette.glass),
      rect(21, 21, 4, 4, palette.glass),
      rect(18, 27, 4, 5, palette.brick),
      rect(6, 22, 2, 10, palette.coral),
      rect(32, 22, 2, 10, palette.coral),
      rect(5, 22, 4, 2, palette.coral),
      rect(31, 22, 4, 2, palette.coral),
      plant(8, 33),
      plant(31, 33)
    ]),
    houseAsset("windmill-homestead", "Windmill Homestead", ["rural", "wind"], [
      ground(),
      steppedRoof(7, 13, 18, 5, palette.adobe),
      rect(9, 18, 14, 14, palette.cream),
      rect(13, 21, 3, 3, palette.glass),
      rect(18, 21, 3, 3, palette.glass),
      rect(14, 27, 4, 5, palette.wood),
      rect(28, 17, 4, 15, palette.stone),
      windmillBlades(30, 21, palette.fog),
      plant(5, 33),
      plant(24, 33)
    ]),
    houseAsset("adobe-court", "Adobe Court", ["desert", "flat-roof"], [
      ground(),
      rect(8, 15, 26, 16, palette.adobe),
      rect(11, 18, 5, 4, palette.glass),
      rect(26, 18, 5, 4, palette.glass),
      rect(18, 24, 6, 7, palette.darkWood),
      rect(12, 13, 18, 2, palette.sand),
      rect(14, 31, 14, 2, palette.sand),
      rect(31, 12, 2, 4, palette.adobe),
      rect(7, 33, 28, 2, palette.sand)
    ]),
    houseAsset("boathouse-pier", "Boathouse Pier", ["tourism", "water"], [
      waterStrip(35),
      steppedRoof(9, 12, 22, 5, palette.teal),
      rect(11, 17, 18, 11, palette.wood),
      rect(14, 20, 4, 4, palette.glass),
      rect(21, 20, 4, 4, palette.glass),
      rect(18, 23, 4, 5, palette.darkWood),
      rect(14, 28, 2, 7, palette.darkWood),
      rect(24, 28, 2, 7, palette.darkWood),
      rect(8, 29, 24, 2, palette.shadow),
      rect(31, 24, 4, 2, palette.gold)
    ]),
    houseAsset("observatory-villa", "Observatory Villa", ["future", "science"], [
      ground(),
      steppedRoof(7, 13, 22, 5, palette.navy),
      rect(9, 18, 18, 14, palette.fog),
      rect(13, 21, 4, 4, palette.glass),
      rect(20, 21, 4, 4, palette.glass),
      rect(16, 27, 4, 5, palette.teal),
      dome(28, 12, 9, 8, palette.sea),
      rect(31, 18, 3, 2, palette.outline),
      rect(7, 33, 30, 2, palette.green),
      plant(8, 33),
      plant(33, 33)
    ])
  ];
}

function buildResourceIcons() {
  return [
    iconAsset("coins", "resources/coins.svg", 24, 24, [
      pixelCoin(10, 6, palette.gold),
      pixelCoin(7, 10, "#efc76b"),
      pixelCoin(13, 11, "#c99834")
    ]),
    iconAsset("residents", "resources/residents.svg", 24, 24, [
      pixelPerson(7, 5, palette.teal),
      pixelPerson(13, 7, palette.coral),
      rect(6, 18, 12, 2, palette.leaf)
    ]),
    iconAsset("materials", "resources/materials.svg", 24, 24, [
      rect(5, 12, 14, 6, palette.wood),
      rect(7, 9, 14, 6, palette.stone),
      rect(3, 15, 14, 6, palette.adobe),
      outlineRect(5, 12, 14, 6),
      outlineRect(7, 9, 14, 6),
      outlineRect(3, 15, 14, 6)
    ]),
    iconAsset("appeal", "resources/appeal.svg", 24, 24, [
      pixelStar(12, 12, palette.rose),
      rect(10, 19, 4, 2, palette.gold)
    ]),
    iconAsset("districts", "resources/districts.svg", 24, 24, [
      rect(4, 4, 7, 7, palette.cream),
      rect(13, 4, 7, 7, palette.fog),
      rect(4, 13, 7, 7, palette.adobe),
      rect(13, 13, 7, 7, palette.teal),
      rect(10, 4, 2, 16, palette.slate),
      rect(4, 10, 16, 2, palette.slate)
    ])
  ];
}

function buildPolicyIcons() {
  return [
    iconAsset("permit-desk", "policies/permit-desk.svg", 24, 24, [
      rect(6, 5, 12, 14, palette.cream),
      outlineRect(6, 5, 12, 14),
      rect(9, 8, 6, 2, palette.teal),
      rect(9, 12, 4, 2, palette.teal),
      rect(13, 14, 4, 4, palette.rose)
    ]),
    iconAsset("stone-roads", "policies/stone-roads.svg", 24, 24, [
      rect(3, 10, 18, 4, palette.stone),
      rect(10, 3, 4, 18, palette.stone),
      rect(11, 5, 2, 3, palette.gold),
      rect(11, 16, 2, 3, palette.gold),
      rect(5, 11, 3, 2, palette.gold),
      rect(16, 11, 3, 2, palette.gold)
    ]),
    iconAsset("census-office", "policies/census-office.svg", 24, 24, [
      rect(6, 5, 12, 14, palette.fog),
      outlineRect(6, 5, 12, 14),
      rect(9, 8, 6, 2, palette.navy),
      rect(9, 12, 6, 2, palette.navy),
      rect(9, 16, 4, 2, palette.navy),
      rect(4, 7, 3, 10, palette.gold)
    ]),
    iconAsset("builders-guild", "policies/builders-guild.svg", 24, 24, [
      rect(12, 4, 4, 12, palette.stone),
      rect(7, 14, 10, 4, palette.wood),
      rect(9, 18, 4, 3, palette.darkWood)
    ]),
    iconAsset("supply-depot", "policies/supply-depot.svg", 24, 24, [
      rect(5, 8, 14, 10, palette.wood),
      outlineRect(5, 8, 14, 10),
      rect(8, 11, 8, 4, palette.gold),
      rect(11, 8, 2, 10, palette.darkWood)
    ]),
    iconAsset("plumbing-grid", "policies/plumbing-grid.svg", 24, 24, [
      rect(4, 10, 16, 4, palette.sea),
      rect(10, 4, 4, 16, palette.sea),
      rect(6, 6, 4, 4, palette.glass),
      rect(14, 14, 4, 4, palette.glass)
    ]),
    iconAsset("heritage-program", "policies/heritage-program.svg", 24, 24, [
      rect(6, 7, 12, 10, palette.stone),
      steppedRoof(5, 4, 14, 4, palette.navy),
      rect(9, 10, 2, 7, palette.darkWood),
      rect(13, 10, 2, 7, palette.darkWood)
    ]),
    iconAsset("tourism-board", "policies/tourism-board.svg", 24, 24, [
      rect(5, 7, 14, 10, palette.glass),
      outlineRect(5, 7, 14, 10),
      rect(8, 10, 8, 4, palette.rose),
      rect(16, 5, 3, 4, palette.gold)
    ]),
    iconAsset("industrial-logistics", "policies/industrial-logistics.svg", 24, 24, [
      rect(4, 12, 16, 5, palette.brick),
      rect(6, 8, 12, 5, palette.stone),
      rect(8, 17, 3, 3, palette.outline),
      rect(14, 17, 3, 3, palette.outline),
      rect(18, 9, 2, 8, palette.slate)
    ]),
    iconAsset("zoning-reform", "policies/zoning-reform.svg", 24, 24, [
      rect(4, 4, 7, 7, palette.cream),
      rect(13, 4, 7, 7, palette.leaf),
      rect(4, 13, 7, 7, palette.adobe),
      rect(13, 13, 7, 7, palette.sea),
      outlineRect(4, 4, 7, 7),
      outlineRect(13, 4, 7, 7),
      outlineRect(4, 13, 7, 7),
      outlineRect(13, 13, 7, 7)
    ]),
    iconAsset("skyline-campaign", "policies/skyline-campaign.svg", 24, 24, [
      rect(5, 12, 4, 8, palette.teal),
      rect(10, 9, 4, 11, palette.navy),
      rect(15, 6, 4, 14, palette.sea),
      rect(4, 20, 16, 2, palette.gold)
    ]),
    iconAsset("city-charter", "policies/city-charter.svg", 24, 24, [
      rect(6, 4, 12, 14, palette.cream),
      outlineRect(6, 4, 12, 14),
      rect(8, 7, 8, 2, palette.navy),
      rect(8, 11, 8, 2, palette.navy),
      rect(10, 16, 4, 4, palette.rose),
      rect(11, 18, 2, 2, palette.gold)
    ])
  ];
}

function houseAsset(id, name, tags, parts) {
  return {
    id,
    name,
    tags,
    path: `houses/${id}.svg`,
    svg: svgDoc(48, 48, parts.join(""))
  };
}

function iconAsset(id, relativePath, width, height, parts) {
  return {
    id,
    path: `icons/${relativePath}`,
    svg: svgDoc(width, height, parts.join(""), { scale: 8 })
  };
}

function svgDoc(width, height, body, options = {}) {
  const scale = options.scale || pixelScale;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width * scale}" height="${height * scale}" shape-rendering="crispEdges">`,
    `<rect width="${width}" height="${height}" fill="transparent"/>`,
    body,
    "</svg>"
  ].join("");
}

function rect(x, y, width, height, fill) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}"/>`;
}

function outlineRect(x, y, width, height, stroke = palette.outline) {
  return [
    rect(x, y, width, 1, stroke),
    rect(x, y + height - 1, width, 1, stroke),
    rect(x, y, 1, height, stroke),
    rect(x + width - 1, y, 1, height, stroke)
  ].join("");
}

function steppedRoof(x, y, width, height, fill) {
  const rows = [];
  for (let offset = 0; offset < height; offset += 1) {
    rows.push(rect(x + offset, y + offset, width - offset * 2, 1, fill));
  }
  rows.push(outlineRect(x + height - 1, y + height - 1, width - (height - 1) * 2, 1));
  return rows.join("");
}

function curvedRoof(x, y, width, height, fill, trim) {
  const rows = [];
  for (let offset = 0; offset < height; offset += 1) {
    const inset = Math.max(0, Math.floor(offset / 2));
    rows.push(rect(x + inset, y + offset, width - inset * 2, 1, fill));
  }
  rows.push(rect(x, y + height - 1, width, 1, trim));
  return rows.join("");
}

function dome(x, y, width, height, fill) {
  const rows = [];
  for (let row = 0; row < height; row += 1) {
    const inset = Math.max(0, Math.floor((height - row - 1) / 2));
    rows.push(rect(x + inset, y + row, width - inset * 2, 1, fill));
  }
  return rows.join("") + outlineRect(x + 2, y + height - 1, width - 4, 1);
}

function ground() {
  return rect(4, 35, 40, 2, palette.green) + rect(3, 37, 42, 1, palette.outline);
}

function waterStrip(y = 36) {
  return rect(2, y, 44, 3, palette.water) + rect(0, y + 3, 48, 1, palette.outline);
}

function plant(x, y) {
  return rect(x, y, 2, 2, palette.leaf) + rect(x + 1, y + 2, 1, 2, palette.wood);
}

function trimLine(x, y, width, fill) {
  return rect(x, y, width, 1, fill);
}

function glassFrame(x, y, width, height) {
  return [
    outlineRect(x, y, width, height, palette.outline),
    rect(x + Math.floor(width / 2), y + 1, 1, height - 2, palette.outline),
    rect(x + 1, y + Math.floor(height / 2), width - 2, 1, palette.outline)
  ].join("");
}

function windmillBlades(cx, cy, fill) {
  return [
    rect(cx - 1, cy - 1, 2, 2, palette.outline),
    rect(cx - 6, cy, 5, 1, fill),
    rect(cx + 1, cy, 5, 1, fill),
    rect(cx, cy - 6, 1, 5, fill),
    rect(cx, cy + 1, 1, 5, fill)
  ].join("");
}

function pixelCoin(x, y, fill) {
  return [
    rect(x + 1, y, 4, 1, fill),
    rect(x, y + 1, 6, 4, fill),
    rect(x + 1, y + 5, 4, 1, fill),
    outlineRect(x, y + 1, 6, 4)
  ].join("");
}

function pixelPerson(x, y, fill) {
  return [
    rect(x + 1, y, 3, 3, fill),
    rect(x, y + 3, 5, 4, fill),
    rect(x + 1, y + 7, 1, 4, fill),
    rect(x + 3, y + 7, 1, 4, fill)
  ].join("");
}

function pixelStar(cx, cy, fill) {
  return [
    rect(cx - 1, cy - 5, 2, 3, fill),
    rect(cx - 5, cy - 1, 10, 2, fill),
    rect(cx - 3, cy + 1, 6, 2, fill),
    rect(cx - 2, cy + 3, 4, 2, fill)
  ].join("");
}

function pixelCircle(cx, cy, radius, fill) {
  const diameter = radius * 2 + 1;
  return [
    rect(cx - radius + 1, cy - radius, diameter - 2, 1, fill),
    rect(cx - radius, cy - radius + 1, diameter, diameter - 2, fill),
    rect(cx - radius + 1, cy + radius, diameter - 2, 1, fill),
    outlineRect(cx - radius, cy - radius + 1, diameter, diameter - 2)
  ].join("");
}
