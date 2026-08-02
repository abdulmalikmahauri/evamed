/**
 * Блок 3. Обещания сформулированы как описание порядка работы, а не как
 * обещание результата: гарантии эффекта в рекламе медуслуг запрещены.
 */

interface PromiseItem {
  title: string;
  note: string;
}

const PROMISES: PromiseItem[] = [
  {
    title: 'Ищем причину, а не гасим симптом',
    note: 'Комплексная диагностика, разбор результатов врачом и персональный план.',
  },
  {
    title: 'Остаёмся с вами после приёма',
    note: 'Письменный план, контрольные точки и проверка того, что они выполнены.',
  },
  {
    title: 'Точность и человеческое отношение',
    note: 'Современное оборудование и доказательная медицина. Объясняем, что происходит, и показываем динамику ваших показателей.',
  },
];

export function Promises() {
  return (
    <section className="section" aria-labelledby="prom-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">Что вы получаете</p>
          <h2 className="h2" id="prom-t">
            Три вещи, за которые мы отвечаем
          </h2>
        </div>

        <div className="grid grid--3 promises-grid">
          {PROMISES.map((p) => (
            <div className="promise" key={p.title}>
              <p className="promise__title">{p.title}</p>
              <p>{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
