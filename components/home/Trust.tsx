/**
 * Почему нам можно верить. Клиника новая: истории, отзывов и регалий нет,
 * поэтому доверие строится на проверяемых фактах — документы и то, что есть
 * на месте. Токен — буквенный якорь вместо иконки: он маркирует тип
 * доказательства (документ, юрлицо, лаборатория, стационар), а не украшает.
 */

interface TrustItem {
  /** буквенный якорь: № — документ, Ю — юрлицо, Л — лаборатория, С — стационар */
  token: string;
  title: string;
  note: string;
}

const TRUST_ITEMS: readonly TrustItem[] = [
  {
    token: '№',
    title: 'Лицензия на медицинскую деятельность',
    note: 'Действующая лицензия на медицинскую деятельность. Скан и ссылка на реестр — в разделе документов.',
  },
  {
    token: 'Ю',
    title: 'ООО «Евамед»',
    note: 'Реквизиты, учредительные документы и полный состав сведений — в разделе о медицинской организации.',
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
];

export function Trust() {
  return (
    <section className="section sec-accent" id="trust" aria-labelledby="trust-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">О клинике</p>
          <h2 className="h2" id="trust-t">
            Почему нам можно верить
          </h2>
          <p>
            Мы помогаем выявлять риски для здоровья на ранних этапах. Клиника новая, поэтому
            вместо истории и регалий показываем документы и то, что есть на месте.
          </p>
        </div>

        <div className="trust sec-body">
          {TRUST_ITEMS.map((item) => (
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
  );
}
