import { generateNextAuthSecret } from './utils.js';
import fs from 'fs-extra';
import path from 'path';

/**
 * Updates package.json with user's project information
 */
export async function updatePackageJson(
  projectPath: string,
  config: {
    name: string;
    description?: string;
    author?: string;
    repository?: string;
  }
): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  // Update package.json fields
  packageJson.name = config.name;
  packageJson.version = '0.1.0';

  if (config.description) {
    packageJson.description = config.description;
  }

  if (config.author) {
    packageJson.author = config.author;
  }

  if (config.repository) {
    packageJson.repository = {
      type: 'git',
      url: config.repository,
    };
  }

  // Ensure pnpm is used as package manager
  packageJson.packageManager = 'pnpm@9.15.4';

  // Write back to file
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

/**
 * Generates .env file with random NEXTAUTH_SECRET
 */
export async function generateEnvFile(projectPath: string): Promise<void> {
  const envPath = path.join(projectPath, '.env');
  const secret = generateNextAuthSecret();

  const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${secret}

# Database (if needed)
# DATABASE_URL=

# Add your environment variables here
`;

  await fs.writeFile(envPath, envContent, 'utf-8');
}

/**
 * Cleans up template-specific files and directories
 */
export async function cleanupTemplate(projectPath: string): Promise<void> {
  const itemsToRemove = [
    '.git',
    'cli',
    '.github/workflows', // May want to keep this but remove for now
    '.yarnrc.yml',
    '.yarn',
    'yarn.lock',
  ];

  for (const item of itemsToRemove) {
    const itemPath = path.join(projectPath, item);
    try {
      await fs.remove(itemPath);
    } catch {
      // Ignore errors if item doesn't exist
    }
  }
}

/**
 * Creates a .gitignore file if it doesn't exist
 */
export async function ensureGitignore(projectPath: string): Promise<void> {
  const gitignorePath = path.join(projectPath, '.gitignore');
  const exists = await fs.pathExists(gitignorePath);

  if (!exists) {
    const gitignoreContent = `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/
build
dist

# Production
build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# Typescript
*.tsbuildinfo
next-env.d.ts

# Panda CSS
styled-system
`;
    await fs.writeFile(gitignorePath, gitignoreContent, 'utf-8');
  }
}
