import { Router } from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth';

import {
  createMeetUp,
  getMeetUpsByUser,
  updateMeetUpByUser,
  getReleasedMeetUps,
  votePositMeetup,
  voteNegMeetup,
  setMeetUpDate,
} from '../controllers/meetup.controller';

const router = Router();

router
  .route('/meetup')
  .get(auth, getMeetUpsByUser)
  .post([auth, [check('title', 'Title is required').notEmpty()]], createMeetUp);

router
  .route('/meetup/:id')
  .put(auth, updateMeetUpByUser)
  .patch(auth, setMeetUpDate);

router.route('/meetups').get(auth, getReleasedMeetUps);

router.route('/votepos/:id').put(auth, votePositMeetup);

router.route('/voteneg/:id').put(auth, voteNegMeetup);

export default router;
