'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { clinic } from '@/lib/config';
import { routes } from '@/lib/routes';

/**
 * Шапка сайта. Брендбук: логотип с подписью «клиника ранней диагностики».
 * ТЗ 10.6.8: высота 72 px, тонкая линия появляется после 8 px прокрутки.
 * В шапке нет «круглосуточно», «вызвать скорую» и «врача на дом» — клиника
 * работает 9:00–19:00 и этих услуг не оказывает.
 *
 * До 1024 px горизонтальная навигация не помещается рядом с логотипом
 * и кнопкой записи, поэтому уезжает в раскрывающуюся панель. Без неё
 * посетитель с телефона попадал бы в другие разделы только через подвал.
 */

const NAV = [
  { href: routes.program, label: 'Программа наблюдения' },
  { href: routes.directions, label: 'Направления' },
  { href: routes.about, label: 'О клинике' },
  { href: routes.pricing, label: 'Цены' },
  { href: routes.contacts, label: 'Контакты' },
];

const MENU_ID = 'site-menu';

interface SiteHeaderProps {
  current?: string;
  dark?: boolean;
  /**
   * Режим посадочной страницы: навигации нет, призыв один.
   * Так свёрстан утверждённый макет program.html — на платном трафике развилки
   * уводят посетителя с оплаченного перехода, поэтому их убирают сознательно.
   */
  minimal?: boolean;
  /** призыв для minimal-режима: на лендинге это внутристраничный якорь */
  ctaHref?: string;
  ctaLabel?: string;
}

export function SiteHeader({
  current,
  dark = false,
  minimal = false,
  ctaHref = routes.booking,
  ctaLabel = 'Записаться',
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Закрытие панели. Escape возвращает фокус на кнопку — иначе он остался бы
   * на скрытом элементе. Слушатели живут только пока панель открыта.
   */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled}
      {...(minimal ? { 'data-minimal': 'true' } : {})}
      {...(dark ? { 'data-surface': 'dark' } : {})}
    >
      <div className="container site-header__inner">
        <Link
          className="wordmark"
          href="/"
          aria-label={`${clinic.brand}, ${clinic.descriptor.toLowerCase()}`}
        >
          <Logo />
          <small>{clinic.descriptor}</small>
        </Link>

        {!minimal && (
        <nav className="site-nav" aria-label="Основная навигация">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(current === item.href ? { 'aria-current': 'page' as const } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        )}

        <div className="header-actions">
          <a className="header-phone" href={`tel:${clinic.phoneHref}`}>
            {clinic.phone}
          </a>
          <Link className={`btn btn--sm ${dark ? 'btn--gold' : 'btn--primary'}`} href={ctaHref}>
            {ctaLabel}
          </Link>
          {!minimal && (
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle__bars" aria-hidden="true" />
          </button>
          )}
        </div>
      </div>

      {/* inert убирает скрытую панель из порядка обхода целиком — одного
          visibility: hidden в CSS для этого недостаточно во всех браузерах */}
      {!minimal && (
      <div
        ref={panelRef}
        id={MENU_ID}
        className="nav-panel"
        data-open={open}
        inert={!open}
      >
        <div className="container">
          <nav aria-label="Разделы сайта">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                {...(current === item.href ? { 'aria-current': 'page' as const } : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="btn btn--primary nav-panel__cta"
            href={routes.booking}
            onClick={() => setOpen(false)}
          >
            Записаться
          </Link>
          <a className="nav-panel__phone" href={`tel:${clinic.phoneHref}`}>
            {clinic.phone}
          </a>
          <p className="nav-panel__hours">{clinic.hoursNote}</p>
        </div>
      </div>
      )}
    </header>
  );
}
