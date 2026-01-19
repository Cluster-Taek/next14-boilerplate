---
title: Migrate to FSD Step-by-Step
impact: MEDIUM
tags: migration, refactoring, architecture, guide
---

## Migrate to FSD Step-by-Step

Gradual migration from existing structure to Feature-Sliced Design.

### Prerequisites

- Team consensus on migration
- Understanding of current pain points
- Estimated timeline (2-4 weeks for medium projects)

### 5-Step Migration Process

**Step 1: Create Pages Layer**

Move route components to `pages/` layer:

```
Before:
src/
└── app/
    ├── page.tsx
    ├── users/page.tsx
    └── settings/page.tsx

After:
src/
├── app/
│   └── layout.tsx          # Keep routing infrastructure
└── pages/
    ├── home/
    │   └── ui/
    │       └── HomePage.tsx
    ├── users/
    │   └── ui/
    │       └── UsersPage.tsx
    └── settings/
        └── ui/
            └── SettingsPage.tsx
```

**Step 2: Separate Shared Code**

Move non-route-dependent code to `shared/`:

```
Before:
src/
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── lib/
│   └── utils.ts
└── types/
    └── common.ts

After:
src/
└── shared/
    ├── ui/
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   └── Modal.tsx
    ├── lib/
    │   └── utils.ts
    └── model/
        └── types.ts
```

**Step 3: Remove Cross-Imports**

Eliminate page-to-page dependencies:

```typescript
// ❌ Before: pages/users imports from pages/settings
// pages/users/ui/UsersPage.tsx
import { SettingsButton } from '@/pages/settings';

// ✅ After: Extract to widgets or features
// widgets/settings-button/ui/SettingsButton.tsx
export const SettingsButton = () => { /* ... */ };

// pages/users/ui/UsersPage.tsx
import { SettingsButton } from '@/widgets/settings-button';
```

If needed, duplicate code to maintain independence:

```typescript
// Option 1: Move to shared
// shared/ui/SettingsButton.tsx

// Option 2: Duplicate in each page (acceptable for small code)
// pages/users/ui/LocalSettingsButton.tsx
// pages/settings/ui/LocalSettingsButton.tsx
```

**Step 4: Organize Shared Layer**

Move page-specific code back to respective pages:

```
Before:
shared/
├── ui/
│   ├── Button.tsx         # Used everywhere
│   ├── UserCard.tsx       # Only used in users page
│   └── SettingsForm.tsx   # Only used in settings page

After:
shared/
└── ui/
    └── Button.tsx         # Only truly shared components

pages/
├── users/
│   └── ui/
│       └── UserCard.tsx   # Moved to users page
└── settings/
    └── ui/
        └── SettingsForm.tsx  # Moved to settings page
```

**Step 5: Create Segments**

Organize code by technical purpose:

```
Before:
pages/users/
└── ui/
    ├── UsersPage.tsx
    ├── userApi.ts        # Mixed organization
    ├── useUsers.ts
    └── types.ts

After:
pages/users/
├── ui/
│   └── UsersPage.tsx
├── api/
│   └── usersApi.ts
├── model/
│   ├── useUsers.ts
│   └── types.ts
└── index.ts            # Public API
```

### Optional Steps (After Basic Migration)

**Step 6: Extract Features**

Identify reusable business features:

```
Before:
pages/users/
└── ui/
    ├── UsersPage.tsx
    └── AddUserButton.tsx    # Reusable feature

After:
features/
└── user-create/
    ├── ui/
    │   └── AddUserButton.tsx
    └── model/
        └── useCreateUser.ts

pages/users/
└── ui/
    └── UsersPage.tsx
```

**Step 7: Extract Entities**

Create business entity slices:

```
entities/
└── user/
    ├── ui/
    │   ├── UserCard.tsx
    │   └── UserAvatar.tsx
    ├── model/
    │   ├── types.ts
    │   └── userSchema.ts
    └── index.ts
```

**Step 8: Extract Widgets**

Group composite UI blocks:

```
widgets/
└── header/
    ├── ui/
    │   └── Header.tsx
    ├── model/
    │   └── useHeaderState.ts
    └── index.ts
```

### Migration Checklist

- [ ] Team agrees on FSD adoption
- [ ] Created `pages/` layer
- [ ] Moved shared code to `shared/`
- [ ] Removed all page-to-page imports
- [ ] Organized `shared/` (removed page-specific code)
- [ ] Created segments (ui, api, model, lib, config)
- [ ] Added Public API (`index.ts`) to each slice
- [ ] Updated imports to use Public API
- [ ] (Optional) Extracted features
- [ ] (Optional) Extracted entities
- [ ] (Optional) Extracted widgets
- [ ] Updated documentation
- [ ] Configured ESLint rules for FSD

### Common Pitfalls

1. **Trying to migrate everything at once**: Migrate incrementally, one page at a time
2. **Creating too many layers**: Start with pages + shared, add others as needed
3. **Over-abstracting**: Don't create slices for code used in only one place
4. **Skipping Public API**: Always create `index.ts` for each slice
5. **Not documenting**: Update README with new structure

### Success Metrics

- New developers onboard faster
- Easier to add new features
- Fewer unintended side effects when changing code
- Clear ownership of code modules

Reference: [FSD Migration Guide](https://feature-sliced.design/kr/docs/guides/migration/from-custom)
