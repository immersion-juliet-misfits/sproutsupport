import express from 'express';
import path from 'path';
// import dotenv from 'dotenv';
// import { loadEnv } from './env';
import { load } from 'ts-dotenv';
import bodyParser from 'body-parser';

load(); // Executed synchronously before the rest of your app loads
require('./server'); // Your server’s actual entry


const app = express();
const port = 8000;
const DIST_PATH = path.resolve(__dirname, '../dist');
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Server to Serve Client
app.use(express.static(DIST_PATH));



app.listen(port, () => {console.log(`Listening on http://localhost:${port}`)})
