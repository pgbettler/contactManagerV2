require('dotenv').config();
// Implementing Node.js & Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Contact = require('./models/Contact');
const app = express();
const router = express.Router();
const port = process.env.PORT || 4500;
const users = require('./routes/api/user');
const contacts = require('./routes/api/contact');

mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const dbURI = require('./config/keys').mongoURI;


//Connect to MongoDB
mongoose
    .connect(dbURI, {useNewUrlParser: true})
    .then(() => console.log('MonoDB Connected...'))
    .catch(err => console.log(err));

//Routes
app.use('/api/user', users);
app.use('/api/contact', contacts);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Server started on port ${port}`));