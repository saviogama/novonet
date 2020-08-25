import { Router } from 'express';

import AdminController from './app/controllers/Admin/AdminController';
import PartnerController from './app/controllers/Admin/PartnerController';
import ClientController from './app/controllers/Admin/ClientController';

import AdminSessionController from './app/controllers/Admin/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
import ClientSessionController from './app/controllers/ClientSessionController';

import ProfilePartnerController from './app/controllers/ProfilePartnerController';
import ProfileClientController from './app/controllers/ProfileClientController';
import CardGenerationController from './app/controllers/CardGenerationController';

import ListClientIDController from './app/controllers/ListClientIDController';
import ListSystemUsersController from './app/controllers/Admin/ListSystemUsersController';
import ListClientsStatusController from './app/controllers/Admin/ListClientsStatusController';
// import ImportCSVController from './app/controllers/ImportCSVController';

import validateAdminStore from './app/validators/AdminStore';
import validateAdminSessionStore from './app/validators/AdminSessionStore';
import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';
import validateClientStore from './app/validators/ClientStore';
import validateClientUpdate from './app/validators/ClientUpdate';
import validateClientSessionStore from './app/validators/ClientSessionStore';
import validateListClientID from './app/validators/ListClientID';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/access-admin', validateAdminStore, AdminController.store);
// routes.post('/admin/import', ImportCSVController.single);

routes.post(
  '/access-admin-session',
  validateAdminSessionStore,
  AdminSessionController.store
);
routes.post(
  '/partners-session',
  validatePartnerSessionStore,
  PartnerSessionController.store
);
routes.post(
  '/clients-session',
  validateClientSessionStore,
  ClientSessionController.store
);

routes.use(authMiddleware);

routes.post('/partners', validatePartnerStore, PartnerController.store);
routes.post('/clients', validateClientStore, ClientController.store);

routes.get('/admin/users', ListSystemUsersController.index);
routes.get('/admin/status-users', ListClientsStatusController.index);

routes.get('/partners', PartnerController.index);
routes.get('/clients', ClientController.index);

routes.get('/clients/data', validateListClientID, ListClientIDController.show);

routes.get('/partners/:id', ProfilePartnerController.show);
routes.get('/clients/:id', ProfileClientController.show);
routes.get('/clients/:id/card', CardGenerationController.show);

routes.put('/partners', validatePartnerUpdate, PartnerController.update);
routes.put('/clients', validateClientUpdate, ClientController.update);

export default routes;
