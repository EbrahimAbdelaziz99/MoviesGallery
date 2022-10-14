const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req,res,next) => {
    const { email, birthDate, username, password } = req.body;
    const user = new User({ email, username , birthDate});
    const registeredUser = await User.register(user, password);
    res.redirect('/users/all');
}

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login');
}

module.exports.login = async (req,res,next) => {
    // login logic is done by Passport package as a 
    // middleware passed to the 'login-user route'
    // including adding salt and hashing .
    res.redirect('/dashboard')
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){ return next(err)}
        res.redirect('/home');
    });
}

module.exports.delete = async (req,res,next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users/all')
}

module.exports.allUsers = async (req,res,next) => {
    const users = await User.find({});
    res.render('users/all', { users })
}