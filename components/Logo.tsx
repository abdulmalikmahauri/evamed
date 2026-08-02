/**
 * Логотип EVAMED.
 *
 * Состав по брендбуку, раздел 2: словесная часть с широким трекингом,
 * стилизованная «Λ» вместо «А» с фирменной точкой внутри и диагностическая
 * линия со всплеском ЭКГ. Модуль X — высота буквы «Е» — равен 100 единицам.
 *
 * Словесная часть наследует цвет поверхности через currentColor, поэтому одна
 * разметка работает и на светлом, и на тёмном фоне. Точка и линия всегда
 * бронзовые: брендбук запрещает менять цвета элементов.
 *
 * Минимальная ширина для цифровых носителей — 120 px (брендбук, раздел 3).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `logo ${className}` : 'logo'}
      viewBox="0 0 1000 200"
      role="img"
      aria-label="EVAMED"
    >
      <g
        className="logo__word"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M4 4 V96 M4 4 H90 M4 50 H74 M4 96 H90" />
        <path d="M171 4 L221 96 L271 4" />
        {/* «Λ» — треугольник без перекладины */}
        <path d="M352 96 L402 4 L452 96" />
        <path d="M533 96 V4 L593 62 L653 4 V96" />
        <path d="M734 4 V96 M734 4 H820 M734 50 H804 M734 96 H820" />
        <path d="M909 4 V96 M909 4 H944 C976 4 996 22 996 50 C996 78 976 96 944 96 H909" />
      </g>
      {/* Фирменная точка: начало, раннее выявление */}
      <circle className="logo__dot" cx="402" cy="70" r="12" />
      {/* Диагностическая линия: наблюдение, контроль, уверенность в результате */}
      <path
        className="logo__ecg"
        d="M0 160 H430 L446 160 L459 130 L473 190 L487 148 L499 160 H1000"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
