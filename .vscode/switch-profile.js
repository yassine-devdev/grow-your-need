#!/usr/bin/env node
// CommonJS profile applier for settings.multiverse.json -> settings.json
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const multiPath = path.join(root, '.vscode', 'settings.multiverse.json');
const outPath = path.join(root, '.vscode', 'settings.json');

const profile = process.argv[2] || 'default';

if (!fs.existsSync(multiPath)) {
  console.error('No settings.multiverse.json found');
  process.exit(2);
}

const multi = JSON.parse(fs.readFileSync(multiPath, 'utf8'));
const profiles = multi.profiles || {};
if (!profiles[profile]) {
  console.error('Profile not found:', profile);
  console.error('Available:', Object.keys(profiles).join(', '));
  process.exit(3);
}

let base = {};
if (fs.existsSync(outPath)) {
  try {
    base = JSON.parse(fs.readFileSync(outPath, 'utf8')) || {};
  } catch (_) {
    base = {};
  }
}

const merged = Object.assign({}, base, profiles[profile]);

fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));
console.log('Applied profile', profile, 'to .vscode/settings.json');
