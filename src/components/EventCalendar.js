import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { uriBase, eventsApi } from '../const'
import EventModel from './EventModel'

import "react-big-calendar/lib/css/react-big-calendar.css";

/*
   * Event {
   *   title: string,
   *   start: Date,
   *   end: Date,
   *   allDay?: boolean
   *   resource?: any,
   * }
*/

const DUMMY_DATA = [{
    title: "Soccer Game",
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
},
{
    start: moment().toDate(),
    end: moment()
        .add(1, "days")
        .toDate(),
    title: "Some title"
},
{
    start: moment().subtract(1, "days").toDate(),
    end: moment()
        .subtract(1, "days")
        .toDate(),
    title: "Past Event"
}


]

const localizer = momentLocalizer(moment)

function EventCalendar(props) {

    const [events, setEvents] = React.useState([])
    const [event, setEvent] = React.useState({})
    const [dbEvents, setDbEvents] = React.useState([])
    const [openModel,setOpenModel] = React.useState(false)

    const getEvents = () => {

        return fetch(`${uriBase}${eventsApi}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(httpResult => {
                if (!httpResult.ok) {
                    throw new Error("Failed to get all events")
                }
                return httpResult.json()
            })
            .then(events => {
                setDbEvents(events)
                return events
            })
            .catch(error => {
                console.log(error)
            })
    }

    const mapEventsToCalendar = async () => {

        let dbEvents = await getEvents()
    
        let calEvents = dbEvents.reduce((acc, value) => {

            value.title = value.name
            value.start = value.date
            value.end = value.date

            acc.push(value)

            return acc
        },[])

        setEvents(calEvents)

    }

    const onEventSelect = (event) => {

        setEvent(event)
        setOpenModel(!openModel)
    }

    React.useEffect(() => {
        mapEventsToCalendar()
    },[])

    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "100vh" }}
                views={['month']}
                onSelectEvent={onEventSelect}

            />
            {
                openModel ? <EventModel open={openModel} setOpen={setOpenModel} event={event}></EventModel> : null
            }
        </div>
    );
}


export default EventCalendar;