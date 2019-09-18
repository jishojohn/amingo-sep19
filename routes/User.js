const express = require('express')
const User = require('../models/User')

const router = express.Router();

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

/**
 * Get route to fetch logged in user information
 * 
 * @name GET: /users/profile
 */
router.get('/profile', (req, res) => {
    res.json(req.user);
})

module.exports = router;