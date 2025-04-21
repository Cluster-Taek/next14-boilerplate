export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\d{3}-?\d{4}-?\d{4}$/,
  NUMBER: /^[0-9]*$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  TEXT: /^[a-zA-Z0-9가-힣\s.,!?]+$/,
  GENDER: /^(M|F)$/,
  RESIDENT_NUMBER: /^\d{6}-[1-4]\d{6}$/,
  BUSINESS_NUMBER: /^\d{3}-\d{2}-\d{5}$/,
  IDENTIFIER_NUMBER: /^\d{6}-[1-4]\d{6}$|^\d{3}-\d{2}-\d{5}$/,
};
