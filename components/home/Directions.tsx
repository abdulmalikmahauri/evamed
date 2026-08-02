import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { directionHref } from '@/lib/routes';
import { directions } from '@/content/directions';

/**
 * Направления и диагностика. Иконочная навигация по брендбуку, раздел 7:
 * иконка группирует направления по смыслу, а не украшает строку. Поэтому
 * одна иконка приходится на несколько направлений — «щит» на гинекологию
 * и урологию, «колба» на эндокринологию и лабораторию.
 *
 * Подпись справа перечисляет только то, что есть в лицензии.
 *
 * Данные — из content/directions.ts, оттуда же собираются каталог и страницы
 * направлений: раньше список был заведён здесь отдельно и мог разойтись
 * с каталогом при первом же изменении.
 */

export function Directions() {
  return (
    <section className="section sec-raised" id="dirs" aria-labelledby="dirs-t">
      <div className="container">
        <div className="sec-head">
          <p className="overline">Что мы делаем</p>
          <h2 className="h2" id="dirs-t">
            Направления и диагностика
          </h2>
          <p>Приём ведут профильные специалисты. Диагностика — на собственной базе клиники.</p>
        </div>

        <div className="dirs sec-body">
          {directions.map((dir) => (
            <Link className="dir" href={directionHref(dir.slug)} key={dir.slug}>
              <span className="dir__ico">
                <Icon name={dir.icon} />
                <span className="dir__name">{dir.name}</span>
              </span>
              <span className="dir__meta">{dir.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
