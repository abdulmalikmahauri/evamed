import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { clinic, DISCLAIMER, features } from '@/lib/config';
import { tariffs } from '@/content/programs';
import { PRICE_VALID_FROM, formatPrice, services, type Service } from '@/content/services';
import { routes } from '@/lib/routes';

/**
 * Страница «Цены», регистр «Кремовый кабинет».
 *
 * Прайс опубликован полностью и без регистрации: посетитель должен получить
 * ответ на вопрос «сколько это стоит» до звонка. Взамен рядом с каждой суммой
 * стоит оговорка — цена не оферта, окончательную стоимость определяет врач.
 *
 * Данные берутся из content/*, а не дублируются здесь: прайс правит
 * администратор в одном месте, иначе таблица и карточки услуг разъедутся.
 */

export const metadata: Metadata = {
  title: 'Цены на услуги и программы наблюдения',
  description:
    `Прайс клиники ${clinic.brand} в ${clinic.cityIn}: стоимость приёмов, УЗИ и анализов, ` +
    `а также годовые тарифы программы наблюдения. Цены опубликованы открыто, ` +
    `запись по телефону ${clinic.phone}.`,
};

/** Позиции одного направления: заголовок группы и её строки прайса */
interface PriceGroup {
  readonly direction: string;
  readonly items: readonly Service[];
}

/**
 * Порядок направлений повторяет порядок каталога, а не алфавит: в каталоге
 * диагностика идёт перед приёмами врачей, и прайс должен читаться так же.
 */
function groupByDirection(list: readonly Service[]): readonly PriceGroup[] {
  const directions = list
    .map((service) => service.direction)
    .filter((direction, index, all) => all.indexOf(direction) === index);

  return directions.map((direction) => ({
    direction,
    items: list.filter((service) => service.direction === direction),
  }));
}

/** Пока онлайн-оплата выключена, «оформить» и «оплатить» на кнопке запрещены */
const TARIFF_CTA = features.paymentsEnabled ? 'Оформить программу' : 'Оставить заявку';

const PRICE_GROUPS = groupByDirection(services);

const MIN_SERVICE_PRICE = Math.min(...services.map((service) => service.price));
const MIN_TARIFF_PRICE = Math.min(...tariffs.map((tariff) => tariff.pricePerYear));

export default function PricingPage(): React.ReactElement {
  const passport: ReadonlyArray<readonly [string, string]> = [
    ['Разовые услуги', `от ${formatPrice(MIN_SERVICE_PRICE)}`],
    ['Программа на год', `от ${formatPrice(MIN_TARIFF_PRICE)}`],
    ['Приём', clinic.hours],
    ['Адрес', clinic.address],
  ];

  return (
    <>
      <SiteHeader current={routes.pricing} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li aria-current="page">Цены</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div className="stack">
              <p className="overline overline--accent">Прайс</p>
              <h1 className="h1">Цены на услуги и программы</h1>
              <p className="lead">
                Стоимость приёмов и исследований опубликована полностью: разовые услуги —
                по прайсу, годовое наблюдение — тарифом. Звонить, чтобы узнать цену,
                не нужно.
              </p>
              <p className="caption">{PRICE_VALID_FROM}</p>
            </div>

            <aside className="passport" aria-label="Коротко о ценах">
              {passport.map(([key, value]) => (
                <div className="passport__row" key={key}>
                  <span className="passport__key">{key}</span>
                  <span className="passport__val">{value}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section sec-raised" id="tarify" aria-labelledby="tar-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Программа наблюдения</p>
              <h2 className="h2" id="tar-t">
                Годовые тарифы
              </h2>
              <p>
                Тарифы различаются уровнем сопровождения, а не количеством анализов:
                медицинский состав каждого цикла определяет врач на первом приёме.
                Помесячная сумма — ориентир от годовой цены, а не отдельный платёж.
              </p>
            </div>

            <div className="tariffs tariffs-grid">
              {tariffs.map((tariff) => (
                <article
                  className={
                    tariff.recommended ? 'card card--accent tariff tariff--rec' : 'card tariff'
                  }
                  key={tariff.id}
                >
                  {tariff.badge ? <p className="tariff__badge">{tariff.badge}</p> : null}
                  <h3 className="tariff__name">{tariff.name}</h3>
                  <p className="tariff__points">
                    <b>{tariff.points}</b>
                    <span>{tariff.pointsLabel}</span>
                  </p>
                  <hr className="rule" />
                  <ul className="tariff__list">
                    {tariff.features.map((feature) => (
                      <li className={feature.diff ? 'is-diff' : undefined} key={feature.text}>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <div className="tariff__foot">
                    <p className="tariff__cost">
                      <span className="price">{formatPrice(tariff.pricePerYear)}</span>
                      <span className="tariff__per">в год</span>
                    </p>
                    <p className="caption">≈ {formatPrice(tariff.pricePerMonth)} в месяц</p>
                    <Link
                      className={
                        tariff.recommended
                          ? 'btn btn--gold tariff__cta'
                          : 'btn btn--outline tariff__cta'
                      }
                      href={routes.booking}
                    >
                      {TARIFF_CTA}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="uslugi" aria-labelledby="pr-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Прайс</p>
              <h2 className="h2" id="pr-t">
                Разовые услуги
              </h2>
              <p>
                Цена указана за одну услугу и не включает сопутствующие исследования,
                если врач сочтёт их необходимыми. Полный перечень позиций уточняйте
                у администратора.
              </p>
            </div>

            <div className="sec-body">
              {PRICE_GROUPS.map((group) => (
                <div className="block" key={group.direction}>
                  <h3 className="block__title">{group.direction}</h3>

                  {/* tabindex + role=region: прокручиваемая по горизонтали таблица
                      должна быть достижима с клавиатуры */}
                  <div
                    className="table-scroll"
                    tabIndex={0}
                    role="region"
                    aria-label={`Прайс, ${group.direction}, таблица прокручивается по горизонтали`}
                  >
                    <table className="price-table">
                      <caption className="visually-hidden">
                        Стоимость услуг направления «{group.direction}»
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Услуга</th>
                          <th scope="col">Длительность</th>
                          <th scope="col">Результат</th>
                          <th scope="col" className="num">
                            Цена
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((service) => (
                          <tr key={service.slug}>
                            {/* Название в td, а не в th: заголовочные ячейки набраны
                                прописными по капители и съедают читаемость строки */}
                            <td>
                              <Link className="link-underline" href={`/uslugi/${service.slug}`}>
                                {service.name}
                              </Link>
                            </td>
                            <td>{service.duration}</td>
                            <td>{service.result}</td>
                            <td className="num">{formatPrice(service.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section sec-accent" aria-labelledby="og-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Оговорки</p>
              <h2 className="h2" id="og-t">
                Что важно знать о ценах
              </h2>
              <p>
                Прайс отвечает на вопрос о стоимости заранее, но не заменяет назначение
                врача: объём обследования становится известен после осмотра.
              </p>
            </div>

            <div className="disclaimer body-text">
              <p>
                <b>{DISCLAIMER}</b>
              </p>
              <p>
                Цены на сайте носят справочный характер и не являются публичной офертой.
                {' '}
                {PRICE_VALID_FROM}.
              </p>
              <p>
                Окончательная стоимость приёма или исследования определяется после осмотра
                врачом: часть назначений может оказаться лишней, часть — потребоваться
                дополнительно.
              </p>
              <p>
                Действующий прайс уточняйте у администратора клиники по телефону{' '}
                {clinic.phone}, приём {clinic.hours}, {clinic.addressFull}.
              </p>
            </div>

            <div className="sec-body">
              <Link className="btn btn--primary btn--block-mobile" href={routes.booking}>
                Записаться на приём
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta
        actions={[
          { href: routes.booking, label: 'Записаться', variant: 'primary' },
          { href: '#tarify', label: 'Тарифы', variant: 'outline' },
        ]}
      />
    </>
  );
}
