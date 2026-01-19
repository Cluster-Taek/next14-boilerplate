---
title: Isolate Slices Within Same Layer
impact: HIGH
tags: architecture, slices, isolation, coupling
---

## Isolate Slices Within Same Layer

Slices in the same layer CANNOT import from each other. This ensures high cohesion within slices and low coupling between them.

**Incorrect (cross-slice imports in same layer):**

```typescript
// ❌ features/auth/model/useAuth.ts
import { addToCart } from '@/features/cart'; // same-layer import forbidden

// ❌ features/payment/api/paymentApi.ts
import { useCart } from '@/features/cart'; // same-layer import forbidden

// ❌ entities/order/model/useOrder.ts
import { getUser } from '@/entities/user'; // same-layer import forbidden
```

**Correct (compose in upper layers):**

```typescript
// ✅ pages/checkout/ui/CheckoutPage.tsx
import { LoginForm } from '@/features/auth';
import { CartSummary } from '@/features/cart';
import { PaymentForm } from '@/features/payment';

export const CheckoutPage = () => {
  return (
    <div>
      <LoginForm />
      <CartSummary />
      <PaymentForm />
    </div>
  );
};

// ✅ widgets/user-dashboard/ui/Dashboard.tsx
import { useAuth } from '@/features/auth';
import { useOrders } from '@/entities/order';
import { useUser } from '@/entities/user';

export const Dashboard = () => {
  const { user } = useAuth();
  const { data: userData } = useUser(user.id);
  const { data: orders } = useOrders(user.id);

  return <div>{/* Compose multiple features */}</div>;
};
```

**If shared logic is needed between slices:**

Option 1: Move to lower layer (entities or shared)
```typescript
// ✅ entities/cart/lib/calculateTotal.ts
export const calculateTotal = (items) => { /* ... */ };

// ✅ features/cart/model/useCart.ts
import { calculateTotal } from '@/entities/cart';

// ✅ features/payment/model/usePayment.ts
import { calculateTotal } from '@/entities/cart';
```

Option 2: Duplicate code (acceptable for small utilities)
```typescript
// features/auth/lib/validation.ts
export const validateEmail = (email) => { /* ... */ };

// features/user-settings/lib/validation.ts
export const validateEmail = (email) => { /* ... */ }; // OK to duplicate
```

**Why this matters**: Slice isolation prevents tight coupling, making features independently testable and easier to modify or remove.

Reference: [FSD Slices](https://feature-sliced.design/docs/reference/slices-segments#slices)
