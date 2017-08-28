var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/blog_demo');

//Define 2 models (user and post)

//Post has 2 props title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model('Post', postSchema);

//User has 2 props-email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

//create the model
var User = mongoose.model('User', userSchema);

/* var newUser = new User({
    email: 'ssrivatsa@stud.hs-bremen.de',
    name: 'Srivatsa Shankaran'
});

newUser.posts.push({
    title: 'Completion of Masters',
    content: 'Congratulations you became a master graduate'
});

newUser.save(function(err, user){
    if (err){
        console.log(err);
    }else{
        console.log(user);
    }
}); */


/* var newUser = new User({
    email: 'Sri007vatsa@gmail.com',
    name: 'Srivatsa'
});
newUser.save(function(err, user){
    if (err){
        console.log(err);
    }else{
        console.log(user);
    }
})
 */


/*  var newPost = new Post({
     title: 'Reflections on Apple',
     content: 'They are mouth-watering'
 });

 newPost.save(function(err, post){
     if (err){
         console.log(err);
     }else{
         console.log(post);
     }
 }) */

 //retreive the user
 User.findOne({ name: 'Srivatsa Shankaran'}, function(err, user){
    if (err) {
        console.log(err);
    }else {
        //console.log(user);
        user.posts.push({
            title: 'You will be a developer',
            content: 'A front end as well as a full stack developer'
        });
        user.save(function(err, user){
            if (err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
 });