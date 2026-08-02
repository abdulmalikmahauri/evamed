/**
 * Блок 4. Порядок работы. Номер шага несёт информацию, поэтому жетон —
 * реальный текст в разметке, а не CSS-счётчик: его читает скринридер.
 */

interface Step {
  title: string;
  note: string;
}

const STEPS: Step[] = [
  {
    title: 'Подбираем программу',
    note: 'Короткий разговор с администратором: что уже проверяли, что беспокоит, какой уровень сопровождения нужен.',
  },
  {
    title: 'Обследование и приём врача',
    note: 'Забор крови в утреннее окно, инструментальная диагностика, приём врача с разбором результатов.',
  },
  {
    title: 'Персональный план и контрольные точки',
    note: 'Письменный план на руки и в личный кабинет. У каждой рекомендации — срок и ответственный.',
  },
  {
    title: 'Через полгода — контроль динамики',
    note: 'Второй цикл: повторяем то, что было отклонением, и сравниваем с первым измерением.',
  },
];

export function Steps() {
  return (
    <section className="section sec-raised" id="how" aria-labelledby="how-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">Порядок</p>
          <h2 className="h2" id="how-t">
            Как это работает
          </h2>
          <p>Четыре шага. Четвёртый — то, чем программа отличается от разового обследования.</p>
        </div>

        <div className="grid grid--4 steps">
          {STEPS.map((s, i) => (
            <div className="step" key={s.title}>
              <span className="token">{i + 1}</span>
              <div className="step__body">
                <p className="step__title">{s.title}</p>
                <p className="step__note">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
