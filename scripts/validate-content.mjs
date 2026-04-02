import { loadContent, validateContent } from "./content-lib.mjs";

const content = await loadContent();
const errors = validateContent(content);

if (errors.length > 0) {
  console.error("Content validation failed:");
  errors.forEach((error) => {
    console.error(`- ${error}`);
  });
  process.exit(1);
}

console.log(`Content is valid. Areas: ${content.areas.length}, policies: ${content.policies.length}`);
