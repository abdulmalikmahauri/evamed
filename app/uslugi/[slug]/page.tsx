import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { clinic, DISCLAIMER } from '@/lib/config';
import { PRICE_VALID_FROM, formatPrice, getService, services } from '@/content/services';
import { routes } from '@/lib/routes';

/**
 * Страница услуги, регистр «Кремовый кабинет»: паспорт параметров справа,
 * содержательные блоки слева, липкая панель записи.
 *
 * Слово «купить» и кнопка оплаты на странице отсутствуют: онлайн-оплата
 * выключена флагом, до её включения продаётся только запись на приём.
 */

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.name} в ${clinic.cityIn} — цена, как проводится`,
    description:
      `${service.name} в ${clinic.cityIn}: длительность ${service.duration}, ` +
      `результат ${service.result.toLowerCase()}. Клиника ${clinic.brand} ` +
      `с собственной лабораторией, приём ${clinic.hours}.`,
  };
}

export default async function ServicePage({ params }: ServicePageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const passport: ReadonlyArray<readonly [string, string]> = [
    ['Длительность', service.duration],
    ['Где проводится', service.place],
    ['Результат', service.result],
    ['Подготовка', service.preparationShort],
    ['Цена', formatPrice(service.price)],
  ];

  return (
    <>
      <SiteHeader current={routes.directions} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            {service.breadcrumbs.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
            <li aria-current="page">{service.crumb}</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">{service.direction}</p>
              <h1 className="h1">{service.name}</h1>
              <p className="lead">{service.lead}</p>
            </div>

            <aside className="passport" aria-label="Параметры услуги">
              {passport.map(([key, value]) => (
                <div className="passport__row" key={key}>
                  <span className="passport__key">{key}</span>
                  <span className="passport__val">{value}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section section--utility">
          <div className="container page-body">
            <div>
              <div className="block">
                <h2 className="block__title">Когда назначают</h2>
                <p className="body-text">{service.indications}</p>
              </div>

              <div className="block">
                <h2 className="block__title">Как проводится</h2>
                <ul>
                  {service.procedure.map((stage) => (
                    <li key={stage}>{stage}</li>
                  ))}
                </ul>
              </div>

              <div className="block">
                <h2 className="block__title">Подготовка</h2>
                <p className="body-text">{service.preparation}</p>
              </div>

              <div className="block">
                <h2 className="block__title">Что после</h2>
                <p className="body-text">{service.afterwards}</p>
              </div>

              <div className="block">
                <h2 className="block__title">Противопоказания и ограничения</h2>
                <p className="body-text">{service.contraindications}</p>
                <div className="disclaimer">
                  <p>
                    <b>{DISCLAIMER}</b>
                  </p>
                  <p>
                    Информация на странице носит справочный характер, не является публичной
                    офертой и не заменяет консультацию врача. Решение о необходимости
                    исследования принимает лечащий врач.
                  </p>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Смежные исследования</h2>
                <div className="linklist">
                  {service.related.map((item) => (
                    <Link href={`/uslugi/${item.slug}`} key={item.name}>
                      <span className="linklist__name">{item.name}</span>
                      <span className="linklist__price">{formatPrice(item.price)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="page-aside" id="book">
              <div className="card booking">
                <p className="overline">Запись на исследование</p>
                <div className="booking__price">
                  <span className="price">{formatPrice(service.price)}</span>
                </div>
                <p className="booking__meta">{PRICE_VALID_FROM}</p>
                <hr className="rule" style={{ marginBlock: 'var(--s-6)' }} />
                <p className="caption">{service.bookingNote}</p>
                <Link
                  className="btn btn--primary"
                  href={routes.booking}
                  style={{ width: '100%', marginTop: 'var(--s-6)' }}
                >
                  Записаться на приём
                </Link>
                <p style={{ marginTop: 'var(--s-5)', textAlign: 'center' }}>
                  <Link
                    className="link-underline"
                    href={routes.contacts}
                    style={{ fontSize: 'var(--text-body-sm)' }}
                  >
                    Задать вопрос
                  </Link>
                </p>
              </div>

              <div className="card" style={{ marginTop: 'var(--s-7)' }}>
                <p className="overline">Входит в программу</p>
                <p
                  style={{
                    marginTop: 'var(--s-4)',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {service.programNote}
                </p>
                <Link
                  className="link-underline"
                  href="/programma-nablyudeniya#tarify"
                  style={{ marginTop: 'var(--s-5)', fontSize: 'var(--text-body-sm)' }}
                >
                  Посмотреть программы
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta
        actions={[
          { href: '#book', label: 'Записаться', variant: 'primary' },
          { href: routes.pricing, label: 'Все цены', variant: 'outline' },
        ]}
      />
    </>
  );
}
