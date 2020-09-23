/* eslint-disable func-names */
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user';
// import meetupRoutes from './routes/meetup';

const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.use('/api', userRoutes);
// app.use('/api', meetupRoutes);

export default app;
