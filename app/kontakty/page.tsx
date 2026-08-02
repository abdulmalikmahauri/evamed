import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { BookingForm } from '@/components/BookingForm';
import { clinic, DISCLAIMER, features } from '@/lib/config';
import { routes } from '@/lib/routes';

/**
 * Контакты. Все данные — из lib/config: один адрес, один телефон, один режим
 * работы. Ориентиры, схемы проезда, парковки и входы не описываются: этих
 * сведений нет, а придуманные привели бы пациента не туда.
 *
 * Карта не встраивается сознательно. Виджет стороннего картографического
 * сервиса передаёт данные посетителя за пределы сайта, что несовместимо
 * с требованием локализации персональных данных; вместо карты — адрес
 * и телефон администратора.
 */

export const metadata: Metadata = {
  title: `Контакты — ${clinic.city}, ${clinic.address}`,
  description:
    `Адрес, телефон и режим работы клиники ${clinic.brand}: ${clinic.addressFull}, ` +
    `приём ${clinic.hours}. Заявка на приём и сведения о юридическом лице.`,
};

/** Контактные данные страницы. Источник — только lib/config. */
const CONTACTS: ReadonlyArray<readonly [string, string]> = [
  ['Телефон', clinic.phone],
  ['Адрес', clinic.addressFull],
  ['Приём', clinic.hoursNote],
  ['Юридическое лицо', clinic.legalName],
];

/**
 * Реквизиты юридического лица. Строка «Уточняется» остаётся до получения
 * документов от клиники: выдуманный ИНН выглядит как настоящий и будет
 * опубликован как настоящий.
 */
const LEGAL: ReadonlyArray<readonly [string, string]> = [
  ['Наименование', clinic.legalName],
  ['Адрес', clinic.addressFull],
  ['ИНН', 'Уточняется'],
  ['ОГРН', 'Уточняется'],
  ['Лицензия на медицинскую деятельность', 'Номер уточняется'],
];

export default function ContactsPage(): React.ReactElement {
  return (
    <>
      <SiteHeader current={routes.contacts} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li aria-current="page">Контакты</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Контакты</p>
              <h1 className="h1">Как с нами связаться</h1>
              <p className="lead">
                Один адрес и один телефон. Приём {clinic.hours}, в эти же часы
                администратор отвечает на звонки и перезванивает по заявкам.
              </p>
            </div>

            <aside className="passport" aria-label="Контактные данные">
              {CONTACTS.map(([key, value]) => (
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
                <h2 className="block__title">Телефон</h2>
                <div className="stack">
                  <div>
                    <p className="metric">
                      <a className="metric-value" href={`tel:${clinic.phoneHref}`}>
                        {clinic.phone}
                      </a>
                    </p>
                    <p className="metric-label">{clinic.hoursNote}</p>
                  </div>
                  <p className="body-text">
                    По этому номеру записывают на приём, переносят время и отвечают
                    на вопросы о подготовке к исследованиям.
                  </p>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Как добраться</h2>
                <p className="body-text">
                  Клиника находится по адресу {clinic.addressFull}. Приём, лаборатория
                  и стационар — по этому адресу; других точек приёма у клиники нет.
                </p>
                <p className="body-text">
                  Интерактивную карту мы на сайте не размещаем, чтобы не передавать
                  данные посетителей сторонним сервисам. Если удобнее, чтобы дорогу
                  объяснили словами, позвоните администратору — он подскажет, как
                  проехать.
                </p>
              </div>

              <div className="block">
                <h2 className="block__title">Режим работы</h2>
                <p className="body-text">
                  {clinic.hoursNote}. Звонки администратор принимает в те же часы;
                  заявка, оставленная позже, попадает в работу на следующий день.
                </p>
                <p className="body-text">
                  Расписание конкретного специалиста уточняйте по телефону: онлайн-запись
                  с реальным расписанием пока не подключена, время приёма подтверждает
                  администратор.
                </p>
              </div>

              <div className="block">
                <h2 className="block__title">Скорая помощь и вызов врача на дом</h2>
                <p className="body-text">
                  Клиника не оказывает скорую медицинскую помощь и не направляет врача
                  на дом. Приём ведётся только в клинике, {clinic.hours}.
                </p>
                <div className="disclaimer">
                  <p>
                    <b>
                      Если состояние требует неотложной помощи, вызывайте скорую
                      медицинскую помощь: 103 с мобильного телефона или 112.
                    </b>
                  </p>
                  <p>
                    {DISCLAIMER} Информация на странице носит справочный характер,
                    не является публичной офертой и не заменяет консультацию врача.
                  </p>
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">Юридические сведения</h2>
                <div className="stack">
                  <div className="passport">
                    {LEGAL.map(([key, value]) => (
                      <div className="passport__row" key={key}>
                        <span className="passport__key">{key}</span>
                        <span className="passport__val">{value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="caption">
                    Реквизиты публикуются по мере получения документов от клиники.
                    Полный состав сведений о медицинской организации и лицензия —
                    в правовом разделе.
                  </p>
                  <Link className="link-underline" href={routes.legalInfo}>
                    Сведения о медицинской организации
                  </Link>
                </div>
              </div>
            </div>

            <aside className="page-aside stack-lg">
              <div className="card stack">
                <p className="overline">Запись на приём</p>
                <p className="body-text">
                  Администратор перезвонит, подберёт специалиста и время.
                </p>
                <Link className="btn btn--primary btn--block-mobile" href="#zayavka">
                  Оставить заявку
                </Link>
                <p>
                  <a className="link-underline" href={`tel:${clinic.phoneHref}`}>
                    {clinic.phone}
                  </a>
                </p>
              </div>

              <div className="card stack">
                <p className="overline">Адрес и приём</p>
                <p className="body-text">{clinic.addressFull}</p>
                <p className="caption">
                  {clinic.hoursNote}. Приём, лаборатория и стационар — по одному адресу.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section sec-accent" id="zayavka" aria-labelledby="z-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Заявка</p>
              <h2 className="h2" id="z-t">
                Оставить заявку на приём
              </h2>
              <p>Администратор перезвонит, подберёт специалиста и время.</p>
            </div>

            <div className="contacts contacts-grid">
              <div className="stack">
                <p className="body-text">
                  Заявка — это просьба перезвонить. Она не бронирует время: к какому
                  специалисту и когда прийти, вы определите вместе с администратором
                  в разговоре.
                </p>
                <p className="body-text">
                  Медицинские сведения в форме не указывайте — о самочувствии
                  и результатах анализов поговорим на приёме.
                </p>
                <p className="caption">
                  Администратор перезванивает в рабочее время — с 9:00 до 19:00,
                  обычно в течение часа.
                </p>
              </div>

              <BookingForm enabled={features.formsEnabled} withComment />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta actions={[{ href: '#zayavka', label: 'Оставить заявку', variant: 'primary' }]} />
    </>
  );
}
