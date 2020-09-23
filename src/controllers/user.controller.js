/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export async function createUser(req, res) {
  // Validation
  const loggedUser = await User.findById(req.user.id);
  if (loggedUser.userRole !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, surname, email, password, userRole } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist)
    return res.status(400).json({ errors: [{ msg: 'User already exists!' }] });

  // Saving a new User
  try {
    const newUser = new User({
      firstName,
      surname,
      email,
      password,
      userRole,
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };
    const secret = process.env.jwtSecret;
    jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function showListUsers(req, res) {
  try {
    const loggedUser = await User.findById(req.user.id);
    if (loggedUser.userRole !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const usersList = await User.find()
      .sort({ createdAt: -1 })
      .select('-password');
    return res.json(usersList);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}
