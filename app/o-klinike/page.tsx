import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { clinic, DISCLAIMER } from '@/lib/config';
import { routes } from '@/lib/routes';

/**
 * О клинике. Клиника новая: истории, регалий, объёмов и отзывов нет, поэтому
 * страница держится на проверяемом — что есть по адресу, как устроен приём
 * и чем год наблюдения отличается от разового обследования.
 *
 * Реквизиты, которых нет в lib/config, здесь не появляются даже правдоподобные:
 * строка «Уточняется» безопаснее выдуманного номера, который клиника
 * опубликует как настоящий.
 */

export const metadata: Metadata = {
  title: `О клинике — ранняя диагностика в ${clinic.cityIn}`,
  description:
    `${clinic.brand} — клиника ранней диагностики в ${clinic.cityIn}: собственная лаборатория, ` +
    `стационар, приём ${clinic.hours} по одному адресу. Как устроена работа с пациентом ` +
    `и чем программа наблюдения отличается от разового обследования.`,
};

/** Сводка параметров клиники: только то, что есть в конфигурации и в макетах. */
const PASSPORT: ReadonlyArray<readonly [string, string]> = [
  ['Юридическое лицо', clinic.legalName],
  ['Город', clinic.city],
  ['Адрес', clinic.address],
  ['Приём', clinic.hoursNote],
  ['Лаборатория', 'Собственная'],
  ['Стационар', 'Есть'],
];

interface ProcessStep {
  title: string;
  note: string;
}

const PROCESS: readonly ProcessStep[] = [
  {
    title: 'Запись',
    note: 'Администратор уточняет, что уже проверяли и что беспокоит, и подбирает специалиста и время приёма.',
  },
  {
    title: 'Приём и обследование',
    note: 'Врач осматривает и назначает исследования. Забор крови и анализ — в своей лаборатории, по этому же адресу.',
  },
  {
    title: 'Разбор результатов',
    note: 'Врач объясняет, что означают показатели, и фиксирует рекомендации письменно, а не на словах.',
  },
  {
    title: 'Наблюдение',
    note: 'У каждой рекомендации срок и ответственный. Через полгода повторяем то, что было отклонением, и сравниваем.',
  },
];

interface FactItem {
  /** буквенный якорь типа доказательства: документ, юрлицо, место, время */
  token: string;
  title: string;
  note: string;
}

const FACTS: readonly FactItem[] = [
  {
    token: 'Ю',
    title: clinic.legalName,
    note: 'Клиника работает как юридическое лицо. Реквизиты и полный состав сведений о медицинской организации — в правовом разделе.',
  },
  {
    token: '№',
    title: 'Лицензия на медицинскую деятельность',
    note: 'Действующая лицензия. Скан и ссылка на реестр публикуются в разделе документов, номер и дата выдачи — уточняются.',
  },
  {
    token: 'Л',
    title: 'Собственная лаборатория',
    note: 'Забор, анализ и выдача результата в одном месте. Не зависим от расписания сторонних подрядчиков.',
  },
  {
    token: 'С',
    title: 'Стационар',
    note: 'Есть где наблюдать пациента, а не только принять и отпустить.',
  },
  {
    token: 'А',
    title: 'Один адрес',
    note: `${clinic.addressFull}. Приём, лаборатория и стационар — по этому адресу, других точек приёма нет.`,
  },
  {
    token: 'Ч',
    title: `Приём ${clinic.hours}`,
    note: 'Ежедневно. Скорую медицинскую помощь и вызов врача на дом клиника не оказывает.',
  },
];

interface CompareRow {
  readonly aspect: string;
  readonly single: string;
  readonly program: string;
}

/** Сравниваем два своих формата обслуживания — сопоставление с другими клиниками запрещено. */
const COMPARE: readonly CompareRow[] = [
  { aspect: 'Срок', single: 'Один визит', program: '12 месяцев' },
  {
    aspect: 'Что на руках',
    single: 'Результаты исследований',
    program: 'Результаты и письменный план',
  },
  {
    aspect: 'Кто разбирает результаты',
    single: 'Врач на приёме',
    program: 'Врач на приёме и на контрольных точках',
  },
  {
    aspect: 'Что дальше',
    single: 'Следующий визит по вашей инициативе',
    program: 'Даты контрольных точек назначены заранее',
  },
  {
    aspect: 'Выполнение рекомендаций',
    single: 'Остаётся на пациенте',
    program: 'У каждой рекомендации срок и ответственный',
  },
  {
    aspect: 'Динамика показателей',
    single: 'Одно измерение',
    program: 'Сравнение двух циклов за год',
  },
];

/** Реквизиты лицензии. Ни один из них выдумывать нельзя — вместо числа «Уточняется». */
const LICENSE: ReadonlyArray<readonly [string, string]> = [
  ['Юридическое лицо', clinic.legalName],
  ['Лицензия', 'Действующая'],
  ['Номер лицензии', 'Уточняется'],
  ['Дата выдачи', 'Уточняется'],
  ['Орган, выдавший лицензию', 'Уточняется'],
];

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <SiteHeader current={routes.about} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li aria-current="page">О клинике</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">О клинике</p>
              <h1 className="h1">Клиника ранней диагностики в {clinic.cityIn}</h1>
              <p className="lead">
                {clinic.brand} — собственная лаборатория и стационар по одному адресу,
                приём {clinic.hours}. Мы занимаемся плановой проверкой здоровья
                и наблюдением за динамикой показателей.
              </p>
            </div>

            <aside className="passport" aria-label="Сведения о клинике">
              {PASSPORT.map(([key, value]) => (
                <div className="passport__row" key={key}>
                  <span className="passport__key">{key}</span>
                  <span className="passport__val">{value}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section" id="kak" aria-labelledby="kak-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Порядок</p>
              <h2 className="h2" id="kak-t">
                Как устроена работа с пациентом
              </h2>
              <p>
                Четыре шага. Четвёртый — то, чем наблюдение отличается от разового
                обследования.
              </p>
            </div>

            <div className="grid grid--4 steps">
              {PROCESS.map((step, index) => (
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

        <section className="section sec-raised" id="chto-est" aria-labelledby="est-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Проверяемое</p>
              <h2 className="h2" id="est-t">
                Что есть на месте
              </h2>
              <p>
                Клиника новая, поэтому вместо истории и регалий показываем документы
                и то, что физически есть по адресу приёма.
              </p>
            </div>

            <div className="trust sec-body">
              {FACTS.map((item) => (
                <div className="trust__item" key={item.title}>
                  <span className="token" aria-hidden="true">
                    {item.token}
                  </span>
                  <div>
                    <b>{item.title}</b>
                    <p>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="sravnenie" aria-labelledby="cmp-t">
          <div className="container">
            <div className="sec-head">
              <p className="overline">Форматы</p>
              <h2 className="h2" id="cmp-t">
                Наблюдение и разовое обследование
              </h2>
              <p>
                Два наших собственных формата. Сравниваем себя с собой, а не с другими
                клиниками.
              </p>
            </div>

            {/* tabindex + role=region: прокручиваемая по горизонтали таблица
                должна быть достижима с клавиатуры */}
            <div
              className="table-scroll compare-scroll"
              tabIndex={0}
              role="region"
              aria-label="Сравнение разового обследования и программы наблюдения, прокручивается по горизонтали"
            >
              {/* Без класса .compare: его липкая шапка (position: sticky, top: 72px)
                  внутри .table-scroll отсчитывается от собственного скроллпорта
                  контейнера и наезжает на вторую строку. Таблица короткая,
                  фиксировать шапку незачем. Правило CSS передано владельцу стилей. */}
              <table>
                <thead>
                  <tr>
                    <th scope="col">Что сравниваем</th>
                    <th scope="col">Разовое обследование</th>
                    <th scope="col">Программа наблюдения</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.aspect}>
                      <td>{row.aspect}</td>
                      <td>{row.single}</td>
                      <td>{row.program}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="strip sec-body">
              <div>
                <p className="overline">Программа наблюдения</p>
                <p className="strip__note">
                  Два цикла диагностики за год и контрольные точки между ними
                </p>
              </div>
              <Link className="link-underline" href={routes.program}>
                Что входит в программу
              </Link>
            </div>
          </div>
        </section>

        <section className="section sec-accent" id="dokumenty" aria-labelledby="doc-t">
          <div className="container grid grid--7-5">
            <div className="stack-lg">
              <div className="sec-head">
                <p className="overline">Документы</p>
                <h2 className="h2" id="doc-t">
                  Что можно проверить
                </h2>
                <p>
                  Лицензия, учредительные документы и сведения о медицинской организации
                  публикуются в правовом разделе. Числовые реквизиты появятся там же —
                  после того как клиника передаст документы.
                </p>
              </div>

              <p className="body-text">
                До этого момента на сайте нет ни номеров лицензии, ни дат выдачи:
                правдоподобный, но выдуманный реквизит хуже пустого места — по нему
                нельзя ничего проверить.
              </p>

              <p>
                <Link className="link-underline" href={routes.legalInfo}>
                  Сведения о медицинской организации
                </Link>
              </p>

              <div className="disclaimer">
                <p>
                  <b>{DISCLAIMER}</b>
                </p>
                <p>
                  Информация на странице носит справочный характер, не является публичной
                  офертой и не заменяет консультацию врача. Объём обследования определяет
                  лечащий врач.
                </p>
              </div>
            </div>

            <aside className="passport" aria-label="Сведения о лицензии">
              {LICENSE.map(([key, value]) => (
                <div className="passport__row" key={key}>
                  <span className="passport__key">{key}</span>
                  <span className="passport__val">{value}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta
        actions={[
          { href: routes.booking, label: 'Записаться', variant: 'primary' },
          { href: routes.program, label: 'Программа', variant: 'outline' },
        ]}
      />
    </>
  );
}
