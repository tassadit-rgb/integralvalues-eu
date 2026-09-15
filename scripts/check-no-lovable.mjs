import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const forbidden = [
  ["@lovable", ".dev"].join(""),
  ["LOVABLE", "_"].join(""),
  ["lovable", ".app"].join(""),
  ["lovable", "project"].join(""),
  ["Lovable", " Cloud"].join(""),
  ["/", "lovable", "/"].join(""),
  ["gpt", "engineer"].join(""),
  ["gpt", "-eng"].join(""),
  ["__", "lovableEvents"].join(""),
];

const roots = ["src"];
const explicitFiles = ["package.json", "bun.lock", "vite.config.ts", "README.md"];
const files = [...explicitFiles];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(target);
    else if (/\.(ts|tsx|js|mjs|json|md)$/.test(entry.name)) files.push(target);
  }
}

for (const root of roots) await collect(root);

const violations = [];
for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const token of forbidden) {
    if (content.includes(token)) violations.push(`${file}: ${token}`);
  }
}

if (violations.length) {
  console.error("Vendor-specific production references remain:\n" + violations.join("\n"));
  process.exit(1);
}

console.log("No Lovable runtime reference found in active source or manifests.");
