import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { clinic } from '@/lib/config';
import { doctors, getDoctor } from '@/content/doctors';
import { formatPrice } from '@/content/services';
import { routes } from '@/lib/routes';

/**
 * Карточка врача. Вместо фотографии — монограмма дисплейной антиквой:
 * фотосъёмка не проведена, а серый силуэт читается как «врача нет».
 */

interface DoctorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);

  if (!doctor) {
    return {};
  }

  return {
    title: `${doctor.fullName} — ${doctor.specialty.toLowerCase()} в ${clinic.cityIn}`,
    description:
      `${doctor.shortName} — врач-${doctor.specialty.toLowerCase()} клиники ${clinic.brand}, ` +
      `${clinic.city}. В профессии с ${doctor.sinceYear} года, ${doctor.degree.toLowerCase()}. ` +
      `Приём ${doctor.scheduleShort}.`,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const doctor = getDoctor(slug);

  if (!doctor) {
    notFound();
  }

  const passport: ReadonlyArray<readonly [string, string]> = [
    ['Специальность', doctor.specialtyField],
    ['В профессии с', `${doctor.sinceYear} года`],
    ['Учёная степень', doctor.degree],
    ['Приём', doctor.schedule],
    ['Первичный приём', formatPrice(doctor.price)],
  ];

  return (
    <>
      <SiteHeader />

      <main id="main">
        <nav className="crumbs container" aria-label="Хлебные крошки">
          <ol>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href={routes.doctors}>Врачи</Link>
            </li>
            <li aria-current="page">{doctor.fullName}</li>
          </ol>
        </nav>

        <section className="page-head">
          <div className="page-head__plate" aria-hidden="true" />
          <div className="page-head__seam" aria-hidden="true" />
          <div className="container page-head__inner">
            <div>
              <p className="overline overline--accent">{doctor.specialty}</p>
              <h1 className="h1">{doctor.fullName}</h1>
              <p className="lead">{doctor.lead}</p>

              <div
                className="monogram"
                style={{ marginTop: 'var(--s-9)' }}
                role="img"
                aria-label={doctor.fullName}
              >
                {doctor.monogram}
              </div>
            </div>

            <aside className="passport" aria-label="Сведения о специалисте">
              {passport.map(([key, value]) => (
                <div className="passport__row" key={key}>
                  <span className="passport__key">{key}</span>
                  <span className="passport__val">{value}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section section--utility">
          <div className="container page-body">
            <div>
              <div className="block">
                <h2 className="block__title">Образование и квалификация</h2>
                <ul>
                  {doctor.education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="block">
                <h2 className="block__title">Приём</h2>
                <p className="body-text">{doctor.receptionNote}</p>
              </div>

              <div className="block">
                <h2 className="block__title">Услуги и цены</h2>
                <div className="linklist" style={{ marginTop: 'var(--s-6)' }}>
                  {doctor.services.map((item) =>
                    item.slug ? (
                      <Link href={`/uslugi/${item.slug}`} key={item.name}>
                        <span className="linklist__name">{item.name}</span>
                        <span className="linklist__price">{formatPrice(item.price)}</span>
                      </Link>
                    ) : (
                      <div key={item.name}>
                        <span className="linklist__name">{item.name}</span>
                        <span className="linklist__price">{formatPrice(item.price)}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="block">
                <h2 className="block__title">О враче</h2>
                {doctor.about.map((paragraph) => (
                  <p className="body-text" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="block">
                <h2 className="block__title">Участие в программе наблюдения</h2>
                <p className="body-text">{doctor.programRole}</p>
                <Link
                  className="link-underline"
                  href="/programma-nablyudeniya#tarify"
                  style={{ marginTop: 'var(--s-6)' }}
                >
                  Посмотреть тарифы
                </Link>
              </div>
            </div>

            <aside className="page-aside" id="book">
              <div className="card booking">
                <p className="overline">Запись к специалисту</p>
                <div className="booking__price">
                  <span className="price">{formatPrice(doctor.price)}</span>
                </div>
                <p className="booking__meta">{doctor.bookingMeta}</p>
                <hr className="rule" style={{ marginBlock: 'var(--s-6)' }} />
                <p className="caption">{doctor.bookingNote}</p>
                <Link
                  className="btn btn--primary"
                  href={routes.booking}
                  style={{ width: '100%', marginTop: 'var(--s-6)' }}
                >
                  Записаться на приём
                </Link>
                <p style={{ marginTop: 'var(--s-5)', textAlign: 'center' }}>
                  <Link
                    className="link-underline"
                    href={routes.contacts}
                    style={{ fontSize: 'var(--text-body-sm)' }}
                  >
                    Заказать звонок
                  </Link>
                </p>
              </div>

              <div className="card" style={{ marginTop: 'var(--s-7)' }}>
                <p className="overline">Направления</p>
                <p
                  style={{
                    marginTop: 'var(--s-4)',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {doctor.directions.join(' · ')}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
