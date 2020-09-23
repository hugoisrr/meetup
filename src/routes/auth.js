import { Router } from 'express';
import { check } from 'express-validator';
import { getAuth, loginUser } from '../controllers/auth.controller';
import auth from '../middleware/auth';

const router = Router();

router
  .route('/auth')
  .get(auth, getAuth)
  .post(
    [
      check('email', 'Please include a valid email.').isEmail(),
      check('password', 'Password is required.').exists(),
    ],
    loginUser
  );

export default router;
