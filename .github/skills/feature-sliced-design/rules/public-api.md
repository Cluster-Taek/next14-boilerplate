---
title: Use Public API Pattern
impact: HIGH
tags: architecture, public-api, exports, encapsulation
---

## Use Public API Pattern

Each slice must export through a single `index.ts` file. Only import from Public API, never from internal files.

**Incorrect (importing internal files directly):**

```typescript
// ❌ pages/home/ui/HomePage.tsx
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { useAuth } from '@/features/auth/model/useAuth';
import { User } from '@/features/auth/model/types';
```

**Correct (importing from Public API):**

```typescript
// ✅ features/auth/index.ts (Public API)
export { LoginForm } from './ui/LoginForm';
export { RegisterForm } from './ui/RegisterForm';
export { useAuth } from './model/useAuth';
export type { User, AuthState } from './model/types';

// ✅ pages/home/ui/HomePage.tsx
import { LoginForm, useAuth, type User } from '@/features/auth';
```

### Public API Structure Examples

**Feature slice:**
```typescript
// features/auth/index.ts
// Export only what other layers need
export { LoginForm, RegisterForm } from './ui';
export { useAuth, logout } from './model';
export type { User, AuthState } from './model/types';

// Internal implementation details NOT exported:
// - ./lib/validation.ts
// - ./api/authApi.ts (used internally by model)
// - ./config/authConfig.ts
```

**Entity slice:**
```typescript
// entities/user/index.ts
export { UserCard, UserAvatar } from './ui';
export { useUser, useUsers } from './model';
export type { User, UserRole } from './model/types';
```

**Widget slice:**
```typescript
// widgets/header/index.ts
export { Header } from './ui/Header';
export { useHeaderState } from './model';
```

**Shared slice:**
```typescript
// shared/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// shared/lib/index.ts
export { formatDate, formatCurrency } from './formatters';
export { debounce, throttle } from './timing';
```

### Benefits

1. **Encapsulation**: Internal implementation can change without affecting consumers
2. **Clear interface**: Explicit list of what each slice provides
3. **Refactoring safety**: Moving files within slice doesn't break external imports
4. **Dependency tracking**: Easy to see what's being used from each slice

### Guidelines

- Export only what's needed by other layers
- Use named exports for better tree-shaking
- Export types separately with `type` keyword
- Don't re-export external libraries (import them directly where needed)

**Incorrect Public API (over-exporting):**
```typescript
// ❌ features/auth/index.ts
export * from './ui';        // Exports everything, including test utilities
export * from './model';     // Exports internal state implementation
export * from './lib';       // Exports private validation functions
```

**Correct Public API (selective exports):**
```typescript
// ✅ features/auth/index.ts
export { LoginForm, RegisterForm } from './ui';
export { useAuth, logout } from './model';
export type { User } from './model/types';
// Internal utilities remain private
```

Reference: [FSD Public API](https://feature-sliced.design/docs/reference/public-api)
