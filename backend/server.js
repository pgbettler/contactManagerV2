require('dotenv').config();

// Implementing Node.js & Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Contact = require('./models/Contact');
const Register = require('./models/Register');

const app = express();
const router = express.Router();
const port = process.env.PORT;
mongoose.Promise = global.Promise;

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
// DB Config
const db = require("./config/key").mongoURI;
*/

mongoose.connect('mongodb://localhost:27017/contactManagement', { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Cannot connect to the database' + err) }
); // Come back to fill in the string later!!!

const connection = mongoose.connection;

// Opening connection to the MongoDB database at the beginning when starting the server.
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use('/', router);

app.use((req, res, next) => {
    let err = new Error('Path Not Found!');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'Something went wrong'
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

// Following are API endpoints for Contact page

// Retrieving All Contacts
// Process an HTTP GET request to retrieve a list of all contacts from the MongoDB database (just for now)
// THIS ROUTER NEED TO CHANGE TO ':id' VERSION WHEN LOGIN PAGE IS SETED UP!!!
//router.route('/contacts').get((req, res) => {
router.route('/contacts').get((req, res) => {
    // CHANGE TO findById later!!!
    Contact.find((err, contacts) => {
        // If an error has occurred (the err parameter is available) the error is printed on the console. 
        if (err)
            console.log(err);
        // If no error has occurred the list of contacts is returned in JSON format.
        else
            res.json(contacts);
    });
});

// Retrieving a Contact by ID
// Process an HTTP GET request to retrieve a single contact by ID from the MongoDB database
// This route is used to send a HTTP GET request to retrieve a single contact
// from the database in JSON format.
router.route('./contacts/:id').get((req, res) => {
    // Retrieve a single entry via the Mongoose model by using the method findById. 
    Contact.findById(req.params.id, (err, contact) => {
        if (err)
            console.log(err);
        else
            res.json(contact);
    });
});

// Adding a New Contact
// Process an HTTP POST request to add a new contact in the MongoDB database
router.route('/contacts/add').post((req, res) => {
    let contact = new Contact(req.body);

    // The save method from the model class is then used to store this new Issue object in the database.
    contact.save().then(contact => {
        res.status(200).json({ 'contact': 'Added successfully :)' });
    })
        .catch(err => {
            res.status(400).send('Failed to create a new record :(')
        });
});

// Updating Contact
// Process an HTTP POST request to update an existing contact entry in the MongoDB database
// NOT SURE TO USE POST OR PUT YET, THIS ROUTER MIGHT BE CHANGED LATER!!!
router.route('/contacts/update/:id').post((req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (!contact) {
            return next(new Error('Could not load Document :('));
        }
        else {
            contact.firstName = req.body.firstName;
            contact.lastName = req.body.lastName;
            contact.phoneNumber = req.body.phoneNumber;
            contact.emailAddress = req.body.emailAddress;

            contact.save().then(contact => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }

    });
});

// Deleting Contact
// Process an HTTP GET request to delete an existing contact entry from the MongoDB database
router.route('/contacts/delete/:id').get((req, res) => {
    Contact.findByIdAndRemove({ _id: req.params.id }, (err, contact) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});