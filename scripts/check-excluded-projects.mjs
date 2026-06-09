import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EXCLUDED_PATTERNS = [
  /Genesis Mastery/i,
  /genesis-mastery/i,
  /Visual Conversations/i,
  /visual-conversations/i,
  /Pathbound Mobile/i,
  /pathbound-mobile/i,
  /\bPathbound\b/i,
  /Wilmington Engine/i,
  /Wilmington News/i,
  /wilmington-engine/i,
  /wilmington-news/i,
];

const SCAN_DIRS = ["content", "components", "lib", "scripts"];
const SKIP_FILES = new Set(["check-excluded-projects.mjs"]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(fullPath, files);
      continue;
    }
    if (!/\.(ts|tsx|mjs|js|json|md)$/.test(entry)) continue;
    if (SKIP_FILES.has(entry)) continue;
    files.push(fullPath);
  }
  return files;
}

const files = SCAN_DIRS.flatMap((dir) => walk(join(root, dir)));
const matches = [];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(content)) {
      matches.push({ file: file.replace(`${root}/`, ""), pattern: pattern.source });
      break;
    }
  }
}

if (matches.length > 0) {
  console.error("Excluded project names found in public ChrisOS source:");
  for (const match of matches) {
    console.error(`- ${match.file} (${match.pattern})`);
  }
  process.exit(1);
}

console.log("No excluded project names found in public ChrisOS source.");
