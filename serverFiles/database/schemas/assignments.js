const mongoose=require('mongoose')
const { schema } = require('./users')

const AssignEventSchema= new mongoose.Schema({
    username:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    assign_list:{
        type: mongoose.SchemaTypes.Array,
        required: true,
        default:[]
    },
});

module.exports=mongoose.model('assigns',AssignEventSchema)


// assign_list of the form = [...[assignment name, coursename, deadline,status,[attatchments]]...]