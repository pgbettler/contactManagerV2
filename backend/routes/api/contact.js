const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ContactSchema = require('../../models/Contact');
const Contact = mongoose.model('contact', ContactSchema);
const User = require('../../models/User');

// Retrieves all contacts for a specific user
router.get('/:userId/contacts/',(req, res) => {
    let userId = req.params.userId;
    User.findById(userId, function(err, user) {
        if(!user) res.status(404).send("Username not found, try again.");

        var contacts = user.contacts;

        res.status(200).send({'contacts': contacts});
    });
});

// Finds a specific contact from a user based on contactID
router.get('/:userId/contacts/:contactId', (req, res) => {
    let contactId = req.params.contactId;
    let userId = req.params.userId;
    User.findById(userId, function(err, user) {
        if(!user) res.status(404).send("Username not found, try again.");

        var contacts = user.contacts;
        var contact = contacts.find(x => x.id === contactId);

        if(!contact) {
            res.status(404).send("Contact not found.");
        } else {
            res.json(contact);
        }
    });
});


// Adds a contact to the specified userID's contacts
router.post('/:userId/contacts/add', (req, res) => {
    let userId = req.params.userId;
    var contact = {
        _id: mongoose.Types.ObjectId(),
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "emailAddress": req.body.emailAddress,
        "phoneNumber": req.body.phoneNumber
    };

    User.update(
        { _id: userId }, 
        { $push: { contacts: contact }}
    ).exec(function(err) {
        if(err){
            res.status(404).send(err);
        } else {
            res.status(200).send({'New contact added.' : contact});
        }
    });
});

// Updates a specified contact in the users contacts
router.put('/:userId/contact/update/:contactId', (req, res) => {
    let contactId = req.params.contactId;
    let userId = req.params.userId;
    
    User.findById(userId, function(err, user){
        var contact = user.contacts.id(contactId);
        if(!contact) res.status(404).send("Unable to find contact");        
        contact.set(req.body);

        user.save()
        .then(
            res.status(200).send({'contact': contact})
        ).catch(function(err) {
            res.status(500).send(err);
        });
    });
});

//Deletes a specified contact
router.delete('/:userId/contact/delete/:contactId', (req, res) =>{
    let contactId = req.params.contactId;
    let userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if(err) {
            res.status(404).send('Cannot find the contact.');
        }
        // User.Contact.pull(contactId);
        user.contacts.pull(contactId);
        user.save()
        .then(
            res.status(200).send('Contact deleted')
        )
        .catch(function(err){
            console.log(err);
        });
    });
});

module.exports = router;