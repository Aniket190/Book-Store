const mongoose = require('mongoose')


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
    coverImage:{
        type:Buffer,
        required:false,

    },
    coverImageType:{
        required:true,
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }


})


bookSchema.virtual('coverImagePath').get(function(){
       if(this.coverImage!=null && this.coverImageType !=null)
        {
            return `data:${this.coverImageType};charset=utf-8;base64,${
                this.coverImage.toString('base64')
            }`
        }
})

module.exports =mongoose.model('Book',bookSchema)
