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

## Support

For issues and feature requests, visit:
[https://github.com/Cluster-Taek/create-next-fsd/issues](https://github.com/Cluster-Taek/create-next-fsd/issues)

## License

MIT
