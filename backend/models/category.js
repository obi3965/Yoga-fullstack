const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        maxLength:200,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
})

module.exports = mongoose.model('category', categorySchema)