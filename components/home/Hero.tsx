import Link from 'next/link';
import { Scale } from '@/components/Scale';
import { clinic, features } from '@/lib/config';
import { routes } from '@/lib/routes';

/**
 * Первый экран, утверждённая концепция: светлая страница с врезанным тёмным
 * жетоном. Тёмное — данные и продукт, светлое — клиника и человек.
 * Жетон наезжает на следующую секцию и даёт глубину без теней-заглушек.
 *
 * H1 описывает процесс, а не обещает результат: утверждения о наличии
 * заболевания у читателя и гарантии в рекламе медуслуг запрещены.
 */
export function Hero() {
  return (
    <section className="heroC grain" id="program" aria-labelledby="h1">
      <div className="container">
        <div className="heroC__grid">
          <div className="heroC__copy">
            <p className="overline overline--accent">Программа наблюдения</p>
            <h1 id="h1" className="hero-title heroC__title">
              Проверяем здоровье дважды в год
            </h1>
            <p className="lead">
              И следим, чтобы рекомендации были выполнены. Клиника с собственной
              лабораторией и стационаром в {clinic.cityIn}. Приём {clinic.hours}.
            </p>
            <div className="heroC__actions">
              <Link className="btn btn--primary btn--block-mobile" href={routes.booking}>
                Записаться на первый визит
              </Link>
              <Link className="link-underline" href={routes.howItWorks}>
                Как это работает
              </Link>
            </div>
          </div>

          <div className="chip-slot">
            <aside className="chip grain" data-surface="dark" aria-labelledby="chip-t">
              <div className="chip__grid" aria-hidden="true" />
              <div className="chip__inner">
                <p className="overline overline--accent" id="chip-t">
                  Год под наблюдением
                </p>

                <ul className="chip__params">
                  <li>
                    <span className="num">12</span>
                    <span>месяцев</span>
                  </li>
                  <li>
                    <span className="num">2</span>
                    <span>цикла диагностики</span>
                  </li>
                  <li>
                    <span className="num">2–12</span>
                    <span>контрольных точек</span>
                  </li>
                </ul>

                <div className="chip__price">
                  <span className="chip__price-from">от</span>
                  <span className="price">54&nbsp;000&nbsp;₽</span>
                  <span className="chip__price-per">/ год</span>
                </div>

                <Scale
                  hero
                  className="chip__scale"
                  name="Уровень сопровождения"
                  description="Шкала сопровождения: три тарифа отличаются числом контрольных точек в году — 2, 6 и 12"
                  zones={[{ flex: 50, kind: 'done' }, { flex: 50 }]}
                  marks={[
                    { left: 8, label: '2' },
                    { left: 50, label: '6' },
                    { left: 92, label: '12' },
                  ]}
                  legend={['Основа', 'Личный врач']}
                />

                <Link className="btn btn--gold chip__cta" href={routes.pricing}>
                  {features.paymentsEnabled ? 'Оформить программу' : 'Подобрать программу'}
                </Link>
                <p className="chip__link">
                  <Link className="link-underline" href="/programma-nablyudeniya">
                    Что входит в программу
                  </Link>
                </p>
              </div>
            </aside>
          </div>

          {/* Полоса институциональных фактов — то, что у клиники есть физически */}
          <div className="facts-bar heroC__facts">
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
  );
}
