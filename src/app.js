import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.get('/', function (req, res) {
  res.send('Meet up server is up!');
});

export default app;
