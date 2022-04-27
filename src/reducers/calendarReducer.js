import moment from 'moment';
import { types } from '../types/types';


const initialState = {
  events:[{
    title:'cumpleaños de Bryan',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#0073b7',
    user: {
      uid: '123',
      name: 'Spike'
    }
  }],
  activeEvent: null,
}


export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.eventSetActive:
      return{
        ...state,
        activeEvent: action.payload
      }
    
    case types.eventAddNew:
      return{
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }

    default:
      return state;
  }
}