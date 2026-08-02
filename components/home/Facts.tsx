import { clinic } from '@/lib/config';

/**
 * Факты исполнимости. Заменяют регалии, которых у новой клиники нет.
 * Только то, что подтверждается физически: никаких количеств тестов,
 * «лучших» и «единственных в республике».
 */

const FACTS = [
  {
    over: 'Диагностика',
    title: 'Собственная лаборатория',
    note: 'Забор и анализ в одном месте. Результат быстрее и без сторонних подрядчиков.',
  },
  {
    over: 'Наблюдение',
    title: 'Стационар',
    note: 'Есть где наблюдать, а не только принимать.',
  },
  {
    over: 'Ритм',
    title: <><span className="num">2</span> цикла в год</>,
    note: 'Обследование, план и контроль динамики через полгода.',
  },
  {
    over: 'Доступ',
    title: 'Один адрес',
    note: `г. ${clinic.city}, приём ${clinic.hours}. Без филиалов и очередей между ними.`,
  },
];

export function Facts() {
  return (
    <section className="section next-section" aria-labelledby="facts-t">
      <div className="container">
        <h2 className="h2 facts-title" id="facts-t">
          Что для этого есть на месте
        </h2>
        <div className="grid grid--4 facts-grid">
          {FACTS.map((f) => (
            <div className="fact" key={f.over}>
              <p className="overline">{f.over}</p>
              <p className="fact__title">{f.title}</p>
              <p className="fact__note">{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
