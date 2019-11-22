const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./models/wealthForm');
require('./models/signupinfo');
require('./models/sellersinfo');

const rtsIndex = require('./routes/index.router');

const app = express();

// // Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) 
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
