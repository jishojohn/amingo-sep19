// Import express (for creating a web server)
const express = require('express');
// Import mongoose (for making MongoDB communication easier)
const mongoose = require('mongoose');
// Import bodyParser (for process POST requests)
const bodyParser = require('body-parser');
// Import passport (for authentication)
const passport = require('passport');
// For whitelisting IPs (by defaultm, all external IPs are blocked)
const cors = require('cors');

// For the pipeline
const keys = require('./config/keys');
// Connect to the appropriate database (e.g, working, staging, production, etc.)
const db = keys.mongoURI;


mongoose
    // Connect to database
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    // Feedback once connection made
    .then(() => console.log("DB Is connected"))
    // If something wrong, console log the error
    .catch(err => console.log(err))

// Instantiate app    
const app = express()

// Configuration for express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Open express to all IP addresses
app.use(cors());
app.use(passport.initialize());

// Import the function and invoke directly
require('./config/passport')(passport);

//Auth routes
const authRoutes = require('./routes/Auth')
app.use(
    '/auth', //route
    authRoutes //model
)

//User routes
const userRoutes = require('./routes/User');
app.use(
    '/users', //route
    passport.authenticate('jwt', { session: false }), //middleware
    userRoutes // subcontroller (routes/User.js)
);

//Post routes
const postRoutes = require('./routes/Post');
app.use(
    '/posts', //route
    passport.authenticate('jwt', { session: false }), //middleware
    postRoutes //subcontroller (routes/Post.js)
);


app.get(
    '/', //route
    (req, res) => res.send({ msg: "Welcome to Amingo" }) // view
)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Your application is running @ http://localhost:${port}`))