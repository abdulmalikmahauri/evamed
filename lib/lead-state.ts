/**
 * Состояние формы заявки. Общее для сервера и клиента.
 *
 * Отдельный модуль, потому что состояние нужно и формам, и правилам проверки,
 * и будущему серверному приёмнику — общий тип не даёт им разойтись.
 */

export interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  comment?: string;
  consent?: string;
  form?: string;
}

export interface LeadState {
  status: 'idle' | 'ok' | 'error';
  errors: FieldErrors;
  /** возвращается, чтобы поля не опустели после неудачной отправки */
  values?: { name?: string; phone?: string; email?: string; comment?: string };
}

export const initialLeadState: LeadState = { status: 'idle', errors: {} };
