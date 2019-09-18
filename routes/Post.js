const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

/**
 * Post route to create a new post
 * 
 * @name POST /posts
 * 
 * @param {string} message - message of the user
 */
router.post('/', (req, res) =>{
    const newPost = new Post({
        message: req.body.message,
        user: req.user
    })

    newPost
        .save()
        .then(post=> res.json(post))
        .catch(err => res.json(err))
})

/**
 * Get route to fetch all the post of logged in user from Posts collection
 * 
 * @name GET /post
 */
router.get('/', (req, res) => {
    Post
        .find({user: req.user})
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