import type { IconName } from '@/components/Icons';
import { doctors, type Doctor } from '@/content/doctors';
import { services, type Service } from '@/content/services';

/**
 * Направления приёма и диагностики.
 *
 * Перечень и подписи повторяют блок направлений на главной: это одни и те же
 * десять позиций, поэтому список живёт в данных, а не в двух компонентах —
 * иначе слаги разойдутся, как это уже было с карточками врачей.
 *
 * Подводка описывает только то, что клиника делает в этой области. Перечня
 * заболеваний, показаний и методов лечения здесь нет: такие тексты пишет врач
 * и утверждает клиника, придумать их нельзя.
 */

export interface Direction {
  slug: string;
  /** именительный падеж: карточка каталога и H1 */
  name: string;
  /** родительный падеж: «Услуги гинекологии», «Врачи гинекологии» */
  nameGenitive: string;
  /** что доступно по направлению — приём, диагностика, лаборатория */
  meta: string;
  icon: IconName;
  /** одна-две фразы о том, что клиника делает в этой области */
  lead: string;
  /**
   * Значения поля direction в каталоге услуг, которые относятся к направлению.
   * Отдельной связки «услуга → слаг направления» в каталоге нет, а витринное
   * название расходится с подписью услуги: в навигации «УЗИ», в карточке
   * услуги — «Ультразвуковая диагностика».
   */
  serviceDirections: readonly string[];
}

export const directions: readonly Direction[] = [
  {
    slug: 'ginekologiya',
    name: 'Гинекология',
    nameGenitive: 'гинекологии',
    meta: 'Приём, УЗИ',
    icon: 'shield',
    lead:
      'Консультативный приём профильного специалиста и ультразвуковые исследования. ' +
      'Приём и диагностика проходят в клинике, по одному адресу.',
    serviceDirections: ['Гинекология'],
  },

  {
    slug: 'urologiya',
    name: 'Урология',
    nameGenitive: 'урологии',
    meta: 'Приём, УЗИ',
    icon: 'shield',
    lead:
      'Консультативный приём профильного специалиста и ультразвуковые исследования. ' +
      'Объём обследования врач определяет на приёме.',
    serviceDirections: ['Урология'],
  },

  {
    slug: 'gastroenterologiya',
    name: 'Гастроэнтерология',
    nameGenitive: 'гастроэнтерологии',
    meta: 'Приём, диагностика',
    icon: 'checkup',
    lead:
      'Консультативный приём и диагностика по назначению врача. Лабораторные ' +
      'исследования выполняются в собственной лаборатории клиники.',
    serviceDirections: ['Гастроэнтерология'],
  },

  {
    slug: 'nevrologiya',
    name: 'Неврология',
    nameGenitive: 'неврологии',
    meta: 'Приём',
    icon: 'doctor',
    lead:
      'Консультативный приём профильного специалиста. Что проверить и в какой срок, ' +
      'врач определяет на приёме и записывает в план.',
    serviceDirections: ['Неврология'],
  },

  {
    slug: 'endokrinologiya',
    name: 'Эндокринология',
    nameGenitive: 'эндокринологии',
    meta: 'Приём, лаборатория',
    icon: 'lab',
    lead:
      'Приём врача-эндокринолога, лабораторные исследования и ультразвуковая ' +
      'диагностика. Забор крови и анализ выполняются в клинике.',
    serviceDirections: ['Эндокринология'],
  },

  {
    slug: 'onkologiya',
    name: 'Онкология',
    nameGenitive: 'онкологии',
    meta: 'Приём, диагностика',
    icon: 'diag',
    lead:
      'Консультативный приём и диагностические исследования. Объём обследования ' +
      'и дальнейшие шаги определяет врач.',
    serviceDirections: ['Онкология'],
  },

  {
    slug: 'terapiya',
    name: 'Терапия',
    nameGenitive: 'терапии',
    meta: 'Приём, первый визит',
    icon: 'doctor',
    lead:
      'Приём терапевта — точка входа в клинику: разбор жалоб, осмотр и письменный ' +
      'план дальнейших шагов.',
    serviceDirections: ['Терапия'],
  },

  {
    slug: 'dietologiya',
    name: 'Диетология',
    nameGenitive: 'диетологии',
    meta: 'Приём врача-диетолога',
    icon: 'heart',
    lead:
      'Приём врача-диетолога. Рекомендации по питанию врач формирует после осмотра ' +
      'и с учётом результатов исследований.',
    serviceDirections: ['Диетология'],
  },

  {
    slug: 'laboratornaya-diagnostika',
    name: 'Лабораторная диагностика',
    nameGenitive: 'лабораторной диагностики',
    meta: 'Своя лаборатория',
    icon: 'lab',
    lead:
      'Лабораторные исследования выполняются в собственной лаборатории клиники, ' +
      'без передачи образцов подрядчику. Результат передаётся лечащему врачу.',
    serviceDirections: ['Лабораторная диагностика'],
  },

  {
    slug: 'uzi',
    name: 'УЗИ',
    nameGenitive: 'ультразвуковой диагностики',
    meta: 'Все виды из лицензии',
    icon: 'diag',
    lead:
      'Ультразвуковые исследования проводятся на оборудовании клиники. Заключение ' +
      'выдаётся в день исследования, интерпретирует его лечащий врач.',
    serviceDirections: ['Ультразвуковая диагностика', 'УЗИ'],
  },
];

export function getDirection(slug: string): Direction | undefined {
  return directions.find((direction) => direction.slug === slug);
}

/** Услуги направления в порядке каталога услуг. */
export function getDirectionServices(direction: Direction): readonly Service[] {
  return services.filter((service) => direction.serviceDirections.includes(service.direction));
}

/**
 * Врачи направления. Совпадение ищется по списку directions в карточке врача:
 * поля со слагом направления у врача нет, а названия расходятся, поэтому
 * сверяем сразу по всем известным названиям направления.
 *
 * В выборку попадают только врачи с заполненной карточкой: сведения об
 * образовании и аккредитации публикуются после сверки с документами.
 */
export function getDirectionDoctors(direction: Direction): readonly Doctor[] {
  const titles: readonly string[] = [direction.name, ...direction.serviceDirections];
  return doctors.filter((doctor) => doctor.directions.some((title) => titles.includes(title)));
}

/** Нижняя граница прайса направления. undefined — опубликованных услуг ещё нет. */
export function getDirectionPriceFrom(direction: Direction): number | undefined {
  const prices = getDirectionServices(direction).map((service) => service.price);
  return prices.length > 0 ? Math.min(...prices) : undefined;
}
