import { Request, Response } from "express";
import { sponsorGasRouter } from "./src/routes/sponsor_gas.routes";
import {sponsorGasChallengeRouter} from "./src/routes/sponsor_gas_challenge.routes";
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

console.log(`Frontend URL: ${process.env.SAMPLE_APPLICATION_URL}`)
// Use the cors middleware to allow requests from any origin
app.use(cors({
  origin: process.env.SAMPLE_APPLICATION_URL, // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent in cross-origin requests
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.use("/api",sponsorGasRouter)
app.use("/api",sponsorGasChallengeRouter)

app.get('/', (req:Request, res:Response) => {
  res.send('Sponsor Gas backend 🥳')
})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = app


