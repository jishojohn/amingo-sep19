const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys')
const passport = require('passport');

const db = keys.mongoURI;

mongoose
    .connect(db, {useNewUrlParser:true, useUnifiedTopology: true })
    .then(() => console.log("DB Is connected"))
    .catch(err => console.log(err))

const app = express()
app.use(bodyParser.urlencoded({extended: false}));

//Init passport
app.use(passport.initialize());
require('./config/passport')(passport);

//Auth routes
const authRoutes = require('./routes/Auth')
app.use('/auth', authRoutes)

//User routes
const userRoutes = require('./routes/User');
app.use('/users', passport.authenticate('jwt', {session: false}), userRoutes);

//Post routes
const postRoutes = require('./routes/Post');
app.use('/posts', passport.authenticate('jwt', {session: false}), postRoutes);

const port = process.env.PORT || 5000
app.get('/', (req, res) => res.json({messsage: "Hello Amigo!!˜"}))

app.listen(port, () => console.log(`Your application is running @ http://localhost:${port}`))