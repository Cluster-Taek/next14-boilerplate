import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      /**
       * Boilerplate 특성 상 사용하지 않더라도 세팅이 필요한 경우가 있어 무시
       */
      'fsd/insignificant-slice': 'off',
    },
  },
]);
