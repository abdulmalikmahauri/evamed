/**
 * Карта ссылок сайта.
 *
 * Единственное место, где живут адреса разделов. Когда страница появляется или
 * переезжает, правится одна строка здесь, а не два десятка мест в разметке.
 *
 * Значения с «/#» указывают на блок главной и работают с любой страницы.
 */
export const routes = {
  home: '/',
  program: '/programma-nablyudeniya',
  pricing: '/tseny',
  directions: '/napravleniya',
  doctors: '/vrachi',
  about: '/o-klinike',
  contacts: '/kontakty',
  legalInfo: '/svedeniya',
  license: '/svedeniya/litsenziya',
  privacy: '/dokumenty/politika',
  patientRights: '/dokumenty/prava-patsienta',

  /**
   * Отдельной страницы записи нет: заявка оформляется в блоке на странице
   * контактов. Онлайн-запись появится вместе с выбором МИС (ТЗ 20.15).
   */
  booking: '/kontakty#zayavka',
  /** «Как это работает» — блок шагов на главной */
  howItWorks: '/#how',
  /** Доказательная часть: лаборатория, стационар, лицензия */
  trust: '/#trust',
} as const;

/** Страница направления. */
export function directionHref(slug: string): string {
  return `/napravleniya/${slug}`;
}

/**
 * Адреса, которых ещё нет. Держим списком, чтобы объём оставшейся работы
 * был виден в одном месте.
 */
export const PENDING_ROUTES = [
  '/zapis',
  '/lichnyy-kabinet',
] as const;
