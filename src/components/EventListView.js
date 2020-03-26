import React from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import { uriBase, eventsApi } from '../const'

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

function EventListView(props) {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const [events, setEvents] = React.useState([])

    // the state for the table
    const [state] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' },
            { title: 'Date', field: 'date', type: 'date' },
            {
                title: 'Type',
                field: 'type',
                lookup: {
                    Appointment: "Appointment",
                    Meeting: "Meeting",
                    Reminder: "Reminder",
                    Game: "Game",
                    Movie: "Movie",
                    Concert: "Concert",
                    Meetup: "Meetup",
                    Other: "Other"
                }
            },
            { title: 'ID', field: '_id', hidden: true }
        ],
        data: []
    });

    const getEvents = () => {

        fetch(`${eventsApi}/all`, {
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
                console.log(events)
                setEvents(events)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const addEventToDb = (newEvent) => {

        fetch(`${eventsApi}/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        })
            .then(httpResult => {
                if (!httpResult.ok) {
                    throw new Error("Could not create user")
                }

                return httpResult.json()
            })
            .catch(error => {
                console.log(error)
            })

    }

    const dbUpdateEvent = (updatedEvent) => {

        fetch(`${eventsApi}/update/${updatedEvent.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent)
        })
            .then(httpResult => {
                if (!httpResult.ok) {
                    throw new Error("Could not update user")
                }

                return httpResult.json()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const dbDeleteEvent = (deleteEvent) => {

        fetch(`${eventsApi}/delete/${deleteEvent.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(httpResult => {
                if (!httpResult.ok) {
                    throw new Error("Could not delete user")
                }

                return httpResult.json()
            })
            .catch(error => {
                console.log(error)
            })
    }


    React.useEffect(() => {
        getEvents()
    }, [])

    return (
        <MaterialTable
            icons={tableIcons}
            title="Events"
            columns={state.columns}
            data={events}
            editable={{
                onRowAdd: newData => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setEvents(prevState => {
                                const data = [...prevState]
                                data.push(newData)
                                addEventToDb(newData)
                                return data
                            })
                        }, 600);
                    })
                },
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setEvents(prevState => {
                                    const data = [...prevState];
                                    data[data.indexOf(oldData)] = newData;
                                    dbUpdateEvent(newData)
                                    return data;
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setEvents(prevState => {
                                const data = [...prevState];
                                let deleteEvent = data[data.indexOf(oldData)]
                                data.splice(data.indexOf(oldData), 1);
                                dbDeleteEvent(deleteEvent)
                                return data;
                            });
                        }, 600);
                    }),
            }}
        />
    );
}

export default EventListView;