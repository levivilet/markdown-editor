import { createHash } from "node:crypto";
import { readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const root = join(__dirname, "..");

const getPackageLocations = () => {
  const packageLocations = [];
  packageLocations.push("package-lock.json");
  return packageLocations;
};

const locations = [
  ...getPackageLocations(),
  ".github/workflows/pr.yml",
  ".github/workflows/ci.yml",
  ".github/workflows/release.yml",
  "scripts/computeNodeModulesCacheKey.js",
];

const getAbsolutePath = (relativePath) => {
  return join(root, relativePath);
};

const getContent = (absolutePath) => {
  return readFile(absolutePath, "utf8");
};

export const computeHash = (contents) => {
  const hash = createHash("sha1");
  if (Array.isArray(contents)) {
    for (const content of contents) {
      hash.update(content);
    }
  } else if (typeof contents === "string") {
    hash.update(contents);
  }
  return hash.digest("hex");
};

const computeCacheKey = async (locations) => {
  const absolutePaths = locations.map(getAbsolutePath);
  const contents = await Promise.all(absolutePaths.map(getContent));
  const hash = computeHash(contents);
  return hash;
};

const main = async () => {
  const hash = await computeCacheKey(locations);
  process.stdout.write(hash);
};

main();
