import { NextResponse } from 'next/server';

/**
 * Заголовки безопасности сайта медицинской организации.
 *
 * В Next 16 middleware переименован в proxy: файл лежит в корне рядом с app/,
 * экспортируется функция с именем `proxy`. Рантайм всегда nodejs — экспорт
 * `runtime` в proxy запрещён и приводит к ошибке сборки, поэтому его здесь нет.
 */

const isDev = process.env.NODE_ENV === 'development';

/**
 * В политике нет ни одного внешнего хоста: шрифты, стили и скрипты свои.
 * Это не осторожность, а требование локализации персональных данных —
 * обращение браузера посетителя к зарубежному CDN само по себе является
 * трансграничной передачей данных.
 *
 * 'unsafe-inline' в script-src и style-src — осознанный компромисс.
 * App Router встраивает полезную нагрузку RSC инлайновым <script>, а
 * утверждённая вёрстка использует атрибуты style, которые nonce не покрывает
 * в принципе. Переход на nonce потребовал бы динамического рендеринга каждой
 * страницы и всё равно оставил бы 'unsafe-inline' в style-src.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // на локальной http-разработке апгрейд ломает загрузку ассетов
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

export function proxy(): NextResponse {
  const response = NextResponse.next();

  // единственный источник любого ресурса — собственный origin
  response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);

  // запрещает браузеру угадывать тип файла: загруженный документ не станет скриптом
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // страницу нельзя открыть во фрейме — защита формы записи от кликджекинга
  response.headers.set('X-Frame-Options', 'DENY');

  // наружу уходит только домен, без пути: адрес страницы об услуге — это уже сведения о здоровье
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // камера, микрофон и геолокация сайту не нужны и выключены вместе с вложенными фреймами
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );

  // два года только по https, вместе с поддоменами — иначе запись к врачу уходит открытым текстом
  if (!isDev) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload',
    );
  }

  return response;
}

export const config = {
  // статика и картинки отдаются файловой системой, заголовки нужны документам
  matcher: ['/((?!_next/static|_next/image|fonts/|favicon.svg).*)'],
};
