export default function getStatus(model) {
  if (model.canceled_at) {
    return 'Cancelada';
  }
  if (model.start_date) {
    if (model.end_date) {
      return 'Entregue';
    }
    return 'Retirada';
  }
  return 'Pendente';
}
