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
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=======================
//ROUTES
//=======================

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
});


//Auth routes
//show signup form
app.get('/register', (req, res) => {
    res.render('register');
});

//handling user signup
app.post('/register', (req, res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render('register');
        }
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secret');
            });
    });
});

//add login routes
app.get('/login', (req, res) => {
    res.render('login');
});

//login logic
//middleware
app.post('/login', passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) ,(req, res) => {

});


//logout route
app.get('/logout', (req, res) => {
    //res.send('Ok, I will log you out.. not yet though...');
    req.logout();
    res.redirect('/');
})


//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};



app.listen('3000', () => {
    console.log('server started');
});

