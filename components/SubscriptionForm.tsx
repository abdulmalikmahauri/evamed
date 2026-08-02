'use client';

import { useId, useState, useTransition } from 'react';
import { submitLead } from '@/lib/submit-lead';
import { initialLeadState, type LeadState } from '@/lib/lead-state';

interface SubscriptionFormProps {
  /** флаг приходит с сервера: клиентский код не читает переменные окружения */
  enabled: boolean;
  className?: string;
}

/**
 * Подписка на состав программы.
 *
 * Поле здесь единственное — именно та конфигурация, в которой браузер
 * отправляет форму по Enter даже без кнопки. Пока приём заявок закрыт,
 * элемента <form> нет вовсе, иначе почта ушла бы в строку URL.
 */
export function SubscriptionForm({ enabled, className = 'stack' }: SubscriptionFormProps) {
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
            kind: 'subscription',
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
        <p className="overline overline--accent">Готово</p>
        <p>
          Пришлём состав тарифов и прайс одним письмом, как только их утвердит врач.
          Рассылок не будет.
        </p>
      </div>
    );
  }

  const fields = (
    <>
      <div className="field">
        <label htmlFor={id('email')}>Электронная почта</label>
        <input
          id={id('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          aria-invalid={state.errors.email ? true : undefined}
          aria-describedby={state.errors.email ? id('email-err') : undefined}
          required
        />
        {state.errors.email && (
          <p className="field__error" id={id('email-err')}>
            {state.errors.email}
          </p>
        )}
      </div>

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
        <span>Согласен на обработку персональных данных.</span>
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
      <div className={className} role="group" aria-label="Подписка на состав программы">
        {fields}
        <button className="btn btn--primary leadmag__submit" type="button" aria-disabled="true">
          Подписаться
        </button>
        <p className="caption">Приём заявок откроется вместе с запуском клиники</p>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={onSubmit}
      aria-label="Подписка на состав программы"
      noValidate
    >
      {fields}
      {state.errors.form && (
        <p className="field__error" role="alert">
          {state.errors.form}
        </p>
      )}
      <button className="btn btn--primary leadmag__submit" type="submit" disabled={pending}>
        {pending ? 'Отправляем…' : 'Подписаться'}
      </button>
    </form>
  );
}
