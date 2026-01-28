/**
 * 폼 검증 에러 메시지 상수
 */
export const VALIDATION_MESSAGES = {
  required: (fieldName: string) => `${fieldName}을(를) 입력해주세요`,

  email: {
    invalid: '올바른 이메일 형식이 아닙니다',
  },

  password: {
    invalid: '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다',
  },

  name: {
    min: (min: number) => `이름은 최소 ${min}자 이상이어야 합니다`,
    max: (max: number) => `이름은 최대 ${max}자까지 입력 가능합니다`,
  },

  phone: {
    invalid: '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)',
  },
} as const;
