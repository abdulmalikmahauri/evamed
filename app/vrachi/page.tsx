import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { BookingForm } from '@/components/BookingForm';
import { doctorCards } from '@/content/doctors';
import { PRICE_VALID_FROM, formatPrice } from '@/content/services';
import { clinic, DISCLAIMER, features } from '@/lib/config';
import { routes } from '@/lib/routes';

/**
 * Каталог врачей, регистр «Кремовый кабинет».
 *
 * Портретов нет: фотосъёмка не проведена, а стоковое лицо в карточке врача
 * выдаёт клинике сотрудника, которого в ней нет. Монограмма честнее.
 *
 * Персональная страница есть не у каждого специалиста — сведения об
 * образовании и аккредитации публикуются только после сверки с документами.
 * Поэтому «Подробнее» появляется по флагу hasProfile, а не у всех карточек:
 * ссылка в несуществующий адрес хуже её отсутствия.
 *
 * Фильтра по направлениям нет сознательно: четыре карточки видны целиком,
 * фильтр над ними — интерфейс ради интерфейса.
 */

export const metadata: Metadata = {
  title: `Врачи клиники в ${clinic.cityIn} — приём по записи`,
  description:
    `Врачи клиники ${clinic.brand}, ${clinic.city}: эндокринолог, уролог, гинеколог, ` +
    `гастроэнтеролог. Приём по записи, ${clinic.hours}. Стоимость первичного приёма ` +
    'указана в карточке специалиста.',
};

interface RoleItem {
  title: string;
  note: string;
}

/**
 * Роли описаны как функции, а не как закреплённые за пациентом люди: имя
 * куратора и порядок связи публикуются только после подтверждения выделенной
 * роли. Заявленного времени ответа здесь нет по той же причине.
 */
const ROLES: RoleItem[] = [
  {
    title: 'Врач отвечает за клинические решения',
    note:
      'Назначает обследование, разбирает результаты на приёме и объясняет, что показывает ' +
      'каждый показатель. По итогам приёма составляет письменный план с контрольными точками.',
  },
  {
    title: 'Куратор отвечает за организацию',
    note:
      'Согласует даты приёмов и исследований, напоминает о подготовке к анализам и следит, ' +
      'чтобы контрольные точки плана не потерялись. Назначений и медицинских рекомендаций ' +
      'куратор не даёт — это работа врача.',
  },
];

export default function DoctorsPage(): React.ReactElement {
  /** «от» считаем по карточкам, чтобы прайс правился в одном месте */
  const minPrice = Math.min(...doctorCards.map((doc) => doc.price));
  const directionsCount = new Set(doctorCards.map((doc) => doc.spec)).size;

  const passport: ReadonlyArray<readonly [string, string]> = [
    ['Направлений', String(directionsCount)],
    ['Приём', 'По записи'],
    ['Часы работы', clinic.hours],
    ['Первичный приём', `от ${formatPrice(minPrice)}`],
  ];

  return (
    <>
      <SiteHeader current={routes.doctors} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li aria-current="page">Врачи</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Команда</p>
              <h1 className="h1">Врачи клиники</h1>
              <p className="lead">
                Приём ведут специалисты по четырём направлениям: эндокринология, урология,
                гинекология, гастроэнтерология. Записаться можно к конкретному врачу или
                оставить заявку — администратор подберёт специалиста и время.
              </p>
            </div>

            <aside className="passport" aria-label="Приём специалистов">
              {passport.map(([key, value]) => (
                <div className="passport__row" key={key}>
                  <span className="passport__key">{key}</span>
                  <span className="passport__val">{value}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section section--utility" aria-labelledby="docs-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Специалисты</p>
              <h2 className="h2" id="docs-t">
                Кто ведёт приём
              </h2>
              <p>
                Персональные страницы публикуются по мере сверки сведений об образовании
                и аккредитации с документами специалиста. Пока страницы нет, запись идёт
                через администратора.
              </p>
            </div>

            <div className="docs-grid sec-body">
              {doctorCards.map((doc) => (
                <article className="doc" key={doc.slug}>
                  <div className="doc__portrait" aria-hidden="true">
                    {doc.monogram}
                  </div>
                  <h3 className="doc__name">{doc.name}</h3>
                  <p className="doc__spec">{doc.spec}</p>
                  <p className="doc__meta">{doc.meta}</p>
                  <div className="doc__foot">
                    <span className="doc__price">{formatPrice(doc.price)}</span>
                    {doc.hasProfile && (
                      <Link className="link-underline doc__more" href={`/vrachi/${doc.slug}`}>
                        Подробнее
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="disclaimer">
              <p>
                <b>{DISCLAIMER}</b>
              </p>
              <p>
                Указана стоимость первичного приёма. {PRICE_VALID_FROM}. Информация
                на странице носит справочный характер, не является публичной офертой
                и не заменяет очную консультацию врача.
              </p>
            </div>
          </div>
        </section>

        <section className="section sec-raised" id="rabota" aria-labelledby="work-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Порядок</p>
              <h2 className="h2" id="work-t">
                Как устроена работа с пациентом
              </h2>
              <p>
                Медицинская и организационная части разведены: врач решает, что делать,
                вторая роль следит за тем, чтобы назначенное состоялось.
              </p>
            </div>

            <div className="grid grid--7-5 sec-body">
              {ROLES.map((role) => (
                <div className="promise" key={role.title}>
                  <p className="promise__title">{role.title}</p>
                  <p>{role.note}</p>
                </div>
              ))}
            </div>

            <p className="caption docs-more">
              Куратор — роль в программе наблюдения, а не закреплённое за пациентом имя.
              Порядок связи публикуется вместе с запуском программы.
            </p>
          </div>
        </section>

        <section className="section section--utility" id="zayavka" aria-labelledby="z-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Запись</p>
              <h2 className="h2" id="z-t">
                Оставить заявку — подберём специалиста
              </h2>
              <p>
                Опишите в общих словах, с чем хотите обратиться. Администратор предложит
                врача и время приёма.
              </p>
            </div>

            <div className="contacts contacts-grid">
              <dl>
                <div className="contact-row">
                  <dt>Телефон</dt>
                  <dd>{clinic.phone}</dd>
                </div>
                <div className="contact-row">
                  <dt>Адрес</dt>
                  <dd>
                    г. {clinic.city},<br />
                    {clinic.address}
                  </dd>
                </div>
                <div className="contact-row contact-row--last">
                  <dt>Приём</dt>
                  <dd>{clinic.hoursNote}</dd>
                </div>
              </dl>

              <BookingForm enabled={features.formsEnabled} withComment />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta
        actions={[
          { href: '#zayavka', label: 'Оставить заявку', variant: 'primary' },
          { href: routes.program, label: 'Программа', variant: 'outline' },
        ]}
      />
    </>
  );
}
