import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/Users';
import cocktailsRouter from './routers/Cocktails';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/cocktails', cocktailsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, async () => {
    console.log('Server running on port', port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((err) => {
  console.error(err);
});
