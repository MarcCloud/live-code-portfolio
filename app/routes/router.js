import Router from 'isomorphic-router';
import profileView from './profile';
const router = new Router();

router.on('/:user', profileView);

export default router;
