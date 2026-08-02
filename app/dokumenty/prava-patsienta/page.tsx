import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { clinic } from '@/lib/config';
import { routes } from '@/lib/routes';
import { legalLinks, legalRoutes, patientRights } from '@/content/legal';

/**
 * Права пациента — каркас страницы.
 *
 * Права установлены статьёй 19 Федерального закона от 21.11.2011 № 323-ФЗ.
 * Пересказ статьи здесь не размещается: изложение своими словами меняет объём
 * прав, а посетитель читает страницу клиники как источник правовой нормы.
 * Публикуется структура документа и его состояние.
 */

export const metadata: Metadata = {
  title: patientRights.title,
  description:
    `${patientRights.title} в клинике ${clinic.brand}, ${clinic.city}. ` +
    'Документ готовится к публикации: на странице приведены состав разделов ' +
    'и порядок обращения в клинику.',
};

export default function PatientRightsPage(): React.ReactElement {
  const documents = legalLinks.filter((link) => link.href !== legalRoutes.patientRights);

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
            <li aria-current="page">{patientRights.title}</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Правовой раздел</p>
              <h1 className="h1">{patientRights.title}</h1>
              <p className="lead">{patientRights.purpose}</p>
            </div>

            <aside className="passport" aria-label="Сведения о документе">
              <div className="passport__row">
                <span className="passport__key">Состояние</span>
                <span className="passport__val">Готовится к публикации</span>
              </div>
              <div className="passport__row">
                <span className="passport__key">Основание</span>
                <span className="passport__val">{patientRights.basis}</span>
              </div>
              <div className="passport__row">
                <span className="passport__key">Организация</span>
                <span className="passport__val">{clinic.legalName}</span>
              </div>
              <div className="passport__row">
                <span className="passport__key">Телефон</span>
                <span className="passport__val">{clinic.phone}</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--utility">
          <div className="container page-body">
            <div>
              <div className="block">
                <h2 className="block__title">Состояние документа</h2>
                <div className="stack">
                  <div className="empty">
                    <div className="empty__mark" aria-hidden="true">
                      §
                    </div>
                    <h3 className="h4">Документ ещё не опубликован</h3>
                    <p>{patientRights.status}</p>
                  </div>
                  <p className="caption">
                    Пересказ статьи 19 Федерального закона № 323-ФЗ на странице
                    не размещается. Норма публикуется в неизменной редакции: любое
                    изложение своими словами меняет её смысл и объём.
                  </p>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Что будет в документе</h2>
                <div className="stack">
                  <p className="body-text">
                    Документ будет содержать перечисленные ниже разделы. Основание —
                    {' '}
                    {patientRights.basis}.
                  </p>
                  <ul>
                    {patientRights.outline.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Обращение в клинику</h2>
                <div className="stack">
                  <p className="body-text">
                    До публикации документа обращение принимает администратор клиники
                    по телефону или по адресу приёма в часы работы. Порядок подачи
                    и рассмотрения обращений будет опубликован вместе с правилами
                    внутреннего распорядка.
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
