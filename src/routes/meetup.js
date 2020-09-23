import { Router } from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth';

import {
  createMeetUp,
  getMeetUpsByUser,
  updateMeetUpByUser,
  getReleasedMeetUps,
} from '../controllers/meetup.controller';

const router = Router();

router
  .route('/meetup')
  .get(auth, getMeetUpsByUser)
  .post([auth, [check('title', 'Title is required').notEmpty()]], createMeetUp);

router.route('/meetup/:id').put(auth, updateMeetUpByUser);

router.route('/meetups').get(auth, getReleasedMeetUps);

export default router;
