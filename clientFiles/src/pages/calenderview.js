import Sidebar from "../components/sideBar";
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef, useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const CalenderView = () => {
    const navigate=useNavigate()
    const calendarRef = useRef(null);
    const [events,setevents]=useState([])
    const [isPending,setisPending]=useState(true)
      
        useEffect(() => {
          updateDateRange()
        }, [] );
      
    //to get the date range to ask for events in given range
        const updateDateRange = async() => {
            setevents([])
            setisPending(true)
        if (calendarRef.current) {
          const fullCalendar = calendarRef.current.getApi();
          const view = fullCalendar.view;
          const startDate = view.currentStart;
          const endDate = view.currentEnd;
          getEvents(startDate,endDate)
        }
        };

        const getEvents= async(startDate,endDate)=>{
            try {
                const response = await axios.get(`http://localhost:3500/events/all?startDate=${startDate}&endDate=${endDate}`, { withCredentials: true });
                if(response.data=='error'){
                    navigate('/')
                }
                const formattedEvents = response.data.map(event => ({
                    id: event.id,
                    title: event.summary,
                    description: event.description,
                    start: event.start.dateTime || event.start.date, 
                    end: event.end.dateTime || event.end.date, 
                    backgroundColor: event.colorId === '3' ? 'green' : 'blue'
                    
                }));
                setevents(formattedEvents);
                setisPending(false)
            } catch (error) {
                console.error('Error caught', error);
            }
        }
    
    return (<div className="overall">
        <Sidebar active={2} />
        <div className="pageoutline">
            <div className="calCont">
            <Calendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                height={"75vh"}
                datesSet={updateDateRange}
                events={events}
            />
            </div>
            
            {isPending && <p >Loading...</p>}
           
        </div>
    </div>);
}

export default CalenderView;