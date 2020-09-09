//Home.js
const getIsEdit = state => state.calendar.isEdit;
const getIsBooks = state => state.calendar.isBooks;
const getIsTimer = state => state.calendar.isTimer;
const getMyCalendar = state => state.calendar.myCalendar;

//Edit.js
const getStartDate = state => state.calendar.startDate;
const getEventTitle = state => state.calendar.eventTitle;
const getEventDetails = state => state.calendar.eventDetails;

const selectors = {
    getIsEdit, 
    getIsTimer, 
    getIsBooks, 
    getEventTitle, 
    getEventDetails, 
    getStartDate,
    getMyCalendar
};

export default selectors;