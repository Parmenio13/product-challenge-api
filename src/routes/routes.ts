import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../util/checkTokens';

import { signup, signin} from '../controllers/auth.controllers';
// User Authentication routes
router.post('/signup', signup);
router.post('/signin', signin);

import { review, reviewAll, create, update, deleteprod } from '../controllers/product.controllers';
// Product Management routes
router.get('/review', reviewAll);
router.get('/review/:id', review);
router.post('/create', TokenValidation, create);
router.post('/update', TokenValidation, update);
router.delete('/deleteprod', TokenValidation, deleteprod);

export default router;
