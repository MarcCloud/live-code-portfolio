import Router from 'isomorphic-router';
import profileView from './profile';
const router = new Router();

router.on('/app/:user', profileView);

export default router;
