import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.join(__dirname, 'frontend');
const rootDistDir = path.join(__dirname, 'dist');
const frontendDistDir = path.join(frontendDir, 'dist');

console.log('[NEXORA Build] Installing frontend dependencies and running Vite build...');
execSync('npm install && npm run build', {
  cwd: frontendDir,
  stdio: 'inherit',
  env: process.env,
});

console.log('[NEXORA Build] Copying frontend/dist -> ./dist for root Vercel deployment...');
if (fs.existsSync(rootDistDir)) {
  fs.rmSync(rootDistDir, { recursive: true, force: true });
}

fs.cpSync(frontendDistDir, rootDistDir, { recursive: true });

console.log('[NEXORA Build] Build complete! Root ./dist directory is ready for deployment.');
