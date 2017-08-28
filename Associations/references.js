var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo_2');

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model('Post', postSchema);


var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

var User = mongoose.model('User', userSchema);

/* User.create({
    email: 'sri@test.com',
    name: 'Srivatsa Arsenal'
}); */

/* Post.create({
    title: 'How to cook the best chutney part 3',
    content: 'Peanuts, chillies are required and grid these along with mint and tamrind'
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
}); */

//Find user 
//Find all posts for that user


User.findOne({ email : 'sri@test.com'}).populate('posts').exec(function(err, user){
    if (err){
        console.log(err);
    }else{
        console.log(user);
    }
});