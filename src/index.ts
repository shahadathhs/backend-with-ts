import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from './router';
require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression())
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const MONGO_URL = `mongodb+srv://${user}:${password}@cluster0.ahaugjj.mongodb.net`;


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())