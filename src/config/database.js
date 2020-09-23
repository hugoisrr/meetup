import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI || 'mongodb://localhost/meetup', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('\x1b[40m%s\x1b[0m', 'Database is connected...');
  } catch (err) {
    console.error(err.message);
    //   Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
