import { Op } from 'sequelize';
import { getHours, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';

class DeliverymanController {
  async show(req, res) {
    const { id } = req.params;
    const courier = await Courier.findByPk(id, {
      attributes: ['name', 'email', 'id', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'path'],
        },
      ],
    });
    if (!courier) {
      return res.status(401).json({ error: 'Courier does not exist.' });
    }
    return res.json(courier);
  }

  async update(req, res) {
    const courierId = req.params.id;
    const courier = await Courier.findByPk(courierId);
    const now = new Date();
    if (!courier) {
      return res.status(401).json({ error: 'Courier not found' });
    }
    // ve se order existe, e esta em andamento ainda.
    const order = await Order.findOne({
      where: { id: req.body.order_id, end_date: null },
    });
    if (!order) {
      return res
        .status(400)
        .json({ error: 'Order not found or is already finished.' });
    }
    // rota se ja iniciou a entrega
    if (order.start_date) {
      // como colocar um upload se uso json ?
      if (!req.file) {
        return res
          .status(400)
          .json({ error: 'Courier must upload a signature.' });
      }
      const { originalname: name, filename: path } = req.file;

      const { id, url } = await File.create({
        name,
        path,
      });

      const {
        signature_id,
        product,
        start_date,
        end_date,
      } = await order.update({
        end_date: new Date(),
        signature_id: id,
      });
      return res.json({ id, product, start_date, end_date, signature_id, url });
    }

    // workhours logic...
    const hour = getHours(new Date());

    if (!(isBefore(hour, 18) && isAfter(hour, 8))) {
      return res
        .status(400)
        .json({ error: 'You can only accept orders within 8:00 and 18:00.' });
    }

    // order limit logic
    const courierOrders = await Order.findAndCountAll({
      where: {
        courier_id: courierId,
        start_date: { [Op.between]: [startOfDay(now), endOfDay(now)] },
      },
    });
    if (courierOrders.count >= 5) {
      return res
        .status(401)
        .json({ error: 'Courier can only take 5 orders per day' });
    }

    const { id, product, start_date, end_date } = await order.update({
      start_date: new Date(),
    });
    return res.json({ id, product, start_date, end_date });
  }
}

export default new DeliverymanController();
