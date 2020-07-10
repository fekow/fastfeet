/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';

import Queue from '../../lib/Queue';

import OrderMail from '../jobs/OrderMail';

class OrdersController {
  async index(req, res) {
    const { page = 1, product = '%%' } = req.query; // se nao tiver definido o padrao é 1
    const orders = await Order.findAll({
      where: {
        product: {
          [Op.iLike]: `%${product}%`,
        },
      },
      order: ['created_at'], // ordeno por data
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'courier_id',
        'recipient_id',
        'status',
      ], // pego so oque me interessa
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['email', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
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
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const isRecipient = await Recipient.findByPk(req.body.recipient_id);

    if (!isRecipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const isCourier = await Courier.findByPk(req.body.courier_id);

    if (!isCourier) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    const { id, product, recipient_id, courier_id } = await Order.create(
      req.body
    );

    /**
     * Notifica o prestador de servico
     */
    await Queue.add(OrderMail.key, {
      isRecipient,
      isCourier,
      product,
    });

    return res.json({
      id,
      product,
      recipient_id,
      courier_id,
    });
  }

  async update(req, res) {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const { recipient_id, courier_id } = req.body;

    if (recipient_id && !(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }
    if (courier_id && !(await Courier.findByPk(courier_id))) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    const { product, start_date, end_date } = await order.update(req.body);

    return res.json({
      recipient_id,
      courier_id,
      product,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    await order.destroy();

    return res.json({
      message: `Order with id ${orderId} has been deleted.`,
    });
  }
}

export default new OrdersController();
