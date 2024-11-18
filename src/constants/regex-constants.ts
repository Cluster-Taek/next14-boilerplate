export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\d{3}-\d{3,4}-\d{4}$/,
  NUMBER: /^[0-9]*$/,
};
