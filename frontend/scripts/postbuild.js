#!/usr/bin/env node

/**
 * Postbuild script: Move HTML files from dist/pages/ to dist/ root
 * This ensures that Netlify, nginx, and backend routing all find HTML at the root
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../dist');
const pagesPath = path.join(distPath, 'pages');

try {
  // Check if pages directory exists
  if (fs.existsSync(pagesPath)) {
    console.log('📦 Moving HTML files from dist/pages/ to dist/ root...');
    
    // Move HTML files
    const htmlFiles = fs.readdirSync(pagesPath).filter(f => f.endsWith('.html'));
    htmlFiles.forEach(file => {
      const src = path.join(pagesPath, file);
      const dest = path.join(distPath, file);
      fs.renameSync(src, dest);
      console.log(`  ✓ Moved ${file}`);
    });
    
    // Remove empty pages directory
    if (fs.readdirSync(pagesPath).length === 0) {
      fs.rmdirSync(pagesPath);
      console.log('  ✓ Removed empty pages/ directory');
    }
    
    console.log('✅ Postbuild complete: HTML files ready in dist/');
  } else {
    console.log('ℹ️  dist/pages/ not found (HTML already in dist/ root)');
  }
} catch (err) {
  console.error('❌ Postbuild error:', err.message);
  process.exit(1);
}
