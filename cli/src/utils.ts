import crypto from 'crypto';
import { execa } from 'execa';

/**
 * Checks if a command is available in the system PATH
 */
export async function isCommandAvailable(command: string): Promise<boolean> {
  try {
    await execa('which', [command]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the git user name from git config
 */
export async function getGitUser(): Promise<string | null> {
  try {
    const { stdout } = await execa('git', ['config', 'user.name']);
    return stdout.trim();
  } catch {
    return null;
  }
}

/**
 * Gets the git user email from git config
 */
export async function getGitEmail(): Promise<string | null> {
  try {
    const { stdout } = await execa('git', ['config', 'user.email']);
    return stdout.trim();
  } catch {
    return null;
  }
}

/**
 * Generates a random secret for NextAuth
 */
export function generateNextAuthSecret(): string {
  return crypto.randomBytes(32).toString('base64');
}

/**
 * Formats a success message with styling
 */
export function formatSuccessMessage(projectName: string, projectPath: string): string {
  return `
Success! Created ${projectName} at ${projectPath}

Next steps:
  1. cd ${projectName}
  2. pnpm dev
  3. pnpm mock (in a new terminal for mock API server)

Start developing:
  - Edit app/page.tsx to get started
  - Add features in src/features/
  - Create shared components in src/shared/
  - Mock API server runs on http://localhost:4001

Documentation:
  - Feature-Sliced Design: https://feature-sliced.design
  - Next.js 16: https://nextjs.org/docs
  - Tailwind CSS: https://tailwindcss.com

Happy coding!
`;
}

/**
 * Formats author string from name and email
 */
export function formatAuthor(name?: string, email?: string): string | undefined {
  if (!name && !email) return undefined;
  if (name && email) return `${name} <${email}>`;
  if (name) return name;
  if (email) return email;
  return undefined;
}
