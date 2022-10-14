const express = require('express')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const moviesController = require('../controllers/moviesController');

const catchAsync = require('../utils/catchAsync');

// importing permitions meddlewars
const { userAuthenticated } = require('../middleware')

//////////////////// main routes //////////////////////////////////

router.get('/create' , userAuthenticated , moviesController.renderNewForm);

router.post('/create' , userAuthenticated , upload.single('Image'), catchAsync(moviesController.create));

router.get('/show/:id' , userAuthenticated , catchAsync(moviesController.show));

router.get('/edit/:id' , userAuthenticated , catchAsync(moviesController.renderEditForm));

router.put('/edit/:id' , userAuthenticated , catchAsync(moviesController.edit));

router.delete('/delete/:id' , userAuthenticated , catchAsync(moviesController.delete));

router.get('/all' , userAuthenticated , catchAsync(moviesController.all));

router.post('/all' , userAuthenticated , catchAsync(moviesController.filter));


module.exports = router;