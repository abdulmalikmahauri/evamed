import type { FieldErrors } from '@/lib/lead-state';

/**
 * Проверка заявки. Чистая логика без обращений к платформе, поэтому
 * выполняется и в браузере, и на сервере — когда появится собственный API,
 * он использует этот же модуль, а не свою копию правил.
 */

export type LeadKind = 'booking' | 'subscription';

export interface LeadInput {
  kind: LeadKind;
  name?: string;
  phone?: string;
  email?: string;
  comment?: string;
  consent: boolean;
}

const DIGITS = /\D+/g;
const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/u;
const MAX = { name: 100, phone: 24, email: 254, comment: 1000 } as const;

/** Российский номер: 11 цифр, начинается с 7 или 8. */
export function normalizePhone(raw: string): string {
  return raw.replace(DIGITS, '');
}

export function validateLead(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.kind === 'booking') {
    const name = (input.name ?? '').trim();
    if (!name) errors.name = 'Укажите, как к вам обращаться';
    else if (name.length > MAX.name) errors.name = 'Слишком длинное имя';

    const digits = normalizePhone(input.phone ?? '');
    if (!digits) errors.phone = 'Укажите телефон для связи';
    else if (digits.length !== 11 || !/^[78]/.test(digits)) {
      errors.phone = 'Телефон в формате +7 XXX XXX-XX-XX';
    }

    if ((input.comment ?? '').trim().length > MAX.comment) {
      errors.comment = 'Слишком длинный комментарий';
    }
  }

  if (input.kind === 'subscription') {
    const email = (input.email ?? '').trim();
    if (!email) errors.email = 'Укажите электронную почту';
    else if (email.length > MAX.email || !EMAIL.test(email)) {
      errors.email = 'Проверьте адрес почты';
    }
  }

  if (!input.consent) {
    errors.consent = 'Без согласия на обработку данных заявку принять нельзя';
  }

  return errors;
}

/**
 * Сведения о здоровье относятся к специальной категории персональных данных,
 * а форма заявки не является защищённым каналом. Форма об этом предупреждает,
 * но предупреждение — не барьер, поэтому очевидные случаи отсекаются.
 */
const MEDICAL_HINTS = [
  'диагноз', 'анализ', 'болею', 'боль', 'опухол', 'онколог', 'беремен',
  'вич', 'гепатит', 'диабет', 'давлен', 'температур', 'симптом', 'лечен',
];

export function looksMedical(text: string): boolean {
  const lower = text.toLowerCase();
  return MEDICAL_HINTS.some((hint) => lower.includes(hint));
}

export const MEDICAL_HINT_MESSAGE =
  'Не указывайте здесь сведения о здоровье — обсудим их на приёме. ' +
  'Оставьте только удобное время или вопрос по записи.';
