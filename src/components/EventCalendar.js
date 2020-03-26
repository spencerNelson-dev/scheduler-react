import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { uriBase, eventsApi } from '../const'

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

    const [events, setEvents] = React.useState(DUMMY_DATA)

    const getEvents = () => {

        return fetch(`${uriBase}${eventsApi}/all`, {
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
                return events
            })
            .catch(error => {
                console.log(error)
            })
    }

    const mapEventsToCalendar = async () => {

        let dbEvents = await getEvents()

        console.log(dbEvents);
        

        let calEvents = dbEvents.reduce((acc, value) => {

            console.log("acc",acc)
            let calEvent = {
                title: value.name,
                start: value.date,
                end: value.date
            }

            acc.push(calEvent)

            return acc
        },[])

        console.log(calEvents)
        setEvents(calEvents)

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

            />
        </div>
    );
}


export default EventCalendar;