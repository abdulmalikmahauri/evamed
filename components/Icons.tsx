/**
 * Иконки бренда. Линейный стиль, обводка 1,5, бронзовая точка-акцент.
 * Брендбук, раздел 5. Спрайт монтируется один раз в макете, компонент Icon
 * ссылается на нужный символ.
 */

export type IconName =
  | 'diag'      // диагностика: лупа с линией ЭКГ
  | 'shield'    // забота и защита: щит с крестом
  | 'checkup'   // обследования: планшет с чек-листом
  | 'lab'       // анализы: колба с каплей
  | 'doctor'    // профессионализм: врач со стетоскопом
  | 'heart';    // здоровье: сердце с линией ЭКГ

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className ? `ico ${className}` : 'ico'} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function IconSprite() {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const dot = 'var(--bronze, #B68D5A)';

  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <symbol id="i-diag" viewBox="0 0 32 32">
        <g {...s}>
          <circle cx="14" cy="14" r="9" />
          <path d="M20.5 20.5 L28 28" />
          <path d="M8.5 14 h2.6 l1.6-3.4 2.2 6.6 1.7-3.2 h2.9" />
        </g>
        <circle cx="27" cy="6" r="2" fill={dot} />
      </symbol>

      <symbol id="i-shield" viewBox="0 0 32 32">
        <g {...s}>
          <path d="M16 3 L27 7 v8.5 C27 22.5 22.3 27.4 16 29.5 9.7 27.4 5 22.5 5 15.5 V7 Z" />
          <path d="M16 11.5 v8 M12 15.5 h8" />
        </g>
      </symbol>

      <symbol id="i-checkup" viewBox="0 0 32 32">
        <g {...s}>
          <path d="M9 5.5 H7.5 A2.5 2.5 0 0 0 5 8 v19 a2.5 2.5 0 0 0 2.5 2.5 h17 A2.5 2.5 0 0 0 27 27 V8 a2.5 2.5 0 0 0-2.5-2.5 H23" />
          <rect x="11" y="2.5" width="10" height="5" rx="1.5" />
          <path d="M10.5 15 h7 M10.5 20 h7" />
          <path d="M20.5 19.6 l2 2 3.5-4" />
        </g>
        <circle cx="8" cy="15" r="1.4" fill={dot} />
      </symbol>

      <symbol id="i-lab" viewBox="0 0 32 32">
        <g {...s}>
          <path d="M13 3 v9.2 L6.4 24.6 A2.6 2.6 0 0 0 8.7 28.5 h14.6 a2.6 2.6 0 0 0 2.3-3.9 L19 12.2 V3" />
          <path d="M11 3 h10" />
          <path d="M9.4 19.5 h13.2" />
        </g>
        <circle cx="16" cy="23.5" r="2.2" fill={dot} />
      </symbol>

      <symbol id="i-doctor" viewBox="0 0 32 32">
        <g {...s}>
          <circle cx="16" cy="8" r="4.5" />
          <path d="M6.5 28.5 v-2.4 A8.1 8.1 0 0 1 14.6 18 h2.8 a8.1 8.1 0 0 1 8.1 8.1 v2.4" />
          <path d="M12.4 18.6 v3.6 a3.6 3.6 0 0 0 7.2 0 v-3.6" />
        </g>
        <circle cx="24.5" cy="21" r="2.2" fill={dot} />
      </symbol>

      <symbol id="i-heart" viewBox="0 0 32 32">
        <g {...s}>
          <path d="M16 27.5 C7 21.5 3.5 17.2 3.5 12.6 A6.6 6.6 0 0 1 16 9.4 6.6 6.6 0 0 1 28.5 12.6 C28.5 17.2 25 21.5 16 27.5 Z" />
          <path d="M6.5 16 h4.2 l2-4.2 2.6 8.4 2.2-4.2 h6" />
        </g>
        <circle cx="27" cy="7" r="2" fill={dot} />
      </symbol>
    </svg>
  );
}
