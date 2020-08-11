const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

var _ = require('lodash');

//below: document the route => private routes need tokens

//@route    GET api/profile/me
//@desc     Get the current user profile
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    //Get current profile through user id.
    //Populate method: assign profile user name and avatar.
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error getting current profile.');
  }
});

//@route    POST api/profile
//@desc     Create or update existing user profile
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status (developer, student) is required.')
        .not()
        .isEmpty(),
      body('skills', 'Skills (python, java, html) is required.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      biography,
      skills,
      status,
      github,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    //Make profile.
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (biography) profileFields.biography = biography;
    if (status) profileFields.status = status;
    if (github) profileFields.github = github;

    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Social object within profile.
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update profile.
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create a new profile.
      profile = new Profile(profileFields);

      //Save new profile.
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error creating new profile.');
    }
  }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async (req, res) => {
  try {
    //Gets all the profiles, and adds the name and avatar to the user doc (user: id, name, avatar).
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error getting all profiles.');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found.' });
    }
    res.status(500).send('Error getting profile.');
  }
});

//@route    DELETE api/profile
//@desc     Delete profile, user, and posts
//@access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //Later todo: remove user posts

    //Delete profile.
    await Profile.findOneAndRemove({ user: req.user.id });

    //Delete user.
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User and profile deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error getting all profiles.');
  }
});

//@route    PUT api/profile/experience (PUT is used to modify a resource)
//@desc     Add experience to profile
//@access   Private
router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Job title is required.').not().isEmpty(),
      body('company', 'Company name is required.').not().isEmpty(),
      body('from', 'Job starting date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    //Create new job experience based on the inputted data in the request object.
    //Use lodash to capitalize first letter of each word.
    const newExperience = {
      title: _.startCase(_.toLower(title)),
      company: _.startCase(_.toLower(title)),
      location: location,
      from: from,
      to: to,
      current: current,
      description: description,
    };

    try {
      const currentProfile = await Profile.findOne({ user: req.user.id });

      //Unshift method: adds latest experience to the beginning of the array.
      currentProfile.experience.unshift(newExperience);

      await currentProfile.save();

      res.json(currentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error with updating profile experience.');
    }
  }
);

//@todo: update an experience...

module.exports = router;
