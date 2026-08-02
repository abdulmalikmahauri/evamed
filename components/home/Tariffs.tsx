import Link from 'next/link';
import { features } from '@/lib/config';

/**
 * Блоки 6 и 7: три тарифа и якорь цены. Живут в одной тёмной секции —
 * цена и расчёт выгоды должны читаться как один аргумент, а не два блока.
 *
 * Ось различия тарифов — число контрольных точек, а не объём анализов:
 * состав исследований до утверждения врачом не публикуется (features
 * .programCompositionApproved).
 */

interface TariffItem {
  readonly text: string;
  /** Отличие от предыдущего тарифа: выделяется насыщенностью, не цветом */
  readonly diff?: boolean;
}

interface Tariff {
  readonly name: string;
  readonly audience: string;
  readonly points: string;
  readonly pointsNote: string;
  readonly items: readonly TariffItem[];
  readonly priceYear: string;
  readonly priceMonth: string;
  readonly badge?: string;
  readonly recommended?: boolean;
}

const TARIFFS: readonly Tariff[] = [
  {
    name: 'Основа',
    audience: 'Для тех, кто хочет проверяться регулярно и получать понятный план.',
    points: '2',
    pointsNote: 'контрольные точки в году',
    items: [
      { text: 'Два цикла обследования' },
      { text: 'Приём врача с разбором результатов' },
      { text: 'Письменный план' },
      { text: 'Напоминания о контрольных точках' },
      { text: 'Личный кабинет с историей' },
    ],
    priceYear: '54 000 ₽',
    priceMonth: '≈ 4 500 ₽ в месяц',
  },
  {
    name: 'Наблюдение',
    audience: 'Для тех, у кого уже есть отклонения и нужен регулярный контроль.',
    points: '6',
    pointsNote: 'контрольных точек в году',
    items: [
      { text: 'Всё из «Основы»' },
      { text: 'Расширенный состав цикла 1', diff: true },
      { text: 'Промежуточные исследования между циклами', diff: true },
      { text: 'Отчёт о выполнении плана', diff: true },
      { text: 'Приоритетная запись в утреннее лабораторное окно', diff: true },
    ],
    priceYear: '108 000 ₽',
    priceMonth: '≈ 9 000 ₽ в месяц',
    badge: 'Рекомендуем как основу',
    recommended: true,
  },
  {
    name: 'Личный врач',
    audience: 'Для тех, кому нужен один врач, который ведёт весь год.',
    points: '12',
    pointsNote: 'контрольных точек в году',
    items: [
      { text: 'Всё из «Наблюдения»' },
      { text: 'Закреплённый врач на весь год', diff: true },
      { text: 'Второе мнение по выявленной проблеме', diff: true },
      { text: 'Годовой разбор динамики', diff: true },
      { text: 'Сопровождение одного члена семьи', diff: true },
    ],
    priceYear: '216 000 ₽',
    priceMonth: '≈ 18 000 ₽ в месяц',
  },
];

interface AnchorRow {
  readonly key: string;
  readonly value: string;
  readonly total?: boolean;
}

const ANCHOR_ROWS: readonly AnchorRow[] = [
  { key: 'По действующему прайсу', value: '148 000 ₽' },
  { key: 'Цена программы на год', value: '108 000 ₽' },
  { key: 'Разница', value: '40 000 ₽', total: true },
];

/** Пока онлайн-оплата выключена, «оформить» и «оплатить» на кнопке запрещены */
const CTA_LABEL = features.paymentsEnabled ? 'Оформить программу' : 'Оставить заявку';

export function Tariffs() {
  return (
    <section className="section sec-dark grain" id="tariffs" data-surface="dark" aria-labelledby="tar-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline overline--accent">Тарифы</p>
          <h2 className="h2" id="tar-t">
            Разница — в том, сколько раз мы вас проверяем
          </h2>
          <p>
            Ось различия — уровень сопровождения, а не количество анализов. Медицинский состав
            каждого цикла определяет врач на первом приёме.
          </p>
        </div>

        <div className="tariffs tariffs-grid">
          {TARIFFS.map((tariff) => (
            <article
              className={`card tariff${tariff.recommended ? ' card--accent tariff--rec' : ''}`}
              key={tariff.name}
            >
              {tariff.badge ? <p className="tariff__badge">{tariff.badge}</p> : null}
              <h3 className="tariff__name">{tariff.name}</h3>
              <p className="tariff__for">{tariff.audience}</p>
              <p className="tariff__points">
                <b>{tariff.points}</b>
                <span>{tariff.pointsNote}</span>
              </p>
              <hr className="rule" />
              <ul className="tariff__list">
                {tariff.items.map((item) => (
                  <li className={item.diff ? 'is-diff' : undefined} key={item.text}>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="tariff__foot">
                <p className="tariff__cost">
                  <span className="price">{tariff.priceYear}</span>
                  <span className="tariff__per">в год</span>
                </p>
                <p className="caption">{tariff.priceMonth}</p>
                <a
                  className={`btn ${tariff.recommended ? 'btn--gold' : 'btn--outline'} tariff__cta`}
                  href="#contacts"
                >
                  {CTA_LABEL}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Блок 7: якорь цены — сравнение с собственным прайсом, не с чужими клиниками */}
        <div className="anchor tariffs-anchor">
          <div>
            <p className="overline overline--accent">Сколько это стоит отдельно</p>
            <h3 className="h3 anchor__title">Те же услуги по прайсу обойдутся дороже</h3>
            <p className="anchor__note">
              Расчёт для тарифа «Наблюдение»: сумма входящих в него приёмов и исследований
              по действующему прайсу клиники против годовой цены программы.
            </p>
            <Link className="link-underline anchor__link" href="/programma-nablyudeniya">
              Что входит в программу
            </Link>
          </div>

          <div className="anchor__calc">
            {ANCHOR_ROWS.map((row) => (
              <div
                className={`anchor__row${row.total ? ' anchor__row--total' : ''}`}
                key={row.key}
              >
                <span className="anchor__key">{row.key}</span>
                <span className="anchor__val">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
