var express = require('express');
var app = express();

app.set('view engine', 'ejs');


//adding landing page
app.get('/', (req, res) => {
    //res.send('This will be the landing page soon');
    res.render('landing');
});


//campgrounds route
app.get('/campgrounds', (req, res) => {
    var campgrounds = [
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

    res.render('campgrounds', {campgrounds: campgrounds});
});


app.listen(3000, () => {
    console.log('Yelpcamp server started');
})