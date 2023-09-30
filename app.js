const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// nurodyti route jeigu reikia: dabar atitinka default, bet:
app.set('views', 'views')

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {

res.render('index');

});

app.get('/about', (req, res) => {

    res.render('about')
    
    });

app.get('/blogs/create', (req, res) => {
res.render('create');
})

// 404 page - veikia visiems atvejams, nereikia nurodyti path,
// Kadangi express veikimo principas iki kol pasiekia sąlyga ir toliau nevykdo kodo
// 404 page turi būti gale
// REIKIA NUSETINTI Į ERROR STATUS, KADANGI NEŽINO EXPRESS, KAD TAI YRA ERRORAS
app.use((req, res) => {
    res.status(404).render('404')
})