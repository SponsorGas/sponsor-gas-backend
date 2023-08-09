import { sponsorGasRouter } from "./src/routes/sponsor_gas.routes";
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// Use the cors middleware to allow requests from any origin
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent in cross-origin requests
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use("/api",sponsorGasRouter)

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


