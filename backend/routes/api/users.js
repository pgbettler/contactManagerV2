const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ username: "Username already exists, please try another username." });
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const password = req.body.password;
    // Find user by username
    User.findOne({ username: req.body.username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: "Username not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            //token: "Bearer " + token
                            _id: user.id
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// Delete a username
// This is for devolopment ONLY
router.delete('/deleteUser/:userId', (req, res) => {
    let userId = req.params.usedId;

    User.findOneAndDelete({id: userId}, function(err, user) {
        if(!user) 
        {
            res.status(404).send({error: 'This username does not exists.' + err});
        }
        else 
        {
            res.status(200).json({ 'user': 'User added :)' });
            res.status(200).send({'user': user});
        }
    })
});

module.exports = router;