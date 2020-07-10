import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientsController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_name: Yup.string().required(),
      address_number: Yup.string().required(), // check this
      street_add_on: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, name } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      address_name: Yup.string(),
      address_number: Yup.string(),
      street_add_on: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      postal_code: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const recipient = await Recipient.findByPk(req.body.id);
    if (!recipient) {
      return res.status(400).json({
        error: "The recipient you are trying to update doesn't exist.",
      });
    }
    await recipient.update(req.body);

    return res.json({ message: 'Recipient updated successfully!' });
  }

  async index(req, res) {
    const { name = '%%', page = 1 } = req.query;
    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 5,
      offset: (page - 1) * 5,
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
    });
    return res.json(recipients);
  }

  async delete(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res.status(400).json({
        error: "The recipient you are trying to delete doesn't exist.",
      });
    }
    await recipient.destroy();
    return res.json({
      message: `Recipient with id ${id} has been deleted.`,
    });
  }
}

export default new RecipientsController();
