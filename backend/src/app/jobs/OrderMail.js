import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    // pego informacao que recebi e desistruturo
    const { isCourier, isRecipient, product } = data;

    let add_on = isRecipient.address_add_on;
    if (!isRecipient.address_add_on) {
      add_on = 'sem complemento';
    }

    await Mail.sendMail({
      to: `${isCourier.name}<${isCourier.email}`,
      subject: 'Novo Encomenda para entrega.',
      template: 'order',
      context: {
        courier: isCourier.name,
        product,
        name: isRecipient.name,
        address_name: isRecipient.address_name,
        address_number: isRecipient.address_number,
        address_add_on: add_on,
        city: isRecipient.city,
        state: isRecipient.state,
        postal_code: isRecipient.postal_code,
      },
    });
  }
}

export default new OrderMail();
// get key permite que seja usado como variavel se chamar CancellationMail.key,
// ele ja passa essa chave unica, que é necessaria pros jobs.
