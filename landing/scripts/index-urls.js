#!/usr/bin/env node

/**
 * URL Indexing Script for Google and Bing
 *
 * Usage:
 *   npm run index              # Index new URLs only
 *   npm run index:force        # Reindex all URLs
 *   npm run index:dry          # Show what would be indexed
 *   npm run index:google       # Google only
 *   npm run index:bing         # Bing only
 *
 * Setup:
 *   1. Google: Place service account JSON at scripts/google-indexing.json
 *   2. Bing: Create scripts/bing-indexnow.json with { "api_key": "..." }
 *
 * Files (in scripts/):
 *   - google-indexing.json     # Google service account (gitignored)
 *   - bing-indexnow.json       # Bing API key (gitignored)
 *   - .indexed-urls.json       # Log of indexed URLs (gitignored)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://suparank.io';
const SCRIPTS_DIR = __dirname;
const LOG_FILE = path.join(SCRIPTS_DIR, '.indexed-urls.json');
const GOOGLE_CREDS_FILE = path.join(SCRIPTS_DIR, 'google-indexing.json');
const BING_CONFIG_FILE = path.join(SCRIPTS_DIR, 'bing-indexnow.json');

// Parse arguments
const args = process.argv.slice(2);
const FORCE_REINDEX = args.includes('--force');
const DRY_RUN = args.includes('--dry-run');
const GOOGLE_ONLY = args.includes('--google');
const BING_ONLY = args.includes('--bing');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Load indexed URLs log
function loadIndexedUrls() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      return JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    }
  } catch (e) {
    log(`Warning: Could not load indexed URLs log: ${e.message}`, 'yellow');
  }
  return { google: {}, bing: {} };
}

// Save indexed URLs log
function saveIndexedUrls(data) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2));
}

// Get all URLs from the Astro pages
function getAllUrls() {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  const urls = [];

  function scanDir(dir, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip special directories
        if (['api', '_', '['].some(skip => entry.name.startsWith(skip))) continue;
        scanDir(fullPath, `${basePath}/${entry.name}`);
      } else if (entry.isFile()) {
        // Handle .astro and .mdx files
        if (entry.name.endsWith('.astro') || entry.name.endsWith('.mdx')) {
          let urlPath = basePath;

          if (entry.name === 'index.astro' || entry.name === 'index.mdx') {
            // /pages/blog/index.astro -> /blog
            urlPath = basePath || '/';
          } else if (entry.name.startsWith('[')) {
            // Skip dynamic routes like [slug].astro
            continue;
          } else {
            // /pages/contact.astro -> /contact
            const name = entry.name.replace(/\.(astro|mdx)$/, '');
            urlPath = `${basePath}/${name}`;
          }

          urls.push(`${SITE_URL}${urlPath}`);
        }
      }
    }
  }

  scanDir(pagesDir);

  // Add blog posts from content collection
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir);
    for (const file of blogFiles) {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const slug = file.replace(/\.(mdx|md)$/, '');
        urls.push(`${SITE_URL}/blog/${slug}`);
      }
    }
  }

  return urls.sort();
}

// Google Indexing API
async function indexWithGoogle(url, forceUpdate = false) {
  if (!fs.existsSync(GOOGLE_CREDS_FILE)) {
    throw new Error(`Google credentials not found at ${GOOGLE_CREDS_FILE}`);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_CREDS_FILE,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  const response = await indexing.urlNotifications.publish({
    requestBody: {
      url: url,
      type: forceUpdate ? 'URL_UPDATED' : 'URL_UPDATED',
    },
  });

  return response.data;
}

// Bing Indexing API
async function indexWithBing(url) {
  // Load Bing API key from config
  if (!fs.existsSync(BING_CONFIG_FILE)) {
    throw new Error(`Bing config not found at ${BING_CONFIG_FILE}`);
  }

  const config = JSON.parse(fs.readFileSync(BING_CONFIG_FILE, 'utf-8'));
  const apiKey = config.api_key;

  if (!apiKey) {
    throw new Error('Bing API key not found in bing-indexnow.json');
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      host: 'suparank.io',
      key: apiKey,
      keyLocation: `https://suparank.io/${apiKey}.txt`,
      urlList: [url],
    }),
  });

  if (!response.ok && response.status !== 200 && response.status !== 202) {
    const text = await response.text();
    throw new Error(`Bing API error: ${response.status} ${text}`);
  }

  return { status: response.status, statusText: response.statusText };
}

// Main function
async function main() {
  log('\n========================================', 'blue');
  log('  URL Indexing Tool - Google & Bing', 'blue');
  log('========================================\n', 'blue');

  if (DRY_RUN) {
    log('[DRY RUN MODE - No actual requests will be made]\n', 'yellow');
  }

  if (FORCE_REINDEX) {
    log('[FORCE MODE - Reindexing all URLs]\n', 'yellow');
  }

  // Get all URLs
  const allUrls = getAllUrls();
  log(`Found ${allUrls.length} URLs to process\n`, 'dim');

  // Load existing index log
  const indexedUrls = FORCE_REINDEX ? { google: {}, bing: {} } : loadIndexedUrls();

  const results = {
    google: { success: 0, skipped: 0, failed: 0 },
    bing: { success: 0, skipped: 0, failed: 0 },
  };

  // Check for credentials
  const hasGoogleCreds = fs.existsSync(GOOGLE_CREDS_FILE);
  const hasBingCreds = fs.existsSync(BING_CONFIG_FILE) &&
    JSON.parse(fs.readFileSync(BING_CONFIG_FILE, 'utf-8')).api_key;

  if (!hasGoogleCreds && !BING_ONLY) {
    log(`Google credentials not found at ${GOOGLE_CREDS_FILE}`, 'yellow');
    log('Skipping Google indexing. See setup instructions below.\n', 'dim');
  }

  if (!hasBingCreds && !GOOGLE_ONLY) {
    log(`Bing API key not found at ${BING_CONFIG_FILE}`, 'yellow');
    log('Skipping Bing indexing. See setup instructions below.\n', 'dim');
  }

  // Process each URL
  for (const url of allUrls) {
    const shortUrl = url.replace(SITE_URL, '');

    // Google Indexing
    if (hasGoogleCreds && !BING_ONLY) {
      const alreadyIndexed = indexedUrls.google[url];

      if (alreadyIndexed && !FORCE_REINDEX) {
        log(`[Google] SKIP ${shortUrl} (indexed ${alreadyIndexed})`, 'dim');
        results.google.skipped++;
      } else {
        if (DRY_RUN) {
          log(`[Google] WOULD INDEX ${shortUrl}`, 'blue');
          results.google.success++;
        } else {
          try {
            await indexWithGoogle(url, FORCE_REINDEX);
            indexedUrls.google[url] = new Date().toISOString();
            log(`[Google] OK ${shortUrl}`, 'green');
            results.google.success++;
            // Rate limit: Google allows 200 requests per day
            await new Promise(r => setTimeout(r, 100));
          } catch (e) {
            log(`[Google] FAIL ${shortUrl}: ${e.message}`, 'red');
            results.google.failed++;
          }
        }
      }
    }

    // Bing Indexing (IndexNow)
    if (hasBingCreds && !GOOGLE_ONLY) {
      const alreadyIndexed = indexedUrls.bing[url];

      if (alreadyIndexed && !FORCE_REINDEX) {
        log(`[Bing]   SKIP ${shortUrl} (indexed ${alreadyIndexed})`, 'dim');
        results.bing.skipped++;
      } else {
        if (DRY_RUN) {
          log(`[Bing]   WOULD INDEX ${shortUrl}`, 'blue');
          results.bing.success++;
        } else {
          try {
            await indexWithBing(url);
            indexedUrls.bing[url] = new Date().toISOString();
            log(`[Bing]   OK ${shortUrl}`, 'green');
            results.bing.success++;
            // Small delay between requests
            await new Promise(r => setTimeout(r, 50));
          } catch (e) {
            log(`[Bing]   FAIL ${shortUrl}: ${e.message}`, 'red');
            results.bing.failed++;
          }
        }
      }
    }
  }

  // Save updated log
  if (!DRY_RUN) {
    saveIndexedUrls(indexedUrls);
  }

  // Print summary
  log('\n========================================', 'blue');
  log('  Summary', 'blue');
  log('========================================\n', 'blue');

  if (hasGoogleCreds && !BING_ONLY) {
    log(`Google: ${results.google.success} indexed, ${results.google.skipped} skipped, ${results.google.failed} failed`,
      results.google.failed > 0 ? 'yellow' : 'green');
  }

  if (hasBingCreds && !GOOGLE_ONLY) {
    log(`Bing:   ${results.bing.success} indexed, ${results.bing.skipped} skipped, ${results.bing.failed} failed`,
      results.bing.failed > 0 ? 'yellow' : 'green');
  }

  log(`\nLog file: ${LOG_FILE}`, 'dim');

  // Print setup instructions if credentials missing
  if (!hasGoogleCreds || !hasBingCreds) {
    log('\n========================================', 'yellow');
    log('  Setup Instructions', 'yellow');
    log('========================================\n', 'yellow');

    if (!hasGoogleCreds) {
      log('GOOGLE INDEXING API:', 'blue');
      log('1. Go to Google Cloud Console: https://console.cloud.google.com');
      log('2. Create a project or select existing');
      log('3. Enable "Indexing API" in APIs & Services');
      log('4. Create a Service Account with "Owner" role');
      log('5. Download JSON key and save to:', 'dim');
      log(`   ${GOOGLE_CREDS_FILE}`, 'green');
      log('6. Add service account email to Search Console as owner');
      log('');
    }

    if (!hasBingCreds) {
      log('BING INDEXNOW API:', 'blue');
      log('1. Generate an API key (any UUID or random string)');
      log('2. Create a verification file at your site root:');
      log(`   ${SITE_URL}/<your-api-key>.txt`, 'dim');
      log('   (containing the same API key)');
      log('3. Create bing-indexnow.json in scripts/:', 'dim');
      log(`   ${BING_CONFIG_FILE}`, 'green');
      log('   { "api_key": "<your-api-key>" }', 'green');
      log('');
    }
  }
}

main().catch(e => {
  log(`\nFatal error: ${e.message}`, 'red');
  process.exit(1);
});
