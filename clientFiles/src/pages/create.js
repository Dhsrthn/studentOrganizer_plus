import Sidebar from "../components/sideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Create = () => {
    const navigate = useNavigate()

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    const defaultDateTime = currentDate.toISOString().slice(0, 16);

    const { value } = useParams()
    const [assign, setassign] = useState(false)
    const [notFound, setnoutFound] = useState(false)

    const [eventName, seteventName] = useState('Event')
    const [eventDesc, seteventDesc] = useState('description')
    const [StartDate, setStartDate] = useState(defaultDateTime)
    const [endDate, setendDate] = useState(defaultDateTime)
    const [eventLocation, seteventLocation] = useState('unspecified')

    const [assignmentName, setassignmentName] = useState('assignment')
    const [courseName, setcourseName] = useState('course name')
    const [deadline, setdeadline] = useState(defaultDateTime)
    const [sem, setsem] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3500/users/current', { withCredentials: true }).then((res) => {
            if (res.data == 'error') {
                navigate('/')
            }
        })
        if (value === 'assignment') {
            setassign(true)
            setnoutFound(false)
        } else if (value === 'event') {
            setassign(false)
            setnoutFound(false)
        } else {
            setnoutFound(true)
        }
    }, [])


    const handleSubmitEvent = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3500/events/createEvent', { eventName, eventDesc, StartDate, endDate, eventLocation }, { withCredentials: true }).then(() => {
            navigate('/home')
        }).catch((err) => { console.log(err) })

    }


    const handleSubmitAssign = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3500/events/createAssignment', { assignmentName, courseName, deadline, sem }, { withCredentials: true }).then(() => {
            navigate('/home')
        }).catch((err) => console.log(err, 'error happened'))
        navigate('/home')

    }

    return (
        <div className="overall">
            <Sidebar />
            <div className="pageoutline">
                {
                    !assign && !notFound &&
                    <div className="createEvent">
                        <form onSubmit={handleSubmitEvent}>
                            <div className="compare">
                                <label> Event Name</label>
                                <input type="text" value={eventName} onChange={(event) => {
                                    seteventName(event.target.value)
                                }} />
                            </div>
                            <div className="compare">
                                <label> Event Description</label>
                                <input type="text" value={eventDesc} onChange={(event) => {
                                    seteventDesc(event.target.value)
                                }} />
                            </div>
                            <div className="compare">
                                <label >Start Time</label>
                                <input type="datetime-local" value={StartDate} onChange={(event) => {
                                    setStartDate(event.target.value)
                                }} />
                            </div>
                            <div className="compare">
                                <label >End Time</label>
                                <input type="datetime-local" value={endDate} onChange={(event) => {
                                    setendDate(event.target.value)
                                }} />
                            </div>
                            <div className="compare">
                                <label> Event Location</label>
                                <input type="text" value={eventLocation} onChange={(event) => {
                                    seteventLocation(event.target.value)
                                }} />
                            </div>
                            <button onClick={handleSubmitEvent}>Submit</button>
                        </form>
                    </div>
                }
                {
                    assign && !notFound &&
                    <div className="createAssign">
                        <form onSubmit={handleSubmitAssign}>
                            <div className="compare">
                                <label> Assignment Name :</label>
                                <input type="text" value={assignmentName} onChange={(event) => {
                                    setassignmentName(event.target.value)
                                }} />
                            </div>
                            <div className="compare">
                                <label> Course :</label>
                                <input type="text" value={courseName} onChange={(event) => {
                                    setcourseName(event.target.value)
                                }} />
                            </div>
                            <div className="compare">
                                <label>Semester :</label>
                                <input type="number" step={1} value={sem} onChange={(event) => {
                                    setsem(event.target.value)
                                }} />

                            </div>
                            <div className="compare">
                                <label >Deadline</label>
                                <input type="datetime-local" value={deadline} onChange={(event) => {
                                    setdeadline(event.target.value)
                                }} />
                            </div>
                            <button onClick={handleSubmitAssign}>Submit</button>
                        </form>
                    </div>
                }
                {
                    notFound &&
                    <div className="fourohfour">
                        <h1>404</h1>
                        <h3>Not Found {":'("} </h3>
                    </div>
                }
            </div>
        </div>
    );
}

export default Create;