# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.0](https://github.com/Cluster-Taek/create-next-claude-app/compare/v1.1.0...v1.2.0) (2026-01-28)

### Features

* React Query 서버 prefetch 및 hydration 패턴 적용 ([3982b5e](https://github.com/Cluster-Taek/create-next-claude-app/commit/3982b5ee412befff0d3255d62186287c9b1f09f6))

### Bug Fixes

* fix configure eslint-plugin-import and auto-fix on save ([a183844](https://github.com/Cluster-Taek/create-next-claude-app/commit/a183844405ecf0d26599212d9d877aa9c84ca578))

### Documentation

* update docs ([54f05c7](https://github.com/Cluster-Taek/create-next-claude-app/commit/54f05c7f2923f2f1d6019e301ac3122cc0c4a703))

### Code Refactoring

* axios에서 native fetch로 API 클라이언트 마이그레이션 ([c4dbab4](https://github.com/Cluster-Taek/create-next-claude-app/commit/c4dbab461fee6d8b58d4994f6086a1dcb9ed06d4))
* global fetcher 제거 및 런타임 검증 개별 fetcher 적용 ([a4af003](https://github.com/Cluster-Taek/create-next-claude-app/commit/a4af003822964a96b171cebeba705f3437c3a547))
* schemas 폴더와 entities 폴더 통합 ([e7c86f8](https://github.com/Cluster-Taek/create-next-claude-app/commit/e7c86f8e43eb20876e2f62106fe4230f31185e6a))
* separate client/server API with token management ([d891f53](https://github.com/Cluster-Taek/create-next-claude-app/commit/d891f538b9c274362ec6ae782d84487f80818089))
* 클라이언트 인증 로직을 서버 컴포넌트로 마이그레이션 ([0130951](https://github.com/Cluster-Taek/create-next-claude-app/commit/01309511402c544768fc2cdeaf133b3e493c78cf))

## [1.1.0](https://github.com/Cluster-Taek/create-next-claude-app/compare/v1.0.0...v1.1.0) (2026-01-27)

### Features

* change package name ([ab6fd58](https://github.com/Cluster-Taek/create-next-claude-app/commit/ab6fd58870fbf9387dde6ee536904aa929f8e04b))

## 1.0.0 (2026-01-26)

### Features

- Initial release of create-next-claude-app
- Next.js 16 with App Router support
- Feature-Sliced Design architecture scaffolding
- TypeScript configuration
- Tailwind CSS v4 integration
- React Query setup for data fetching
- Zustand for state management
- NextAuth.js for authentication
- React Compiler enabled
- ESLint & Prettier pre-configured
- Husky git hooks setup
- Interactive CLI with project customization options
- Automated dependency installation
- Environment variables generation (NextAuth secrets)
