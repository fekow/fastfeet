import { Op } from 'sequelize';

import Courier from '../models/Courier';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliverymanController {
  async index(req, res) {
    const courier_id = req.params.id;
    const { page = 1, status = null, paginate = 10 } = req.query;

    let where = {
      courier_id,
      canceled_at: null,
    };

    if (status === 'Entregue') {
      where = {
        ...where,
        start_date: {
          [Op.ne]: null,
        },
        end_date: {
          [Op.ne]: null,
        },
      };
    }

    if (status === 'Pendente') {
      where = {
        ...where,
        end_date: null,
      };
    }

    const orders = await Order.paginate({
      where,
      order: [['created_at', 'DESC']], // ordeno por data
      attributes: [
        'id',
        'product',
        'created_at',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
      ], // pego so oque me interessa
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city'],
        },
      ],
      page,
      paginate,
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { id, courier_id } = req.params;
    const courier = await Courier.findByPk(courier_id);
    if (!courier) {
      return res.status(400).json({ error: 'Courier does not exist' });
    }

    const order = await Order.findOne({
      where: {
        id,
        courier_id,
      },
      attributes: [
        'id',
        'product',
        'status',
        'created_at',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'address_name',
            'address_number',
            'street_add_on',
            'state',
            'city',
            'postal_code',
          ],
        },
      ],
    });
    return res.json(order);
  }
}

export default new DeliverymanController();
