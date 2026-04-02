import { buildRuntimeContent, loadContent, validateContent, writeRuntimeModule } from "./content-lib.mjs";

const content = await loadContent();
const errors = validateContent(content);

if (errors.length > 0) {
  console.error("Content validation failed:");
  errors.forEach((error) => {
    console.error(`- ${error}`);
  });
  process.exit(1);
}

const runtimeContent = buildRuntimeContent(content);
const outputPath = await writeRuntimeModule(runtimeContent);

console.log(`Built runtime content: ${outputPath}`);
