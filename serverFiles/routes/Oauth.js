const express=require('express')
const router=express.Router()
const axios=require('axios')
const bodyParser=require('body-parser')
const {google}=require('googleapis')
const User=require('../database/schemas/users')
const { version } = require('mongoose')
require('dotenv').config()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//oauth2 client
const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URI=process.env.REDIRECT_URI

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

const authUrl = oAuth2Client.generateAuthUrl({
    access_type:'offline',
    scope:['https://www.googleapis.com/auth/calendar.events','https://www.googleapis.com/auth/calendar.calendarlist'],
    prompt: 'consent',
    version: 'v3'
})


//initiate oauth2
router.get('/',(req,res)=>{
    res.redirect(authUrl);
})


//callback
router.get('/callback',async (req,res)=>{
    const {code}=req.query 
    try{
        const response = await axios.post('https://oauth2.googleapis.com/token',{
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        })
        req.session.token=response.data.refresh_token
        await User.updateOne({username:req.session.user},{$set:{refresh_token:response.data.refresh_token}}).then(()=>{
            console.log('added token')
        }).then(res.redirect('http://localhost:3000/home'))

    } catch(error){
        console.log(error)
    }
})

module.exports = router;