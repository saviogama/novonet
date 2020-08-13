import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import PartnerController from './app/controllers/PartnerController';
import ClientController from './app/controllers/ClientController';

import AdminSessionController from './app/controllers/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
import ClientSessionController from './app/controllers/ClientSessionController';

import validateAdminStore from './app/validators/AdminStore';
import validateAdminSessionStore from './app/validators/AdminSessionStore';
import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';
import validateClientStore from './app/validators/ClientStore';
import validateClientUpdate from './app/validators/ClientUpdate';
import validateClientSessionStore from './app/validators/ClientSessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/admin', validateAdminStore, AdminController.store);
routes.post('/partners', validatePartnerStore, PartnerController.store);
routes.post('/clients', validateClientStore, ClientController.store);

routes.post('/admin-session', validateAdminSessionStore, AdminSessionController.store);
routes.post('/partners-session', validatePartnerSessionStore, PartnerSessionController.store);
routes.post('/clients-session', validateClientSessionStore, ClientSessionController.store);

routes.use(authMiddleware);

routes.put('/partners', validatePartnerUpdate, PartnerController.update);
routes.put('/clients', validateClientUpdate, ClientController.update);

routes.get('/partners', PartnerController.index);
routes.get('/clients', ClientController.index);

export default routes;
