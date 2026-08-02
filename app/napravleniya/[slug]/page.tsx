import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { Icon } from '@/components/Icons';
import { clinic, DISCLAIMER } from '@/lib/config';
import {
  directions,
  getDirection,
  getDirectionDoctors,
  getDirectionPriceFrom,
  getDirectionServices,
} from '@/content/directions';
import { PRICE_VALID_FROM, formatPrice } from '@/content/services';
import { routes } from '@/lib/routes';

/**
 * Страница направления, регистр «Кремовый кабинет».
 *
 * Состав страницы зависит от данных: перечень услуг и блок врачей выводятся
 * только тогда, когда каталог их содержит. Пустой раздел здесь честнее
 * правдоподобной заглушки — по услугам публикуются цены, по врачам сведения
 * о квалификации, и то и другое клиника подтверждает документами.
 */

interface DirectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return directions.map((direction) => ({ slug: direction.slug }));
}

export async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const direction = getDirection(slug);

  if (!direction) {
    return {};
  }

  return {
    title: `${direction.name} в ${clinic.cityIn} — услуги и цены`,
    description:
      `${direction.name} в клинике ${clinic.brand}, ${clinic.city}: ` +
      `${direction.meta.toLowerCase()}. ${clinic.hoursNote}, ${clinic.address}.`,
  };
}

export default async function DirectionPage({
  params,
}: DirectionPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const direction = getDirection(slug);

  if (!direction) {
    notFound();
  }

  const directionServices = getDirectionServices(direction);
  const directionDoctors = getDirectionDoctors(direction);
  const priceFrom = getDirectionPriceFrom(direction);

  const passport: ReadonlyArray<readonly [string, string]> = [
    ['Что доступно', direction.meta],
    ['Приём', clinic.hoursNote],
    ['Адрес', clinic.address],
    ['Цена от', priceFrom === undefined ? 'Уточняется' : formatPrice(priceFrom)],
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
            <li>
              <Link href="/napravleniya">Направления</Link>
            </li>
            <li aria-current="page">{direction.name}</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Направление</p>
              <h1 className="h1">{direction.name}</h1>
              <p className="lead">{direction.lead}</p>
            </div>

            <aside className="passport" aria-label="Кратко о направлении">
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
                <h2 className="block__title">Услуги {direction.nameGenitive}</h2>

                {directionServices.length > 0 ? (
                  <div className="linklist">
                    {directionServices.map((service) => (
                      <Link href={`/uslugi/${service.slug}`} key={service.slug}>
                        <span className="linklist__name">{service.name}</span>
                        <span className="linklist__price">{formatPrice(service.price)}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="empty">
                    <div className="empty__mark">
                      <Icon name={direction.icon} />
                    </div>
                    <h3 className="h3">Перечень уточняется</h3>
                    <p>
                      Перечень услуг {direction.nameGenitive} и цены подскажет администратор
                      клиники.
                    </p>
                    <Link className="link-underline" href={routes.contacts}>
                      Связаться с клиникой
                    </Link>
                  </div>
                )}
              </div>

              <div className="block">
                <h2 className="block__title">Приём и запись</h2>
                <p className="body-text">
                  Клиника принимает по адресу {clinic.addressFull},{' '}
                  {clinic.hoursNote.toLowerCase()}. Запись — по телефону {clinic.phone} или
                  через заявку на сайте: администратор подтвердит время и предупредит
                  о подготовке, если она нужна.
                </p>
                <p className="body-text">
                  Скорую помощь и вызов врача на дом клиника не оказывает.
                </p>
                <p>
                  <Link className="link-underline" href={routes.booking}>
                    Оставить заявку
                  </Link>
                </p>
              </div>

              <div className="disclaimer">
                <p>
                  <b>{DISCLAIMER}</b>
                </p>
                <p>
                  Информация на странице носит справочный характер, не является публичной
                  офертой и не заменяет консультацию врача. Объём обследования и лечения
                  определяет лечащий врач.
                </p>
                {directionServices.length > 0 && <p>{PRICE_VALID_FROM}.</p>}
              </div>
            </div>

            <aside className="page-aside" id="book">
              <div className="stack-lg">
                <div className="card booking">
                  <div className="stack">
                    <p className="overline">Запись на приём</p>
                    <p className="caption">
                      Оставьте заявку — администратор подберёт время приёма по направлению
                      «{direction.name}».
                    </p>
                    <hr className="rule" />
                    <p className="caption">
                      {clinic.hoursNote} · {clinic.address}
                    </p>
                    <Link className="btn btn--primary btn--block-mobile" href={routes.booking}>
                      Записаться на приём
                    </Link>
                    <Link className="link-underline" href={routes.contacts}>
                      Задать вопрос
                    </Link>
                  </div>
                </div>

                <div className="card">
                  <div className="stack">
                    <p className="overline">Программа наблюдения</p>
                    <p className="caption">
                      Годовая программа с обследованием дважды в год и своим врачом.
                      Состав цикла определяет врач.
                    </p>
                    <Link className="link-underline" href={routes.program}>
                      Посмотреть программу
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Врачи вынесены из колонки 8/12: в ней ряд карточек ужимается
            до нечитаемой ширины, а сетка блока главной рассчитана
            на полную ширину контейнера. */}
        {directionDoctors.length > 0 && (
          <section className="section sec-raised" aria-labelledby="dir-docs-t">
            <div className="container">
              <div className="sec-head">
                <p className="overline">Команда</p>
                <h2 className="h2" id="dir-docs-t">
                  Врачи {direction.nameGenitive}
                </h2>
              </div>

              <div className="docs-grid sec-body">
                {directionDoctors.map((doctor) => (
                  <article className="doc" key={doctor.slug}>
                    <div className="doc__portrait" aria-hidden="true">
                      {doctor.monogram}
                    </div>
                    <h3 className="doc__name">{doctor.fullName}</h3>
                    <p className="doc__spec">{doctor.specialty}</p>
                    <p className="doc__meta">
                      В профессии с {doctor.sinceYear} года · {doctor.degree}
                    </p>
                    <div className="doc__foot">
                      <span className="doc__price">{formatPrice(doctor.price)}</span>
                      <Link className="link-underline doc__more" href={`/vrachi/${doctor.slug}`}>
                        Подробнее
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <p className="docs-more">
                <Link className="link-underline" href={routes.booking}>
                  Записаться к специалисту
                </Link>
              </p>
            </div>
          </section>
        )}
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
