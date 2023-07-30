import Sidebar from "../components/sideBar";
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import AssignmentList from "../components/AssignList";

const HomePage = () => {

    const [showAssign, setshowAssign] = useState(false)

    //assignment states
    const [assignList, setassignList] = useState([])
    const [assignOverList, setassignOverList] = useState([])
    const [aisPending, setaisPending] = useState(true)

    //event states
    const [eventList, seteventList] = useState([])
    const [eisPending, seteisPending] = useState(true)
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    const finishDate = new Date()
    finishDate.setDate(finishDate.getDate() + 10);
    finishDate.setHours(finishDate.getHours() + 5);
    finishDate.setMinutes(finishDate.getMinutes() + 30);

    const navigate = useNavigate()

    useEffect(() => {
        seteisPending(true)
        getEvents(currentDate, finishDate)
        getassignments()

    }, [])

    const getassignments = async () => {
        setaisPending(true)
        await axios.get('http://localhost:3500/events/getassignments', { withCredentials: true }).then((res) => {
            if (res.data.length === 0) {
                setaisPending(false)
            } else if (res.data == 'error') {
                navigate('/')
            }
            else {
                setaisPending(false)
                setassignList(res.data[0])
                setassignOverList(res.data[1])
            }
        }).catch((err) => console.log(err))
    }

    const getEvents = async (startDate, endDate) => {
        try {
            const response = await axios.get(`http://localhost:3500/events/all?startDate=${startDate}&endDate=${endDate}`, { withCredentials: true }).then((res) => {
                console.log(res.data)
                if (res.data == 'invalid request parameters') {
                    axios.get('http://localhost:3500/auth/logout', { withCredentials: true }).then((res) => {
                        navigate('/')
                    })
                } else if (res.data == 'error') {
                    navigate('/')
                } else {
                    const filteredEventList = res.data.filter(event => event.colorId !== '3');
                    if (filteredEventList.length === 0) {
                        seteisPending(false)
                    }
                    else {
                        seteventList(filteredEventList);
                        seteisPending(false)
                    }
                }
            })

        } catch (err) {
            console.log(err)
        }



    }

    const handleAssign = () => {
        navigate('/create/assignment')
    }

    const handleEvent = () => {
        navigate('/create/event')
    }

    const handleMarkComplete = async (assignID) => {
        await axios.post('http://localhost:3500/events/mark/complete', { assignID }, { withCredentials: true }).then((res) => {
            getassignments()
        })
    }

    const handleMarkIncomplete = async (assignID) => {
        await axios.post('http://localhost:3500/events/mark/incomplete', { assignID }, { withCredentials: true }).then((res) => {
            getassignments()
        })
    }

    return (<div className="overall">
        <Sidebar active={1} />
        <div className="pageoutline">
            <div className="homePage">
                <div className="changeDisp">
                    <button onClick={() => setshowAssign(true)}>Assignments</button>
                    <button onClick={() => setshowAssign(false)}>Events</button>
                </div>
                {showAssign && <div className="assignments">
                    <div className="actualDispassign">
                        {
                            aisPending &&
                            <div className="loading">
                                <div className="bar bar-1"></div>
                                <div className="bar bar-2"></div>
                                <div className="bar bar-3"></div>
                                <div className="bar bar-4"></div>
                                <div className="bar bar-5"></div>
                                <div className="bar bar-6"></div>
                            </div>
                        }
                        {
                            !aisPending &&
                            <div className="displaying">

                                {
                                    assignOverList.length != 0 && <div className="over">
                                        <h3>Previous Assignments</h3>
                                        <AssignmentList assignlist={assignOverList} handleMarkComplete={handleMarkComplete} handleMarkIncomplete={handleMarkIncomplete} />
                                    </div>
                                }
                                {
                                    assignOverList.length == 0 && <div className="over">
                                        <h3>No previous assignment records</h3>
                                    </div>
                                }
                                {
                                    assignList.length != 0 && <div className="upcome">
                                        <h3>Upcoming Assignments</h3>
                                        <AssignmentList assignlist={assignList} handleMarkComplete={handleMarkComplete} handleMarkIncomplete={handleMarkIncomplete} />
                                    </div>
                                }
                                {
                                    assignList.length == 0 && <div className="upcome">
                                        <h3>No Active Assignment Deadline</h3>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                    <button onClick={handleAssign}>Create Assignment</button>

                </div>}
                {!showAssign && <div className="events">
                    <h1>Upcoming Events</h1>

                    <div className="actualDisp">
                        {
                            eisPending &&
                            <div className="loading">
                                <div className="bar bar-1"></div>
                                <div className="bar bar-2"></div>
                                <div className="bar bar-3"></div>
                                <div className="bar bar-4"></div>
                                <div className="bar bar-5"></div>
                                <div className="bar bar-6"></div>
                            </div>
                        }
                        {
                            !eisPending &&
                            <>
                                {
                                    eventList.length !== 0 && <>
                                        <EventList EventsList={eventList} />
                                    </>
                                }
                                {
                                    eventList.length === 0 &&
                                    <h3>No Upcoming event for the next 3 days</h3>
                                }
                            </>
                        }
                    </div>
                    <button onClick={handleEvent}>Create Event</button>
                </div>}


            </div>
        </div>
    </div>);
}

export default HomePage;