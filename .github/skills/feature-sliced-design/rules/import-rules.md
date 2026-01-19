---
title: Follow Import Rules and Conventions
impact: HIGH
tags: architecture, imports, dependencies, typescript
---

## Follow Import Rules and Conventions

Use absolute imports with path aliases and respect layer/slice boundaries.

**Incorrect (various import anti-patterns):**

```typescript
// ❌ Relative imports across layers
import { Button } from '../../../shared/ui/Button';

// ❌ Importing from internal files
import { LoginForm } from '@/features/auth/ui/LoginForm';

// ❌ Cross-layer violation
import { addToCart } from '@/features/cart'; // in entities/user

// ❌ Same-layer cross-slice import
import { useAuth } from '@/features/auth'; // in features/payment

// ❌ Lower layer importing from upper layer
import { HomePage } from '@/pages/home'; // in shared/ui
```

**Correct (following all import rules):**

```typescript
// ✅ Absolute imports with path alias
import { Button } from '@/shared/ui';

// ✅ Importing from Public API
import { LoginForm, useAuth } from '@/features/auth';

// ✅ Respecting layer hierarchy
// in features/auth/model/useAuth.ts
import { User } from '@/entities/user';
import { fetchApi } from '@/shared/api';

// ✅ Composing same-layer slices in upper layer
// in pages/checkout/ui/CheckoutPage.tsx
import { LoginForm } from '@/features/auth';
import { CartSummary } from '@/features/cart';
import { PaymentForm } from '@/features/payment';
```

### Path Alias Configuration

**TypeScript (tsconfig.json):**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/widgets/*": ["./src/widgets/*"],
      "@/features/*": ["./src/features/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

**Next.js already supports `@/` alias by default:**
```typescript
// Works out of the box
import { Button } from '@/shared/ui';
```

### Import Organization

Organize imports by layer (top to bottom):

```typescript
// External libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// App layer
import { APP_CONFIG } from '@/app/config';

// Widgets
import { Header } from '@/widgets/header';

// Features
import { useAuth } from '@/features/auth';
import { useCart } from '@/features/cart';

// Entities
import { User } from '@/entities/user';
import { Product } from '@/entities/product';

// Shared
import { Button } from '@/shared/ui';
import { formatDate } from '@/shared/lib';

// Local imports
import { LoginFormStyles } from './LoginForm.styles';
```

### Import Validation

Use ESLint plugins to enforce FSD rules:

```javascript
// eslint.config.mjs (example)
{
  rules: {
    // Enforce layer boundaries
    'boundaries/element-types': ['error', {
      default: 'disallow',
      rules: [
        { from: 'app', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
        { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
        { from: 'widgets', allow: ['features', 'entities', 'shared'] },
        { from: 'features', allow: ['entities', 'shared'] },
        { from: 'entities', allow: ['shared'] },
        { from: 'shared', allow: [] }
      ]
    }],
    // Enforce Public API imports
    'boundaries/entry-point': ['error', {
      default: 'disallow',
      rules: [{ target: ['**'], allow: ['**/index.ts', '**/index.tsx'] }]
    }]
  }
}
```

**Why this matters**: Consistent import patterns make code navigation predictable and prevent architectural violations.

Reference: [FSD Import Rules](https://feature-sliced.design/docs/reference/isolation)
