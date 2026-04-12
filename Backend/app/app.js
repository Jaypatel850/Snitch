const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Route = require("../routes/auth.routes");
const 
app = express();
app.use(cors());
app.use(morgan('combined'));

app.use(express.json());


module.exports = app;