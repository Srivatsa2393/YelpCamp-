//error driven development

var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Clouds Rest', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tenting_at_Joseph_A._Citta.jpg/250px-Tenting_at_Joseph_A._Citta.jpg',
        description: 'The camp of the century'
    },
    {
        name: 'Organic by sleep', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Campsite-Oludeniz.JPG/250px-Campsite-Oludeniz.JPG',
        description: 'Living in a organic farm'
    },
    {
        name: 'River by the side', 
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/a5/b5/a8/low-wray-campsite.jpg',
        description: 'Doing camping and eating sea food'
    }
];


function seedDB() {
    //remove everything from database
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log('Removed campgrounds');

          //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err){
                        console.log(err);
                    }else{
                        console.log('added a campground');
                        //add a few comments
                        Comment.create(
                            { 
                                text: 'This place is great, I wished I had internet',
                                author: 'Srivatsa'
                            }, function(err, comment){
                                if (err) {
                                    console.log(err);
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('Created a new comment');
                                }
                            });
                }
            });
        });
    });
}

module.exports = seedDB;
