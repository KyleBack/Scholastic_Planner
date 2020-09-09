import { combineReducers } from "redux";
import calendarReducer from './calendarReducer.js';

export default combineReducers({
    calendar: calendarReducer
});