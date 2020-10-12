const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cnNumber} = require('./controllers/cnNumber')

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.get('/cn/:cnNumber', cnNumber)

// Port and Server Start
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App running at http://localhost:${port}`));