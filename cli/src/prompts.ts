import { formatAuthor, getGitEmail, getGitUser } from './utils.js';
import { validateProjectName } from './validators.js';
import inquirer from 'inquirer';

export interface ProjectConfig {
  projectName: string;
  description?: string;
  author?: string;
  repository?: string;
  installDeps: boolean;
}

/**
 * Prompts for project name if not provided via CLI args
 */
export async function promptProjectName(defaultName?: string): Promise<string> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: defaultName || 'my-next-app',
      validate: (input: string) => {
        const result = validateProjectName(input);
        return result.valid || result.error || 'Invalid project name';
      },
    },
  ]);

  return answers.projectName;
}

/**
 * Prompts for confirmation to overwrite existing directory
 */
export async function promptOverwrite(projectName: string): Promise<boolean> {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `Directory "${projectName}" already exists. Overwrite?`,
      default: false,
    },
  ]);

  return answers.overwrite;
}

/**
 * Prompts for project configuration
 */
export async function promptProjectConfig(): Promise<Omit<ProjectConfig, 'projectName'>> {
  // Get git config for defaults
  const gitUser = await getGitUser();
  const gitEmail = await getGitEmail();
  const defaultAuthor = formatAuthor(gitUser || undefined, gitEmail || undefined);

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Project description (optional):',
      default: '',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author (optional):',
      default: defaultAuthor || '',
    },
    {
      type: 'input',
      name: 'repository',
      message: 'Git repository URL (optional):',
      default: '',
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Install dependencies with pnpm?',
      default: true,
    },
  ]);

  return {
    description: answers.description || undefined,
    author: answers.author || undefined,
    repository: answers.repository || undefined,
    installDeps: answers.installDeps,
  };
}

/**
 * Prompts for continuing without pnpm
 */
export async function promptContinueWithoutPnpm(): Promise<boolean> {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'pnpm is not installed. Continue without installing dependencies?',
      default: true,
    },
  ]);

  return answers.continue;
}
