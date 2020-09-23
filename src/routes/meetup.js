import { Router } from 'express';
import { check } from 'express-validator';

const router = Router();

router.route('/meetup').post([check('title', 'Title is required').notEmpty()]);
