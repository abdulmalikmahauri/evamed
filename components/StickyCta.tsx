'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Мобильная полоса призыва (ТЗ 10.6.8): 64 px, появляется после первого экрана
 * и уезжает перед подвалом, чтобы не перекрывать контакты и предупреждение
 * о противопоказаниях.
 *
 * Видимость выражена только атрибутом data-visible: скрытие через visibility
 * уже описано в стилях, поэтому спрятанная полоса не ловит фокус клавиатуры
 * и не требует aria-hidden.
 */

/** доля первого экрана, после которой полоса выезжает */
const REVEAL_RATIO = 0.8;
/** запас до конца страницы, на котором полоса убирается */
const HIDE_BEFORE_END = 160;

type CtaVariant = 'primary' | 'outline' | 'gold';

interface StickyCtaAction {
  href: string;
  label: string;
  variant?: CtaVariant;
}

interface StickyCtaProps {
  actions: readonly StickyCtaAction[];
}

export function StickyCta({ actions }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const viewport = window.innerHeight;
      const pastFirstScreen = window.scrollY > viewport * REVEAL_RATIO;
      const nearEnd =
        window.scrollY + viewport >
        document.documentElement.scrollHeight - HIDE_BEFORE_END;

      setVisible(pastFirstScreen && !nearEnd);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="sticky-cta" data-visible={visible}>
      {actions.map((action) => (
        <Link
          key={action.href}
          className={`btn btn--sm btn--${action.variant ?? 'primary'}`}
          href={action.href}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}
