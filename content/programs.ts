/**
 * Тарифы программы наблюдения.
 *
 * Ось различия — уровень сопровождения, а не количество анализов: состав
 * цикла определяет врач, поэтому номенклатура исследований в тариф не
 * выносится (см. features.programCompositionApproved в lib/config).
 *
 * Помесячная цена — ориентир от годовой, а не отдельный тариф: рассрочки
 * и подписки нет, пока выключена онлайн-оплата.
 */

export interface TariffFeature {
  text: string;
  /** отличие от предыдущего тарифа — выделяется в макете */
  diff?: boolean;
}

export interface Tariff {
  id: string;
  name: string;
  /** число контрольных точек в году */
  points: number;
  /** подпись под числом; согласуется с числом по падежу */
  pointsLabel: string;
  /** плашка над названием у выделенного тарифа */
  badge?: string;
  features: readonly TariffFeature[];
  pricePerYear: number;
  /** ориентир помесячно, показывается со знаком «≈» */
  pricePerMonth: number;
  /** визуально выделенная карточка */
  recommended?: boolean;
}

export const tariffs: readonly Tariff[] = [
  {
    id: 'osnova',
    name: 'Основа',
    points: 2,
    pointsLabel: 'контрольные точки в году',
    features: [
      { text: 'Два цикла обследования' },
      { text: 'Приём врача с разбором' },
      { text: 'Письменный план' },
    ],
    pricePerYear: 54000,
    pricePerMonth: 4500,
  },
  {
    id: 'nablyudenie',
    name: 'Наблюдение',
    points: 6,
    pointsLabel: 'контрольных точек в году',
    badge: 'Рекомендуем как основу',
    features: [
      { text: 'Всё из «Основы»' },
      { text: 'Расширенный состав цикла 1', diff: true },
      { text: 'Промежуточные исследования', diff: true },
      { text: 'Отчёт о выполнении плана', diff: true },
    ],
    pricePerYear: 108000,
    pricePerMonth: 9000,
    recommended: true,
  },
  {
    id: 'lichnyy-vrach',
    name: 'Личный врач',
    points: 12,
    pointsLabel: 'контрольных точек в году',
    features: [
      { text: 'Всё из «Наблюдения»' },
      { text: 'Закреплённый врач на весь год', diff: true },
      { text: 'Второе мнение по проблеме', diff: true },
      { text: 'Годовой разбор динамики', diff: true },
    ],
    pricePerYear: 216000,
    pricePerMonth: 18000,
  },
];

export function getTariff(id: string): Tariff | undefined {
  return tariffs.find((tariff) => tariff.id === id);
}
