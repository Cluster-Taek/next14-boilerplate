---
title: Use Standardized Layer Structure
impact: CRITICAL
tags: architecture, layers, structure, organization
---

## Use Standardized Layer Structure

FSD defines 7 standardized layers that organize code from global (app) to reusable (shared).

**Incorrect (custom folder structure):**

```
src/
├── components/
├── utils/
├── pages/
├── contexts/
└── services/
```

**Correct (FSD layer structure):**

```
src/
├── app/           # Application initialization, routing, providers
├── pages/         # Route-based page components
├── widgets/       # Large independent UI blocks
├── features/      # Business value features
├── entities/      # Business entities
└── shared/        # Reusable utilities, UI kit, configs
```

### Layer Purposes

**app** - Entry point, global configs, routing, providers
- `providers/` - React context providers
- `styles/` - Global CSS
- `router/` - Route configuration

**pages** - Represents application routes
- `home/` - Homepage
- `profile/` - User profile page
- `settings/` - Settings page

**widgets** - Composite UI blocks that can be reused across pages
- `header/` - Site header
- `sidebar/` - Navigation sidebar
- `footer/` - Site footer

**features** - User scenarios providing business value
- `auth/` - Authentication (login, register, logout)
- `add-to-cart/` - Shopping cart functionality
- `comment-form/` - Comment submission

**entities** - Business domain models
- `user/` - User entity
- `product/` - Product entity
- `order/` - Order entity

**shared** - Reusable code with no business logic
- `ui/` - UI kit components (Button, Input, Modal)
- `lib/` - Helper functions, utilities
- `api/` - API client configuration
- `config/` - Global configuration

**Benefits**: Standardized structure enables consistency across teams and projects, making code navigation intuitive.

Reference: [FSD Layers Documentation](https://feature-sliced.design/docs/reference/layers)
