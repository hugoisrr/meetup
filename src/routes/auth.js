import { Router } from 'express';
// import { check } from 'express-validator';

import { getAuth } from '../controllers/auth.controller';

const router = Router();

router.route('/auth').get(getAuth);

export default router;
