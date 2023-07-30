import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {
    //for redirecting
    const navigate = useNavigate()

    const [showLogin, setshowLogin] = useState(true)

    //regestering and log-in usernames and pwd states
    const [regUserName, setRegUserName] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [logUserName, setlogUserName] = useState('')
    const [logPassword, setlogPassword] = useState('')

    //other states
    const [createdUser, setcreatedUser] = useState(false)
    const [userFound, setuserFound] = useState(true)
    const [wrongPwd, setwrongPwd] = useState(false)
    const [alreadyUser, setalreadyuser] = useState(false)
    const [isPending, setisPending] = useState(false)
    const [validUser, setvalidUser] = useState(true)

    //states to display signup and login dialogue or oauth
    const [showAuth, setshowAuth] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3500/users/current', { withCredentials: true }).then((res) => {
            if (res.data != 'error') {
                console.log('also here')
                navigate('/home')
            }
        })
    }, [])


    const handleSignUp = (e) => {
        setvalidUser(true)
        setRegPassword('')
        setRegUserName('')
        setalreadyuser(false)
        e.preventDefault()
        axios.post('http://localhost:3500/auth/register', { username: regUserName, password: regPassword }, { withCredentials: true }).then((res) => {
            if (res.data === 'User already exist') {
                setalreadyuser(true)
            } else if (res.data === 'user created successfully') {
                setcreatedUser(true)
                setalreadyuser(false)
            } else if (res.data == 'please enter valid username and password') {
                setvalidUser(false)
                setalreadyuser(false)
            }
        })

    }

    const handleLogin = (e) => {
        setlogPassword('')
        setlogUserName('')
        setvalidUser(true)
        setcreatedUser(false)
        setisPending(true)
        setuserFound(true)
        setwrongPwd(false)
        e.preventDefault()
        axios.post('http://localhost:3500/auth/login', { username: logUserName, password: logPassword }, { withCredentials: true }).then((res) => {
            console.log(res.data)
            if (res.data == 'No user found') {
                setuserFound(false)
                setisPending(false)
                setvalidUser(true)
            }
            else if (res.data == 'Wrong Password') {
                setwrongPwd(true)
                setisPending(false)
                setvalidUser(true)
            }
            else if (res.data == 'please enter valid username and password') {
                setwrongPwd(false)
                setisPending(false)
                setvalidUser(false)
            }
            else {
                setuserFound(true)
                setwrongPwd(false)
                if (res.data == 'User Logged in and valid') {
                    console.log('boo here')
                    navigate('/home')
                    setisPending(false)
                } else {
                    console.log('here')
                    setisPending(false)
                    setshowAuth(false)
                }

            }
        })
    }

    const changeShow = () => {
        setshowLogin((prev) => !prev)
        setvalidUser(true)
        setcreatedUser(false)
        setisPending(false)
        setuserFound(true)
        setwrongPwd(false)
        setalreadyuser(false)
    }

    const HandleOauth = (e) => {
        window.location.href = 'http://localhost:3500/oauth2/'
    }

    return (

        <div className="welcomepage">

            <div className="logofront">
                <img src={'/logo-front.png'} alt="" />
                <p>STUDENT ORGANIZER plus</p>
            </div>
            {
                showAuth && (
                    <>
                        {showLogin ? (
                            <div className="log">
                                <div className="compare">
                                    <button onClick={changeShow}>{'<'}</button>
                                    <h2>Login</h2>
                                    <button onClick={changeShow}>{'>'}</button>
                                </div>
                                <form className="loginform" onSubmit={handleLogin}>
                                    <label>Username: </label>
                                    <input type="text" value={logUserName} onChange={(event) => {
                                        setlogUserName(event.target.value)
                                    }} />
                                    <br />
                                    <label>Password: </label>
                                    <input type="password" value={logPassword} onChange={(event) => {
                                        setlogPassword(event.target.value)
                                    }} />
                                    <br />
                                    <button >Submit</button>
                                </form>
                                {
                                    isPending && <div className="loading">Verifying...</div>
                                }
                                {
                                    wrongPwd && <h3> Entered password is incorrect</h3>
                                }
                                {
                                    !userFound && <h3> User not found</h3>
                                }
                                {
                                    !validUser && <h3>Enter valid username and passowrd</h3>
                                }

                            </div>
                        ) : (
                            <div className="log">
                                <div className="compare">
                                    <button onClick={changeShow}>{'<'}</button>
                                    <h2>Register</h2>
                                    <button onClick={changeShow}>{'>'}</button>
                                </div>
                                <form action="" className="signupform" onSubmit={handleSignUp}>
                                    <label>Username: </label>
                                    <input type="text" value={regUserName} onChange={(event) => {
                                        setRegUserName(event.target.value)
                                    }} />
                                    <br />
                                    <label>Password: </label>
                                    <input type="password" value={regPassword} onChange={(event) => {
                                        setRegPassword(event.target.value)
                                    }} />
                                    <br />
                                    <button>Submit</button>
                                    {
                                        alreadyUser && <h3>Username not available</h3>
                                    }
                                    {
                                        createdUser && <h3>User created, Login with same credentials</h3>
                                    }
                                    {
                                        !validUser && <h3>Enter valid username and passowrd</h3>
                                    }
                                </form></div>
                        )}
                    </>
                )
            }

            {
                !showAuth &&
                <div className="Oauth">
                    <h1>Give access to your Google Calender to proceed</h1>
                    <button id='oauthButton' onClick={HandleOauth}>Proceed</button>
                </div>
            }
        </div>);
}

export default WelcomePage;