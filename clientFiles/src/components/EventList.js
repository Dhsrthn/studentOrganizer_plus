const EventList = ({ EventsList }) => {

    const formatDateTime = (dateTimeString) => {
        if(dateTimeString==undefined){
            return null
        }
        const date = new Date(dateTimeString);
        return date.toLocaleString();
      };

    return (
        <div className="events-list">
            {
                EventsList.map(event => (
                    <div className="eventPreview" key={event.id} style={{backgroundColor:'rgba(0,128,128,0.5)'}}>
                        
                            <h3>Event Name : {event.summary}</h3>
                        
                                <h4>Description: {event.description || 'no description'}</h4>
                                <h5>Starts at: {formatDateTime(event.start.dateTime) || event.start.date}</h5>
                                <h5>Ends at: {formatDateTime(event.end.dateTime) || event.end.date}</h5>
                                <h5>Location: {event.location || 'no location found'}</h5>
                     
                    </div>
                ))
            }
        </div>
    )
}

export default EventList