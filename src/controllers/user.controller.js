/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

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

    const userCreated = await User.findById(newUser.id).select('-password');

    res.json(userCreated);
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

export async function updateNotifications(req, res) {
  try {
    const loggedUser = await User.findById(req.user.id);
    loggedUser.notification = !loggedUser.notification;
    await loggedUser.save();
    res.json(loggedUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

export async function updateStatusById(req, res) {
  try {
    const loggedUser = await User.findById(req.user.id);
    if (loggedUser.userRole !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const user = await User.findById(req.params.id);
    user.status = !user.status;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

export async function updateUserById(req, res) {
  try {
    const loggedUser = await User.findById(req.user.id);
    if (loggedUser.userRole !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const { firstName, surname, email, userRole } = req.body;

    const userFields = {};
    if (firstName) userFields.firstName = firstName;
    if (surname) userFields.surname = surname;
    if (email) userFields.email = email;
    if (userRole) userFields.userRole = userRole;

    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found.' });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}
