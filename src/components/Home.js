import React, { useState } from 'react';
import EventListView from './EventListView'
import EventCalendar from './EventCalendar'

function Home(props) {
    const [view, setView] = useState('list')

    const onClickHanlder = () => {

        if(view === 'list'){
            setView('calendar')
        } else {
            setView('list')
        }
    }

    return (
        <div>
            <button onClick={onClickHanlder}>CHANGE VIEW</button>
            <div>
                {
                    view === 'list' ? (
                        <EventListView></EventListView>
                    ) : (
                            <EventCalendar></EventCalendar>
                        )
                }
            </div>
        </div>
    );
}

export default Home;