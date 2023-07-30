const express = require('express')
const app=express();
const cors = require("cors")
const session = require('express-session');

//to parse json 

app.use(express.json());
app.use(express.urlencoded());
app.timeout = 300000

//cors policy
app.use(

    cors({
        origin:'http://localhost:3000',
        credentials:true
    })

)

//session data
app.use(session({
    secret: 'brrrrrrkdjggggnbuboinvjvnvvkgb3hhg',
    resave:false,
    saveUninitialized:false,
    cookie: {   secure: false,
        path:'/', 
    },
}))

//database access
require('./database/database')

//port
app.listen(3500, ()=> console.log('Server running'))


//auth route before auth middleware
const authRouter =require('./routes/auth')
app.use('/auth',authRouter)

const OauthRouter = require('./routes/Oauth')
app.use('/oauth2',OauthRouter)


//some middleware to check login perhaps
app.use((req,res,next)=>{
    if(req.session){
        if(req.session.IsLoggedIn){
            next()
        }else{
            res.send('error')
        }
    }else{
        res.send('error')
    }
})

//Userroute
const UserRouter=require('./routes/users')
app.use('/users',UserRouter)

//Events/assignments route
const AssignRouter=require('./routes/events')
app.use('/events',AssignRouter)

const ExpensesRouter=require('./routes/expenses')
app.use('/expenses',ExpensesRouter)

