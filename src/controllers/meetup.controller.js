/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { validationResult } from 'express-validator';

import MeetUp from '../models/MeetUp';
import User from '../models/User';

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

export async function votePositMeetup(req, res) {
  try {
    const meetUp = await MeetUp.findById(req.params.id);

    // Check id meetup has already been voted Positive
    if (
      meetUp.votingPositive.filter(
        (votePos) => votePos.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Already voted positive' });
    }

    meetUp.votingPositive.unshift(req.user.id);
    await meetUp.save();
    res.json(meetUp.votingPositive);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function voteNegMeetup(req, res) {
  try {
    const meetUp = await MeetUp.findById(req.params.id);

    // Check id meetup has already been voted Positive
    if (
      meetUp.votingNegative.filter(
        (voteNeg) => voteNeg.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Already voted negative' });
    }

    meetUp.votingNegative.unshift(req.user.id);
    await meetUp.save();
    res.json(meetUp.votingNegative);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function setMeetUpDate(req, res) {
  try {
    const loggedUser = await User.findById(req.user.id);
    if (loggedUser.userRole !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const meetUp = await MeetUp.findById(req.params.id);
    if (!meetUp) return res.status(404).json({ msg: 'MeetUp not found.' });
    if (meetUp.status === 'draft')
      return res.status(404).json({ msg: 'MeetUp has not been released.' });
    if (meetUp.votingPositive.length === 0)
      return res.status(404).json({ msg: 'MeetUp has not been voted.' });
    let { startTime, stopTime } = req.body;
    startTime = Date.parse(startTime);
    if (isNaN(startTime)) {
      return res.status(404).json({ msg: 'Start time is not valid.' });
    }
    startTime = new Date(startTime);
    stopTime = Date.parse(stopTime);
    if (isNaN(stopTime)) {
      return res.status(404).json({ msg: 'Stop time is not valid.' });
    }
    stopTime = new Date(stopTime);
    if (startTime >= stopTime) {
      return res.status(404).json({ msg: 'Invalid time duration.' });
    }

    meetUp.startTime = startTime;
    meetUp.stopTime = stopTime;

    await meetUp.save();

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
