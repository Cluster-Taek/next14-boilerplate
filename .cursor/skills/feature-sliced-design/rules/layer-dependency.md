---
title: Follow Layer Dependency Rules
impact: CRITICAL
tags: architecture, layers, dependencies, imports
---

## Follow Layer Dependency Rules

Upper layers can import from lower layers, but NOT vice versa. This creates a unidirectional dependency flow.

**Dependency hierarchy (top to bottom):**
```
app → pages → widgets → features → entities → shared
```

**Incorrect (violates dependency rules):**

```typescript
// ❌ entities/user/model/useUser.ts
import { logout } from '@/features/auth'; // entities cannot import from features

// ❌ shared/ui/Button.tsx
import { User } from '@/entities/user'; // shared cannot import from entities

// ❌ features/auth/api/authApi.ts
import { addToCart } from '@/features/cart'; // same-layer import
```

**Correct (follows dependency rules):**

```typescript
// ✅ features/auth/model/useAuth.ts
import { User } from '@/entities/user'; // features can import from entities
import { fetchApi } from '@/shared/api'; // features can import from shared

// ✅ pages/home/ui/HomePage.tsx
import { Header } from '@/widgets/header'; // pages can import from widgets
import { LoginForm } from '@/features/auth'; // pages can import from features
import { User } from '@/entities/user'; // pages can import from entities

// ✅ widgets/header/ui/Header.tsx
import { LogoutButton } from '@/features/auth'; // widgets can import from features
import { UserAvatar } from '@/entities/user'; // widgets can import from entities
```

### Valid Import Patterns

| From Layer | Can Import From |
|------------|----------------|
| app | pages, widgets, features, entities, shared |
| pages | widgets, features, entities, shared |
| widgets | features, entities, shared |
| features | entities, shared |
| entities | shared |
| shared | (nothing) |

**Why this matters**: Unidirectional dependencies prevent circular dependencies and make the codebase easier to understand, test, and refactor.

**Exception**: Cross-references within the same layer are handled through composition in upper layers, NOT direct imports.

Reference: [FSD Import Rules](https://feature-sliced.design/docs/reference/isolation)
