const mongoose = require('mongoose');

//All profiles contain a user.
const ProfileSchema = new mongoose.Schema({
  user: {
    //In the database, it gets saved as "user": "id"
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', //Reference to 'user' model in User.js
  },
  company: {
    type: String, //Google, Netflix, Amazon
  },
  website: {
    type: String, //https://www.thehumboo.com/
  },
  location: {
    type: String, //United States
  },
  status: {
    type: String, //Student, Senior Engineer, Intern
    required: true,
  },
  skills: {
    type: [String], //JavaScript, Java, Python
    required: true,
  },
  biography: {
    type: String, //My name is Jacob and I'm a programmer.
  },
  github: {
    type: String, //jacobc2700
  },
  experience: [
    //Past jobs, internships
    {
      title: {
        type: String, //Software Engineer
        required: true,
      },
      company: {
        type: String, //Google
        required: true,
      },
      location: {
        type: String, //New York City
      },
      from: {
        type: Date, //January 2010
        required: true,
      },
      to: {
        type: Date, //February 2020
      },
      current: {
        type: Boolean, //True: you still work this job
        default: false,
      },
      description: {
        type: String, //Designed infrastructure for Google Maps
      },
    },
  ],
  education: [
    //College, educational programs, bootcamps (mainly college)
    {
      school: {
        type: String, //Harvard University
        required: true,
      },
      degree: {
        type: String, //Bachelors of Science in Computer Science
        required: true,
      },
      major: {
        type: String, //Computer Science
        required: true,
      },
      from: {
        type: Date, //September 2015
        required: true,
      },
      to: {
        type: Date, //June 2020
      },
      current: {
        type: Boolean, //True: you still attend this college
        default: false,
      },
      description: {
        type: String, //Attended Harvard and received my B.S. in Computer Science (Magna Cum Laude)
      },
    },
  ],
  social: {
    //Links to social networks (none are required)
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    medium: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
