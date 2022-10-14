const Movie = require('../models/movie');
const Category = require('../models/category');



module.exports.renderNewForm = async(req,res,next) => {
    const categories = await Category.find({});
    res.render('movies/create' , { categories });
}

module.exports.create = async (req,res,next) => {
    const movie = new Movie(req.body);
    const ImageFile =  req.file; 
    movie.Image = { url: ImageFile.path, filename: ImageFile.filename };
    await movie.save();
    res.redirect(`/movies/show/${movie._id}`)
}

module.exports.show = async (req,res,next) => {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate('Category');
    res.render('movies/show' , { movie });
}

module.exports.renderEditForm = async (req,res,next) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const categories = await Category.find({});
    res.render('movies/edit' , { movie , categories });
}

module.exports.edit = async (req,res,next) => {
    const { id } = req.params;
    const updatedMovie = req.body;
    const movie = await Movie.findByIdAndUpdate(id ,updatedMovie);
    res.redirect(`/movies/show/${id}`);
}

module.exports.delete = async (req,res,next) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies/all')
}

module.exports.all = async (req,res,next) => {
    const movies = await Movie.find({}).populate('Category');
    const categories = await Category.find({});
    res.render('movies/all' , { movies , categories });
}

module.exports.filter = async (req,res,next) => {
    const { Title , Category , Rate } = req.body;
    if(Title && Category && Rate){
        const movies = await Movie.find({Title:Title,Rate:Rate,Category:Category}).populate('Category');
        return res.send(movies);
    } else if ((Title && Category) && !Rate) {
        const movies = await Movie.find({Title:Title,Category:Category}).populate('Category');
        return res.send(movies);
    } else if ((Title && Rate) && !Category ) {
        const movies = await Movie.find({Title:Title,Rate:Rate}).populate('Category');
        return res.send(movies);
    } else if ((Category && Rate) && !Title ) {
        const movies = await Movie.find({Category:Category,Rate:Rate}).populate('Category');
        return res.send(movies);
    } else if (Title && !Category && !Rate) {
        const movies = await Movie.find({Title:Title}).populate('Category');
        return res.send(movies);
    } else if (Category && !Rate && !Title) {
        const movies = await Movie.find({Category:Category}).populate('Category');
        return res.send(movies);
    } else if (Rate && !Title && !Category) {
        const movies = await Movie.find({Rate:Rate}).populate('Category');
        return res.send(movies);
    }
}


