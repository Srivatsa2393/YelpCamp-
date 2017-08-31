var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');



mongoose.connect("mongodb://localhost/yelp_camp");


//tell express to use the bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))
//console.log(__dirname);

var Campground = require('./models/campground');
var Comment = require('./models/comment');

var seedDB = require('./seeds'); 


seedDB();


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


//add a campground
/*  Campground.create(
    {
            name: 'Granite Hill',
            image: 'http://www.ecocampuk.co.uk/wp-content/uploads/2011/08/Sussex-Campsite-with-Bell-Tents-7.jpeg',
            description: 'This is a huge granite hill, no water but amazing location to hangout!'
    }, function(err, campground){
        if (err){
            console.log('Error!!');
        }else {
            console.log('Newly created campground: ');
            console.log(campground);
        }
    });  */


/*  var campgrounds = [
        {
            name: 'Salmon Creek',
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/a5/b5/a8/low-wray-campsite.jpg'
        },
        {
            name: 'Granite Hill',
            image: 'http://www.ecocampuk.co.uk/wp-content/uploads/2011/08/Sussex-Campsite-with-Bell-Tents-7.jpeg'
        },
        {
            name: 'Mountain Goats Rest',
            image: 'http://www.fishergroundcampsite.co.uk/data1/images/camp1.jpg'
        },
        {
            name: 'Salmon Creek',
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/a5/b5/a8/low-wray-campsite.jpg'
        },
        {
            name: 'Granite Hill',
            image: 'http://www.ecocampuk.co.uk/wp-content/uploads/2011/08/Sussex-Campsite-with-Bell-Tents-7.jpeg'
        },
        {
            name: 'Mountain Goats Rest',
            image: 'http://www.fishergroundcampsite.co.uk/data1/images/camp1.jpg'
        }
    ];
 */


//adding landing page
app.get('/', (req, res) => {
    //res.send('This will be the landing page soon');
    res.render('landing');
});


//campgrounds route
app.get('/campgrounds', (req, res) => {
    
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log('Error!!');
        }else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds})
        }
    });


    //res.render('campgrounds', {campgrounds: campgrounds});
});


app.post('/campgrounds', (req, res) => {
    //get data from form and add to campground array
    //res.send('You hit the post route');
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground= {name: name, image: image, description: description};
    //Create a new campground and save it to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });
    //campgrounds.push(newCampground);
    //redirect back to campgrounds page 

    //res.redirect('/campgrounds');
});


app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//Show route
app.get('/campgrounds/:id', (req, res) => {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }else{
            console.log(foundCampground);
             //render show template with that campground
             res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //req.params.id
   
    //res.send("The new route show page has started");
});


// =================================
// COMMENT ROUTES
// =================================

app.get('/campgrounds/:id/comments/new', (req, res) => {
    //res.send('This will be the comment form')
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        }else{
            res.render('comments/new', {campground: campground}); 
        }
    });
});

app.post('/campgrounds/:id/comments', (req, res) => {
    //lookup campgrounds using id
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            //console.log(req.body.comment);
             //create new comment
             Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                }else{
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
             });
        }
    });
});


//AUTH routes
app.get('/register', (req, res) => {
    res.render('register');
})

//handling the signup logic
app.post('/register', (req, res) => {
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
app.get('/login', (req, res) => {
    res.render('login');
})

//handling the login logic by using a middleware
app.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds', 
        failureRedirect: '/login'
    }),(req, res) => {
    //res.send('Login successful');
})



app.listen(3100, () => {
    console.log('Yelpcamp server started');
})