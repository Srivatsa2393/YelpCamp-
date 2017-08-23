var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


var Cat = mongoose.model('Cat', catSchema);


//add a new cat to the DB

/*var george = new Cat({
    name: 'Mrs. Norris',
    age: 5,
    temperament: 'Evil'
});*/

/*george.save(function(err, cat){
   if(err){
       console.log('Something went wrong');
   } else{
       console.log('We just save a cat to database');
       console.log(cat);
   }        
});*/

Cat.create({
    name: 'Snow White',
    age: 15,
    temperament: 'Nice'
}, function(err, cat){
    if(err){
       console.log('Something went wrong');
   } else{
       console.log('We just save a cat to database');
       console.log(cat);
   }     
});

//retrieve all cats from db and console.log

Cat.find({}, function(err, cats){
    if (err){
        console.log('Oh No!!');
        console.log(err);
    }else{
        console.log('All the cats...');
        console.log(cats);
    }
})