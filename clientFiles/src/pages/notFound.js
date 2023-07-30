import Sidebar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from "react";


const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3500/users/current', { withCredentials: true }).then((res) => {
            if (res.data == 'error') {
                navigate('/')
            }
        })
    })

    return (<div className="overall">
        <Sidebar />
        <div className="pageoutline">
            <div className="fourohfour">
                <h1>404</h1>
                <h3>Page Not Found {":'("} </h3>
            </div>
        </div>
    </div>);
}

export default NotFound;