import { Router } from 'express';
import mainRouter from './main-router.js';


const routes = Router();

routes.use('/api', mainRouter);


export default routes;
