/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';

import MeetUp from '../models/MeetUp';

export async function getMeetUpsByUser(req, res) {
  try {
    const meetUps = await MeetUp.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(meetUps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getReleasedMeetUps(req, res) {
  try {
    const releasedMeetUps = await MeetUp.find({ status: 'released' }).sort({
      createdAt: -1,
    });
    res.json(releasedMeetUps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function createMeetUp(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;

  try {
    const newMeetUp = new MeetUp({
      title,
      description,
      user: req.user.id,
    });

    const meetUp = await newMeetUp.save();

    res.json(meetUp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function updateMeetUpByUser(req, res) {
  const { title, description, status } = req.body;

  const meetUpFields = {};
  if (title) meetUpFields.title = title;
  if (description) meetUpFields.description = description;
  if (status) meetUpFields.status = status;

  try {
    let meetUp = await MeetUp.findById(req.params.id);

    if (!meetUp) return res.status(404).json({ msg: 'MeetUp not found' });

    //   Verify if user owns the meetup
    if (meetUp.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    meetUp = await MeetUp.findByIdAndUpdate(
      req.params.id,
      { $set: meetUpFields },
      { new: true }
    );

    res.json(meetUp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
