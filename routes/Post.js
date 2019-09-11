const express = require('express')
const Post = require('../models/Post')

const router = express.Router();

/**
 * Post route for register a new user
 *
 * @name POST /post
 *
 * @param {string} email - email of the user
 * @param {string} message - the message
 */
router.post('/', (req, res) =>{
    const newPost = new Post({
        email: req.body.email,
        message: req.body.message
    })

    newPost
        .save()
        .then(post => res.json(post))
        .catch(err => res.json(err))
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

module.exports = router;