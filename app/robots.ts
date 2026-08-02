import type { MetadataRoute } from 'next';
import { IS_PUBLIC_SITE, SITE_URL } from './sitemap';

/**
 * Статическая выгрузка требует явной пометки: без неё Next считает
 * маршрут динамическим и отказывается собирать его в файл.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!IS_PUBLIC_SITE) {
    /* Предпросмотр: до утверждения текстов и получения приложения к лицензии
       ни одна страница не должна попасть в выдачу. Ссылку на карту сайта
       в этом режиме не отдаём — она пустая. */
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
