import Link from 'next/link';
import { routes } from '@/lib/routes';

/**
 * Блок 12. Первый визит — низкая ступень входа перед годовой программой.
 * Зачёт стоимости описан как условие, а не как обещание результата.
 */

interface EntryRow {
  term: string;
  value: string;
}

const ENTRY_ROWS: EntryRow[] = [
  { term: 'Приём', value: 'Терапевт' },
  { term: 'Лаборатория', value: 'Базовая панель' },
  { term: 'Результат', value: 'Письменное заключение' },
  { term: 'Стоимость', value: '6 900 ₽' },
];

export function Entry() {
  return (
    <section className="section sec-raised" id="entry" aria-labelledby="entry-t">
      <div className="container entry">
        <div>
          <p className="overline">С чего начать</p>
          <h2 className="h2 entry__title" id="entry-t">
            Начните с одного шага
          </h2>
          <p className="lead entry__lead">
            Приём терапевта и базовая лабораторная панель по фиксированной цене.
            Если в течение 30 дней вы переходите в программу, стоимость первого
            визита зачитывается.
          </p>
          <div className="entry__actions">
            <Link className="btn btn--primary btn--block-mobile" href={routes.booking}>
              Записаться на первый визит
            </Link>
            <Link className="link-underline" href={routes.pricing}>
              Сравнить программы
            </Link>
          </div>
        </div>

        <div className="card">
          <p className="overline">Первый визит</p>
          <dl className="entry__list">
            {ENTRY_ROWS.map((row, i) => (
              <div
                key={row.term}
                className={
                  i === ENTRY_ROWS.length - 1
                    ? 'contact-row contact-row--last'
                    : 'contact-row'
                }
              >
                <dt>{row.term}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
