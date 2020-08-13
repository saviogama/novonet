import { Router } from 'express';

// import AdminController from './app/controllers/AdminController';
import PartnerController from './app/controllers/PartnerController';
// import ClientController from './app/controllers/ClientController';
// import AdminSessionController from './app/controllers/AdminSessionController';
import PartnerSessionController from './app/controllers/PartnerSessionController';
// import ClientSessionController from './app/controllers/ClientSessionController';

import validatePartnerStore from './app/validators/PartnerStore';
import validatePartnerUpdate from './app/validators/PartnerUpdate';
import validatePartnerSessionStore from './app/validators/PartnerSessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// routes.post('/admin', AdminController.store);
routes.post('/partners', validatePartnerStore, PartnerController.store);
// routes.post('/clients', ClientController.store);

// routes.post('/admin-session', AdminSessionController.store);
routes.post('/partners-session', validatePartnerSessionStore, PartnerSessionController.store);
// routes.post('/clients-session', ClientSessionController.store);

routes.use(authMiddleware);

routes.put('/partners', validatePartnerUpdate, PartnerController.update);
// routes.put('/clients', ClientController.update);

routes.get('/partners', PartnerController.index);
// routes.get('/clients', ClientController.index);

export default routes;
