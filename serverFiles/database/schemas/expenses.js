const mongoose=require('mongoose')
const { schema } = require('./users')


const ExpesnsesSchema = new mongoose.Schema({
    username:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    cat_list:{
        type: mongoose.SchemaTypes.Array,
        required: true,
        default:[{Tuition:[0,0],Accomodation:[0,0],Food:[0,0],Stationary:[0,0],Clothes:[0,0],Health:[0,0],Phone:[0,0],Travel:[0,0],Entertainment:[0,0],Misc:[0,0]}]
    },
    transac:{
        type: mongoose.SchemaTypes.Array,
        required: true,
        default:[]
    }
})

module.exports=mongoose.model('expenses',ExpesnsesSchema)