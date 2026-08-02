import type { ReactNode } from 'react';
import { clinic } from '@/lib/config';
import { BookingForm } from '@/components/BookingForm';
import { features } from '@/lib/config';

/**
 * Блок 15 «Корпоративным» + блок 16 «Контакты и запись».
 *
 * Поля заявки живут в BookingForm: пока приём заявок закрыт
 * (features.formsEnabled), элемент <form> не рендерится, поэтому отправить
 * телефон посетителя нельзя ни кнопкой, ни клавишей Enter.
 */

interface ContactRow {
  term: string;
  value: ReactNode;
}

const CONTACT_ROWS: ContactRow[] = [
  { term: 'Телефон', value: clinic.phone },
  {
    term: 'Адрес',
    value: (
      <>
        г. {clinic.city},<br />
        {clinic.address}
      </>
    ),
  },
  { term: 'Приём', value: clinic.hoursNote },
  { term: 'Юридическое лицо', value: clinic.legalName },
];

export function Contacts() {
  return (
    <section className="section sec-raised" id="contacts" aria-labelledby="cnt-t">
      <div className="container">
        <div className="strip strip--corp">
          <div>
            <p className="overline">Компаниям</p>
            <p className="strip__note">
              Программы наблюдения для сотрудников компании
            </p>
          </div>
          <a className="link-underline" href="#contacts">
            Оставить заявку
          </a>
        </div>

        <div className="sec-head">
          <p className="overline">Контакты</p>
          <h2 className="h2" id="cnt-t">
            Записаться на приём
          </h2>
          <p>
            Оставьте заявку — администратор перезвонит, подберёт специалиста
            и время.
          </p>
        </div>

        <div className="contacts contacts-grid">
          <dl>
            {CONTACT_ROWS.map((row, i) => (
              <div
                key={row.term}
                className={
                  i === CONTACT_ROWS.length - 1
                    ? 'contact-row contact-row--last'
                    : 'contact-row'
                }
              >
                <dt>{row.term}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <BookingForm
            enabled={features.formsEnabled}
            withComment
            note="Администратор перезвонит в рабочее время — с 9:00 до 19:00, обычно в течение часа."
          />
        </div>
      </div>
    </section>
  );
}
