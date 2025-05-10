/**
 * This script scans your codebase for potential Tailwind CSS v4 compatibility issues
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';

const SRC_DIR = './src';
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css'];

// Patterns that are incompatible with Tailwind CSS v4
const INCOMPATIBLE_PATTERNS = [
  // Pseudo-class changes
  /(hover|focus|active|disabled|visited|first|last|odd|even|group-hover|group-focus|peer-hover|peer-focus):[\w-]+/,
  // Removed spacing utilities
  /space-(x|y)-[\w-]+/,
  // Replaced divide utilities
  /divide-(x|y)-[\w-]+/,
  // Class variants that have changed
  /bg-opacity-[\d]+/,
  /text-opacity-[\d]+/,
  /border-opacity-[\d]+/,
  // Specific deprecated classes
  /truncate/,
  // JIT-only syntax that changed
  /\[\&(:|\s|>|~|\+)/,
];

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');

    const issues = [];
    INCOMPATIBLE_PATTERNS.forEach(pattern => {
      const matches = content.match(new RegExp(`["'\`]([^"']*${pattern.source}[^"']*)["'\`]`, 'g'));
      if (matches) {
        matches.forEach(match => {
          issues.push(`Potential Tailwind v4 issue: ${match} in ${filePath}`);
        });
      }
    });

    return issues;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir) {
  let allIssues = [];

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = statSync(fullPath);

      if (stats.isDirectory() && !entry.startsWith('node_modules')) {
        allIssues = [...allIssues, ...scanDirectory(fullPath)];
      } else if (stats.isFile() && EXTENSIONS.includes(extname(fullPath))) {
        allIssues = [...allIssues, ...scanFile(fullPath)];
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }

  return allIssues;
}

console.log('Scanning codebase for Tailwind CSS v4 compatibility issues...');
const issues = scanDirectory(SRC_DIR);

if (issues.length > 0) {
  console.log('\nFound potential Tailwind CSS v4 compatibility issues:');
  issues.forEach(issue => console.log(`- ${issue}`));
  console.log(`\nTotal issues found: ${issues.length}`);
} else {
  console.log('No potential Tailwind CSS v4 compatibility issues found.');
}
