import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { apiRouter } from './api';

const devMode = process.env.NODE_ENV !== 'production';

const app: Express = express();
const PORT = process.env.PORT || '8000';

app.use(cors());
app.use(bodyParser.json());
app.use(apiRouter);


app.listen(PORT, () => {
    console.log(`Server ready and listening on port ${PORT}`);
});