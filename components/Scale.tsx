/**
 * Референсная шкала — signature-элемент системы (ТЗ 10.6.6).
 * Одна геометрия, несколько применений: прогресс года, шкала сопровождения
 * тарифов, показатель в отчёте.
 *
 * Доступность: у шкалы роль изображения и обязательное текстовое описание —
 * она никогда не должна быть единственным носителем значения.
 */

interface ScaleZone {
  /** доля трека, 0–1 */
  flex: number;
  kind?: 'done' | 'opt' | 'norm' | 'border' | 'out' | 'attn';
}

interface ScaleMark {
  /** положение в процентах */
  left: number;
  label: string;
}

interface ScaleProps {
  /** текстовое описание для скринридера — обязательно */
  description: string;
  name?: string;
  value?: React.ReactNode;
  zones: ScaleZone[];
  marks?: ScaleMark[];
  legend?: [string, string];
  hero?: boolean;
  className?: string;
}

export function Scale({
  description,
  name,
  value,
  zones,
  marks = [],
  legend,
  hero = false,
  className,
}: ScaleProps) {
  const cls = ['scale', hero && 'scale--hero', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="img" aria-label={description}>
      {(name || value) && (
        <div className="scale__head">
          {name && <span className="scale__name">{name}</span>}
          {value && <span className="scale__value">{value}</span>}
        </div>
      )}

      <div className="scale__track">
        {zones.map((z, i) => (
          <div
            key={i}
            className={z.kind ? `scale__zone scale__zone--${z.kind}` : 'scale__zone'}
            style={{ flex: `${z.flex} 0 auto` }}
          />
        ))}
      </div>

      {marks.length > 0 && (
        <div className="scale__marks">
          {marks.map((m) => (
            <div key={m.label} className="scale__mark" style={{ left: `${m.left}%` }}>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {legend && (
        <div className="scale__legend">
          <span>{legend[0]}</span>
          <span>{legend[1]}</span>
        </div>
      )}
    </div>
  );
}
