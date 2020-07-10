import * as Yup from 'yup';
import { Op } from 'sequelize';
import Courier from '../models/Courier';
import File from '../models/File';

class CouriersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email is taken.' });
    }
    const avatar = req.body.avatar_id;
    if (avatar) {
      const file = await File.findByPk(avatar);
      if (!file) {
        return res.status(400).json({ error: 'File does not exist' });
      }
    }
    const { name, email, id, avatar_id } = await Courier.create(req.body);

    return res.json({
      name,
      email,
      id,
      avatar_id,
    });
  }

  async index(req, res) {
    const { courier = '%%', page = 1 } = req.query;
    const couriers = await Courier.findAll({
      where: {
        name: {
          [Op.iLike]: `%${courier}%`,
        },
      },
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(couriers);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    // verifica se o usuario com id inserido existe
    const user = await Courier.findByPk(req.body.id);
    if (!user) {
      return res
        .status(400)
        .json({ error: "The user you are trying to update doesn't exist." });
    }
    // checa se o email que quer mudar ja existe
    const userExists = await Courier.findOne({
      where: {
        email: req.body.email,
        id: {
          [Op.ne]: req.body.id,
        },
      },
    });
    if (userExists) {
      return res.status(401).json({ error: 'Email is taken' });
    }

    const { email, name } = await user.update(req.body);
    return res.json({
      email,
      name,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const courier = await Courier.findByPk(id);
    if (!courier) {
      return res
        .status(400)
        .json({ error: "The user you are trying to delete doesn't exist." });
    }
    await courier.destroy();
    return res.json({
      message: `Courier with id ${id} has been deleted.`,
    });
  }
}

export default new CouriersController();
