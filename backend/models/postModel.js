const mongoose=require('mongoose');

const postSchema=new mongoose.Schema(
    {
        image:{type:Blob,required:true},
        captions:{type:String}
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model('Post',postSchema)