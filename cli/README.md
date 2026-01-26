# create-next-fsd

CLI tool to scaffold new Next.js projects with Feature-Sliced Design architecture.

## Quick Start

```bash
npx create-next-fsd my-app
cd my-app
pnpm dev
```

## Features

- **Next.js** with App Router
- **Feature-Sliced Design** architecture
- **TypeScript** for type safety
- **Panda CSS** for styling
- **NextAuth.js** for authentication
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
├── app/                    # Next.js App Router
├── src/
│   ├── app/               # Application layer (FSD)
│   ├── features/          # Features layer (FSD)
│   ├── shared/            # Shared layer (FSD)
│   └── widgets/           # Widgets layer (FSD)
├── public/                # Static assets
├── styled-system/         # Generated Panda CSS
├── .env                   # Environment variables (with generated secrets)
├── .husky/                # Git hooks
├── panda.config.ts        # Panda CSS configuration
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

- **app/** - Application initialization and routing
- **features/** - User-facing features and business logic
- **widgets/** - Composite UI blocks
- **shared/** - Reusable utilities and components

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

### Styled-system not generated

Run Panda CSS codegen:

```bash
pnpm prepare
```

## Support

For issues and feature requests, visit:
[https://github.com/Cluster-Taek/create-next-fsd/issues](https://github.com/Cluster-Taek/create-next-fsd/issues)

## License

MIT
