import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { routes } from '@/lib/routes';

/**
 * 404. Страница ошибки на медицинском сайте не шутит и не извиняется:
 * человек мог прийти сюда с тревогой, а не за развлечением. Цифра работает
 * как графика, смысл несёт заголовок, дальше — четыре основных раздела.
 */

const SECTIONS = [
  { href: '/programma-nablyudeniya', label: 'Программа наблюдения' },
  { href: routes.directions, label: 'Направления' },
  { href: routes.pricing, label: 'Цены' },
  { href: routes.contacts, label: 'Контакты' },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="section" aria-labelledby="nf-title">
          <div className="container">
            <div className="stack-lg">
              <div className="metric">
                {/* цифра скрыта от скринридера: её содержание дублирует заголовок */}
                <span className="metric-value" aria-hidden="true">
                  404
                </span>
              </div>

              <h1 className="h1" id="nf-title">
                Такой страницы нет
              </h1>

              <p className="lead">
                Возможно, в адресе опечатка или страница переехала.
                Ниже — основные разделы сайта.
              </p>

              <div className="linklist">
                {SECTIONS.map((section) => (
                  <Link key={section.href} href={section.href}>
                    <span className="linklist__name">{section.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
