const express = require('express')
const router = express.Router();
const passport = require('passport');

// importing permitions meddlewars
const { userAuthenticated } = require('../middleware')

const userControllers = require('../controllers/userController')

const catchAsync = require('../utils/catchAsync');

//////////////////// main routes //////////////////////////////////

router.get('/register' , userAuthenticated ,userControllers.renderRegisterForm);

router.post('/register' , userAuthenticated ,catchAsync(userControllers.register));

router.get('/login' , userControllers.renderLoginForm)

router.post('/login' , passport.authenticate('local' ,{failureRedirect: '/login'}),  catchAsync(userControllers.login))

router.get('/all' ,userAuthenticated , catchAsync(userControllers.allUsers));

router.get('/logout', userControllers.logout);

router.delete('/delete/:id' , userAuthenticated ,catchAsync(userControllers.delete));

module.exports = router;