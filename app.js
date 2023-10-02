const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// nurodyti route jeigu reikia: dabar atitinka default, bet:
app.set('views', 'views')

// listen for requests
app.listen(3000);

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('host: ', req.path);
    console.log('host: ', req.method);
    next();
});



app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, rem.'},
        {title: 'Mario finds star', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, rem.'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, rem.'}
    ];

res.render('index', { title: 'Home', blogs });

});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.get('/about', (req, res) => {

    res.render('about', { title: 'About' })
    
    });

app.get('/blogs/create', (req, res) => {
res.render('create', { title: 'Create a new Blog' });
})

// 404 page - veikia visiems atvejams, nereikia nurodyti path,
// Kadangi express veikimo principas iki kol pasiekia sąlyga ir toliau nevykdo kodo
// 404 page turi būti gale
// REIKIA NUSETINTI Į ERROR STATUS, KADANGI NEŽINO EXPRESS, KAD TAI YRA ERRORAS
app.use((req, res) => {
    res.status(404).render('404' , { title: '404' })
})