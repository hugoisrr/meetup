import { Router } from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth';

import {
  createUser,
  showListUsers,
  updateUserById,
  updateNotifications,
  updateStatusById,
} from '../controllers/user.controller';

const router = Router();

router
  .route('/user')
  .post(
    [
      auth,
      [
        check('firstName', 'First name is required.').notEmpty(),
        check('surname', 'Surname is required.').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
          'password',
          'Please enter a password between 6 - 11 characters'
        ).isLength({ min: 6, max: 11 }),
        check('userRole', 'User role is required.').notEmpty(),
      ],
    ],
    createUser
  )
  .get(auth, showListUsers)
  .patch(auth, updateNotifications);

router
  .route('/user/:id')
  .put(auth, updateUserById)
  .patch(auth, updateStatusById);

export default router;
