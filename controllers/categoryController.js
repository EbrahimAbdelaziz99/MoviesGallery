const Category = require('../models/category');

module.exports.renderNewForm = (req,res) => {
    res.render('categories/create')
}

module.exports.create = async (req,res,next) => {
    const category = new Category(req.body);
    await category.save(); 
    res.redirect('/categories/all')
}

module.exports.renderEditForm = async (req,res,next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.render('categories/edit' ,{ category })
}

module.exports.edit = async(req,res,next) => {
    const { id } = req.params;
    const updatedCategory = req.body;
    const category = await Category.findByIdAndUpdate(id,updatedCategory);
    res.redirect('/categories/all')
}

module.exports.delete = async (req,res,next) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect('/categories/all')
}

module.exports.all = async(req,res,next) => {
    const categories = await Category.find({});
    res.render('categories/all' , { categories });
}