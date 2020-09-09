import { 
    ADD_NEW_CALENDAR_ENTRY, 
    SWITCH_TO_TIMER, 
    SWITCH_TO_EDIT, 
    HANDLE_TITLE_CHANGE, 
    HANDLE_DETAILS_CHANGE, 
    HANDLE_DATE_CHANGE
} from './types';

export const switchToTimer = () => dispatch => {
    dispatch({
        type: SWITCH_TO_TIMER,
        payload: ""
    })
}

export const switchToEdit = () => dispatch => {
    dispatch({
        type: SWITCH_TO_EDIT,
        payload: ""
    })
}

export const handleTitleChange = (event) => dispatch => {
    dispatch({
        type: HANDLE_TITLE_CHANGE,
        payload: event
    })
}

export const handleDetailsChange = (event) => dispatch => {
    dispatch({
        type: HANDLE_DETAILS_CHANGE,
        payload: event
    })
}

export const handleDateChange = (event) => dispatch => {
    dispatch({
        type: HANDLE_DATE_CHANGE,
        payload: event
    })
}

export const addNewCalendarEntry = (entry) => dispatch => {
    dispatch({
        type: ADD_NEW_CALENDAR_ENTRY,
        payload: entry
    })
}
