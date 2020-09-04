import { Router } from 'express';

import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import AdminController from './app/controllers/Admin/AdminController';
import PartnerController from './app/controllers/Admin/PartnerController';
import ClientController from './app/controllers/Admin/ClientController';

import AdminSessionController from './app/controllers/Admin/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
import ClientSessionController from './app/controllers/ClientSessionController';

import ProfilePartnerController from './app/controllers/ProfilePartnerController';
import ProfileClientController from './app/controllers/ProfileClientController';

import ListClientIDController from './app/controllers/ListClientIDController';
import UpdatePartnerPasswordController from './app/controllers/Admin/UpdatePartnerPasswordController';
import UpdateClientPasswordController from './app/controllers/Admin/UpdateClientPasswordController';

import ListSystemUsersController from './app/controllers/Admin/ListSystemUsersController';
import ListClientsStatusController from './app/controllers/Admin/ListClientsStatusController';

import validateAdminStore from './app/validators/AdminStore';
import validateAdminSessionStore from './app/validators/AdminSessionStore';
import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validateUpdatePartnerPassword from './app/validators/UpdatePartnerPassword';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';
import validateClientStore from './app/validators/ClientStore';
import validateClientUpdate from './app/validators/ClientUpdate';
import validateClientSessionStore from './app/validators/ClientSessionStore';
import validateUpdateClientPassword from './app/validators/UpdateClientPassword';
import validateListClientID from './app/validators/ListClientID';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore, {
  freeRetries: 10,
});

routes.post('/access-admin', validateAdminStore, AdminController.store);

routes.post(
  '/access-admin-session',
  bruteForce.prevent,
  validateAdminSessionStore,
  AdminSessionController.store
);
routes.post(
  '/partners-session',
  bruteForce.prevent,
  validatePartnerSessionStore,
  PartnerSessionController.store
);
routes.post(
  '/clients-session',
  bruteForce.prevent,
  validateClientSessionStore,
  ClientSessionController.store
);

routes.use(authMiddleware);

routes.post('/partners', validatePartnerStore, PartnerController.store);
routes.post('/clients', validateClientStore, ClientController.store);

routes.put('/partners/:id', validatePartnerUpdate, PartnerController.update);
routes.put('/clients/:id', validateClientUpdate, ClientController.update);

routes.delete('/partners/:id', PartnerController.delete);
routes.delete('/clients/:id', ClientController.delete);

routes.get('/partners', PartnerController.index);
routes.get('/clients', ClientController.index);

routes.get('/admin/users', ListSystemUsersController.index);
routes.get('/admin/status-users', ListClientsStatusController.index);

routes.get('/partners/:id', ProfilePartnerController.show);
routes.get('/clients/:id', ProfileClientController.show);

routes.post('/clients/data', validateListClientID, ListClientIDController.show);

routes.put(
  '/partners/password/:id',
  validateUpdatePartnerPassword,
  UpdatePartnerPasswordController.update
);
routes.put(
  '/clients/password/:id',
  validateUpdateClientPassword,
  UpdateClientPasswordController.update
);

export default routes;
