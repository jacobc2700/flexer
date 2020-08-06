const mongoose = require('mongoose');

const db = process.env.DATABASE_URL;

const connectDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to MongoDB.');
  } catch (err) {
    console.log(err.message);

    //Exit process with failure.
    process.exit(1);
  }
};

module.exports = connectDatabase;
