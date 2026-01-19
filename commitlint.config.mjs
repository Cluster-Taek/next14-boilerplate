export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 허용되는 타입
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 코드 포맷팅
        'refactor', // 리팩토링
        'perf', // 성능 개선
        'test', // 테스트 추가/수정
        'chore', // 빌드, 설정 변경
        'revert', // 커밋 되돌리기
        'build', // 빌드 시스템
        'ci', // CI 설정
      ],
    ],
    // 제목은 소문자로 시작
    'subject-case': [2, 'never', ['upper-case']],
    // 제목 최대 길이
    'subject-max-length': [2, 'always', 100],
    // 제목은 마침표로 끝나지 않음
    'subject-full-stop': [2, 'never', '.'],
    // 본문은 빈 줄로 시작
    'body-leading-blank': [2, 'always'],
    // 푸터는 빈 줄로 시작
    'footer-leading-blank': [2, 'always'],
  },
};
