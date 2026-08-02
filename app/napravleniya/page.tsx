import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { Icon } from '@/components/Icons';
import { clinic, DISCLAIMER } from '@/lib/config';
import { directions } from '@/content/directions';
import { routes } from '@/lib/routes';

/**
 * Каталог направлений. Повторяет иконочную навигацию главной: иконка
 * группирует направления по смыслу, подпись справа перечисляет только то,
 * что клиника действительно делает.
 */

export const metadata: Metadata = {
  title: `Направления и диагностика в ${clinic.cityIn}`,
  description:
    `Направления приёма и диагностики клиники ${clinic.brand}, ${clinic.city}: ` +
    `приём профильных специалистов, УЗИ и лабораторные исследования. ` +
    `${clinic.hoursNote}, ${clinic.address}.`,
};

export default function DirectionsPage(): React.ReactElement {
  return (
    <>
      <SiteHeader current={routes.directions} />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li aria-current="page">Направления</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">Что мы делаем</p>
              <h1 className="h1">Направления и диагностика</h1>
              <p className="lead">
                Приём ведут профильные специалисты. Диагностика — на собственной базе
                клиники: ультразвук и лаборатория находятся по тому же адресу, что и приём.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--utility">
          <div className="container">
            <div className="block">
              <div className="dirs">
                {directions.map((direction) => (
                  <Link
                    className="dir"
                    href={`/napravleniya/${direction.slug}`}
                    key={direction.slug}
                  >
                    <span className="dir__ico">
                      <Icon name={direction.icon} />
                      <span className="dir__name">{direction.name}</span>
                    </span>
                    <span className="dir__meta">{direction.meta}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="block">
              <h2 className="block__title">Не знаете, к какому специалисту записаться</h2>
              <p className="body-text">
                Начните с приёма терапевта: врач разберёт жалобы, назначит нужные
                исследования и направит к профильному специалисту. Администратор поможет
                собрать приём и диагностику в одно посещение.
              </p>
              <p>
                <Link className="link-underline" href={routes.booking}>
                  Записаться на приём
                </Link>
              </p>
            </div>

            <div className="disclaimer">
              <p>
                <b>{DISCLAIMER}</b>
              </p>
              <p>
                Информация на странице носит справочный характер, не является публичной
                офертой и не заменяет консультацию врача. Клиника принимает по адресу{' '}
                {clinic.addressFull}, {clinic.hoursNote.toLowerCase()}. Скорую помощь
                и вызов врача на дом клиника не оказывает.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <StickyCta actions={[{ href: routes.booking, label: 'Записаться', variant: 'primary' }]} />
    </>
  );
}
