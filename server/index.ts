import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;
const DIST_PATH = path.resolve(__dirname, '../client/dist');
// Middleware to parse JSON bodies
// Replaces body-parser
app.use(express.json());
// parses form data
app.use(express.urlencoded({extended: false}));

// Server to Serve Client
app.use(express.static(DIST_PATH));

app.listen(port, () => {console.log(`Listening on http://localhost:${port}`)})
