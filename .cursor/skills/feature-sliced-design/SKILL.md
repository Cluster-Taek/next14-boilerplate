---
name: feature-sliced-design
description: Feature-Sliced Design (FSD) architectural methodology for frontend applications. Use this when structuring code, creating new features, refactoring folder structure, or ensuring proper layer/slice/segment organization. Triggers on tasks involving project structure, file organization, module dependencies, or architectural decisions.
---

# Feature-Sliced Design (FSD)

Front-end 애플리케이션 코드를 구조화하기 위한 아키텍처 방법론으로, 비즈니스 요구사항 변화에 강하고 기능 추가가 용이한 프로젝트 구조를 제공합니다.

## When to Apply

Reference these guidelines when:
- Structuring new features or pages
- Refactoring existing code organization
- Creating reusable components or business logic
- Establishing import rules and dependencies
- Migrating from existing architecture
- Reviewing code for architectural compliance

## Core Concepts

### 1. Layers (레이어) - 7가지 표준화된 폴더

| Layer | Purpose | Examples |
|-------|---------|----------|
| `app` | Application initialization | routing, global styles, providers |
| `pages` | Route-based page components | /home, /profile, /settings |
| `widgets` | Large independent UI blocks | Header, Sidebar, Dashboard |
| `features` | Business value features | AddToCart, UserAuth, CommentForm |
| `entities` | Business entities | User, Product, Order |
| `shared` | Reusable utilities | UI kit, helpers, types |

**Critical Rule**: Upper layers can import from lower layers, but NOT vice versa.

```
app → pages → widgets → features → entities → shared
(Top)                                           (Bottom)
```

### 2. Slices (슬라이스) - Business domain separation

Within each layer, code is separated by business domain:
- `features/auth/`, `features/cart/`, `features/payment/`
- `entities/user/`, `entities/product/`, `entities/order/`

**Critical Rule**: Slices in the same layer CANNOT import from each other.

### 3. Segments (세그먼트) - Technical purpose organization

Within each slice, code is organized by purpose:

| Segment | Purpose |
|---------|---------|
| `ui` | React components, styles |
| `api` | Backend communication, data fetching |
| `model` | State management, types, business logic |
| `lib` | Utility functions |
| `config` | Configuration, feature flags |

### 4. Public API Pattern

Each slice exports through `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { useAuth } from './model/useAuth';
export type { User } from './model/types';
```

**Rule**: Only import from Public API, never from internal files directly.

## Quick Reference - Key Rules

### Layer Dependency Rules
- ✅ `pages` can import from `widgets`, `features`, `entities`, `shared`
- ✅ `features` can import from `entities`, `shared`
- ❌ `entities` CANNOT import from `features`
- ❌ `shared` CANNOT import from any other layer

### Slice Isolation Rules
- ✅ Cross-layer imports (e.g., `features/auth` → `entities/user`)
- ❌ Same-layer imports (e.g., `features/auth` → `features/cart`)

### Import Rules
- ✅ Import from Public API: `from '@/features/auth'`
- ❌ Import internal files: `from '@/features/auth/ui/LoginForm'`

### Segment Organization
```
feature/auth/
├── ui/              # React components
│   └── LoginForm.tsx
├── api/             # API calls
│   └── authApi.ts
├── model/           # State & types
│   ├── useAuth.ts
│   └── types.ts
├── lib/             # Utilities
│   └── validation.ts
└── index.ts         # Public API
```

### Next.js App Router Integration
```
project/
├── app/                   # Next.js routing (file-system based)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Re-export from @/pages/home
│   └── users/
│       └── page.tsx      # Re-export from @/pages/users
│
└── src/                  # FSD Architecture
    ├── app/              # FSD app layer (providers, init)
    │   └── providers/
    ├── pages/            # FSD pages layer (page components)
    │   ├── home/
    │   │   └── ui/HomePage.tsx
    │   └── users/
    │       └── ui/UsersPage.tsx
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
```

**Key Rules**:
- Next.js `app/` folder: routing only, re-export from FSD pages
- FSD `src/app/`: providers, initialization
- FSD `src/pages/`: actual page components with business logic
- Server Components by default, `'use client'` when needed

## Migration Path (5 Steps)

1. **Create Pages layer** - Move route components
2. **Separate Shared code** - Extract non-route-dependent code
3. **Remove cross-imports** - Eliminate page-to-page dependencies
4. **Organize Shared** - Move page-specific code to respective slices
5. **Create Segments** - Group by technical purpose (ui, api, model, lib)

## Benefits

- **Consistency**: Standardized structure across team
- **Scalability**: Easy to add features without breaking existing code
- **Maintainability**: Clear boundaries reduce unintended side effects
- **Onboarding**: New developers understand structure quickly
- **Testability**: Isolated modules are easier to test

## References

- [FSD Documentation](https://feature-sliced.design)
- [FSD Korean Docs](https://feature-sliced.design/kr)
- [Migration Guide](https://feature-sliced.design/kr/docs/guides/migration/from-custom)
