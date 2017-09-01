var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');




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



//campgrounds route
router.get('/campgrounds', (req, res) => {
    //console.log(req.user);
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


router.post('/campgrounds', (req, res) => {
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


router.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//Show route
router.get('/campgrounds/:id', (req, res) => {
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


module.exports = router;