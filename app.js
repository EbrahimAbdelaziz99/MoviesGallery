const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local')

const { userAuthenticated } = require('./middleware')

// importing the User Model 
const User = require('./models/user');


// using enviroment variables 
require('dotenv').config();

// run our express app
const app = express();

// Error handler 
const ExpressError = require('./utils/expressError');

// MongoDB connection 
const dbUrl = process.env.DB_URL ;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const DbConection = mongoose.connection;

DbConection.on('error' , console.error.bind(console, 'connection error!!'));
DbConection.once('open' , () => {
    console.log('Database is Working!')
});


// middleware to 
// : specify the tamplate engine 
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// : serve views directly from "views" folder 
app.set("views", path.join(__dirname, "views"));

// : serve static files from our "public" folder 
app.use(express.static(path.join(__dirname, "public")));

// : parse body data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// : apply http put, patch & delete from html Forms 
//   using the String "_method"
app.use(methodOverride("_method"));



// session configeration

const secret = process.env.SECRET || 'MySecret!';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on('error', function(error) {
    console.log('session store error' , error);
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 ,
        maxAge: 1000 * 60 * 60 * 24 
    }
};
// session config middleware
app.use(session(sessionConfig));


// passport initialization middlewares 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
// importing all our routes 
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const categoryRoutes = require('./routes/categoryRoutes')


app.get('/home' , (req,res) => {
    res.render('home');
})

app.get('/dashboard', userAuthenticated ,async(req,res) => {
    res.render('dashboard');
})

////////////////////////////

app.use('/users' , userRoutes);
app.use('/movies' , movieRoutes);
app.use('/categories' , categoryRoutes);

////////////////////////////

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });
})

// listen to our app 

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Serving on port : ${port}`)
})