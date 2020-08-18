import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import PartnerController from './app/controllers/PartnerController';
import ClientController from './app/controllers/ClientController';

import AdminSessionController from './app/controllers/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
import ClientSessionController from './app/controllers/ClientSessionController';

import PartnerListIndexController from './app/controllers/PartnerListIndexController';
import ClientListIndexController from './app/controllers/ClientListIndexController';
import CardController from './app/controllers/CardController';
import ListSystemUsersController from './app/controllers/ListSystemUsersController';
import ListClientsStatusController from './app/controllers/ListClientsStatusController';

import validateAdminStore from './app/validators/AdminStore';
import validateAdminSessionStore from './app/validators/AdminSessionStore';
import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';
import validateClientStore from './app/validators/ClientStore';
import validateClientUpdate from './app/validators/ClientUpdate';
import validateClientSessionStore from './app/validators/ClientSessionStore';
import validatePartnerListIndex from './app/validators/PartnerListIndex';
import validateClientListIndex from './app/validators/ClientListIndex';

import authMiddleware from './app/middlewares/auth';
import adminMasterAuthMiddleware from './app/middlewares/adminMasterAuth';
import adminAuthMiddleware from './app/middlewares/adminAuth';
import partnerAuthMiddleware from './app/middlewares/partnerAuth';

const routes = new Router();

routes.post('/admin-session', validateAdminSessionStore, AdminSessionController.store);
routes.post('/partners-session', validatePartnerSessionStore, PartnerSessionController.store);
routes.post('/clients-session', validateClientSessionStore, ClientSessionController.store);

// routes.post('/admin/master', AdminMasterController.store);

routes.use(authMiddleware);

routes.get('/clients/:id/card', CardController.show);

routes.put('/partners', validatePartnerUpdate, PartnerController.update);
routes.put('/clients', validateClientUpdate, ClientController.update);

// routes.use(adminMasterAuthMiddleware);

routes.post('/admin', validateAdminStore, AdminController.store);
// routes.get('/admin', AdminController.index);

// routes.use(adminAuthMiddleware);

routes.post('/partners', validatePartnerStore, PartnerController.store);
routes.post('/clients', validateClientStore, ClientController.store);

routes.get('/partners', PartnerController.index);
routes.get('/clients', ClientController.index);

routes.get('/admin/status-users', ListClientsStatusController.index);
routes.get('/admin/users', ListSystemUsersController.index);

routes.get('/partners/data', validatePartnerListIndex, PartnerListIndexController.show);

// routes.use(partnerAuthMiddleware);

routes.get('/clients/data', validateClientListIndex, ClientListIndexController.show);

export default routes;
