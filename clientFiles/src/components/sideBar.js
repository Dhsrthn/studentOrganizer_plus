import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const url = 'http://localhost:3500/users/current'

const Sidebar = (active) => {
    const navigate = useNavigate()
    const [userName, setuserName] = useState('null')

    //to get current userData
    useEffect(() => {
        axios.get(url, { withCredentials: true }).then((data) => {
            setuserName(data.data.username)
        })
    }, [])

    //home function
    const handleHome=()=>{
        navigate('/home')
    }

    //calendar function
    const handleCalendar=()=>{
        navigate('/calendar')
    }

    //expenses function
    const handleExpenses=()=>{
        navigate('/expenses')
    }

    //logOut function
    const handleLogout = () => {
        axios.get('http://localhost:3500/auth/logout', { withCredentials: true }).then((res) => {
            navigate('/')
        })
    }

    return (<div className="sidebar">
        <div className="profileContainer">
            <div className="logo">
                <div className="logocontainer">
                <img src={'/logo.png'} alt="" />
                </div>
                <h4>STUDENT<br />ORGANIZER <br /> plus</h4>
            </div>
            <button id='profbtn'> Username: {userName}</button>
        </div>
        <div className="OtherSide">
            <button onClick={handleHome} style={{backgroundColor: active.active==1?'#e2e2e2':'#3934cb', color: active.active==1?'black':'white'}} ><span className="symbol">⌂</span> Home</button>
            <button onClick={handleCalendar} style={{backgroundColor: active.active==2?'#e2e2e2':'#3934cb', color: active.active==2?'black':'white'}} >Calender</button>
            <button  onClick={handleExpenses} style={{backgroundColor: active.active==3?'#e2e2e2':'#3934cb', color: active.active==3?'black':'white'}} >Expenses</button>
            <button onClick={handleLogout} id='logout'>Logout</button>
        </div>
        
    </div>);
}

export default Sidebar; 