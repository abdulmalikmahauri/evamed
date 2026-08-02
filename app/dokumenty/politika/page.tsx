import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { clinic, features } from '@/lib/config';
import { routes } from '@/lib/routes';
import { legalLinks, legalRoutes, privacyPolicy } from '@/content/legal';

/**
 * Политика обработки персональных данных — каркас страницы.
 *
 * Текст политики не пишется и не имитируется: это документ, который утверждает
 * и подписывает клиника. Сгенерированный «похожий на настоящий» текст был бы
 * опубликован как действующий документ и определял бы права пациента, которых
 * никто не утверждал. Поэтому публикуется структура и состояние.
 */

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    `${privacyPolicy.title} ${clinic.legalName}, ${clinic.city}. ` +
    'Документ готовится к публикации: на странице приведены состав разделов ' +
    'и порядок обращения за сведениями.',
};

export default function PrivacyPolicyPage(): React.ReactElement {
  const documents = legalLinks.filter((link) => link.href !== legalRoutes.privacy);

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
            <li aria-current="page">{privacyPolicy.title}</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Правовой раздел</p>
              <h1 className="h1">{privacyPolicy.title}</h1>
              <p className="lead">{privacyPolicy.purpose}</p>
            </div>

            <aside className="passport" aria-label="Сведения о документе">
              <div className="passport__row">
                <span className="passport__key">Состояние</span>
                <span className="passport__val">Готовится к публикации</span>
              </div>
              <div className="passport__row">
                <span className="passport__key">Основание</span>
                <span className="passport__val">{privacyPolicy.basis}</span>
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
                    <p>{privacyPolicy.status}</p>
                  </div>
                  <p className="caption">
                    Изложение документа своими словами на странице не размещается:
                    политику утверждает клиника, и она публикуется в утверждённой
                    редакции целиком.
                  </p>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Что будет в документе</h2>
                <div className="stack">
                  <p className="body-text">
                    Политика будет содержать перечисленные ниже разделы. Основание —
                    {' '}
                    {privacyPolicy.basis}.
                  </p>
                  <ul>
                    {privacyPolicy.outline.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {!features.formsEnabled ? (
                <div className="block">
                  <h2 className="block__title">Формы на сайте</h2>
                  <p className="body-text">
                    До публикации политики приём заявок через сайт закрыт: поля форм
                    видны, но данные не отправляются и не сохраняются. Записаться
                    на приём можно по телефону или по адресу клиники.
                  </p>
                </div>
              ) : null}

              <div className="block">
                <h2 className="block__title">Как получить сведения до публикации</h2>
                <div className="stack">
                  <p className="body-text">
                    Вопрос об обработке персональных данных можно задать
                    администратору клиники по телефону или по адресу приёма
                    в часы работы.
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
