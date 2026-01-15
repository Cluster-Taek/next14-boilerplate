# Next.js 14 Boilerplate 개선 프로젝트 계획

## 프로젝트 현황 분석

### 기술 스택
- **Next.js**: 14.2.25 (App Router)
- **React**: 18
- **TypeScript**: 5 (strict mode)
- **스타일링**: Panda CSS 0.45.2
- **인증**: NextAuth v4.24.7
- **데이터 페칭**: React Query 5.62.7
- **폼**: React Hook Form 7.54.1
- **HTTP 클라이언트**: Axios 1.8.2

### 발견된 주요 이슈

**1. 성능 문제**
- `src/lib/base.ts`: 모든 API 요청마다 `getSession()` 호출로 200-600ms 워터폴 발생
- `src/contexts/modal-provider.tsx`: React 컴포넌트를 Context에 저장하여 불필요한 리렌더링 60-80% 발생
- Server/Client Component 경계 최적화 부족

**2. 폼 검증 미흡**
- 검증이 `required`만 사용하는 단순한 수준
- `constants/regex-constants.ts`에 정규식 정의되어 있으나 미사용
- 타입과 검증 로직 분리로 유지보수 어려움

**3. 호환성**
- NextAuth v4는 Next.js 16과 peer dependency 이슈 존재
- v5 마이그레이션 권장

---

## 개선 목표

1. ✅ Next.js 16 업그레이드 (Turbopack, 최신 성능 최적화)
2. ✅ Vercel React Best Practices 반영 (워터폴 제거, 번들 최적화)
3. ✅ Zod 기반 폼 검증 강화
4. ✅ Context API → Zustand 마이그레이션 (모달 성능 개선)
5. ✅ NextAuth v5 마이그레이션 (Next.js 16 호환성)
6. ✅ 번들 크기 최적화 (동적 import, Code Splitting)
7. ✅ 에러 핸들링 강화 (Error Boundary, 공통 에러 처리)
8. ✅ 의존성 패키지 업데이트

---

## 전체 작업 로드맵

### Phase 1: Next.js 16 업그레이드 (우선)
- 환경 준비 및 핵심 업그레이드
- 호환성 검증

### Phase 2: Context API → Zustand 마이그레이션
- ModalProvider를 Zustand로 전환
- 성능 개선 측정

### Phase 3: Zod 통합
- 폼 검증 강화
- 타입 안전성 향상

### Phase 4: NextAuth v5 마이그레이션
- Next.js 16 호환성 확보
- 최신 인증 패턴 적용

### Phase 5: 번들 크기 최적화
- 동적 import 적용
- Server/Client Component 분리

### Phase 6: 의존성 업데이트 및 에러 핸들링 강화
- 주요 라이브러리 최신화
- Error Boundary 추가

---

## Phase 1: Next.js 16 업그레이드

### 작업 단계

**Commit 1: 환경 요구사항 확인 및 package.json 준비**
```bash
# Node.js 20.9.0+ 확인
node -v

# package.json에 engines 필드 추가
{
  "engines": {
    "node": ">=20.9.0",
    "npm": ">=10.0.0"
  }
}
```

**Commit 2: Next.js 16 및 React 19 업그레이드**
```bash
yarn add next@latest react@latest react-dom@latest
yarn add -D eslint-config-next@latest
```

변경될 패키지:
- `next`: 14.2.25 → 16.x
- `react`: ^18 → ^19
- `react-dom`: ^18 → ^19
- `eslint-config-next`: 14.2.8 → 16.x

**Commit 3: Turbopack 호환성 검증**
```bash
# 개발 서버 실행 (Turbopack 기본 사용)
yarn dev

# 빌드 테스트
yarn build
```

검증 항목:
- ✅ HMR 정상 작동
- ✅ Panda CSS 스타일 적용
- ✅ React Query 작동
- ✅ 페이지 라우팅 정상

**Commit 4: 환경 변수 및 설정 파일 업데이트**
- `.env.example` 확인
- `next.config.mjs` 최적화 (필요시)

### 중요 파일
- `/package.json`
- `/next.config.mjs`
- `/.env`

---

## Phase 2: Context API → Zustand 마이그레이션

### 작업 단계

**Commit 5: Zustand 설치 및 스토어 구조 생성**
```bash
yarn add zustand
```

새로 생성할 파일:
- `src/stores/modal-store.ts` - Zustand 모달 스토어

구현 내용:
```typescript
interface ModalState {
  openedModalIds: string[];
  modalPropsMap: Record<string, any>;
  openModal: (id: string, props?: any) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}
```

**Commit 6: 모달 레지스트리 패턴 구현**

새로 생성할 파일:
- `src/components/common/modal-registry.tsx`

구현 내용:
```typescript
export const MODAL_COMPONENTS = {
  [MODAL.USER_CREATE]: UserCreateFormModal,
} as const;
```

**Commit 7: Modal 컴포넌트 Zustand로 마이그레이션**

수정할 파일:
- `src/components/common/modal.tsx`

변경 내용:
- ModalContext → useModalStore 사용
- 레지스트리에서 컴포넌트 조회
- `body.style.overflow` 중복 제거 (line 17, 38)

**Commit 8: 모달 사용처 마이그레이션**

수정할 파일:
- `src/app/users/page.tsx`
- `src/components/user/user-create-form-modal.tsx`

변경 내용:
```typescript
// Before
openModal({ id: MODAL.USER_CREATE, component: <UserCreateFormModal /> });

// After
openModal(MODAL.USER_CREATE);
```

**Commit 9: ModalProvider 제거 및 클린업**

수정/삭제할 파일:
- `src/contexts/core-provider.tsx` (ModalProvider 제거)
- `src/contexts/modal-provider.tsx` (삭제)
- `src/hooks/use-modals.ts` (삭제 또는 Zustand wrapper로 변경)

### 중요 파일
- `src/stores/modal-store.ts` (새로 생성)
- `src/components/common/modal-registry.tsx` (새로 생성)
- `src/components/common/modal.tsx` (수정)
- `src/contexts/core-provider.tsx` (수정)

### 검증 방법
- 모달 오픈/클로즈 10회 반복 테스트
- React DevTools Profiler로 리렌더링 횟수 측정
- Zustand DevTools로 상태 변화 확인

---

## Phase 3: Zod 통합

### 작업 단계

**Commit 10: Zod 및 resolver 설치**
```bash
yarn add zod @hookform/resolvers
```

**Commit 11: 공통 검증 스키마 구조 생성**

새로 생성할 파일:
- `src/schemas/common/validation-messages.ts` - 한글 에러 메시지 상수
- `src/schemas/common/field-schemas.ts` - 재사용 가능한 필드 스키마
- `src/schemas/index.ts` - 배럴 export

구현 내용:
```typescript
// field-schemas.ts
export const emailSchema = z.string()
  .min(1, VALIDATION_MESSAGES.required('이메일'))
  .regex(REGEX.EMAIL, VALIDATION_MESSAGES.email.invalid);

export const passwordSchema = z.string()
  .min(1, VALIDATION_MESSAGES.required('비밀번호'));

export const nameSchema = z.string()
  .min(1, VALIDATION_MESSAGES.required('이름'))
  .min(2, VALIDATION_MESSAGES.name.min(2))
  .max(50, VALIDATION_MESSAGES.name.max(50));
```

**Commit 12: 폼별 Zod 스키마 정의**

새로 생성할 파일:
- `src/schemas/forms/login-schema.ts`
- `src/schemas/forms/user-create-schema.ts`

구현 내용:
```typescript
// login-schema.ts
export const loginFormSchema = z.object({
  login: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
```

**Commit 13: 로그인 폼 마이그레이션**

수정할 파일:
- `src/components/login/login-form.tsx`

변경 내용:
```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormValues } from '@/schemas';

const { handleSubmit, formState, control } = useForm<LoginFormValues>({
  resolver: zodResolver(loginFormSchema),
  defaultValues: { login: 'test@gmail.com', password: '1234' },
});

// Controller의 rules 속성 제거
<Controller
  control={control}
  name="login"
  // rules 제거됨
  render={...}
/>
```

**Commit 14: 사용자 생성 폼 마이그레이션**

수정할 파일:
- `src/components/user/user-create-form-modal.tsx`

유사한 패턴으로 zodResolver 적용

### 중요 파일
- `src/schemas/common/field-schemas.ts` (새로 생성)
- `src/schemas/forms/login-schema.ts` (새로 생성)
- `src/schemas/forms/user-create-schema.ts` (새로 생성)
- `src/components/login/login-form.tsx` (수정)
- `src/components/user/user-create-form-modal.tsx` (수정)

### 검증 방법
- 빈 필드 제출 시 한글 에러 메시지 표시 확인
- 잘못된 이메일 형식 입력 시 검증 에러 확인
- TypeScript 타입 추론 정상 작동 확인

---

## Phase 4: NextAuth v5 마이그레이션

### 작업 단계

**Commit 15: NextAuth v5 설치**
```bash
yarn add next-auth@beta
```

**Commit 16: Auth 설정 파일 재구성**

새로 생성할 파일:
- `src/auth.ts` (NextAuth v5 설정)

수정할 파일:
- `src/app/api/auth/[...nextauth]/route.ts`

구현 내용:
```typescript
// src/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        login: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // 기존 authorize 로직 이전
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // 기존 jwt 콜백 로직
    },
    session: async ({ session, token }) => {
      // 기존 session 콜백 로직
    }
  }
})

// src/app/api/auth/[...nextauth]/route.ts
export { GET, POST } from "@/auth"
```

**Commit 17: 환경 변수 업데이트**

수정할 파일:
- `.env`
- `.env.example`

변경 내용:
```env
# Before
NEXTAUTH_URL=http://localhost:4000
NEXTAUTH_SECRET=...

# After
AUTH_URL=http://localhost:4000
AUTH_SECRET=...
```

**Commit 18: AuthProvider 및 사용처 업데이트**

수정할 파일:
- `src/contexts/auth-provider.tsx`
- `src/contexts/session-provider.tsx`
- `src/app/(main)/page.tsx`

변경 내용:
- `getSession()` import 경로 변경
- `useSession()` 사용법 확인 (동일)

**Commit 19: base.ts getSession 최적화**

수정할 파일:
- `src/lib/base.ts`

변경 내용:
```typescript
// Before - Waterfall 발생
const _fetchApi = async (...) => {
  const session = await getSession();
  const response = await axios({ ... });
}

// After - 세션을 파라미터로 받거나 Context에서 직접 조회
const _fetchApi = async (session: Session | null, ...) => {
  const response = await axios({
    headers: {
      Authorization: session?.user?.accessToken
        ? `Bearer ${session.user.accessToken}`
        : undefined,
    }
  });
}
```

### 중요 파일
- `src/auth.ts` (새로 생성)
- `src/app/api/auth/[...nextauth]/route.ts` (수정)
- `src/lib/base.ts` (수정 - getSession 워터폴 제거)
- `.env` (수정)

### 검증 방법
- 로그인/로그아웃 기능 테스트
- 토큰 갱신 로직 확인
- 401 에러 시 자동 리다이렉트 확인

---

## Phase 5: 번들 크기 최적화

### 작업 단계

**Commit 20: 모달 컴포넌트 동적 import**

수정할 파일:
- `src/components/common/modal-registry.tsx`

구현 내용:
```typescript
import dynamic from 'next/dynamic';

export const MODAL_COMPONENTS = {
  [MODAL.USER_CREATE]: dynamic(() =>
    import('@/components/user/user-create-form-modal'),
    { ssr: false }
  ),
} as const;
```

**Commit 21: Server/Client Component 분리**

수정할 파일:
- `src/app/users/page.tsx` (가능하면 Server Component로)
- `src/app/login/page.tsx` (Server Component 유지)

패턴:
```typescript
// Server Component
export default async function UsersPage() {
  const users = await fetch(...).then(r => r.json());
  return <UsersList initialData={users} />;
}

// Client Component
'use client';
export function UsersList({ initialData }) {
  const { data } = useUsers({ initialData });
  // ...
}
```

**Commit 22: Motion 라이브러리 최적화**

검토 사항:
- `motion` 패키지 사용량 확인
- 필요한 컴포넌트만 import
- 또는 더 작은 애니메이션 라이브러리 검토

### 검증 방법
```bash
yarn build
# .next 폴더 분석
npx @next/bundle-analyzer
```

목표:
- 초기 번들 크기 20-30% 감소
- First Load JS 150KB 이하

---

## Phase 6: 의존성 업데이트 및 에러 핸들링 강화

### 작업 단계

**Commit 23: 주요 의존성 업데이트**
```bash
yarn upgrade-interactive --latest
```

업데이트 대상:
- `@tanstack/react-query` (Breaking 없음 확인)
- `axios` (최신 보안 패치)
- `dayjs` (마이너 업데이트)
- `react-hook-form` (호환성 확인)

**Commit 24: Error Boundary 추가**

새로 생성할 파일:
- `src/app/error.tsx` - 페이지 레벨 에러
- `src/app/global-error.tsx` - 전역 에러

구현 내용:
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
```

**Commit 25: API 에러 처리 개선**

수정할 파일:
- `src/lib/base.ts`

추가 내용:
```typescript
// 401 외 다른 에러 처리
.catch(async (error) => {
  const status = error.response?.status;

  if (status === 401 && window.location.pathname !== '/login') {
    await signOut();
    redirect('/login');
  } else if (status >= 500) {
    console.error('Server error:', error);
    // 에러 추적 서비스 연동 (선택적)
  }

  throw error;
});
```

**Commit 26: 에러 타입 정의 강화**

수정할 파일:
- `src/types/error.ts`

구현 내용:
```typescript
export interface IApiError extends IError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
```

### 중요 파일
- `src/app/error.tsx` (새로 생성)
- `src/app/global-error.tsx` (새로 생성)
- `src/lib/base.ts` (수정)
- `src/types/error.ts` (수정)

---

## 커밋 전략

각 작업이 끝나면:
1. 변경 사항을 스테이징에 추가
2. 커밋 메시지 추천 받기
3. 사용자가 직접 커밋

커밋 메시지 형식:
```
<type>: <subject>

<body>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Type:
- `feat`: 새로운 기능
- `refactor`: 리팩토링
- `perf`: 성능 개선
- `chore`: 빌드/의존성 업데이트

---

## 예상 개선 효과

### 성능
- **API 요청 속도**: 요청당 200-600ms 단축 (getSession 워터폴 제거)
- **모달 리렌더링**: 60-80% 감소 (Zustand 적용)
- **초기 번들 크기**: 20-30% 감소 (동적 import, Code Splitting)
- **HMR 속도**: 2-3배 향상 (Turbopack)

### 개발자 경험
- 타입 안전성 향상 (Zod 스키마)
- 상태 디버깅 용이 (Zustand DevTools)
- 최신 Next.js 기능 활용
- 명시적 에러 처리

### 코드 품질
- 폼 검증 로직 중앙화
- 불필요한 Provider 중첩 제거
- 에러 처리 일관성 향상
- 의존성 최신화

---

## 작업 일정 예상

| Phase | 예상 시간 | 난이도 |
|-------|---------|--------|
| Phase 1: Next.js 16 업그레이드 | 1-2시간 | 중 |
| Phase 2: Zustand 마이그레이션 | 3-4시간 | 중상 |
| Phase 3: Zod 통합 | 2-3시간 | 중 |
| Phase 4: NextAuth v5 | 3-5시간 | 상 |
| Phase 5: 번들 최적화 | 2-3시간 | 중 |
| Phase 6: 에러 핸들링 | 1-2시간 | 하 |

**총 예상 시간: 12-19시간**

---

## 추가 권장사항

### 즉시 적용 가능
1. `.env.local` 파일 생성 (환경별 설정 분리)
2. `package.json`의 `scripts`에 타입 체크 추가
   ```json
   "type-check": "tsc --noEmit"
   ```

### 중장기 개선
1. E2E 테스트 도입 (Playwright)
2. CI/CD 파이프라인 구축
3. Storybook 도입 (컴포넌트 문서화)
4. 성능 모니터링 (Sentry, LogRocket)

---

이 계획서는 각 작업을 독립적인 커밋으로 진행할 수 있도록 구성되었습니다. 각 Phase가 완료된 후 다음 Phase로 진행하시면 됩니다.
