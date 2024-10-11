import mongoose from 'mongoose';

const connectDB = async() => {

  try{
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDb is Connected');
  }
  catch(error){
    console.error('Error conectiong to to MongoDb', error);
    process.exit(1);
  }

}

export default connectDB;