/**
 * @see https://nextjs.org/docs/app/api-reference/config/eslint
 */
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  // Next.js 공식 설정 (React, Hooks, Next.js 규칙 포함)
  ...nextVitals,
  ...nextTs,

  // Prettier와의 충돌 방지
  prettier,

  // React Compiler
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },

  // 프로젝트별 커스텀 규칙
  {
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // 일반
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },

  // CommonJS 파일 설정
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // 무시할 파일
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'out/**',
    'build/**',
    '.pnpm-store/**',
    'next-env.d.ts',
    'commitlint.config.mjs',
    'cli/**',
  ]),
]);

export default eslintConfig;
