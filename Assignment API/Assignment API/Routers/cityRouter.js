import { Router } from 'express';
import citiesController from '../Controllers/citiesController';

function routes() {
    const cityRouter = Router();
    const controller = citiesController();
    cityRouter.route('/cities')
        .get(controller.get);

    return cityRouter;
};

export default routes;