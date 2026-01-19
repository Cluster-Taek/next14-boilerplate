---
title: Integrate with Next.js App Router
impact: HIGH
tags: nextjs, app-router, server-components, routing
---

## Integrate with Next.js App Router

FSD와 Next.js App Router를 함께 사용할 때는 폴더 구조를 명확히 분리하고, 특수 파일을 적절히 배치해야 합니다.

**Incorrect (FSD와 App Router 혼재):**

```
src/
├── app/                    # ❌ FSD app layer와 Next.js app 폴더 혼용
│   ├── page.tsx            # Next.js 라우팅
│   ├── providers.tsx       # FSD 초기화
│   └── users/
│       └── page.tsx        # 비즈니스 로직 직접 포함
└── pages/                  # ❌ 혼란스러운 구조
    └── UsersPage.tsx
```

**Correct (명확한 분리):**

```
app/                        # ✅ Next.js App Router (파일 시스템 라우팅만)
├── layout.tsx
├── page.tsx
├── error.tsx
└── users/
    ├── page.tsx           # Re-export from FSD pages
    └── layout.tsx

src/
├── app/                   # ✅ FSD app layer (초기화, providers)
│   └── providers/
│       ├── index.ts
│       └── query-provider.tsx
└── pages/                 # ✅ FSD pages layer (페이지 컴포넌트)
    ├── home/
    │   └── ui/
    │       └── HomePage.tsx
    └── users/
        └── ui/
            └── UsersPage.tsx
```

### 폴더 구조 분리 원칙

**1. Next.js `app/` 폴더 (프로젝트 루트)**
- 파일 시스템 라우팅만 담당
- 특수 파일만 배치: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- 비즈니스 로직 포함 금지

**2. FSD `src/app/` 레이어**
- 앱 초기화 코드
- Provider 컴포넌트
- 전역 설정

**3. FSD `src/pages/` 레이어**
- 실제 페이지 컴포넌트 구현
- 비즈니스 로직 포함
- Features, Widgets 조합

### Re-export 패턴

Next.js `app/` 폴더의 `page.tsx`는 FSD `pages/` 레이어에서 re-export만 수행합니다.

**app/page.tsx (Next.js 라우팅):**
```typescript
// ✅ FSD pages 레이어에서 import만
export { HomePage as default } from '@/pages/home';

// 또는 metadata만 추가
export const metadata = {
  title: 'Home',
};

export { HomePage as default } from '@/pages/home';
```

**src/pages/home/ui/HomePage.tsx (FSD 페이지 컴포넌트):**
```typescript
// ✅ 실제 비즈니스 로직 구현
import { LoginForm } from '@/features/auth';
import { ProductList } from '@/widgets/product-list';

export const HomePage = () => {
  return (
    <div>
      <LoginForm />
      <ProductList />
    </div>
  );
};
```

**src/pages/home/index.ts (Public API):**
```typescript
export { HomePage } from './ui/HomePage';
```

### Server Components vs Client Components

**Server Components (기본)**
```typescript
// ✅ src/pages/users/ui/UsersPage.tsx
// 'use client' 없음 → Server Component
import { UserList } from '@/widgets/user-list';

export const UsersPage = async () => {
  // 서버에서 직접 데이터 fetch 가능
  const users = await fetchUsers();

  return <UserList users={users} />;
};
```

**Client Components (상태/이벤트 필요 시)**
```typescript
// ✅ src/features/auth/ui/LoginForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // 클라이언트 로직
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Layout 구성

**app/layout.tsx (Root Layout):**
```typescript
// ✅ FSD app layer에서 providers import
import { Providers } from '@/app/providers';
import '@/app/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**src/app/providers/index.ts (FSD app layer):**
```typescript
// ✅ Provider 조합
export { Providers } from './Providers';
```

**src/app/providers/Providers.tsx:**
```typescript
'use client';

import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
```

### Route Groups 활용

라우트 그룹을 사용하여 레이아웃을 공유하되, URL에는 영향을 주지 않습니다.

```
app/
├── (main)/              # 메인 레이아웃 그룹
│   ├── layout.tsx       # Header + Footer
│   ├── page.tsx         # / 경로
│   └── about/
│       └── page.tsx     # /about 경로
├── (auth)/              # 인증 레이아웃 그룹
│   ├── layout.tsx       # 간단한 레이아웃
│   ├── login/
│   │   └── page.tsx     # /login 경로
│   └── register/
│       └── page.tsx     # /register 경로
└── (dashboard)/         # 대시보드 레이아웃 그룹
    ├── layout.tsx       # Sidebar + Header
    └── settings/
        └── page.tsx     # /settings 경로
```

**app/(main)/layout.tsx:**
```typescript
// ✅ Widgets 레이어에서 import
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### 특수 파일 배치

**Error Boundary (app/error.tsx):**
```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/shared/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
```

**Loading UI (app/loading.tsx):**
```typescript
// ✅ shared/ui에서 import
import { Spinner } from '@/shared/ui/spinner';

export default function Loading() {
  return <Spinner />;
}
```

**Not Found (app/not-found.tsx):**
```typescript
// ✅ shared/ui에서 import
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>페이지를 찾을 수 없습니다</h2>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
```

### API Routes 배치

API Routes는 `app/api/` 폴더에 배치하되, 실제 비즈니스 로직은 분리합니다.

**app/api/users/route.ts:**
```typescript
// ✅ FSD entities에서 import
import { userService } from '@/entities/user';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await userService.getUsers();
  return NextResponse.json(users);
}
```

**src/entities/user/api/userService.ts:**
```typescript
// ✅ 실제 비즈니스 로직 구현
import { fetchApi } from '@/shared/api/base';

export const userService = {
  async getUsers() {
    return fetchApi.get('/api/users');
  },
};
```

### Metadata 관리

페이지별 metadata는 Next.js `app/` 폴더에서만 export합니다.

**app/users/page.tsx:**
```typescript
import type { Metadata } from 'next';
import { UsersPage } from '@/pages/users';

// ✅ Metadata는 Next.js app/ 폴더에서
export const metadata: Metadata = {
  title: 'Users',
  description: 'User management page',
};

// ✅ 컴포넌트는 FSD pages/에서 re-export
export default UsersPage;
```

### Dynamic Routes

**app/users/[id]/page.tsx:**
```typescript
import { UserDetailPage } from '@/pages/user-detail';

export default function Page({ params }: { params: { id: string } }) {
  return <UserDetailPage userId={params.id} />;
}
```

**src/pages/user-detail/ui/UserDetailPage.tsx:**
```typescript
interface UserDetailPageProps {
  userId: string;
}

export const UserDetailPage = ({ userId }: UserDetailPageProps) => {
  // 실제 구현
  return <div>User {userId}</div>;
};
```

### Parallel Routes와 Intercepting Routes

복잡한 라우팅 기능도 FSD와 함께 사용 가능합니다.

**app/@modal/(.)photo/[id]/page.tsx (Intercepting Route):**
```typescript
import { PhotoModal } from '@/features/photo-modal';

export default function PhotoModalPage({ params }: { params: { id: string } }) {
  return <PhotoModal photoId={params.id} />;
}
```

**src/features/photo-modal/ui/PhotoModal.tsx:**
```typescript
'use client';

interface PhotoModalProps {
  photoId: string;
}

export const PhotoModal = ({ photoId }: PhotoModalProps) => {
  // 모달 구현
  return <div>Photo {photoId}</div>;
};
```

### 전체 구조 예시

```
project/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # / → re-export from @/pages/home
│   ├── loading.tsx                   # Global loading
│   ├── error.tsx                     # Global error
│   ├── not-found.tsx                 # 404 page
│   ├── (main)/                       # Main layout group
│   │   ├── layout.tsx
│   │   ├── about/
│   │   │   └── page.tsx              # /about
│   │   └── products/
│   │       ├── page.tsx              # /products
│   │       └── [id]/
│   │           └── page.tsx          # /products/[id]
│   ├── (auth)/                       # Auth layout group
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx              # /login
│   │   └── register/
│   │       └── page.tsx              # /register
│   └── api/                          # API routes
│       └── users/
│           └── route.ts
│
└── src/                              # FSD Architecture
    ├── app/                          # FSD app layer
    │   ├── providers/
    │   │   ├── index.ts
    │   │   ├── Providers.tsx
    │   │   ├── query-provider.tsx
    │   │   └── auth-provider.tsx
    │   └── styles/
    │       └── globals.css
    │
    ├── pages/                        # FSD pages layer
    │   ├── home/
    │   │   ├── ui/
    │   │   │   └── HomePage.tsx
    │   │   └── index.ts
    │   ├── about/
    │   │   ├── ui/
    │   │   │   └── AboutPage.tsx
    │   │   └── index.ts
    │   ├── products/
    │   │   ├── ui/
    │   │   │   └── ProductsPage.tsx
    │   │   └── index.ts
    │   ├── product-detail/
    │   │   ├── ui/
    │   │   │   └── ProductDetailPage.tsx
    │   │   └── index.ts
    │   ├── login/
    │   │   ├── ui/
    │   │   │   └── LoginPage.tsx
    │   │   └── index.ts
    │   └── register/
    │       ├── ui/
    │       │   └── RegisterPage.tsx
    │       └── index.ts
    │
    ├── widgets/                      # FSD widgets layer
    │   ├── header/
    │   ├── footer/
    │   └── product-list/
    │
    ├── features/                     # FSD features layer
    │   ├── auth/
    │   ├── product-search/
    │   └── photo-modal/
    │
    ├── entities/                     # FSD entities layer
    │   ├── user/
    │   └── product/
    │
    └── shared/                       # FSD shared layer
        ├── ui/
        ├── api/
        ├── lib/
        ├── config/
        └── types/
```

### 주의사항

1. **Next.js `app/` 폴더는 라우팅만**: 비즈니스 로직을 포함하지 않고 FSD에서 re-export만 수행
2. **Server Component 기본**: 'use client'가 필요한 경우만 명시적으로 추가
3. **Metadata는 Next.js app/에서만**: SEO 관련 설정은 app/ 폴더의 page.tsx에서 export
4. **API Routes는 별도**: app/api/는 FSD 구조 밖에 위치하되, 실제 로직은 FSD 레이어에서 import
5. **Layout 컴포넌트는 widgets**: Header, Footer 등 레이아웃 컴포넌트는 FSD widgets 레이어에 배치

**Why this matters**: Next.js App Router의 파일 시스템 라우팅과 FSD의 레이어 구조를 명확히 분리하면, 각각의 장점을 모두 활용할 수 있습니다.

Reference: [FSD with Next.js](https://feature-sliced.design/kr/docs/guides/tech/with-nextjs)
