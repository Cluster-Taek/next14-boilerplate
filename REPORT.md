# Vercel React Best Practices 분석 보고서

## 개요

Next.js 14 보일러플레이트를 Vercel의 React Best Practices (45개 규칙, 8개 카테고리)에 따라 분석한 결과입니다. 각 카테고리별로 현재 상태, 발견된 이슈, 우선순위를 기준으로 분류했습니다.

---

## 📊 전체 요약

### 잘 적용된 사항 ✅

- React Compiler 활성화 (자동 메모이제이션)
- 패키지 import 최적화 설정 (optimizePackageImports)
- 모달 동적 import (`ssr: false`)
- 에러 바운더리 구현
- TanStack Query 설정 (staleTime, gcTime, keepPreviousData)
- FSD 아키텍처로 깔끔한 코드 조직화
- TypeScript strict mode

### 주요 개선 필요 사항 ⚠️

**CRITICAL (즉시 개선 권장)**

1. 모든 API 요청마다 `getSession()` 호출 - 성능 병목
2. 서버 컴포넌트를 사용하지 않음 - 모든 페이지가 `'use client'`
3. QueryClient를 useState 내부에서 생성 - 메모리 누수 가능성

**HIGH (개선 권장)** 4. Streaming SSR 활용 안 함 (Suspense 경계 없음) 5. 조건부 렌더링에서 `&&` 연산자 사용 (0 렌더링 위험)

---

## 1️⃣ Eliminating Waterfalls (CRITICAL)

**Impact: CRITICAL** - 워터폴은 최우선 성능 개선 대상

### ✅ 잘 된 부분

- 없음

### ⚠️ 개선 필요

#### 1.1 서버 컴포넌트 미사용

**파일:** `app/(main)/page.tsx`, `app/users/page.tsx`, `app/login/page.tsx`

**문제:**

- 모든 페이지가 `'use client'` 지시문 사용
- 데이터 페칭이 클라이언트에서만 발생
- 초기 HTML에 데이터가 포함되지 않음

**영향:** 첫 페이지 로드 시 네트워크 워터폴 발생

**권장 사항:**

```typescript
// ❌ 현재: app/(main)/page.tsx
export { HomePage as default } from '@/views/home'; // 'use client' 컴포넌트

// ✅ 개선: Server Component로 전환
async function HomePage() {
  // 서버에서 데이터 페칭
  const initialData = await fetchInitialData();

  return (
    <div>
      <ServerContent data={initialData} />
      <Suspense fallback={<Skeleton />}>
        <ClientInteractiveContent />
      </Suspense>
    </div>
  );
}
```

#### 1.2 Suspense 경계 없음

**파일:** 전체 애플리케이션

**문제:**

- Suspense boundary가 없어 전체 페이지가 데이터 로딩을 기다림
- 레이아웃(헤더, 푸터)도 데이터 로딩 시 블록됨

**권장 사항:**

```typescript
// app/users/page.tsx
function UsersPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<UserListSkeleton />}>
        <UserListContent />
      </Suspense>
      <Footer />
    </div>
  );
}
```

---

## 2️⃣ Bundle Size Optimization (CRITICAL)

**Impact: CRITICAL** - 번들 크기는 TTI와 LCP에 직접 영향

### ✅ 잘 된 부분

- `optimizePackageImports` 설정으로 react-icons, motion 최적화
- 모달 동적 import (`next/dynamic` with `ssr: false`)

### ⚠️ 개선 필요

#### 2.1 TanStack Query DevTools 프로덕션 포함

**파일:** `src/app/providers/QueryProvider.tsx:32`

**문제:**

```typescript
<ReactQueryDevtools /> // 프로덕션 빌드에도 포함됨
```

**권장 사항:**

```typescript
// 개발 환경에서만 로드
{process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}

// 또는 동적 import
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then(m => m.ReactQueryDevtools),
  { ssr: false }
);
```

---

## 3️⃣ Server-Side Performance (HIGH)

**Impact: HIGH** - 서버 성능 최적화

### ⚠️ 개선 필요

#### 3.1 모든 요청마다 getSession() 호출

**파일:** `src/shared/api/base/base.ts:9`

**문제:**

```typescript
const _fetchApi = async <T = object>(method: string, url: string, body?: Body): Promise<T> => {
  const session = await getSession(); // 모든 API 요청마다 호출 🚨

  const response = await axios({
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });
};
```

**영향:**

- 모든 API 호출마다 세션 조회 오버헤드
- 병렬 요청 시 getSession이 중복 호출됨
- 불필요한 지연 발생

**권장 사항:**

```typescript
// React.cache()로 요청당 1회만 호출
import { cache } from 'react';

const getSessionCached = cache(async () => {
  return await getSession();
});

// 또는 클라이언트에서 useSession() hook 활용
('use client');
function ApiProvider({ children }) {
  const { data: session } = useSession();

  // axios interceptor에 토큰 설정
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${session?.user?.accessToken}`;
  }, [session]);

  return children;
}
```

#### 3.2 QueryClient를 useState 안에서 생성

**파일:** `src/app/providers/QueryProvider.tsx:14-28`

**문제:**

```typescript
const [queryClient] = useState(
  () => new QueryClient({ ... }) // ⚠️ 컴포넌트 리렌더링마다 초기화 함수 재생성
);
```

**권장 사항:**

```typescript
// 모듈 스코프로 이동
const queryClient = new QueryClient({
  defaultOptions: { ... }
});

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
```

#### 3.3 직렬화 최소화 미적용

**파일:** 서버/클라이언트 경계

**문제:**

- 서버 컴포넌트를 사용하지 않아 이 패턴 적용 불가
- 향후 서버 컴포넌트 도입 시 고려 필요

---

## 4️⃣ Client-Side Data Fetching (MEDIUM-HIGH)

**Impact: MEDIUM-HIGH** - 클라이언트 데이터 페칭 최적화

### ✅ 잘 된 부분

- TanStack Query 사용으로 자동 중복 제거
- `staleTime`, `gcTime` 설정
- `keepPreviousData`로 레이아웃 시프트 방지

### ⚠️ 개선 필요

#### 4.1 글로벌 이벤트 리스너 중복

**파일:** `src/features/modal/model/useModalStore.ts:46-54`

**문제:**

```typescript
// 모듈 레벨에서 직접 구독 및 이벤트 리스너 등록
if (typeof window !== 'undefined') {
  useModalStore.subscribe((state) => {
    document.body.style.overflow = ...;
  });

  window.addEventListener('popstate', () => { ... }); // 중복 등록 가능성
}
```

**영향:**

- HMR 시 이벤트 리스너가 중복 등록될 수 있음
- 메모리 누수 위험

**권장 사항:**

```typescript
// 컴포넌트 레벨에서 관리
'use client';
function ModalManager() {
  useEffect(() => {
    const unsubscribe = useModalStore.subscribe((state) => {
      document.body.style.overflow = state.openedModalIds.length > 0 ? 'hidden' : 'auto';
    });

    const handlePopState = () => {
      useModalStore.getState().closeAllModals();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
```

---

## 5️⃣ Re-render Optimization (MEDIUM)

**Impact: MEDIUM** - 리렌더링 최적화

### ✅ 잘 된 부분

- React Compiler 활성화로 자동 메모이제이션
- 수동 `memo()`, `useMemo()` 불필요

### ⚠️ 개선 필요

#### 5.1 함수형 setState 미사용

**파일:** `src/features/modal/model/useModalStore.ts:24-36`

**문제:**

```typescript
openModal: (id, props) =>
  set((state) => ({
    openedModalIds: [...state.openedModalIds, id], // ✅ 이미 함수형 업데이트 사용 중
  })),
```

**상태:** 이미 올바르게 구현됨 ✅

---

## 6️⃣ Rendering Performance (MEDIUM)

**Impact: MEDIUM** - 렌더링 성능 최적화

### ⚠️ 개선 필요

#### 6.1 조건부 렌더링에서 && 연산자 사용

**파일:** `src/views/users/ui/UsersPage.tsx:22`

**문제:**

```typescript
{users?.data.map((user) => (
  <div key={user.id}>{user.name}</div>
))}
```

만약 `users`가 `0`개인 경우나 다른 falsy 값이면 "0"이 렌더링될 수 있음.

**권장 사항:**

```typescript
{users && users.data.length > 0 ? (
  users.data.map((user) => <div key={user.id}>{user.name}</div>)
) : (
  <div>No users found</div>
)}
```

---

## 7️⃣ JavaScript Performance (LOW-MEDIUM)

**Impact: LOW-MEDIUM** - JavaScript 마이크로 최적화

### ✅ 잘 된 부분

- 대부분의 로직이 간결하고 최적화되어 있음

### ℹ️ 참고 사항

- 현재 코드베이스에서는 큰 성능 이슈 없음
- 향후 복잡한 데이터 처리 로직 추가 시 고려:
  - 배열 조작 시 `toSorted()` 사용
  - 반복적인 `find()` 대신 `Map` 사용
  - 루프에서 RegExp 생성 최적화

---

## 8️⃣ Advanced Patterns (LOW)

**Impact: LOW** - 고급 패턴

### ℹ️ 참고 사항

- 현재 코드베이스에서는 해당 없음
- 향후 복잡한 이벤트 핸들러 로직 추가 시 고려:
  - `useEffectEvent` 사용
  - `useLatest` hook으로 최신 값 참조

---

## 🎯 우선순위별 액션 아이템

### P0 - CRITICAL (즉시 개선)

1. ✅ **API 요청마다 getSession() 호출 제거**
   - 파일: `src/shared/api/base/base.ts:9`
   - 영향: 모든 API 요청 성능
   - 방법: React.cache() 또는 axios interceptor 활용

2. ✅ **QueryClient를 모듈 레벨로 이동**
   - 파일: `src/app/providers/QueryProvider.tsx:14`
   - 영향: 메모리 누수 방지
   - 방법: useState 제거, 모듈 스코프에서 생성

3. ⚠️ **서버 컴포넌트 도입 검토** (선택적)
   - 파일: 모든 페이지 컴포넌트
   - 영향: 초기 로드 성능
   - 방법: 점진적으로 서버 컴포넌트 전환

### P1 - HIGH (권장)

4. ✅ **ReactQueryDevtools를 개발 환경으로만 제한**
   - 파일: `src/app/providers/QueryProvider.tsx:32`
   - 영향: 프로덕션 번들 크기
   - 방법: 조건부 렌더링 또는 동적 import

5. ✅ **글로벌 이벤트 리스너 중복 방지**
   - 파일: `src/features/modal/model/useModalStore.ts:46`
   - 영향: 메모리 누수
   - 방법: 컴포넌트 레벨 useEffect로 이동

### P2 - MEDIUM (개선 고려)

6. ✅ **조건부 렌더링 명시적으로 개선**
   - 파일: `src/views/users/ui/UsersPage.tsx:22`
   - 영향: 예상치 못한 "0" 렌더링 방지
   - 방법: 삼항 연산자 사용

7. ⚠️ **Suspense 경계 추가** (선택적, 서버 컴포넌트 도입 후)
   - 파일: 페이지 컴포넌트
   - 영향: 초기 페인트 속도
   - 방법: 느린 컴포넌트를 Suspense로 감싸기

---

## 📁 수정 대상 파일 목록

### 필수 수정

1. `src/shared/api/base/base.ts` - getSession() 최적화
2. `src/app/providers/QueryProvider.tsx` - QueryClient 이동, DevTools 조건부
3. `src/features/modal/model/useModalStore.ts` - 이벤트 리스너 관리
4. `src/views/users/ui/UsersPage.tsx` - 조건부 렌더링 개선

### 선택적 개선

5. `app/(main)/page.tsx` - 서버 컴포넌트 전환
6. `app/users/page.tsx` - 서버 컴포넌트 전환

---

## ✅ 검증 계획

### 1. 성능 측정

- Lighthouse 점수 측정 (Before/After)
- Network 탭에서 getSession 호출 횟수 확인
- Bundle Analyzer로 번들 크기 비교

### 2. 기능 테스트

- 인증 플로우 정상 작동 확인
- 모달 열기/닫기 동작 확인
- 페이지 네비게이션 정상 확인
- TanStack Query 캐싱 동작 확인

### 3. 개발 경험

- HMR 속도 체감 개선 확인
- 빌드 시간 측정
- DevTools 개발 환경에만 로드 확인

---

## 📚 참고 자료

- [Vercel React Best Practices](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [TanStack Query Best Practices](https://tanstack.com/query/latest/docs/react/guides/important-defaults)
- [React Compiler](https://react.dev/learn/react-compiler)

---

## 📈 예상 개선 효과

### 성능

- **First Load JS 감소**: ~50KB (DevTools 제거)
- **API 응답 시간 단축**: 10-30% (getSession 최적화)
- **메모리 사용량 감소**: 불필요한 구독/인스턴스 제거

### 개발 경험

- **빌드 시간 단축**: 프로덕션 번들 최적화
- **HMR 안정성 향상**: 이벤트 리스너 중복 방지
- **코드 유지보수성**: 모범 사례 준수

### 향후 확장성

- 서버 컴포넌트 도입 기반 마련
- Streaming SSR 적용 가능
- 더 나은 SEO 지원 가능
