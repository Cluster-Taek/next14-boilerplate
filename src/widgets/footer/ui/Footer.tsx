import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import Link from 'next/link';

/**
 * Footer Widget
 *
 * 전역 푸터 컴포넌트
 * - Widgets 레이어: 여러 페이지에서 재사용되는 복합 UI 블록
 * - 독립적인 비즈니스 로직 포함 가능
 * - Features, Entities, Shared 조합 가능
 */
export const Footer = () => {
  const footerStyle = FooterSva();
  const currentYear = new Date().getFullYear();

  return (
    <Box className={footerStyle.wrapper}>
      <Box className={footerStyle.container}>
        <Box className={footerStyle.copyright}>
          © {currentYear} Next.js Boilerplate. All rights reserved.
        </Box>

        <Box className={footerStyle.links}>
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyle.link}
          >
            Next.js
          </Link>
          <Link
            href="https://feature-sliced.design"
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyle.link}
          >
            Feature-Sliced Design
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyle.link}
          >
            GitHub
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const FooterSva = sva({
  slots: ['wrapper', 'container', 'copyright', 'links', 'link'],
  base: {
    wrapper: {
      width: 'full',
      borderTop: '1px solid',
      borderColor: 'gray.200',
      backgroundColor: 'gray.50',
      marginTop: 'auto',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '6',
      display: 'flex',
      flexDirection: { base: 'column', md: 'row' },
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '4',
    },
    copyright: {
      fontSize: 'sm',
      color: 'gray.600',
    },
    links: {
      display: 'flex',
      gap: '6',
    },
    link: {
      fontSize: 'sm',
      color: 'gray.600',
      transition: 'color 0.2s',
      _hover: {
        color: 'primary.01',
      },
    },
  },
});
