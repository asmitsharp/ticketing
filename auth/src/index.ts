import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoosecd from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => {
  throw new NotFoundError;
  
})

app.use(errorHandler);

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
