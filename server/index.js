import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';

import Route from './routes/route.js'

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://chatify-one-rho.vercel.app'
    ],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Route);

Connection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`))
