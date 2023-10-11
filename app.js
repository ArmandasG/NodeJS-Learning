const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')
// env
require('dotenv').config();
const login = process.env.login;

// express app
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://Removed@nodenuts.resknbw.mongodb.net/node-tuts?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

    // raktus visus dėti į ENV failiuką

// register view engine
app.set('view engine', 'ejs');
// nurodyti route jeigu reikia: dabar atitinka default, bet:
app.set('views', 'views')

// listen for requests
// app.listen(3000);

// middleware & static files
app.use(express.static('public'));

// for forms that are in create
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'))

// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => {
// const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
// });

// blog.save()
//     .then((results) => {
//         res.send(results)
//     })
//     .catch((err) => {
//         console.log(err)
//     });
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('651ee2581c56e4352e6835b1')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('host: ', req.path);
//     console.log('host: ', req.method);
//     next();
// });


// routes
app.get('/', (req, res) => {
//     const blogs = [
//         {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, rem.'},
//         {title: 'Mario finds star', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, rem.'},
//         {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, rem.'}
//     ];

// res.render('index', { title: 'Home', blogs });
res.redirect('/blogs');


});

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });

app.get('/about', (req, res) => {

    res.render('about', { title: 'About' })
    
    });
// blog routes
app.use('/blogs', blogRoutes);


// 404 page - veikia visiems atvejams, nereikia nurodyti path,
// Kadangi express veikimo principas iki kol pasiekia sąlyga ir toliau nevykdo kodo
// 404 page turi būti gale
// REIKIA NUSETINTI Į ERROR STATUS, KADANGI NEŽINO EXPRESS, KAD TAI YRA ERRORAS
app.use((req, res) => {
    res.status(404).render('404' , { title: '404' })
})