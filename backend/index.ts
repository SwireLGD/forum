import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';
import usersRouter from './routers/users';
import threadsRouter from './routers/threads';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/threads', threadsRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Port: ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
