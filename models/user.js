const mongoose = require('mongoose')
const passportLocalMongosse = require("passport-local-mongoose")
// const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique:true
    },
    birthDate : {
        type : Date,
        required : true,
    }
})

UserSchema.plugin(passportLocalMongosse);

module.exports = mongoose.model('User' , UserSchema);
