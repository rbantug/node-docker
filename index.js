import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import cors from 'cors';

import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

const redisClient = createClient({
  password: 'myPassword',
  socket: {
    host: 'redis',
    port: 6379,
  },
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
});

const app = express();

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/`)
  .then(() => console.log('DB is working'))
  .catch((e) => console.log(e));

app.enable('trust proxy');
app.use(cors());
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: 'no_secret',
    // secret: process.env.REDIS_SECRET,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 120000,
      secure: false, // for development without HTTPS
    },
  }),
);

app.get('/api', (req, res) => {
  res.send(`<h1>Muda Muda MUDA ${process.env.NODE_ENV}</h1>`);
  console.log('testing');
});

app.use(bodyParser.json());

app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
