import * as Yup from 'yup';
import Order from '../models/Order';
import Courier from '../models/Courier';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      courier_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }
    const orderId = req.params.id;

    const isOrder = await Order.findByPk(orderId);
    if (!isOrder) {
      return res.status(400).json({ error: 'Order not found.' });
    }
    if (req.body.courier_id !== isOrder.courier_id) {
      return res.status(401).json({ error: 'user does not match' });
    }
    const isCourier = await Courier.findByPk(req.body.courier_id);
    if (!isCourier) {
      return res.status(400).json({ error: 'Courier does not exist.' });
    }

    const problem = await DeliveryProblem.create({
      description: req.body.description,
      order_id: orderId,
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemsController();
