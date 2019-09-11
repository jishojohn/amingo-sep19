const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

/**
 * Post route for register a new user
 *
 * @name POST /post
 *
 * @param {string} email - email of the user
 * @param {string} message - the message
 */
router.post('/', (req, res) => {
    console.log('req.body.email->', req.body.email);
    User
        .findOne({email: req.body.email})
        .then(user => {
            if (user) {
                console.log("user->", user);
                const newPost = new Post({
                    email: req.body.email,
                    message: req.body.message,
                    userId: user._id
                });
            
                newPost
                    .save()
                    .then(post => res.json(post))
                    .catch(err => res.json(err))
            } else {
                res.json({message: "User is not found"});
            }
        })
        .catch(err => res.json({message: err}))
});

/**
 * Get route to fetch all the post from Posts collection
 * 
 * @name GET /post
 */
router.get('/', (req, res) => {
    Post
        .find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
});

router.get('/getByEmail', (req, res) => {
    Post
        .find({email: req.query.email})
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
});

module.exports = router;