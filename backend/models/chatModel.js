const mongoose=require('mongoose')

const chatModel=mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        receiver:{type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
        room:{type:mongoose.Schema.Types.ObjectId,ref:"Service"},
        content:{type:String,trim:true}
    }
);
const Message=mongoose.model("Message",chatModel);

module.exports=Message;