import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import { messages } from '../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../actions/ui';
import { eventSetActive } from '../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

// messages
const localizer = momentLocalizer(moment);

// console.log(ui);
// const events = [ {
//   title:'cumpleaños de Bryan',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#0073b7',
//   user: {
//     uid: '123',
//     name: 'Spike'
//   }
// }]

export const CalendarScreen = () => {
  
  const dispatch = useDispatch();

  const { events } = useSelector( state => state.calendar );


  const [ lastView, setLastView ] = useState(localStorage.getItem('calendar:view') || 'month');
  

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
    
  }
  
  const onViweChange = (e) => {
    setLastView(e);
    localStorage.setItem('calendar:view', e);
  }

  const eventeStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#900C3F',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      dispaly: 'block'
    }

    return {
      style
    }
  }

  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventeStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView = { onViweChange }
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <CalendarModal />
      <AddNewFab />
    </div>
  )
};
