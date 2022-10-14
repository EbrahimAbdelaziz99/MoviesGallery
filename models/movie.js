const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    Title : {
        type : String,
        required : true,
        unique:true
    },
    Description : {
        type : String,
        required : true,
    },
    Rate : {
        type: Number,
        required: true,
        min :0,
        max : 10
    },
    Image : {
        url: {
            type : String,
        required : true
        },
        filename: {
            type : String,
        required : true
        }
    },
    Category : {
        type: mongoose.Types.ObjectId,
        ref : 'Category'
    }
},{timestamps:true});

module.exports = mongoose.model('Movie', MovieSchema);