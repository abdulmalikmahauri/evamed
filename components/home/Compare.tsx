/**
 * Блок 8: сравнение трёх собственных форматов обслуживания.
 * Сравниваем себя с собой — сопоставление с другими клиниками в рекламе
 * медуслуг запрещено.
 */

/** Порядок значений соответствует порядку колонок в COLUMNS */
interface CompareRow {
  readonly feature: string;
  readonly values: readonly [boolean, boolean, boolean];
}

const COLUMNS = ['Разовые анализы', 'Комплексное обследование', 'Программа наблюдения'];

const ROWS: readonly CompareRow[] = [
  { feature: 'Забор и анализ в своей лаборатории', values: [true, true, true] },
  { feature: 'Разбор результатов врачом', values: [false, true, true] },
  { feature: 'Письменный персональный план', values: [false, true, true] },
  { feature: 'Контрольные точки с ответственным', values: [false, false, true] },
  { feature: 'Проверка выполнения рекомендаций', values: [false, false, true] },
  { feature: 'Повторное обследование через полгода', values: [false, false, true] },
  { feature: 'Динамика показателей за год', values: [false, false, true] },
];

export function Compare() {
  return (
    <section className="section" aria-labelledby="cmp-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">Сравнение</p>
          <h2 className="h2" id="cmp-t">
            Что происходит после обследования
          </h2>
          <p>Три наших собственных формата. Сравниваем себя с собой, а не с другими клиниками.</p>
        </div>

        {/* tabindex + role=region: прокручиваемая по горизонтали таблица
            должна быть достижима с клавиатуры */}
        <div
          className="table-scroll compare-scroll"
          tabIndex={0}
          role="region"
          aria-label="Сравнение форматов обслуживания, прокручивается по горизонтали"
        >
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Что входит</th>
                {COLUMNS.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  {row.values.map((value, index) => (
                    <td className={value ? 'yes' : 'no'} key={COLUMNS[index]}>
                      {value ? 'Да' : 'Нет'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
