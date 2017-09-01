var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// =================================
// COMMENT ROUTES
// =================================

router.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
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

router.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //console.log("New comments username will be: " + req.user.username);
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
             });
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
 


module.exports = router;