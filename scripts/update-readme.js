#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const README_PATH = path.join(__dirname, "../README.md");

// ─── READ COMMIT MESSAGE ───────────────────────────────────────────
const commitMessage = process.argv[2] || "";

console.log(`📝 Commit message: "${commitMessage}"`);

// ─── READ README ───────────────────────────────────────────────────
let readme = fs.readFileSync(README_PATH, "utf8");

// ─── MATCH AND CHECK ITEMS ─────────────────────────────────────────
// Looks for unchecked items [ ] whose text partially matches commit message
const lines = readme.split("\n");
let updated = false;

const newLines = lines.map((line) => {
  // Only process unchecked items
  if (!line.startsWith("- [ ]")) return line;

  const itemText = line.replace("- [ ]", "").trim().toLowerCase();
  const commit = commitMessage.toLowerCase();

  // Check if commit message contains keywords from this item
  const keywords = itemText
    .split(" ")
    .filter((word) => word.length > 3); // skip short words

  const matches = keywords.some((keyword) => commit.includes(keyword));

  if (matches) {
    console.log(`✅ Checking: ${itemText}`);
    updated = true;
    return line.replace("- [ ]", "- [x]");
  }

  return line;
});

if (updated) {
  fs.writeFileSync(README_PATH, newLines.join("\n"), "utf8");
  console.log("✅ README updated successfully");
} else {
  console.log("ℹ️ No matching items found in README");
}
