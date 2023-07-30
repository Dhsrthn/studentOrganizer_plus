const express=require('express')
const router=express.Router()
const User=require('../database/schemas/users')


router.get('/current' , async(req,res)=>{
    const user=await User.findOne({username:req.session.user})
    res.send(user)
})

module.exports = router;