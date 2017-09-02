var Campground = require('../models/campground');
var Comment = require('../models/comment');
//all the middlewares goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                res.redirect('back');
            }else{
                //does user own the campground?
                //console.log(foundCampground.author.id);
                //console.log(req.user._id);
                if (foundCampground.author.id.equals(req.user._id)){
                    //edit the render form
                    //res.render("campgrounds/edit", {campground: foundCampground});
                    next();
                }else{
                    //res.send('You do not have permission to do that');
                    res.redirect('back');
                } 
            }
        });
    }else {
        //console.log('You need to be logged in to do that');
        //res.send('You need to be logged in to do that');
        res.redirect('back');
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                res.redirect('back');
            }else{
                //does user own the comment?
                //console.log(foundCampground.author.id);
                //console.log(req.user._id);
                if (foundComment.author.id.equals(req.user._id)){
                    //edit the render form
                    //res.render("campgrounds/edit", {campground: foundCampground});
                    next();
                }else{
                    //res.send('You do not have permission to do that');
                    res.redirect('back');
                } 
            }
        });
    }else {
        //console.log('You need to be logged in to do that');
        //res.send('You need to be logged in to do that');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = middlewareObj