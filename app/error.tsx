'use client';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { clinic } from '@/lib/config';

/**
 * 500. Граница ошибок в App Router обязана быть клиентским компонентом.
 *
 * Когда страница не отрисовалась, единственный работающий канал — телефон,
 * поэтому он вынесен крупно и с режимом работы: обещать «мы на связи всегда»
 * нельзя, приём идёт в определённые часы.
 */

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="section" aria-labelledby="err-title">
          <div className="container">
            <div className="stack-lg">
              <p className="overline overline--accent">Ошибка на сервере</p>

              <h1 className="h1" id="err-title">
                Что-то сломалось на нашей стороне. Мы уже разбираемся
              </h1>

              <p className="lead">
                Попробуйте обновить страницу. Если она снова не откроется,
                позвоните администратору — запишем и ответим на вопросы по телефону.
              </p>

              <div>
                <p className="metric">
                  <a className="metric-value" href={`tel:${clinic.phoneHref}`}>
                    {clinic.phone}
                  </a>
                </p>
                <p className="metric-label">{clinic.hoursNote}</p>
              </div>

              <div>
                <button className="btn btn--primary" type="button" onClick={reset}>
                  Обновить страницу
                </button>
              </div>

              {/* digest сопоставляет обращение пациента с серверным логом
                  и не раскрывает содержания ошибки */}
              {error.digest ? (
                <p className="caption">Код обращения: {error.digest}</p>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
