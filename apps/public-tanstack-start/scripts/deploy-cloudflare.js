// this is outside of application
/* eslint-disable no-console */
/**
 * To run this script locally, you must prepare a `.env` file inside `apps/public-tanstack-start` folder.
 *
 * The .env file must contain the following keys:
 * - CMS_API_VERSION
 * - CMS_DATASET
 * - CMS_PROJECT_ID
 * - CMS_TOKEN
 * - ENABLE_ROBOTS
 * - SENTRY_DSN
 * - SENTRY_ENVIRONMENT
 *
 * Run `node --env-file .env ./scripts/deploy-cloudflare.js <environment>`
 *
 * Example: `node --env-file .env ./scripts/deploy-cloudflare.js production`
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The environment to deploy to (passed from package.json, e.g. "production")
const targetEnv = process.argv[2] || 'development';

// Define which keys we want to inject into Cloudflare
const CLOUDFLARE_KEYS = [
  'CMS_API_VERSION',
  'CMS_DATASET',
  'CMS_PROJECT_ID',
  'CMS_TOKEN',
  'ENABLE_ROBOTS',
  'SENTRY_DSN',
  'SENTRY_ENVIRONMENT',
];

const vars = [];

CLOUDFLARE_KEYS.forEach((envName) => {
  const env = process.env[envName];
  vars.push(`--var ${envName}:"${env}"`);
});

vars.push(`--var CLOUDFLARE:"true"`);

// Construct and run the wrangler command
const wranglerCmd = `pnpm exec wrangler deploy --env ${targetEnv} ${vars.join(' ')}`;

console.log(`🚀 Deploying to Cloudflare (${targetEnv}) with .env variables...`);
try {
  execSync(wranglerCmd, { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
} catch (error) {
  console.error('❌ Deployment failed.', error);
  process.exit(1);
}
