import { Router } from 'express';

import AdminController from './app/controllers/AdminController';
import PartnerController from './app/controllers/PartnerController';
import ClientController from './app/controllers/ClientController';

import AdminSessionController from './app/controllers/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
import ClientSessionController from './app/controllers/ClientSessionController';

import ProfilePartnerController from './app/controllers/ProfilePartnerController';
import ProfileClientController from './app/controllers/ProfileClientController';
import CardGenerationController from './app/controllers/CardGenerationController';

import PartnerListIDController from './app/controllers/PartnerListIDController';
import ClientListIDController from './app/controllers/ClientListIDController';
import ListSystemUsersController from './app/controllers/ListSystemUsersController';
import ListClientsStatusController from './app/controllers/ListClientsStatusController';
// import ImportCSVController from './app/controllers/ImportCSVController';

import validateAdminStore from './app/validators/AdminStore';
import validateAdminSessionStore from './app/validators/AdminSessionStore';
import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';
import validateClientStore from './app/validators/ClientStore';
import validateClientUpdate from './app/validators/ClientUpdate';
import validateClientSessionStore from './app/validators/ClientSessionStore';
import validatePartnerListID from './app/validators/PartnerListID';
import validateClientListID from './app/validators/ClientListID';

import authMiddleware from './app/middlewares/auth';
import adminMasterAuthMiddleware from './app/middlewares/adminMasterAuth';
import adminAuthMiddleware from './app/middlewares/adminAuth';
import partnerAuthMiddleware from './app/middlewares/partnerAuth';

const routes = new Router();

routes.post('/admin-session', validateAdminSessionStore, AdminSessionController.store);
routes.post('/partners-session', validatePartnerSessionStore, PartnerSessionController.store);
routes.post('/clients-session', validateClientSessionStore, ClientSessionController.store);

routes.use(authMiddleware);

routes.get('/partners/:id', ProfilePartnerController.show);
routes.get('/clients/:id', ProfileClientController.show);
routes.get('/clients/:id/card', CardGenerationController.show);

routes.put('/partners', validatePartnerUpdate, PartnerController.update);
routes.put('/clients', validateClientUpdate, ClientController.update);

routes.use(partnerAuthMiddleware);

routes.get('/clients/data', validateClientListID, ClientListIDController.show);

// routes.post('/admin/master', AdminMasterController.store);

routes.use(adminAuthMiddleware);

routes.post('/partners', validatePartnerStore, PartnerController.store);
routes.post('/clients', validateClientStore, ClientController.store);

routes.get('/partners', PartnerController.index);
routes.get('/clients', ClientController.index);

routes.get('/admin/users', ListSystemUsersController.index);
routes.get('/admin/status-users', ListClientsStatusController.index);

routes.get('/partners/data', validatePartnerListID, PartnerListIDController.show);

routes.use(adminMasterAuthMiddleware);

routes.post('/admin', validateAdminStore, AdminController.store);
// routes.get('/admin', AdminController.index);

// routes.post('/admin/import', ImportCSVController.single);

export default routes;
