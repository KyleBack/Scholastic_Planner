import { 
    SWITCH_TO_TIMER, 
    SWITCH_TO_EDIT, 
    HANDLE_TITLE_CHANGE, 
    HANDLE_DETAILS_CHANGE, 
    HANDLE_DATE_CHANGE, 
    ADD_NEW_CALENDAR_ENTRY 
} from '../actions/types';

const initialState = {
    startDate: new Date(),
    eventDetails: "",
    eventTitle: "",
    myCalendar: {},
    isTimer: false,
    isEdit: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SWITCH_TO_TIMER:
            return {
                ...state,
                isTimer: true,
                isEdit: false
            };
        case SWITCH_TO_EDIT:
            return {
                ...state,
                isTimer: false,
                isEdit: true
            };
        case HANDLE_TITLE_CHANGE:
            return {
                ...state,
                eventTitle: action.payload.target.value
            };
        case HANDLE_DETAILS_CHANGE:
            return {
                ...state,
                eventDetails: action.payload.target.value
            };
        case HANDLE_DATE_CHANGE:
            return {
                ...state,
                startDate: action.payload
            };
        case ADD_NEW_CALENDAR_ENTRY:
            return {
                ...state,
                myCalendar: {
                    ...state.myCalendar,
                    [action.payload.date]: action.payload
                }
            };
        default:
            return state;
    }
}