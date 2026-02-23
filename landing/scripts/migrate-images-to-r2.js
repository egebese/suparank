#!/usr/bin/env node

/**
 * Migrate blog images from wiro.ai to Cloudflare R2
 *
 * Usage:
 * 1. Add R2 credentials to .env:
 *    R2_ACCESS_KEY_ID=your_access_key
 *    R2_SECRET_ACCESS_KEY=your_secret_key
 *
 * 2. Run: node scripts/migrate-images-to-r2.js
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { config } from 'dotenv';

config();

// R2 Configuration (from .env)
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_BUCKET = process.env.R2_BUCKET;
const CDN_DOMAIN = process.env.R2_CDN_DOMAIN;
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Paths
const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const IMAGE_PREFIX = 'blog/images';

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Extract wiro.ai URLs from content
function extractWiroUrls(content) {
  const regex = /https:\/\/cdn1\.wiro\.ai\/[a-f0-9-]+\/\d+_Image\d+\.jpeg/g;
  return [...new Set(content.match(regex) || [])];
}

// Generate a clean filename from wiro URL
function generateFilename(wiroUrl) {
  // Extract the unique ID parts from the URL
  const match = wiroUrl.match(/cdn1\.wiro\.ai\/([a-f0-9-]+)\/(\d+)_Image(\d+)\.jpeg/);
  if (match) {
    const [, hash, id, imageNum] = match;
    // Use shorter hash + id for filename
    const shortHash = hash.split('-').slice(0, 2).join('');
    return `${id}-${imageNum}-${shortHash}.jpeg`;
  }
  return `image-${Date.now()}.jpeg`;
}

// Check if image already exists in R2
async function imageExists(key) {
  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    }));
    return true;
  } catch (error) {
    return false;
  }
}

// Download image from URL
async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${url} - ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

// Upload image to R2
async function uploadToR2(buffer, key) {
  await s3Client.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: 'image/jpeg',
    CacheControl: 'public, max-age=31536000', // 1 year cache
  }));
  return `${CDN_DOMAIN}/${key}`;
}

// Process a single MDX file
async function processFile(filePath, urlMap) {
  let content = await readFile(filePath, 'utf-8');
  let modified = false;

  for (const [wiroUrl, cdnUrl] of Object.entries(urlMap)) {
    if (content.includes(wiroUrl)) {
      content = content.replaceAll(wiroUrl, cdnUrl);
      modified = true;
    }
  }

  if (modified) {
    await writeFile(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

async function main() {
  console.log('🚀 Starting image migration to R2...\n');

  // Check credentials
  const requiredEnvs = ['R2_ACCOUNT_ID', 'R2_BUCKET', 'R2_CDN_DOMAIN', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'];
  const missing = requiredEnvs.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing R2 environment variables:');
    missing.forEach(key => console.error(`   ${key}=`));
    console.error('\nAdd them to your .env file');
    process.exit(1);
  }

  // Step 1: Collect all wiro URLs from MDX files
  console.log('📂 Scanning MDX files for wiro.ai URLs...');
  const allUrls = new Set();
  const files = await readdir(BLOG_DIR);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));

  for (const file of mdxFiles) {
    const content = await readFile(join(BLOG_DIR, file), 'utf-8');
    const urls = extractWiroUrls(content);
    urls.forEach(url => allUrls.add(url));
  }

  // Also check _generated-assets
  try {
    const generatedFile = join(BLOG_DIR, '_generated-assets/GENERATED_IMAGES.md');
    const generatedContent = await readFile(generatedFile, 'utf-8');
    const generatedUrls = extractWiroUrls(generatedContent);
    generatedUrls.forEach(url => allUrls.add(url));
  } catch (e) {
    // File might not exist
  }

  console.log(`   Found ${allUrls.size} unique wiro.ai URLs\n`);

  // Step 2: Download and upload each image
  console.log('📥 Downloading and uploading images...');
  const urlMap = {};
  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const wiroUrl of allUrls) {
    const filename = generateFilename(wiroUrl);
    const key = `${IMAGE_PREFIX}/${filename}`;

    try {
      // Check if already uploaded
      if (await imageExists(key)) {
        urlMap[wiroUrl] = `${CDN_DOMAIN}/${key}`;
        skipped++;
        console.log(`   ⏭️  Skipped (exists): ${filename}`);
        continue;
      }

      // Download
      const buffer = await downloadImage(wiroUrl);

      // Upload to R2
      const cdnUrl = await uploadToR2(buffer, key);
      urlMap[wiroUrl] = cdnUrl;
      processed++;

      console.log(`   ✅ Uploaded: ${filename}`);

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100));

    } catch (error) {
      console.error(`   ❌ Failed: ${wiroUrl}`);
      console.error(`      Error: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Upload summary: ${processed} uploaded, ${skipped} skipped, ${failed} failed\n`);

  // Step 3: Update MDX files with new URLs
  console.log('📝 Updating MDX files with CDN URLs...');
  let updatedFiles = 0;

  for (const file of mdxFiles) {
    const filePath = join(BLOG_DIR, file);
    const updated = await processFile(filePath, urlMap);
    if (updated) {
      updatedFiles++;
      console.log(`   ✅ Updated: ${file}`);
    }
  }

  // Update GENERATED_IMAGES.md too
  try {
    const generatedFile = join(BLOG_DIR, '_generated-assets/GENERATED_IMAGES.md');
    const updated = await processFile(generatedFile, urlMap);
    if (updated) {
      updatedFiles++;
      console.log(`   ✅ Updated: _generated-assets/GENERATED_IMAGES.md`);
    }
  } catch (e) {
    // File might not exist
  }

  console.log(`\n✨ Migration complete!`);
  console.log(`   📁 Files updated: ${updatedFiles}`);
  console.log(`   🖼️  Images migrated: ${processed + skipped}`);
  console.log(`   🌐 CDN domain: ${CDN_DOMAIN}`);

  // Output URL mapping for reference
  const mappingFile = join(BLOG_DIR, '_generated-assets/url-mapping.json');
  await writeFile(mappingFile, JSON.stringify(urlMap, null, 2));
  console.log(`   📄 URL mapping saved to: ${mappingFile}`);
}

main().catch(console.error);
