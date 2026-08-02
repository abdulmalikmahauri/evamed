'use client';

import { useId, useState, useTransition } from 'react';
import { submitLead } from '@/lib/submit-lead';
import { initialLeadState, type LeadState } from '@/lib/lead-state';
import { clinic } from '@/lib/config';

interface BookingFormProps {
  /**
   * Передаётся с сервера: клиентский код не читает переменные окружения,
   * а дублировать флаг через NEXT_PUBLIC значило бы завести второй источник
   * правды, который однажды разойдётся с первым.
   */
  enabled: boolean;
  className?: string;
  /** поле комментария нужно не везде: на лендинге форма короче */
  withComment?: boolean;
  submitLabel?: string;
  /** пояснение под кнопкой */
  note?: string;
}

/**
 * Заявка на запись.
 *
 * Когда приём заявок закрыт, элемент <form> не рендерится вовсе. Дело не
 * в аккуратности: в форме браузер отправляет данные по Enter даже без кнопки,
 * а без обработчика это GET на текущий адрес — телефон посетителя оказался бы
 * в строке URL, в логах и в заголовке Referer.
 */
export function BookingForm({
  enabled,
  className = 'stack',
  withComment = false,
  submitLabel = 'Оставить заявку',
  note,
}: BookingFormProps) {
  const [state, setState] = useState<LeadState>(initialLeadState);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => {
      const raw = data.get(key);
      return typeof raw === 'string' ? raw : '';
    };
    startTransition(async () => {
      setState(
        await submitLead(
          {
            kind: 'booking',
            name: value('name'),
            phone: value('phone'),
            email: value('email'),
            comment: value('comment'),
            consent: data.get('consent') === 'on',
          },
          value('company'),
        ),
      );
    });
  };
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  if (state.status === 'ok') {
    return (
      <div className={className} role="status">
        <p className="overline overline--accent">Заявка отправлена</p>
        <p className="lead">Администратор перезвонит в рабочее время и подтвердит запись.</p>
        <p className="caption">
          Если вопрос срочный, позвоните сами:{' '}
          <a className="link-underline" href={`tel:${clinic.phoneHref}`}>
            {clinic.phone}
          </a>
          . Приём {clinic.hours}.
        </p>
      </div>
    );
  }

  const fields = (
    <>
      <div className="field">
        <label htmlFor={id('name')}>Имя</label>
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={state.values?.name}
          aria-invalid={state.errors.name ? true : undefined}
          aria-describedby={state.errors.name ? id('name-err') : undefined}
          required
        />
        {state.errors.name && (
          <p className="field__error" id={id('name-err')}>
            {state.errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={id('phone')}>Телефон</label>
        <input
          id={id('phone')}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7"
          defaultValue={state.values?.phone}
          aria-invalid={state.errors.phone ? true : undefined}
          aria-describedby={state.errors.phone ? id('phone-err') : undefined}
          required
        />
        {state.errors.phone && (
          <p className="field__error" id={id('phone-err')}>
            {state.errors.phone}
          </p>
        )}
      </div>

      {withComment && (
        <div className="field">
          <label htmlFor={id('comment')}>Комментарий</label>
          <textarea
            id={id('comment')}
            name="comment"
            rows={3}
            defaultValue={state.values?.comment}
            aria-invalid={state.errors.comment ? true : undefined}
            aria-describedby={`${id('comment-hint')}${state.errors.comment ? ` ${id('comment-err')}` : ''}`}
          />
          <p className="caption" id={id('comment-hint')}>
            Необязательно. О самочувствии и результатах анализов поговорим на приёме.
          </p>
          {state.errors.comment && (
            <p className="field__error" id={id('comment-err')}>
              {state.errors.comment}
            </p>
          )}
        </div>
      )}

      {/* Ловушка для программ, заполняющих все поля подряд. От посетителя
          и от скринридера скрыта, поэтому tabIndex -1 и aria-hidden. */}
      <div className="trap" aria-hidden="true">
        <label htmlFor={id('company')}>Не заполняйте это поле</label>
        <input id={id('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={state.errors.consent ? true : undefined}
          aria-describedby={state.errors.consent ? id('consent-err') : undefined}
        />
        <span>
          Согласен на обработку персональных данных в соответствии с политикой обработки.
        </span>
      </label>
      {state.errors.consent && (
        <p className="field__error" id={id('consent-err')}>
          {state.errors.consent}
        </p>
      )}
    </>
  );

  if (!enabled) {
    return (
      <div className={className} role="group" aria-label="Заявка на запись">
        {fields}
        <button className="btn btn--primary btn--block-mobile" type="button" aria-disabled="true">
          {submitLabel}
        </button>
        <p className="caption">Приём заявок откроется вместе с запуском клиники</p>
        {note && <p className="caption">{note}</p>}
      </div>
    );
  }

  return (
    <form className={className} onSubmit={onSubmit} aria-label="Заявка на запись" noValidate>
      {fields}
      {state.errors.form && (
        <p className="field__error" role="alert">
          {state.errors.form}
        </p>
      )}
      <button className="btn btn--primary btn--block-mobile" type="submit" disabled={pending}>
        {pending ? 'Отправляем…' : submitLabel}
      </button>
      {note && <p className="caption">{note}</p>}
    </form>
  );
}
