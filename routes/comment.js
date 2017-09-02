var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// =================================
// COMMENT ROUTES
// =================================

router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, (req, res) => {
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

router.post('/campgrounds/:id/comments', middleware.isLoggedIn, (req, res) => {
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

//Comments edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    //res.send('Edit route for comment');
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err){
            res.redirect('back');
        }else{
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    })
});

//comments update
router.put('/campgrounds/:id/comments/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    //res.send('You hit the update route for comment')
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.redirect('back');
        }else{
            res.redirect('/campgrounds/' +  req.params.id );
        }
    });
});

//Delete comment
router.delete('/campgrounds/:id/comments/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    //findbyidandremove
    //res.send('Deleted a comment');
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err){
            res.redirect('back');
        }else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});



 


module.exports = router;