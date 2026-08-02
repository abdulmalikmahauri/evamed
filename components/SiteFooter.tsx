import Link from 'next/link';
import { Logo } from './Logo';
import { clinic, DISCLAIMER } from '@/lib/config';
import { routes } from '@/lib/routes';

/**
 * Футер. Помечен как тёмная область, чтобы токены переключились: иначе
 * светлый текст остаётся графитовым на тёмно-синем фоне.
 *
 * Обязательное предупреждение о противопоказаниях присутствует на каждой
 * странице — требование к рекламе медицинских услуг.
 */

const CLINIC_LINKS = [
  { href: routes.program, label: 'Программа наблюдения' },
  { href: routes.directions, label: 'Направления' },
  { href: routes.pricing, label: 'Цены' },
  { href: routes.about, label: 'О клинике' },
];

const DOC_LINKS = [
  { href: routes.legalInfo, label: 'Сведения о медорганизации' },
  { href: routes.license, label: 'Лицензия' },
  { href: routes.legalInfo, label: 'Политика обработки данных' },
  { href: routes.legalInfo, label: 'Права пациента' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" data-surface="dark">
      <div className="container section section--utility">
        <div className="grid grid--4" style={{ gap: 'var(--s-9)' }}>
          <div>
            <p className="wordmark">
              <Logo />
              <small>{clinic.descriptor}</small>
            </p>
            <p className="footer-note" style={{ marginTop: 'var(--s-6)' }}>
              {clinic.legalName}
              <br />
              {clinic.addressFull}
            </p>
          </div>

          <div>
            <p className="overline">Клиника</p>
            <ul className="footer-list">
              {CLINIC_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="overline">Документы</p>
            <ul className="footer-list">
              {DOC_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="overline">Приём</p>
            <p className="footer-note" style={{ marginTop: 'var(--s-5)' }}>
              {clinic.hoursNote}
              <br />
              <a href={`tel:${clinic.phoneHref}`}>{clinic.phone}</a>
            </p>
          </div>
        </div>

        <hr className="rule" style={{ marginBlock: 'var(--s-11) var(--s-7)' }} />

        <p className="footer-note">
          {DISCLAIMER} Информация на сайте не является публичной офертой
          и не заменяет консультацию врача.
        </p>
      </div>
    </footer>
  );
}
