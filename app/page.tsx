import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyCta } from '@/components/StickyCta';
import { Hero } from '@/components/home/Hero';
import { Facts } from '@/components/home/Facts';
import { Promises } from '@/components/home/Promises';
import { Steps } from '@/components/home/Steps';
import { Year } from '@/components/home/Year';
import { Tariffs } from '@/components/home/Tariffs';
import { Compare } from '@/components/home/Compare';
import { Directions } from '@/components/home/Directions';
import { Trust } from '@/components/home/Trust';
import { Doctors } from '@/components/home/Doctors';
import { Entry } from '@/components/home/Entry';
import { Reviews } from '@/components/home/Reviews';
import { Faq } from '@/components/home/Faq';
import { Contacts } from '@/components/home/Contacts';
import { Lead } from '@/components/home/Lead';
import { routes } from '@/lib/routes';

/**
 * Порядок блоков утверждён заказчиком (ТЗ 8, семнадцать блоков).
 *
 * Логика последовательности: сначала продукт и его устройство, затем цена,
 * затем доказательства — клиника, врачи, отзывы. Направления стоят после
 * сравнения намеренно: посетитель, пришедший за разовой услугой, к этому
 * месту уже понимает, чем программа отличается от единичного приёма.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader current="/" />
      <main id="main">
        <Hero />
        <Facts />
        <Promises />
        <Steps />
        <Year />
        <Tariffs />
        <Compare />
        <Directions />
        <Trust />
        <Doctors />
        <Entry />
        <Reviews />
        <Faq />
        <Contacts />
        <Lead />
      </main>
      <SiteFooter />
      <StickyCta
        actions={[
          { href: routes.booking, label: 'Оставить заявку', variant: 'primary' },
          { href: routes.pricing, label: 'Цены', variant: 'outline' },
        ]}
      />
    </>
  );
}
