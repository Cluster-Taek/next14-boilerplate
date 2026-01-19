#!/usr/bin/env node
import { createProject } from './template.js';
import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get package.json for version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = await fs.readJson(packageJsonPath);

const program = new Command();

program
  .name('create-next-fsd')
  .description('Create a new Next.js project with Feature-Sliced Design architecture')
  .version(packageJson.version, '-v, --version', 'Output the current version')
  .argument('[project-name]', 'Name of the project to create')
  .option('--no-install', 'Skip dependency installation')
  .option('--no-git', 'Skip git initialization')
  .action(async (projectName: string | undefined, options: any) => {
    console.log();
    console.log(chalk.bold.cyan('create-next-fsd') + chalk.gray(' v' + packageJson.version));
    console.log();

    try {
      await createProject({
        projectName,
        install: options.install,
        git: options.git,
      });
    } catch (error) {
      console.error(chalk.red('Failed to create project'));
      process.exit(1);
    }
  });

program.on('--help', () => {
  console.log();
  console.log('Examples:');
  console.log('  $ npx create-next-fsd my-app');
  console.log('  $ npx create-next-fsd my-app --no-install');
  console.log('  $ npx create-next-fsd my-app --no-git');
  console.log();
});

program.parse(process.argv);
