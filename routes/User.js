const express = require('express')
const User = require('../models/User')

const router = express.Router();

/**
 * Post route for register a new user
 *
 * @name POST /users/regiser
 *
 * @param {string} email - email of the user
 * @param {string} password - password of the user
 * @param {name} name - name of the user
 */
router.post('/register', (req, res) =>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        occupation: req.body.occupation
    })

    newUser
        .save()
        .then(user=> {
            res.json(user)
        })
        .catch(err=> {
            res.json(err)
        })
});

/**
 * Get route to fetch all users from collection
 *
 * @name GET: /users/
 */
router.get('/', (req, res)=> {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

module.exports = router;