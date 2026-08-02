import type { Metadata, Viewport } from 'next';
import { IconSprite } from '@/components/Icons';
import { clinic } from '@/lib/config';
import { IS_PUBLIC_SITE } from '@/app/sitemap';
import '@/styles/globals.css';

/**
 * На GitHub Pages сайт отдаётся из подпути, и Next префиксует ссылки
 * компонентов, но не href у link в head — его дописываем сами.
 */
const BASE = process.env.EVAMED_STATIC === 'true'
  ? (process.env.EVAMED_BASE_PATH ?? '/evamed')
  : '';

export const metadata: Metadata = {
  title: {
    default: `${clinic.brand} — клиника ранней диагностики в Грозном`,
    template: `%s | ${clinic.brand}`,
  },
  description:
    'Клиника ранней диагностики в Грозном: собственная лаборатория и стационар, ' +
    'программа наблюдения с обследованием дважды в год. Приём 9:00–19:00.',
  // Индексация включается той же переменной, что и карта сайта, — иначе
  // однажды карта откроется, а noindex останется, и наоборот.
  robots: IS_PUBLIC_SITE ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: `${BASE}/favicon.svg` },
};

export const viewport: Viewport = {
  themeColor: '#0F1F2D',
};

/**
 * Предзагружаются ровно два файла — те, что нужны первой отрисовке
 * русскоязычной страницы: заголовок Montserrat Bold и текст Open Sans Regular,
 * кириллические подмножества (ТЗ 10.5.3).
 */
const PRELOAD = [
  `${BASE}/fonts/montserrat-700-cyrillic.woff2`,
  `${BASE}/fonts/open-sans-400-cyrillic.woff2`,
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {PRELOAD.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body>
        <IconSprite />
        <a className="skip-link" href="#main">
          К содержанию
        </a>
        {children}
      </body>
    </html>
  );
}
