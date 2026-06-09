import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectsFile = readFileSync(join(root, "content/projects.ts"), "utf8");

const EXPECTED_INVENTORY_TITLES = [
  "Physician Connection Platform",
  "SiteOS",
  "Elite Touch Cleaning Companion App",
  "Elite Touch Proposal App",
  "Regen Profits Sales App",
  "Cape Fear Web Co",
  "Cape Fear Client Portal",
  "RememberMe",
  "Media Authenticity API",
  "ChrisOS",
];

const missing = EXPECTED_INVENTORY_TITLES.filter(
  (title) => !projectsFile.includes(`name: "${title}"`),
);

console.log(`Project inventory check against content/projects.ts`);
console.log(`Expected: ${EXPECTED_INVENTORY_TITLES.length} titles`);

if (missing.length > 0) {
  console.error(`Missing expected titles:\n${missing.map((title) => `- ${title}`).join("\n")}`);
  process.exit(1);
}

console.log("All expected project titles are present in projects data.");
