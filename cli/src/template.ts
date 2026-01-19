import { cleanupTemplate, ensureGitignore, generateEnvFile, updatePackageJson } from './file-operations.js';
import { promptContinueWithoutPnpm, promptOverwrite, promptProjectConfig, promptProjectName } from './prompts.js';
import { formatSuccessMessage, isCommandAvailable } from './utils.js';
import { validateProjectName, validateTargetDirectory } from './validators.js';
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import degit from 'tiged';

export interface CreateProjectOptions {
  projectName?: string;
  install?: boolean;
  git?: boolean;
}

/**
 * Main function to create a new project from template
 */
export async function createProject(options: CreateProjectOptions): Promise<void> {
  try {
    // Step 1: Get and validate project name
    let projectName = options.projectName;

    if (!projectName) {
      projectName = await promptProjectName();
    }

    const nameValidation = validateProjectName(projectName);
    if (!nameValidation.valid) {
      console.error(chalk.red(`Error: ${nameValidation.error}`));
      process.exit(1);
    }

    const projectPath = path.resolve(process.cwd(), projectName);

    // Step 2: Check if directory exists
    const directoryValidation = await validateTargetDirectory(projectPath);
    if (!directoryValidation.valid) {
      const shouldOverwrite = await promptOverwrite(projectName);
      if (!shouldOverwrite) {
        console.log(chalk.yellow('Project creation cancelled.'));
        process.exit(0);
      }
      await fs.remove(projectPath);
    }

    // Step 3: Get project configuration
    console.log();
    const config = await promptProjectConfig();

    // Step 4: Download template
    console.log();
    const downloadSpinner = ora('Downloading template...').start();

    try {
      const emitter = degit('Cluster-Taek/next14-boilerplate', {
        cache: false,
        force: true,
        verbose: false,
      });

      await emitter.clone(projectPath);
      downloadSpinner.succeed(chalk.green('Template downloaded'));
    } catch (error) {
      downloadSpinner.fail(chalk.red('Failed to download template'));
      console.error(chalk.red('Error: Could not download template. Please check your internet connection.'));
      throw error;
    }

    // Step 5: Setup project files
    const setupSpinner = ora('Setting up project files...').start();

    try {
      // Update package.json
      await updatePackageJson(projectPath, {
        name: projectName,
        description: config.description,
        author: config.author,
        repository: config.repository,
      });

      // Generate .env file
      await generateEnvFile(projectPath);

      // Cleanup template-specific files
      await cleanupTemplate(projectPath);

      // Ensure .gitignore exists
      await ensureGitignore(projectPath);

      setupSpinner.succeed(chalk.green('Project files configured'));
    } catch (error) {
      setupSpinner.fail(chalk.red('Failed to setup project files'));
      throw error;
    }

    // Step 6: Install dependencies
    let depsInstalled = false;
    if (config.installDeps && options.install !== false) {
      const hasPnpm = await isCommandAvailable('pnpm');

      if (!hasPnpm) {
        console.log(chalk.yellow('\nWarning: pnpm is not installed.'));
        console.log(chalk.cyan('Install it with: npm install -g pnpm'));

        const shouldContinue = await promptContinueWithoutPnpm();
        if (!shouldContinue) {
          console.log(chalk.yellow('Project creation cancelled.'));
          await fs.remove(projectPath);
          process.exit(0);
        }
      } else {
        console.log(chalk.cyan('Installing dependencies...'));
        console.log();

        try {
          await execa('pnpm', ['install'], {
            cwd: projectPath,
            stdio: 'inherit',
          });

          console.log();
          console.log(chalk.green('✓ Dependencies installed'));
          depsInstalled = true;
        } catch (error) {
          console.log();
          console.log(chalk.red('✖ Failed to install dependencies'));
          if (error instanceof Error) {
            console.log(chalk.red('Error details:', error.message));
          }
          console.log(chalk.yellow('You can install dependencies manually by running: pnpm install'));
        }
      }
    }

    // Step 7: Run pnpm prepare (Husky + Panda CSS)
    if (depsInstalled) {
      console.log();
      console.log(chalk.cyan('Running setup scripts...'));
      console.log();

      try {
        await execa('pnpm', ['prepare'], {
          cwd: projectPath,
          stdio: 'inherit',
        });

        console.log();
        console.log(chalk.green('✓ Setup scripts completed'));
      } catch (error) {
        console.log();
        console.log(chalk.red('✖ Failed to run setup scripts'));
        if (error instanceof Error) {
          console.log(chalk.red('Error details:', error.message));
        }
        console.log(chalk.yellow('You can run setup manually with: pnpm prepare'));
      }
    }

    // Step 8: Initialize git repository
    if (options.git !== false) {
      const hasGit = await isCommandAvailable('git');

      if (hasGit) {
        const gitSpinner = ora('Initializing git repository...').start();

        try {
          await execa('git', ['init'], { cwd: projectPath });
          await execa('git', ['add', '.'], { cwd: projectPath });
          await execa('git', ['commit', '-m', 'Initial commit from create-next-fsd', '--no-verify'], {
            cwd: projectPath,
          });

          gitSpinner.succeed(chalk.green('Git repository initialized'));
        } catch (error) {
          gitSpinner.fail(chalk.red('Failed to initialize git'));
          console.log(chalk.yellow('You can initialize git manually with: git init'));
        }
      } else {
        console.log(chalk.yellow('\nWarning: git is not installed. Skipping git initialization.'));
      }
    }

    // Step 9: Success message
    console.log();
    console.log(chalk.green.bold('✓ Success!'));
    console.log(formatSuccessMessage(projectName, projectPath));

    if (!depsInstalled) {
      console.log(chalk.cyan('Remember to install dependencies:'));
      console.log(chalk.white('  cd ' + projectName));
      console.log(chalk.white('  pnpm install'));
      console.log(chalk.white('  pnpm dev'));
      console.log();
    }
  } catch (error) {
    console.error(chalk.red('\nAn error occurred during project creation:'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
}
