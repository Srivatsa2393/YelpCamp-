var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var methodOverride = require('method-override');

var campgroundRoutes = require('./routes/campground');
var commentRoutes = require('./routes/comment');
var indexRoutes = require('./routes/index');


mongoose.connect("mongodb://localhost/yelp_camp");


//tell express to use the bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))
//console.log(__dirname);
app.use(methodOverride("_method"));

var Campground = require('./models/campground');
var Comment = require('./models/comment');

var seedDB = require('./seeds'); 

//seed the database
//seedDB();


//Passport configuration
app.use(require('express-session')({
    secret: 'Srivatsa never ever give up',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



app.listen(3100, () => {
    console.log('Yelpcamp server started');
})