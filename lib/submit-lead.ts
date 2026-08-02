import {
  looksMedical,
  normalizePhone,
  validateLead,
  MEDICAL_HINT_MESSAGE,
  type LeadInput,
} from '@/lib/lead-validation';
import type { LeadState } from '@/lib/lead-state';

/**
 * Отправка заявки из браузера.
 *
 * Куда уходит заявка, задаёт NEXT_PUBLIC_LEADS_ENDPOINT. Если адрес не задан —
 * а по умолчанию он не задан, — заявка проверяется, посетитель видит
 * подтверждение, и НИЧЕГО никуда не отправляется.
 *
 * Это не заглушка, а рабочий режим показа: он позволяет продемонстрировать
 * весь путь заявки, не начиная обработки персональных данных, которая
 * до уведомления Роскомнадзора недопустима (ТЗ 20.16).
 *
 * Адрес приёмника — ВСЕГДА собственный сервер клиники, а не вебхук CRM
 * напрямую: токен доступа к CRM в браузере доступен любому посетителю.
 * Собственный сервер принимает заявку, проверяет её теми же правилами
 * из lead-validation и уже от своего имени передаёт в МИС.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;

/** Ограничение частоты в памяти вкладки: от случайных повторов, не от ботов. */
const sentAt: number[] = [];
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function tooOften(now: number): boolean {
  while (sentAt.length && now - sentAt[0] > WINDOW_MS) sentAt.shift();
  if (sentAt.length >= LIMIT) return true;
  sentAt.push(now);
  return false;
}

export async function submitLead(input: LeadInput, trap: string): Promise<LeadState> {
  const values = {
    name: input.name,
    phone: input.phone,
    email: input.email,
    comment: input.comment,
  };

  // Ловушка: поле скрыто от посетителя, но не от программы, заполняющей всё
  // подряд. Отвечаем как при успехе — иначе бот подберёт обход.
  if (trap.trim()) return { status: 'ok', errors: {} };

  const errors = validateLead(input);
  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values };
  }

  if (input.comment && looksMedical(input.comment)) {
    return { status: 'error', errors: { comment: MEDICAL_HINT_MESSAGE }, values };
  }

  if (tooOften(Date.now())) {
    return {
      status: 'error',
      errors: { form: 'Слишком много попыток. Попробуйте позже или позвоните нам.' },
      values,
    };
  }

  if (!ENDPOINT) {
    // Приёмник не настроен: заявка никуда не отправляется и нигде не сохраняется.
    return { status: 'ok', errors: {} };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: input.kind,
        name: input.name?.trim(),
        phone: input.phone ? normalizePhone(input.phone) : undefined,
        email: input.email?.trim(),
        comment: input.comment?.trim(),
        source: 'site',
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return {
        status: 'error',
        errors: {
          form: 'Не удалось передать заявку. Позвоните администратору — примем запись по телефону.',
        },
        values,
      };
    }
    return { status: 'ok', errors: {} };
  } catch {
    return {
      status: 'error',
      errors: {
        form: 'Не удалось передать заявку. Позвоните администратору — примем запись по телефону.',
      },
      values,
    };
  }
}
