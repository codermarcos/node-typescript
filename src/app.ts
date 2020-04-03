import cors from 'cors';
import express, { json } from 'express';
import morgan from 'morgan';

export const app = express();

app.use(json());
app.use(cors());
app.use(morgan('tiny'));
