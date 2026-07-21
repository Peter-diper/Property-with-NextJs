#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const README_PATH = path.join(__dirname, "../README.md");

// ─── READ README ───────────────────────────────────────────────────
let readme = fs.readFileSync(README_PATH, "utf8");
const lines = readme.split("\n");

// ─── GET ALL CHECKLIST ITEMS ───────────────────────────────────────
const checklistItems = lines
  .map((line, index) => ({ line, index }))
  .filter(({ line }) => line.startsWith("- [ ]") || line.startsWith("- [x]"));

// ─── DISPLAY ITEMS ────────────────────────────────────────────────
console.log("\n📋 README Checklist:\n");
checklistItems.forEach(({ line }, i) => {
  const checked = line.startsWith("- [x]");
  const text = line.replace(/- \[.\] /, "");
  console.log(`  ${i + 1}. ${checked ? "✅" : "⬜"} ${text}`);
});

// ─── PROMPT USER ──────────────────────────────────────────────────
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\nCommands:");
console.log("  check <number>    → check an item");
console.log("  uncheck <number>  → uncheck an item");
console.log("  exit              → quit\n");

rl.on("line", (input) => {
  const [command, num] = input.trim().split(" ");
  const index = parseInt(num) - 1;

  if (command === "exit") {
    console.log("👋 Bye!");
    rl.close();
    process.exit(0);
  }

  if (isNaN(index) || index < 0 || index >= checklistItems.length) {
    console.log("❌ Invalid number");
    return;
  }

  const item = checklistItems[index];

  if (command === "check") {
    lines[item.index] = lines[item.index].replace("- [ ]", "- [x]");
    console.log(`✅ Checked: ${item.line.replace(/- \[.\] /, "")}`);
  } else if (command === "uncheck") {
    lines[item.index] = lines[item.index].replace("- [x]", "- [ ]");
    console.log(`⬜ Unchecked: ${item.line.replace(/- \[.\] /, "")}`);
  } else {
    console.log('❌ Unknown command. Use "check", "uncheck", or "exit"');
    return;
  }

  fs.writeFileSync(README_PATH, lines.join("\n"), "utf8");
  console.log("💾 README saved\n");
});
