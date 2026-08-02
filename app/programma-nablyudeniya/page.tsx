import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale } from '@/components/Scale';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { BookingForm } from '@/components/BookingForm';
import { clinic, DISCLAIMER, features } from '@/lib/config';
import { tariffs } from '@/content/programs';
import { formatPrice } from '@/content/services';
import { routes } from '@/lib/routes';

/**
 * Лендинг программы наблюдения под платный трафик, вариант A «Тёмный протокол».
 *
 * Тёмный регистр выбран не ради вида: обязательное предупреждение занимает
 * не менее 5 % площади рекламного материала, и на тёмном фоне блок такого
 * размера размещается без разрушения композиции.
 *
 * Один сквозной призыв — заявка. Развилок в шапке и в тексте нет.
 */

export const metadata: Metadata = {
  title: {
    absolute: `Программа наблюдения — год под контролем | ${clinic.brand}, ${clinic.city}`,
  },
  description:
    `Программа наблюдения ${clinic.brand}: два цикла диагностики в год, персональный план ` +
    `и контроль выполнения рекомендаций. Клиника с собственной лабораторией и стационаром ` +
    `в ${clinic.cityIn}.`,
};

/** Каскад появления первого экрана: шаг 60 мс задаётся переменной --delay. */
function revealDelay(ms: number): React.CSSProperties {
  return { '--delay': `${ms}ms` } as React.CSSProperties;
}

const SPEC = [
  ['Длительность', '12 месяцев'],
  ['Циклов диагностики', '2'],
  ['Контрольных точек', '2–12'],
  ['Разбор результатов', 'Врач'],
] as const;

const STEPS = [
  {
    title: 'Подбираем программу',
    note: 'Разговор с администратором: что уже проверяли, что беспокоит.',
  },
  {
    title: 'Обследование и приём',
    note: 'Забор крови в утреннее окно, диагностика, разбор результатов врачом.',
  },
  {
    title: 'План и контрольные точки',
    note: 'Письменный план. У каждой рекомендации срок и ответственный.',
  },
  {
    title: 'Контроль динамики',
    note: 'Через полгода повторяем то, что было отклонением, и сравниваем.',
  },
];

export default function ProgramPage(): React.ReactElement {
  return (
    <>
      <SiteHeader dark minimal ctaHref="#zayavka" ctaLabel="Оставить заявку" />

      <main id="main">
        <section className="heroA grain" data-surface="dark" aria-labelledby="h1">
          <div className="heroA__glow" aria-hidden="true" />
          <div className="heroA__grid" aria-hidden="true" />

          <div className="heroA__body">
            <div className="container grid grid--7-5" style={{ alignItems: 'center' }}>
              <div>
                <p className="overline overline--accent reveal" style={revealDelay(0)}>
                  Год под наблюдением
                </p>

                <h1
                  id="h1"
                  className="hero-title heroA__title reveal"
                  style={{ ...revealDelay(60), marginTop: 'var(--s-5)' }}
                >
                  Проверяем здоровье дважды в год
                </h1>

                <p className="lead reveal" style={{ ...revealDelay(120), marginTop: 'var(--s-6)' }}>
                  И следим, чтобы рекомендации были выполнены. Не разовое обследование,
                  а год сопровождения с контрольными точками.
                </p>

                <div
                  className="reveal"
                  style={{ ...revealDelay(180), marginTop: 'var(--s-10)', maxWidth: '460px' }}
                >
                  <Scale
                    hero
                    description="Прогресс года в программе: выполнено 4 из 6 контрольных точек"
                    name="Ваш год в программе"
                    value={
                      <>
                        4 <span className="unit">из 6 точек</span>
                      </>
                    }
                    zones={[{ flex: 66, kind: 'done' }, { flex: 34 }]}
                    marks={[{ left: 66, label: 'сегодня' }]}
                    legend={['Цикл 1', 'Цикл 2']}
                  />
                </div>

                <div className="heroA__actions reveal" style={revealDelay(240)}>
                  <a className="btn btn--gold btn--block-mobile" href="#zayavka">
                    Оставить заявку
                  </a>
                  <a className="link-underline" href="#kak">
                    Как это работает
                  </a>
                </div>
              </div>

              <aside className="specA reveal" style={revealDelay(300)} aria-label="Параметры программы">
                <p className="overline overline--accent">Что входит в год</p>
                <div className="specA__rows">
                  {SPEC.map(([key, value]) => (
                    <div className="specA__row" key={key}>
                      <span className="specA__key">{key}</span>
                      <span className="specA__val">{value}</span>
                    </div>
                  ))}
                </div>
                <a
                  className="btn btn--outline"
                  href="#tarify"
                  style={{ marginTop: 'var(--s-6)', width: '100%' }}
                >
                  Посмотреть тарифы
                </a>
              </aside>
            </div>
          </div>

          <div className="heroA__facts">
            <div className="container">
              <div className="facts-bar">
                <span>
                  <b>Собственная лаборатория</b>
                </span>
                <span>
                  <b>Стационар</b>
                </span>
                <span>
                  <b>Приём</b> {clinic.hours}
                </span>
                <Link href={routes.license} className="facts-bar__link">
                  Лицензия
                </Link>
                <span>{clinic.addressFull}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="kak" aria-labelledby="kak-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Порядок</p>
              <h2 className="h2" id="kak-t">
                Четыре шага
              </h2>
              <p>Четвёртый шаг — то, чем программа отличается от разового обследования.</p>
            </div>
            <div
              className="grid grid--4 steps"
              style={{ marginTop: 'var(--s-11)', gap: 'var(--s-8)' }}
            >
              {STEPS.map((step, index) => (
                <div className="step" key={step.title}>
                  <span className="token">{index + 1}</span>
                  <div className="step__body">
                    <p className="step__title">{step.title}</p>
                    <p className="step__note">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section sec-raised" id="tarify" aria-labelledby="tar-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Тарифы</p>
              <h2 className="h2" id="tar-t">
                Разница — в том, сколько раз мы вас проверяем
              </h2>
              <p>Ось различия — уровень сопровождения, а не количество анализов.</p>
            </div>

            <div className="tariffs" style={{ marginTop: 'var(--s-11)' }}>
              {tariffs.map((tariff) => (
                <article
                  className={
                    tariff.recommended
                      ? 'card card--accent tariff tariff--rec'
                      : 'card tariff'
                  }
                  key={tariff.id}
                >
                  {tariff.badge && <p className="tariff__badge">{tariff.badge}</p>}
                  <p className="tariff__name">{tariff.name}</p>
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
                    <a
                      className={tariff.recommended ? 'btn btn--gold' : 'btn btn--outline'}
                      href="#zayavka"
                      style={{ width: '100%' }}
                    >
                      Оставить заявку
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sec-accent" id="zayavka" aria-labelledby="z-t">
          <div className="container grid grid--8-4" style={{ alignItems: 'start' }}>
            <div>
              <p className="overline">Первый шаг</p>
              <h2 className="h2" id="z-t" style={{ marginTop: 'var(--s-4)' }}>
                Начните с первого визита
              </h2>
              <p className="lead" style={{ marginTop: 'var(--s-6)' }}>
                Приём терапевта и базовая лабораторная панель по фиксированной цене. Если
                в течение 30 дней вы переходите в программу, стоимость первого визита
                зачитывается.
              </p>
            </div>

            <BookingForm enabled={features.formsEnabled} className="stack lp-form" />
          </div>
        </section>

        <section className="warning-band" data-surface="dark" aria-label="Предупреждение">
          <div className="container warning-band__inner">
            <div className="warning-band__mark" aria-hidden="true">
              !
            </div>
            <div>
              <p className="warning-band__text">{DISCLAIMER}</p>
              <p className="warning-band__sub">
                Информация на странице носит справочный характер, не является публичной
                офертой и не заменяет очную консультацию врача. Состав обследования
                и необходимость отдельных исследований определяет лечащий врач.{' '}
                {clinic.legalName}, действующая лицензия на медицинскую деятельность,{' '}
                {clinic.addressFull}, приём {clinic.hours}.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta actions={[{ href: '#zayavka', label: 'Оставить заявку', variant: 'gold' }]} />
    </>
  );
}
