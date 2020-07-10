import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // pego informacao que recebi e desistruturo
    const { isProblem } = data;
    const { order } = isProblem;
    const { courier, recipient } = order;

    await Mail.sendMail({
      to: `${courier.name}<${courier.email}`,
      subject: 'Cancelamento de entrega.',
      template: 'cancellation',
      context: {
        description: isProblem.description,
        courier: courier.name,
        product: order.product,
        name: recipient.name,
        address_name: recipient.address_name,
        address_number: recipient.address_number,
        city: recipient.city,
        state: recipient.state,
        postal_code: recipient.postal_code,
        date: format(
          parseISO(isProblem.created_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new OrderMail();
// get key permite que seja usado como variavel se chamar CancellationMail.key,
// ele ja passa essa chave unica, que é necessaria pros jobs.
