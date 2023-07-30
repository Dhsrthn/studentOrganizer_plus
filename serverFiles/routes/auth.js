const express=require('express')
const router=express.Router()
const User=require('../database/schemas/users')
const {hashMyPassword,compareHash} = require('../utils/pwdhasher')
const {checkToken} = require('../utils/checkToken')
const assigns = require('../database/schemas/assignments')
const expenses = require('../database/schemas/expenses')

//registering new user
router.post('/register',async(req,res)=>{
    console.log('reach')
    const {username} = req.body
    if(username=='' || req.body.password=='') return res.send('please enter valid username and password')

    const user=await User.findOne({username})
    //user already exists
    if(user){
        res.send('User already exist')
    }
    //create user
    else{
        const password=hashMyPassword(req.body.password)
        await User.create({username,password}).then(console.log('user created successfully'))
        await assigns.create({username,assign_list:[]})
        await expenses.create({username,transac:[]})
        res.send('user created successfully')
    }
})

//login for existing user
router.post('/login', async(req,res)=>{
    const {username, password}=req.body
    console.log(username,password)
    if(username=='' || password=='') return res.send('please enter valid username and password')
    //search database
    const user=await User.findOne({username})
    if(!user) return res.send('No user found')
    //compare password with the hash
    const isValid = compareHash(password,user.password)
    //successful login
    if(isValid){
        req.session.IsLoggedIn=true
        req.session.user=user.username

        let refreshtoken=user.refresh_token
        let valid
        try{
            valid = await checkToken(refreshtoken)
        }catch(error){
            console.log(error)
        }
        
        //enter logic to check refresh_token validity'
        if(valid){
            req.session.token=user.refresh_token
            return res.send('User Logged in and valid')
        }else{
            return res.send('User Logged in and invalid')
        }

       
    }
    //wrong password
    else{
        return res.send('Wrong Password')
    }
})

router.get('/logout', (req,res)=>{
    req.session.destroy()
    res.send('user logged out')
})

module.exports = router;
