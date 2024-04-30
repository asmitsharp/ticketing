import mongoose from 'mongoose';

import { app } from './services/app';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('Key must be defined.')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017');
    console.log('Connected to mongodb');
    
  } catch (err) {
    console.error(err);
  }
}

app.listen(3000, () => {
  console.log('Listening on Port: 3000.!!!');
});

start();
