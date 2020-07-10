import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

import './database'; // trazendo isso pra cá ja ativa tudo que ta escrito lá, nem precisa delimitar o index

// this é basicamente app.
class App {
  constructor() {
    this.server = express(); // a classe App ganha funcoes do espress
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.server.use(cors()); // qualquer um pode ver
    this.server.use(express.json()); // uso linguagem json pra ser restful e funcionar o req.body
  }

  routes() {
    this.server.use(routes); // rotas ficam por la
  }
}
export default new App().server;

// executa o sucrase antes de rodar o node, sucrase suporta import e export diferente
