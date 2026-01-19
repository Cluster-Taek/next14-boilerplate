---
title: Organize Code by Technical Segments
impact: MEDIUM
tags: architecture, segments, organization, structure
---

## Organize Code by Technical Segments

Within each slice, organize code by technical purpose using standardized segments.

**Incorrect (no clear organization):**

```
features/auth/
├── LoginForm.tsx
├── authApi.ts
├── useAuth.ts
├── types.ts
├── validation.ts
└── config.ts
```

**Correct (organized by segments):**

```
features/auth/
├── ui/              # React components, styles
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── api/             # Backend communication
│   └── authApi.ts
├── model/           # State, types, business logic
│   ├── useAuth.ts
│   ├── types.ts
│   └── authSlice.ts
├── lib/             # Utility functions
│   └── validation.ts
├── config/          # Configuration
│   └── authConfig.ts
└── index.ts         # Public API
```

### Segment Purposes

**ui** - Visual components and their styles
```typescript
// features/auth/ui/LoginForm.tsx
export const LoginForm = () => {
  return <form>{/* JSX */}</form>;
};
```

**api** - Backend communication, data fetching
```typescript
// features/auth/api/authApi.ts
export const loginUser = async (credentials) => {
  return fetch('/api/login', { /* ... */ });
};
```

**model** - State management, types, business logic
```typescript
// features/auth/model/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState(null);
  // Business logic
  return { user, login, logout };
};

// features/auth/model/types.ts
export interface User {
  id: string;
  email: string;
}
```

**lib** - Helper functions, utilities (specific to this slice)
```typescript
// features/auth/lib/validation.ts
export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

**config** - Configuration, feature flags
```typescript
// features/auth/config/authConfig.ts
export const AUTH_CONFIG = {
  sessionTimeout: 3600,
  maxLoginAttempts: 5,
};
```

**Segment Guidelines:**

- `ui` is REQUIRED for visual components
- `api` is used when communicating with backend
- `model` contains state and types (often required)
- `lib` and `config` are optional, use when needed
- Don't create segments for 1-2 files, keep flat structure

**Why this matters**: Standardized segments make it easy to locate code by technical purpose, improving developer experience.

Reference: [FSD Segments](https://feature-sliced.design/docs/reference/slices-segments#segments)
