This is a [Next.js](https://nextjs.org) boilerplate project with Feature-Sliced Design architecture.

## Quick Start

The easiest way to create a new project with this boilerplate:

```bash
npx create-next-fsd my-app
cd my-app
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

For more CLI options, see [CLI documentation](./cli/README.md).

## Features

- [Next.js 16 (App Router)](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Feature-Sliced Design](https://feature-sliced.design) - Architectural methodology
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs) - State management
- [Auth.js](https://authjs.dev)
- [JSON Server](https://github.com/typicode/json-server)
- [Tanstack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com)
- [Motion](https://motion.dev)
- [React Icons](https://react-icons.github.io/react-icons)

## Manual Setup

If you want to clone this repository directly instead of using the CLI:

First, run the development server:

```bash
cp .env.example .env
pnpm install
pnpm prepare
```

```bash
pnpm dev
```

(Optional) Run the server to get the data from the json-server:

```bash
pnpm server
```

| Key                 | Description                          | Example                                                       |
| ------------------- | ------------------------------------ | ------------------------------------------------------------- |
| NEXTAUTH_URL        | Service URL (usually domain)         | http://localhost:3000                                         |
| NEXTAUTH_SECRET     | Random secret key                    | [random secret in web](https://generate-secret.vercel.app/32) |
| NEXT_PUBLIC_DOMAIN  | Domain                               | http://localhost:3000                                         |
| NEXT_PUBLIC_API_URL | API URL (json-server url in example) | http://localhost:4001                                         |

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

This project follows the [Feature-Sliced Design](https://feature-sliced.design) methodology. The structure is organized into layers:

- `app/` - Next.js App Router pages
- `src/app/` - Application layer (providers, layouts)
- `src/entities/` - Business entities
- `src/features/` - User features and interactions
- `src/shared/` - Reusable shared code
- `src/widgets/` - Large composite components

Refer to the [Feature-Sliced Design documentation](https://feature-sliced.design/docs/get-started/overview) for more details on the architecture.

## Development Tools

This project includes several development tools:

- **ESLint** - Code linting with Next.js and React best practices
- **Prettier** - Code formatting with import sorting
- **TypeScript** - Type checking
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files
- **Commitlint** - Conventional commit message linting
- **Steiger** - FSD architecture linting

Run checks manually:

```bash
pnpm lint        # Run ESLint
pnpm format      # Format code with Prettier
pnpm type-check  # Run TypeScript type checking
pnpm fsd         # Check FSD architecture compliance
```
