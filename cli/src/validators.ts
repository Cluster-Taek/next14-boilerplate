import fs from 'fs-extra';
import path from 'path';
import validateNpmPackageName from 'validate-npm-package-name';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a project name to ensure it's a valid npm package name
 */
export function validateProjectName(name: string): ValidationResult {
  if (!name || name.trim() === '') {
    return {
      valid: false,
      error: 'Project name cannot be empty',
    };
  }

  const validation = validateNpmPackageName(name);

  if (!validation.validForNewPackages) {
    const errors = [...(validation.errors || []), ...(validation.warnings || [])];
    return {
      valid: false,
      error: `Invalid project name: ${errors.join(', ')}`,
    };
  }

  // Additional checks
  if (name !== name.toLowerCase()) {
    return {
      valid: false,
      error: 'Project name must be lowercase',
    };
  }

  if (/\s/.test(name)) {
    return {
      valid: false,
      error: 'Project name cannot contain spaces',
    };
  }

  return { valid: true };
}

/**
 * Checks if a directory already exists at the given path
 */
export async function checkDirectoryExists(projectPath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(projectPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Checks if a directory is empty
 */
export async function isDirectoryEmpty(projectPath: string): Promise<boolean> {
  try {
    const files = await fs.readdir(projectPath);
    return files.length === 0;
  } catch {
    return true;
  }
}

/**
 * Validates that the target directory can be used
 */
export async function validateTargetDirectory(projectPath: string): Promise<ValidationResult> {
  const exists = await checkDirectoryExists(projectPath);

  if (!exists) {
    return { valid: true };
  }

  const isEmpty = await isDirectoryEmpty(projectPath);

  if (!isEmpty) {
    return {
      valid: false,
      error: `Directory "${path.basename(projectPath)}" already exists and is not empty`,
    };
  }

  return { valid: true };
}
