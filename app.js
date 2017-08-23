var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/yelp_camp");


//tell express to use the bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render('campgrounds', {campgrounds: allCampgrounds})
        }
    });


    //res.render('campgrounds', {campgrounds: campgrounds});
});


app.post('/campgrounds', (req, res) => {
    //get data from form and add to campground array
    //res.send('You hit the post route');
    var name = req.body.name;
    var image = req.body.image;
    var newCampground= {name: name, image: image};
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
    res.render('new');
});


app.get('/campgrounds/:id', (req, res) => {
    //find the campground with provided id
    //render show template with that campground
    res.render("show");
    //res.send("The new route show page has started");
});


app.listen(3000, () => {
    console.log('Yelpcamp server started');
})