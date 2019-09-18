const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const router = express.Router();

/**
 * Post route for register a new user
 *
 * @name POST /auth/regiser
 *
 * @param {string} email - email of the user
 * @param {string} password - password of the user
 * @param {name} name - name of the user
 * @param {occupation} occupation - occupation of the user
 */
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then( user => {

            if (user) {
                //Return error message
                res.json({message: "Invalid user"})
            } else {
                //Save new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    occupation: req.body.occupation
                })
                bcrypt.genSalt((err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});

/**
 * Post route for login
 * 
 * @name POST /auth/login
 *
 * @param {string} email - email of the user
 * @param {string} password - password of the user
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).then(user => {
        
        if (user) {
            
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                    const payload = { id: user.id, name: user.name, email: user.email };

                    // Sign Token
                    jwt.sign(
                        payload,
                        keys.secret,
                        (err, token) => {
                            res.json({
                                success: true,
                                token: token,
                                name: user.name
                            });
                        }
                    );

                } else {
                    res.status(400).json({message: "Wrong password entered!!"})
                }
            });

        } else {
            res.status(400).json({message: "User not found"});
        }
    }).catch( err=> {
        res.status(400).json({message: "User not found"});
    })
});



module.exports = router;