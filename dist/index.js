"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sponsor_gas_routes_1 = require("./src/routes/sponsor_gas.routes");
const sponsor_gas_challenge_routes_1 = require("./src/routes/sponsor_gas_challenge.routes");
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Use the cors middleware to allow requests from any origin
app.use(cors({
    origin: 'https://sample-application-kannusingh.vercel.app',
    credentials: true, // Allow credentials (cookies) to be sent in cross-origin requests
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use("/api", sponsor_gas_routes_1.sponsorGasRouter);
app.use("/api", sponsor_gas_challenge_routes_1.sponsorGasChallengeRouter);
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.send('Sponsor Gas backend 🥳');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
