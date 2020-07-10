import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FilesController from './app/controllers/FilesController';
import CouriersController from './app/controllers/CouriersController';
import OrdersController from './app/controllers/OrdersController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliverymanDeliveriesController from './app/controllers/DeliverymanDeliveriesController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import ProblemsController from './app/controllers/ProblemsController';

import authMiddleware from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'hi' }));

routes.post('/sessions', SessionController.store);

routes.put(
  '/deliveryman/:id',
  upload.single('signature'),
  DeliverymanController.update
);

routes.get('/deliveryman/:id', DeliverymanController.show);

routes.get('/deliveryman/:id/orders', DeliverymanDeliveriesController.index);
routes.get(
  '/deliveryman/:courier_id/order/:id',
  DeliverymanDeliveriesController.show
);

routes.get('/delivery/:id/problems', ProblemsController.show);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);

routes.use(authMiddleware);
routes.post('/files', upload.single('file'), FilesController.store);

routes.post('/recipients', RecipientsController.store);
routes.get('/recipients', RecipientsController.index);
routes.delete('/recipients/:id', RecipientsController.delete);
routes.put('/recipients', RecipientsController.update);

routes.get('/couriers', CouriersController.index);
routes.post('/couriers', CouriersController.store);
routes.put('/couriers', CouriersController.update);
routes.delete('/couriers/:id', CouriersController.delete);

routes.get('/orders', OrdersController.index);
routes.post('/orders', OrdersController.store);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/orders/:id', OrdersController.delete);

routes.get('/problems', ProblemsController.index);
routes.delete('/problem/:id/cancel-delivery', ProblemsController.delete);

export default routes;
