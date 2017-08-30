var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var User = require('./models/user');


mongoose.connect('mongodb://localhost/auth_demo_app');

var app = express();
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
    secret: 'Srivatsa never ever give up',
    resave: false,
    saveUninitialized: false
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) => {
    res.render('secret');
})

app.listen('3000', () => {
    console.log('server started');
})