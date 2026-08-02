import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { clinic } from '@/lib/config';
import { routes } from '@/lib/routes';
import {
  PENDING_NOTICE,
  clinicSummary,
  isProvided,
  legalLinks,
  legalRoutes,
  legalValue,
  licenseFields,
  licenseRegistry,
  licenseScanHref,
  type LegalField,
} from '@/content/legal';

/**
 * Лицензия на медицинскую деятельность.
 *
 * Номера, даты и лицензирующего органа у проекта нет. Страница держит форму
 * карточки и место под скан: пустая строка «Уточняется» честнее выдуманного
 * номера, который клиника опубликует как настоящий, а пациент проверит
 * по реестру и не найдёт.
 */

export const metadata: Metadata = {
  title: 'Лицензия на медицинскую деятельность',
  description:
    `Сведения о лицензии на осуществление медицинской деятельности ` +
    `${clinic.legalName}, ${clinic.city}: реквизиты лицензии, адрес места ` +
    'осуществления деятельности, перечень работ и услуг, порядок проверки сведений.',
};

/** Перечень реквизитов. Непереданное значение печатается как «Уточняется». */
function FieldList({ fields, label }: { fields: readonly LegalField[]; label: string }) {
  return (
    <div className="passport" role="group" aria-label={label}>
      {fields.map((field) => (
        <Fragment key={field.label}>
          <div className="passport__row">
            <span className="passport__key">{field.label}</span>
            <span className="passport__val">{legalValue(field.value)}</span>
          </div>
          {field.note ? <p className="caption">{field.note}</p> : null}
        </Fragment>
      ))}
    </div>
  );
}

export default function LicensePage(): React.ReactElement {
  const documents = legalLinks.filter((link) => link.href !== legalRoutes.license);

  return (
    <>
      <SiteHeader current={routes.about} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href={legalRoutes.info}>Сведения о медорганизации</Link>
            </li>
            <li aria-current="page">Лицензия</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Правовой раздел</p>
              <h1 className="h1">Лицензия на осуществление медицинской деятельности</h1>
              <p className="lead">
                Реквизиты лицензии, адрес места осуществления деятельности и перечень
                работ и услуг публикуются по документу и приложению к нему.
              </p>
            </div>

            <aside className="passport" aria-label="Реквизиты клиники">
              {clinicSummary.map((field) => (
                <div className="passport__row" key={field.label}>
                  <span className="passport__key">{field.label}</span>
                  <span className="passport__val">{legalValue(field.value)}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section section--utility">
          <div className="container page-body">
            <div>
              <div className="block">
                <h2 className="block__title">Реквизиты лицензии</h2>
                <div className="stack">
                  <FieldList fields={licenseFields} label="Реквизиты лицензии" />
                  <div className="disclaimer">
                    <p>
                      <b>Реквизиты лицензии ещё не опубликованы.</b>
                    </p>
                    <p>{PENDING_NOTICE}</p>
                  </div>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Скан документа</h2>
                <div className="stack">
                  {isProvided(licenseScanHref) ? (
                    <p>
                      <a className="link-underline" href={licenseScanHref}>
                        Открыть скан лицензии
                      </a>
                    </p>
                  ) : (
                    <div className="empty">
                      <div className="empty__mark" aria-hidden="true">
                        №
                      </div>
                      <h3 className="h4">Скан лицензии не размещён</h3>
                      <p>
                        Изображение лицензии и приложения к ней будет опубликовано
                        в этом блоке после передачи документов. До публикации
                        оригинал предоставляется для ознакомления по адресу приёма.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Проверка сведений</h2>
                <div className="stack">
                  <p className="body-text">
                    Сведения о лицензии проверяются в государственном реестре.
                    Реестр ведёт федеральный орган исполнительной власти,
                    осуществляющий контроль в сфере здравоохранения.
                  </p>
                  <div className="passport">
                    <div className="passport__row">
                      <span className="passport__key">Реестр</span>
                      <span className="passport__val">{licenseRegistry.name}</span>
                    </div>
                    <div className="passport__row">
                      <span className="passport__key">Адрес реестра</span>
                      <span className="passport__val">
                        {legalValue(licenseRegistry.url)}
                      </span>
                    </div>
                  </div>
                  {isProvided(licenseRegistry.url) ? (
                    <p>
                      <a
                        className="link-underline"
                        href={licenseRegistry.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Перейти в реестр лицензий
                      </a>
                    </p>
                  ) : (
                    <p className="caption">
                      Ссылка на реестр будет размещена после сверки адреса
                      с официальным источником. Приводить адрес по памяти нельзя:
                      посетитель принял бы посторонний сайт за государственный.
                    </p>
                  )}
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Вопросы к лицензии</h2>
                <div className="stack">
                  <p className="body-text">
                    Обращение по вопросам лицензии принимает администратор клиники
                    по телефону или по адресу приёма. Наименования и контактные данные
                    органов, осуществляющих контроль в сфере здравоохранения, приведены
                    в сведениях о медицинской организации.
                  </p>
                  <div className="passport">
                    <div className="passport__row">
                      <span className="passport__key">Адрес</span>
                      <span className="passport__val">{clinic.addressFull}</span>
                    </div>
                    <div className="passport__row">
                      <span className="passport__key">Часы работы</span>
                      <span className="passport__val">{clinic.hours}</span>
                    </div>
                    <div className="passport__row">
                      <span className="passport__key">Телефон</span>
                      <span className="passport__val">{clinic.phone}</span>
                    </div>
                  </div>
                  <p>
                    <Link className="link-underline" href={`${legalRoutes.info}#kontrol`}>
                      Контролирующие органы
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <aside className="page-aside stack-lg">
              <div className="card">
                <div className="stack">
                  <p className="overline">Документы</p>
                  <div className="linklist">
                    {documents.map((link) => (
                      <Link href={link.href} key={link.href}>
                        <span className="linklist__name">{link.label}</span>
                        <span className="linklist__price">{link.state}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="stack">
                  <p className="overline">Приём</p>
                  <p className="caption">{clinic.hoursNote}</p>
                  <p className="caption">{clinic.addressFull}</p>
                  <p>
                    <a className="link-underline" href={`tel:${clinic.phoneHref}`}>
                      {clinic.phone}
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
