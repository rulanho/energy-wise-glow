#!/usr/bin/env node
/**
 * Scan android/app/src/main/res for filenames that violate Android's
 * resource naming rules (only lowercase a-z, 0-9, underscore allowed in
 * the basename — extension is preserved) and rename them in-place.
 *
 * Then update any textual references (XML, Kotlin, Java, Gradle, JSON)
 * inside the android/ folder so the build keeps working.
 *
 * Usage:
 *   node scripts/fix-android-res-names.mjs           # apply changes
 *   node scripts/fix-android-res-names.mjs --dry-run # preview only
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "android");
const RES_DIR = path.join(ROOT, "app", "src", "main", "res");
const DRY = process.argv.includes("--dry-run");

const VALID = /^[a-z0-9_]+$/;
// File extensions whose contents we will rewrite to update references.
const TEXT_EXT = new Set([
  ".xml", ".kt", ".java", ".gradle", ".kts", ".json", ".pro", ".properties", ".txt", ".md",
]);

/** Convert "My Cool-Image@2x.png" -> "my_cool_image_2x.png" (lowercase, _-only basename). */
function sanitize(name) {
  const ext = path.extname(name);
  let base = name.slice(0, name.length - ext.length).toLowerCase();
  base = base
    .replace(/[^a-z0-9_]+/g, "_") // any invalid run -> _
    .replace(/^_+|_+$/g, "")       // trim leading/trailing _
    .replace(/_+/g, "_");          // collapse __
  if (!base) base = "file";
  if (/^[0-9]/.test(base)) base = "_" + base; // must not start with a digit
  return base + ext.toLowerCase();
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

async function main() {
  if (!(await exists(RES_DIR))) {
    console.error(`✖ Not found: ${RES_DIR}`);
    console.error("  Run this from the project root after `npx cap add android`.");
    process.exit(1);
  }

  const files = await walk(RES_DIR);
  /** @type {Array<{from:string,to:string,oldBase:string,newBase:string}>} */
  const renames = [];

  for (const full of files) {
    const dir = path.dirname(full);
    const name = path.basename(full);
    const ext = path.extname(name);
    const base = name.slice(0, name.length - ext.length);
    if (VALID.test(base) && ext === ext.toLowerCase()) continue;

    let target = sanitize(name);
    let candidate = path.join(dir, target);
    let i = 1;
    while (await exists(candidate) && candidate !== full) {
      const t = sanitize(name).replace(/(\.[^.]+)$/, `_${i}$1`);
      candidate = path.join(dir, t);
      target = t;
      i++;
    }
    renames.push({
      from: full,
      to: candidate,
      oldBase: base,            // reference name in code is without extension
      newBase: target.slice(0, target.length - path.extname(target).length),
    });
  }

  if (renames.length === 0) {
    console.log("✓ No invalid Android resource filenames found.");
    return;
  }

  console.log(`Found ${renames.length} file(s) to rename:`);
  for (const r of renames) {
    console.log(`  ${path.relative(ROOT, r.from)}  →  ${path.basename(r.to)}`);
  }

  if (DRY) {
    console.log("\n(dry-run) No files changed.");
    return;
  }

  // 1) Rename files on disk
  for (const r of renames) {
    await fs.rename(r.from, r.to);
  }

  // 2) Update textual references inside android/
  const androidFiles = await walk(ROOT);
  let touched = 0;
  for (const file of androidFiles) {
    const ext = path.extname(file).toLowerCase();
    if (!TEXT_EXT.has(ext)) continue;
    let content;
    try { content = await fs.readFile(file, "utf8"); } catch { continue; }
    let updated = content;
    for (const r of renames) {
      if (r.oldBase === r.newBase) continue;
      // Replace whole-word occurrences of the old basename.
      const re = new RegExp(`\\b${r.oldBase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
      updated = updated.replace(re, r.newBase);
    }
    if (updated !== content) {
      await fs.writeFile(file, updated, "utf8");
      touched++;
    }
  }

  console.log(`\n✓ Renamed ${renames.length} file(s) and updated ${touched} reference file(s).`);
  console.log("Next: in Android Studio run Build → Clean Project, then Rebuild.");
}

main().catch((err) => { console.error(err); process.exit(1); });
