import Sequelize from 'sequelize';

import User from '../app/models/user';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Courier from '../app/models/Courier';
import Order from '../app/models/Order';
import DeliveryProblem from '../app/models/DeliveryProblem';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Courier, Order, DeliveryProblem]; // lista todos meus models pra inicializar

class Database {
  constructor() {
    this.init(); // crio um metodo init, que ja rola automatico quando mando pro app (?)
  }

  init() {
    // a this.connection cria uma variavel com as config do meu db pra ser usado quando vou dar init nos meus models.
    this.connection = new Sequelize(databaseConfig);
    // percorre o array dos model,
    models.map(model => model.init(this.connection)); // os inicializa e passa as config de conexão dentro
    models.map(
      // eslint-disable-next-line no-shadow
      models => models.associate && models.associate(this.connection.models)
    );
  }
}

export default new Database();
