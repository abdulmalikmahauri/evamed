import { SubscriptionForm } from '@/components/SubscriptionForm';
import { features } from '@/lib/config';

/**
 * Блок 17. Лид-магнит: состав тарифов пришлём после утверждения врачом
 * (features.programCompositionApproved), поэтому обещаем письмо, а не файл.
 *
 * Поле здесь единственное — именно та конфигурация, в которой браузер отправляет
 * форму по Enter без всякой кнопки. Пока приём заявок закрыт, SubscriptionForm
 * не рендерит <form> вовсе, иначе почта посетителя ушла бы в строку URL.
 */
export function Lead() {
  return (
    <section
      className="section section--utility sec-accent"
      id="lead"
      aria-labelledby="lead-t"
    >
      <div className="container grid grid--8-4 leadmag-grid">
        <div>
          <p className="overline">Состав программы</p>
          <h2 className="h3 leadmag__title" id="lead-t">
            Пришлём перечень, когда врач его утвердит
          </h2>
          <p className="leadmag__note">
            Оставьте почту — отправим полный состав каждого тарифа и прайс одним
            письмом, как только они будут готовы. Без рассылок и рекламы.
          </p>
        </div>

        <SubscriptionForm enabled={features.formsEnabled} />
      </div>
    </section>
  );
}
