import Order from '../models/Order';
import Courier from '../models/Courier';
import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      order: ['created_at'], // ordeno por data
      attributes: ['id', 'description', 'order_id'], // pego so oque me interessa
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product', 'start_date', 'courier_id'],
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['name', 'email', 'avatar_id'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['name', 'path', 'url'],
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'address_name',
                'address_number', // check this
                'street_add_on',
                'state',
                'city',
                'postal_code',
              ],
            },
          ],
        },
      ],
    });
    return res.json(problems);
  }

  async show(req, res) {
    const order_id = req.params.id;

    const isOrder = await DeliveryProblem.findAll({
      where: { order_id },
      order: [['created_at', 'ASC']], // ordeno por data
      attributes: ['id', 'description', 'created_at'], // pego so oque me interessa
    });
    if (!isOrder) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    return res.json(isOrder);
  }

  async delete(req, res) {
    const problemId = req.params.id;
    const isProblem = await DeliveryProblem.findByPk(problemId, {
      order: ['created_at'], // ordeno por data
      attributes: ['id', 'description', 'order_id', 'created_at'], // pego so oque me interessa
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product', 'start_date', 'courier_id'],
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['name', 'email', 'avatar_id'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'address_name',
                'address_number', // check this
                'street_add_on',
                'state',
                'city',
                'postal_code',
              ],
            },
          ],
        },
      ],
    });

    if (!isProblem) {
      return res.status(400).json({ error: 'Problem not found.' });
    }

    await Queue.add(CancellationMail.key, {
      isProblem,
    });
    const response = await isProblem.order.update({ canceled_at: new Date() });

    return res.json(response);
  }
}

export default new ProblemsController();
