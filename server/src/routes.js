import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import PartnerController from './app/controllers/PartnerController';
import ClientController from './app/controllers/ClientController';

import AdminSessionController from './app/controllers/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
import ClientSessionController from './app/controllers/ClientSessionController';

import CardController from './app/controllers/CardController';
import ListClientIDController from './app/controllers/ListClientIDController';
import ListPartnerIDController from './app/controllers/ListPartnerIDController';

import validateAdminStore from './app/validators/AdminStore';
import validateAdminSessionStore from './app/validators/AdminSessionStore';
import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';
import validateClientStore from './app/validators/ClientStore';
import validateClientUpdate from './app/validators/ClientUpdate';
import validateClientSessionStore from './app/validators/ClientSessionStore';

import authMiddleware from './app/middlewares/auth';
import adminMasterAuthMiddleware from './app/middlewares/adminMasterAuth';
import adminAuthMiddleware from './app/middlewares/adminAuth';
import partnerAuthMiddleware from './app/middlewares/partnerAuth';

const routes = new Router();

routes.post('/admin-session', validateAdminSessionStore, AdminSessionController.store);
routes.post('/partners-session', validatePartnerSessionStore, PartnerSessionController.store);
routes.post('/clients-session', validateClientSessionStore, ClientSessionController.store);

routes.use(authMiddleware);

routes.get('/clients/:id/card', CardController.index);

routes.put('/partners', validatePartnerUpdate, PartnerController.update);
routes.put('/clients', validateClientUpdate, ClientController.update);

routes.use(adminMasterAuthMiddleware);

routes.post('/admin', validateAdminStore, AdminController.store);

routes.use(adminAuthMiddleware);

routes.post('/partners', validatePartnerStore, PartnerController.store);
routes.post('/clients', validateClientStore, ClientController.store);

routes.get('/partners', PartnerController.index);
routes.get('/partners/:id', ListPartnerIDController.index);

routes.use(partnerAuthMiddleware);

routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ListClientIDController.index);

export default routes;
