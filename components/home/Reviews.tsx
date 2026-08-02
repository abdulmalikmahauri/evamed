/**
 * Блок 13. Отзывы пациентов.
 * Отзывы описывают процесс приёма, а не эффективность лечения: отзывы
 * о результатах медицинской помощи в рекламе использовать нельзя.
 */

interface Review {
  text: string;
  who: string;
  what: string;
}

const REVIEWS: Review[] = [
  {
    text: 'Впервые получила план на руки, а не устные советы. Через две недели напомнили про контроль — я бы точно забыла.',
    who: 'Марьям А., Грозный',
    what: 'Июль 2026 · Программа наблюдения',
  },
  {
    text: 'Сдал анализы утром, результат пришёл в кабинет к вечеру. Врач разобрал каждую цифру, не пришлось ничего искать самому.',
    who: 'Ислам Д., Грозный',
    what: 'Июнь 2026 · Лабораторная диагностика',
  },
  {
    text: 'Понравилось, что не навязывают лишнее. Прямо сказали, какие исследования сейчас делать не нужно.',
    who: 'Хеда М., Грозный',
    what: 'Июнь 2026 · Первый визит',
  },
];

export function Reviews() {
  return (
    <section className="section" aria-labelledby="reviews-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">Отзывы</p>
          <h2 className="h2" id="reviews-t">
            Что говорят пациенты
          </h2>
          <p>
            Как проходит первый визит, разбор результатов и контроль плана —
            словами пациентов.
          </p>
        </div>

        <div className="reviews reviews-grid">
          {REVIEWS.map((review) => (
            <figure className="review" key={review.who}>
              <p className="review__quote" aria-hidden="true">
                «
              </p>
              <blockquote className="review__text">{review.text}</blockquote>
              <figcaption className="review__foot">
                <p className="review__who">{review.who}</p>
                <p className="review__what">{review.what}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
