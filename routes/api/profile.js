const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

var _ = require('lodash');

//Provide an overview of different endpoints and routes....

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
      company: _.startCase(_.toLower(company)),
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
      res.status(500).send('Server error with adding profile experience.');
    }
  }
);

//@route    PATCH api/profile/experience/:experience_id
//@desc     Update an existing experience by its id
//@access   Private
router.patch(
  '/experience/:experience_id',
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

    const currentProfile = await Profile.findOne({ user: req.user.id });

    //Since experience is not a model itself, we need to use map
    //Gets the index of the experience we are editing.
    const currentExperienceIndex = currentProfile.experience
      .map((item) => item.id)
      .indexOf(req.params.experience_id);

    const newExperience = {
      _id: req.params.experience_id,
      title: _.startCase(_.toLower(title)),
      company: _.startCase(_.toLower(company)),
      location: location,
      from: from,
      to: to,
      current: current,
      description: description,
    };

    currentProfile.experience[currentExperienceIndex] = newExperience;

    await currentProfile.save();

    res.json(currentProfile);
  }
);

//@route    DELETE api/profile/experience/:experience_id
//@desc     Delete experience by id from profile
//@access   Private

router.delete('/experience/:experience_id', auth, async (req, res) => {
  try {
    const currentProfile = await Profile.findOne({ user: req.user.id });

    //Get index of experience to remove
    const removeExperienceIndex = currentProfile.experience
      .map((item) => item.id)
      .indexOf(req.params.experience_id);

    //Delete experience from profile
    currentProfile.experience.splice(removeExperienceIndex, 1);

    await currentProfile.save();

    res.json(currentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error with deleting profile experience.');
  }
});

//@route    PUT api/profile/education (PUT is used to modify a resource)
//@desc     Add education to profile
//@access   Private
router.put(
  '/education',
  [
    auth,
    [
      //Required fields.
      body('school', 'School is required.').not().isEmpty(),
      body('degree', 'Degree is required.').not().isEmpty(),
      body('major', 'Major is required.').not().isEmpty(),
      body('from', 'From date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, major, from, to, current, description } = req.body;

    //Create new education based on the inputted data in the request object.
    //Use lodash to capitalize first letter of each word.
    const newEducation = {
      school: _.startCase(_.toLower(school)),
      degree: _.startCase(_.toLower(degree)),
      major: _.startCase(_.toLower(major)),
      from: from,
      to: to,
      current: current,
      description: description,
    };

    try {
      const currentProfile = await Profile.findOne({ user: req.user.id });

      //Unshift method: adds latest education to the beginning of the array.
      currentProfile.education.unshift(newEducation);

      await currentProfile.save();

      res.json(currentProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error with adding profile education.');
    }
  }
);

//@route    PATCH api/profile/education/:education_id
//@desc     Update an existing education by its id
//@access   Private
router.patch(
  '/education/:education_id',
  [
    auth,
    [
      //Required fields.
      body('school', 'School is required.').not().isEmpty(),
      body('degree', 'Degree is required.').not().isEmpty(),
      body('major', 'Major is required.').not().isEmpty(),
      body('from', 'From date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //If there are errors...
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, major, from, to, current, description } = req.body;

    const currentProfile = await Profile.findOne({ user: req.user.id });

    //Since education is not a model itself, we need to use map
    //Gets the index of the education we are editing.
    const currentEducationIndex = currentProfile.education
      .map((item) => item.id)
      .indexOf(req.params.education_id);

    const newEducation = {
      school: _.startCase(_.toLower(school)),
      degree: _.startCase(_.toLower(degree)),
      major: _.startCase(_.toLower(major)),
      from: from,
      to: to,
      current: current,
      description: description,
    };

    currentProfile.education[currentEducationIndex] = newEducation;

    await currentProfile.save();

    res.json(currentProfile);
  }
);

//@route    DELETE api/profile/education/:education_id
//@desc     Delete education by id from profile
//@access   Private

router.delete('/education/:education_id', auth, async (req, res) => {
  try {
    const currentProfile = await Profile.findOne({ user: req.user.id });

    //Get index of education to remove
    const removeEducationIndex = currentProfile.education
      .map((item) => item.id)
      .indexOf(req.params.education_id);

    //Delete education from profile
    currentProfile.education.splice(removeEducationIndex, 1);

    await currentProfile.save();

    res.json(currentProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error with deleting profile education.');
  }
});

//@route    GET api/profile/github/:github_username
//@desc     Get public repos from github account
//@access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      //Gets all the public repos for now
      //Gets them in order of most recent
      // `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      `https://api.github.com/users/${req.params.username}/repos?sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    const githubResponse = await axios.get(uri, { headers });

    return res.json(githubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res
      .status(404)
      .send(`${req.params.username} is not a valid GitHub profile.`);
  }
});

module.exports = router;
