# Feature-Sliced Design (FSD) Architecture

프론트엔드 애플리케이션을 위한 구조화된 아키텍처 방법론입니다.

## 구조

- `rules/` - 개별 규칙 파일 (각 규칙별 상세 설명)
  - `_sections.md` - 섹션 메타데이터
  - `layer-*.md` - 레이어 관련 규칙
  - `slice-*.md` - 슬라이스 관련 규칙
  - `segment-*.md` - 세그먼트 관련 규칙
  - `import-*.md` - Import 규칙
  - `migration-*.md` - 마이그레이션 가이드
- `metadata.json` - 문서 메타데이터
- `SKILL.md` - AI 에이전트용 스킬 정의
- `README.md` - 이 파일

## 사용 방법

각 규칙 파일에는 다음이 포함됩니다:
- 규칙 설명
- Incorrect 코드 예시
- Correct 코드 예시
- 추가 설명 및 참고 자료

## FSD 핵심 원칙

### 3계층 구조

1. **Layer (레이어)**: 표준화된 최상위 폴더 (app, pages, widgets, features, entities, shared)
2. **Slice (슬라이스)**: 비즈니스 도메인별 분리
3. **Segment (세그먼트)**: 기술적 목적별 분류 (ui, api, model, lib, config)

### 주요 규칙

- 상위 레이어는 하위 레이어 참조 가능 (역방향 불가)
- 동일 레이어 내 슬라이스 간 직접 참조 금지
- Public API를 통한 import만 허용

## 현재 프로젝트 적용

현재 프로젝트는 일반적인 폴더 구조를 사용하고 있습니다:

```
src/
├── app/          → FSD의 app + pages 혼합
├── components/   → FSD의 widgets + features + entities + shared/ui 혼합
├── lib/          → FSD의 shared/lib
├── types/        → FSD의 shared/model
├── hooks/        → FSD의 shared/lib
├── stores/       → FSD의 shared/model
└── schemas/      → FSD의 shared/model
```

마이그레이션이 필요한 영역을 파악하고 점진적으로 FSD 구조로 전환할 수 있습니다.
