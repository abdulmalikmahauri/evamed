import { Scale } from '@/components/Scale';

/**
 * Блок 5, главный на странице. Отвечает на вопрос «а что между обследованиями».
 *
 * Шкала показана как пример конкретного тарифа, а не как обещание объёма:
 * состав программ утверждает врач, до утверждения цифры подаются как образец.
 */

interface TimelinePoint {
  title: string;
  /** кто отвечает за точку — обязательная часть обещания «есть ответственный» */
  owner: string;
}

const POINTS: TimelinePoint[] = [
  { title: 'Первый визит: приём и забор крови', owner: 'Врач и лаборатория' },
  { title: 'Разбор результатов и письменный план', owner: 'Врач' },
  { title: 'Проверка: план начат', owner: 'Клиника' },
  { title: 'Промежуточный контроль по отклонениям', owner: 'Врач' },
  { title: 'Цикл 2: контроль динамики', owner: 'Лаборатория' },
  { title: 'Годовой разбор: что изменилось', owner: 'Врач' },
];

export function Year() {
  return (
    <section className="section" id="year" aria-labelledby="year-t">
      <div className="container">
        {/* Диагностическая линия: бренд-разделитель, смысла не несёт */}
        <svg
          className="sep-ecg"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 12 H520 L536 12 L549 3 L563 21 L577 8 L589 12 H1200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="sec-head">
          <p className="overline">Главное отличие</p>
          <h2 className="h2" id="year-t">
            Ваш год в программе
          </h2>
          <p>
            Между обследованиями вы не остаётесь один. У каждой точки есть срок и тот,
            кто за неё отвечает.
          </p>
        </div>

        <Scale
          hero
          className="year-scale"
          name="Пример: тариф «Наблюдение»"
          value={
            <>
              4 <span className="unit">из 6 точек</span>
            </>
          }
          description="Год в программе: два цикла диагностики, между ними контрольные точки. Пример для тарифа «Наблюдение»: выполнено 4 из 6 точек"
          zones={[{ flex: 66, kind: 'done' }, { flex: 34 }]}
          marks={[{ left: 66, label: 'сегодня' }]}
          legend={['Цикл 1', 'Цикл 2']}
        />

        <div className="timeline">
          {POINTS.map((p, i) => (
            <div className="tl-item" key={p.title}>
              <span className="token">{i + 1}</span>
              <div>
                <p className="tl-item__title">{p.title}</p>
                <p className="tl-item__meta">
                  <span>{p.owner}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
