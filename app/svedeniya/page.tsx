import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { clinic } from '@/lib/config';
import { routes } from '@/lib/routes';
import {
  LEGAL_BASIS,
  PENDING_NOTICE,
  clinicSummary,
  legalLinks,
  legalRoutes,
  legalValue,
  organizationSections,
  supervisors,
  type LegalField,
} from '@/content/legal';

/**
 * Сведения о медицинской организации.
 *
 * Состав разделов задан приказом Минздрава России от 04.03.2022 № 118н.
 * Реквизитов у проекта нет, поэтому страница публикует структуру: каждое
 * непереданное поле печатается как «Уточняется», а не заполняется правдоподобной
 * выдумкой — опубликованный номер лицензии или ИНН пациент считает проверенным.
 */

export const metadata: Metadata = {
  title: 'Сведения о медицинской организации',
  description:
    `Сведения о медицинской организации ${clinic.legalName}, ${clinic.city}: ` +
    'наименование, адрес, режим работы, контакты, лицензия, сведения ' +
    'о медицинских работниках и контролирующих органах.',
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

export default function LegalInfoPage(): React.ReactElement {
  const documents = legalLinks.filter((link) => link.href !== legalRoutes.info);

  return (
    <>
      <SiteHeader current={routes.about} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li aria-current="page">Сведения о медорганизации</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Правовой раздел</p>
              <h1 className="h1">Сведения о медицинской организации</h1>
              <p className="lead">
                Состав раздела установлен требованиями к сайту медицинской
                организации. Основание — {LEGAL_BASIS}. Сведения публикуются
                по документам организации.
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
                <h2 className="block__title">Состав раздела</h2>
                <div className="stack">
                  <p className="body-text">
                    Ниже приведены сведения об организации, режиме работы, лицензии,
                    медицинских работниках, видах медицинской помощи, правах пациента
                    и органах, осуществляющих контроль в сфере здравоохранения.
                  </p>
                  <div className="disclaimer">
                    <p>
                      <b>Часть сведений ещё не опубликована.</b>
                    </p>
                    <p>{PENDING_NOTICE}</p>
                  </div>
                </div>
              </div>

              {organizationSections.map((section) => (
                <div className="block" id={section.id} key={section.id}>
                  <h2 className="block__title">{section.title}</h2>
                  <div className="stack">
                    {section.intro?.map((paragraph) => (
                      <p className="body-text" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                    <FieldList fields={section.fields} label={section.title} />
                    {section.id === 'litsenziya' ? (
                      <p>
                        <Link className="link-underline" href={legalRoutes.license}>
                          Полные сведения о лицензии
                        </Link>
                      </p>
                    ) : null}
                    {section.id === 'prava' ? (
                      <p>
                        <Link className="link-underline" href={legalRoutes.patientRights}>
                          Страница «Права пациента»
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}

              <div className="block" id="kontrol">
                <h2 className="block__title">Контролирующие органы</h2>
                <div className="stack-lg">
                  <p className="body-text">
                    Контроль качества и безопасности медицинской деятельности,
                    санитарно-эпидемиологический надзор и управление здравоохранением
                    субъекта осуществляют перечисленные ниже органы. Наименования
                    территориальных органов и их контактные данные будут размещены
                    после уточнения.
                  </p>
                  {supervisors.map((supervisor) => (
                    <div className="stack" key={supervisor.role}>
                      <h3 className="h4">{supervisor.role}</h3>
                      <FieldList fields={supervisor.fields} label={supervisor.role} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="block" id="zapros">
                <h2 className="block__title">Как получить сведения</h2>
                <div className="stack">
                  <p className="body-text">
                    Документы организации предоставляются для ознакомления по адресу
                    приёма в часы работы клиники. Запрос можно передать администратору
                    лично или по телефону.
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
                </div>
              </div>
            </div>

            <aside className="page-aside stack-lg">
              <div className="card">
                <div className="stack">
                  <p className="overline">Разделы страницы</p>
                  <nav className="linklist" aria-label="Разделы страницы">
                    {organizationSections.map((section) => (
                      <a href={`#${section.id}`} key={section.id}>
                        <span className="linklist__name">{section.title}</span>
                      </a>
                    ))}
                    <a href="#kontrol">
                      <span className="linklist__name">Контролирующие органы</span>
                    </a>
                    <a href="#zapros">
                      <span className="linklist__name">Как получить сведения</span>
                    </a>
                  </nav>
                </div>
              </div>

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
