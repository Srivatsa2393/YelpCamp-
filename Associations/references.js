var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo_2');

var Post = require('./models/post');
var User = require('./models/user');

/* User.create({
    email: 'sri@test.com',
    name: 'Srivatsa Arsenal'
}); */

Post.create({
    title: 'How to cook the best chutney part 4',
    content: 'Peanuts, chillies are required and grid these along with mint and tamrind and salt'
}, function(err, post){
    User.findOne({ email: 'sri@test.com'}, function(err, foundUser){
        if(err){
            console.log(err);
        }else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if (err){
                    console.log(err);
                }else{
                    console.log(data);
                }
            })
        }
    })
});

//Find user 
//Find all posts for that user


/* User.findOne({ email : 'sri@test.com'}).populate('posts').exec(function(err, user){
    if (err){
        console.log(err);
    }else{
        console.log(user);
    }
}); */