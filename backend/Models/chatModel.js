const mongoose =require('mongoose')

const chatModel =mongoose.Schema(
    {
        chatName: {
            type:String,
            trim:true
        },
        isGroupChat:{
            type:Boolean,
            default:false
        },
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
    ],
    letestMassage:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    },
    {
        timestamps:true,
    }
);

const chat =mongoose.model("chat",chatModel);

module.exports=chat;