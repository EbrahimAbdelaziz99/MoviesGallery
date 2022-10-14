const express = require('express')
const router = express.Router();

const categoryController = require('../controllers/categoryController');

const catchAsync = require('../utils/catchAsync');

// importing permitions meddlewars
const { userAuthenticated } = require('../middleware')

//////////////////// main routes //////////////////////////////////

router.get('/create' , userAuthenticated ,categoryController.renderNewForm);

router.post('/create' , userAuthenticated ,catchAsync(categoryController.create));

router.get('/edit/:id' , userAuthenticated ,catchAsync(categoryController.renderEditForm));

router.put('/edit/:id' , userAuthenticated ,catchAsync(categoryController.edit));

router.delete('/delete/:id' , userAuthenticated ,catchAsync(categoryController.delete));

router.get('/all' , userAuthenticated ,catchAsync(categoryController.all));

module.exports = router;