//route file

const express = require('express');
const contactRoutes = express.Router();

//contact model require
let Contact = require('./contact.model');

//store route
contactRoutes.route('/add').post(function(req, res){
    let contact = new Contact(req.body);
    contact.save()
        .then(() => {
            res.status(200).json({'business': 'business in added successfully'});
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

//get contact route
contactRoutes.route('/').get(function (req, res) {
    Contact.find(function(err, contacts){
        if(err){
            res.json(err);
        }
        else {
            res.json(contacts);
        }
    });
});

//update route
contactRoutes.route('/update/:id').post(function (req, res) {
    Contact.findById(req.params.id, function(err, contact) {
        if (!contact)
            res.status(404).send("data is not found");
        else {
            contact.first = req.body.first;
            contact.last = req.body.last;
            contact.number = req.body.number;
            contact.save().then(() => {
                res.json('Update complete');
            })
                .catch(() => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

//edit route
contactRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Contact.findById(id, function (err, post){
        if(err) {
            res.json(err);
        }
        res.json(post);
    });
});

//delete route
contactRoutes.route('/delete/:id').delete(function (req, res) {
    Contact.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = contactRoutes;