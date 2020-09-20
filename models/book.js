const mongoose = require('mongoose')
// const Author= require('./author')
const path=require('path')

const coverImageBasePath="uploads/bookCovers"

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    publishDate:{
        type:Date,
        required:false
    },
    pageCount:{
        type:Number,
        required:false
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    },
    coverImageName:{
        type:String,
        required:false,

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }


})


bookSchema.virtual('coverImagePath').get(function(){
       if(this.coverImageName!=null)
        {
            return path.join('/',coverImageBasePath,this.coverImageName);
        }
})

module.exports =mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath=coverImageBasePath;