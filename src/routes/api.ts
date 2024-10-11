import {Router} from 'express';
import {consumeAPIProjects,getJWTToken} from '../controllers/authController';
import {authenticateJWT} from '../middleware/auth';

const router = Router();

router.post('/login',getJWTToken);
router.get('/projects',consumeAPIProjects);
//router.get('/projects',authenticateJWT,consumeAPIProjects); //descomentar cuando se tenga el JWT_SECRET para vaildar plenamente 

export default router;