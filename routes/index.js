var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


//adding landing page
router.get('/', (req, res) => {
    //res.send('This will be the landing page soon');
    res.render('landing');
});

//AUTH routes
router.get('/register', (req, res) => {
    res.render('register');
})

//handling the signup logic
router.post('/register', (req, res) => {
    //res.send('Signing you up into yelpcamp....')
    var newUser = new User({ username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
})


//login routes show login form
router.get('/login', (req, res) => {
    res.render('login');
})

//handling the login logic by using a middleware
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds', 
        failureRedirect: '/login'
    }),(req, res) => {
    //res.send('Login successful');
})


//logout route logic
router.get('/logout', (req, res) => {
    //res.send('Logout');
    req.logout();
    req.flash('success', 'Logged you out! Bye!');
    res.redirect('/campgrounds');
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;