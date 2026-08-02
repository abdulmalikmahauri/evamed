import Link from 'next/link';
import { doctorCards } from '@/content/doctors';
import { formatPrice } from '@/content/services';
import { routes } from '@/lib/routes';

/**
 * Врачи. Вместо портретов — монограммы: собственной фотосъёмки нет,
 * а стоковые портреты в медицине выдают клинику за то, чем она не является.
 * Монограмма честнее заглушки-силуэта и держит дисплейную гарнитуру бренда.
 *
 * В подписи — только проверяемое: год начала практики и категория либо роль
 * в программе. Никаких оценок квалификации и обещаний результата.
 *
 * Данные берутся из content/doctors.ts — там же лежат персональные страницы.
 * Раньше список был продублирован здесь, и слаги успели разойтись: карточки
 * вели на несуществующие адреса.
 */
export function Doctors() {
  return (
    <section className="section" id="doctors" aria-labelledby="docs-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">Команда</p>
          <h2 className="h2" id="docs-t">
            Врачи
          </h2>
        </div>

        <div className="docs-grid sec-body">
          {doctorCards.map((doc) => (
            <article className="doc" key={doc.slug}>
              <div className="doc__portrait" aria-hidden="true">
                {doc.monogram}
              </div>
              <h3 className="doc__name">{doc.name}</h3>
              <p className="doc__spec">{doc.spec}</p>
              <p className="doc__meta">{doc.meta}</p>
              <div className="doc__foot">
                <span className="doc__price">{formatPrice(doc.price)}</span>
                {doc.hasProfile && (
                  <Link className="link-underline doc__more" href={`/vrachi/${doc.slug}`}>
                    Подробнее
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="docs-more">
          <Link className="link-underline" href={routes.booking}>
            Записаться к специалисту
          </Link>
        </p>
      </div>
    </section>
  );
}
