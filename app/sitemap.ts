import type { MetadataRoute } from 'next';
import { services } from '@/content/services';
import { doctors } from '@/content/doctors';
import { directions } from '@/content/directions';

/**
 * Единственный переключатель режима индексации. Пока false — сайт в режиме
 * предпросмотра: robots запрещает всё, карта сайта пустая. Переводится в true
 * одновременно со снятием `robots: { index: false }` в app/layout.tsx.
 */
export const IS_PUBLIC_SITE = process.env.EVAMED_PUBLIC === 'true';

/** Канонический адрес площадки: https, без www и без завершающего слэша. */
export const SITE_URL = process.env.EVAMED_SITE_URL ?? 'https://evamed.ru';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

interface SitemapRoute {
  /** путь от корня; пустая строка — главная */
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

/**
 * Перечисляются только реально существующие маршруты. Обещать поисковику
 * страницы, которых ещё нет, дороже, чем не показать их вовсе: битые адреса
 * в карте роняют доверие к домену.
 *
 * Страницы услуг и врачей не перечисляются вручную, а выводятся из тех же
 * данных, из которых собираются сами страницы, — иначе карта разойдётся
 * с сайтом при первом же добавлении услуги.
 */
const STATIC_ROUTES: readonly SitemapRoute[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/programma-nablyudeniya', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tseny', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/napravleniya', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/vrachi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/o-klinike', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/kontakty', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/svedeniya', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/svedeniya/litsenziya', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/dokumenty/politika', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/dokumenty/prava-patsienta', changeFrequency: 'yearly', priority: 0.3 },
];

/**
 * Статическая выгрузка требует явной пометки: без неё Next считает
 * маршрут динамическим и отказывается собирать его в файл.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PUBLIC_SITE) {
    return [];
  }

  const lastModified = new Date();
  const routes: SitemapRoute[] = [
    ...STATIC_ROUTES,
    ...services.map((service) => ({
      path: `/uslugi/${service.slug}`,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    })),
    ...directions.map((direction) => ({
      path: `/napravleniya/${direction.slug}`,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    })),
    ...doctors.map((doctor) => ({
      path: `/vrachi/${doctor.slug}`,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    })),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
