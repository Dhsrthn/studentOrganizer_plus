const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    refresh_token:{
        type: mongoose.SchemaTypes.String,
        required: true,
        default: 'null',
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports=mongoose.model('Users',UserSchema)