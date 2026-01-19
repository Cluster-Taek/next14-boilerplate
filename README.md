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

- [Next.js 14 (App Router)](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Feature-Sliced Design](https://feature-sliced.design) - Architectural methodology
- [Panda CSS](https://panda-css.com)
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
yarn install
yarn prepare
```

```bash
yarn dev
```

(Optional) Run the server to get the data from the json-server:

```bash
yarn server
```

| Key                 | Description                          | Example                                                       |
| ------------------- | ------------------------------------ | ------------------------------------------------------------- |
| NEXTAUTH_URL        | Service URL (usually domain)         | http://localhost:4000                                         |
| NEXTAUTH_SECRET     | Random secret key                    | [random secret in web](https://generate-secret.vercel.app/32) |
| NEXT_PUBLIC_DOMAIN  | Domain                               | http://localhost:4000                                         |
| NEXT_PUBLIC_API_URL | API URL (json-server url in example) | http://localhost:4001                                         |

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

Refer to the [Next.js Best Practices](https://nextjs.org/docs/advanced-features/project-structure) for the project structure.

## VScode Snippets

#### tsx

```tsx
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ITestProps {
  children?: React.ReactNode;
}

const Test = ({ children }: ITestProps) => {
  const testStyle = TestSva();
  return (
    <Box className={testStyle.wrapper}>
      <Box>{children}</Box>
    </Box>
  );
};

export default Test;

const TestSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
```
