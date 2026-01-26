# create-next-fsd

CLI tool to scaffold new Next.js projects with Feature-Sliced Design architecture.

## Quick Start

```bash
npx create-next-fsd my-app
cd my-app
pnpm dev
```

## Features

- **Next.js 16** with App Router
- **Feature-Sliced Design** architecture
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **React Query** for data fetching
- **Zustand** for state management
- **NextAuth.js** for authentication
- **React Compiler** enabled
- **ESLint & Prettier** configured
- **Husky** for git hooks
- **Automated setup** - everything configured out of the box

## Usage

### Interactive Mode

```bash
npx create-next-fsd
```

You'll be prompted for:

- Project name
- Project description (optional)
- Author name (optional, defaults to git config)
- Git repository URL (optional)
- Install dependencies (yes/no)

### With Project Name

```bash
npx create-next-fsd my-app
```

### CLI Options

```bash
npx create-next-fsd my-app --no-install  # Skip dependency installation
npx create-next-fsd my-app --no-git      # Skip git initialization
```

## Requirements

- **Node.js** >= 20.9.0
- **pnpm** (recommended) - Install with `npm install -g pnpm`
- **git** (optional) - For git initialization

## What Gets Created

```
my-app/
├── src/
│   ├── app/               # Application layer (FSD)
│   ├── entities/          # Entities layer (FSD)
│   ├── features/          # Features layer (FSD)
│   ├── shared/            # Shared layer (FSD)
│   └── widgets/           # Widgets layer (FSD)
├── public/                # Static assets
├── .env                   # Environment variables (with generated secrets)
├── .husky/                # Git hooks
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## After Creation

Your project is ready to go:

```bash
cd my-app
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

## Architecture

This template follows **Feature-Sliced Design** methodology:

- **app/** - Application initialization, providers, and routing
- **entities/** - Business entities and data models
- **features/** - User-facing features and business logic
- **widgets/** - Composite UI blocks
- **shared/** - Reusable utilities, components, and UI primitives

Learn more: [Feature-Sliced Design](https://feature-sliced.design)

## Troubleshooting

### pnpm not found

Install pnpm globally:

```bash
npm install -g pnpm
```

Or use npm/yarn instead (update scripts in package.json).

### Template download fails

Check your internet connection. The template is downloaded from GitHub.

### Dependencies installation fails

Try running manually:

```bash
cd my-app
pnpm install
pnpm prepare
```

### Git hooks not working

Make sure Husky is set up:

```bash
pnpm prepare
```

## Development

### Release Process

This project uses **semantic-release** for automated version management and publishing. Releases are triggered automatically when changes are merged to the `release` branch.

#### Version Bump Rules

Commits following [Conventional Commits](https://www.conventionalcommits.org/) determine version bumps:

- **Major** (1.0.0 → 2.0.0): `BREAKING CHANGE:` in commit body or `feat!:`/`fix!:`
- **Minor** (1.0.0 → 1.1.0): `feat:` commits
- **Patch** (1.0.0 → 1.0.1): `fix:`, `perf:`, `revert:` commits
- **No Release**: `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`, `chore:`

#### Standard Workflow

1. **Develop on main branch** with conventional commits:

   ```bash
   git commit -m "feat: add new template option"
   git commit -m "fix: resolve dependency issue"
   ```

2. **Create PR from main to release** and merge

3. **Automated release process**:
   - Analyzes commits since last release
   - Determines version bump (major/minor/patch)
   - Updates `package.json` version
   - Generates/updates `CHANGELOG.md`
   - Builds and publishes to npm
   - Creates Git tag (e.g., `v1.1.0`)
   - Creates GitHub Release with notes
   - Commits changes back to release branch

#### Hotfix Workflow

For urgent production fixes:

1. Create hotfix branch from `release`:

   ```bash
   git checkout release
   git checkout -b hotfix/fix-critical-bug
   ```

2. Make fix with conventional commit:

   ```bash
   git commit -m "fix: resolve critical installation error"
   ```

3. Create PR to `release` and merge

4. Automated patch release (1.2.3 → 1.2.4)

#### Manual Testing Before Release

Test locally before merging to release:

```bash
# In cli directory
pnpm build
pnpm link --global

# Test globally
create-next-fsd test-app
cd test-app
pnpm dev

# Cleanup
pnpm unlink --global create-next-fsd
```

#### Commit Message Examples

```bash
# Feature (minor bump)
git commit -m "feat: add TypeScript strict mode option"

# Bug fix (patch bump)
git commit -m "fix: correct package.json template generation"

# Breaking change (major bump)
git commit -m "feat!: change CLI argument structure

BREAKING CHANGE: --no-install flag renamed to --skip-install"

# No release
git commit -m "docs: update README examples"
git commit -m "chore: update dependencies"
```

## Support

For issues and feature requests, visit:
[https://github.com/Cluster-Taek/create-next-fsd/issues](https://github.com/Cluster-Taek/create-next-fsd/issues)

## License

MIT
