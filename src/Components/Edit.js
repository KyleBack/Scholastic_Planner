import '/Users/backk/OneDrive/Documents/Documents/Visual Studio Workspaces/OIT Spring 2020/my-app/src/App.css';
import selectors from '/Users/backk/OneDrive/Documents/Documents/Visual Studio Workspaces/OIT Spring 2020/my-app/src/Selectors';
import { handleTitleChange, handleDetailsChange, handleDateChange, addNewCalendarEntry } from '../actions/homeActions';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Form, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

class Edit extends Component {

    static propTypes = {
        addNewCalendarEntry: PropTypes.func.isRequired,
        eventDetails: PropTypes.string.isRequired,
        eventTitle: PropTypes.string.isRequired,
        startDate: PropTypes.object.isRequired
    } 

    handleFormSubmit =(currentEntries)=> {
        let newCalendarEntry = {};
        if (currentEntries.length === 4){
            alert("Please remove one of the current tasks before adding a new one.")
        } else {
            newCalendarEntry.date = this.props.startDate;
            newCalendarEntry.title = this.props.eventTitle;
            newCalendarEntry.details = this.props.eventDetails;
            this.props.addNewCalendarEntry(newCalendarEntry);
        } 
    }

    handleDateChange = (date) => {
        this.props.handleDateChange(date);
    }

    handleTitleChange = (event) => {
        this.props.handleTitleChange(event);
    }

    handleDetailsChange =(event)=> {
        this.props.handleDetailsChange(event);
    }

    handleRemove =(item)=> {
        delete this.props.myCalendar[item.date];
        this.forceUpdate();
    }

    enterNewEntry =(date)=> {
        const { myCalendar } = this.props;
        let currentEntries = [];
        for (const [key, value] of Object.entries(myCalendar)) {
            let currentDate = value.date;
            if (currentDate.getFullYear() === date.getFullYear() &&
            currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate()) {
                currentEntries.push(value);
            }
        }
        return currentEntries;
    }

    formatTime =(date)=> {
        let hours = date.getHours();
        let mins;
        if (date.getMinutes() === 0){
            mins = date.getMinutes().toString() + "0";
        } else {
            mins = date.getMinutes().toString();
        }
            
        if (hours > 12) {
            return hours-12 + ":" + mins + " pm";
        } else {
            return hours + ":" + mins + " am";
        }
    }

    render() {
        const { eventTitle, eventDetails, startDate } = this.props;
        const currentEntries = this.enterNewEntry(startDate);

        const listEntries = currentEntries.map(entry => (            
            <Card bg={"light"} key={entry.id}>               
                <Card.Body>
                    <Card.Title>
                        ({this.formatTime(entry.date)}) - {entry.title}
                    </Card.Title>

                    <Card.Text>
                        {entry.details}
                    </Card.Text>

                    <Button variant="secondary" size="sm"
                    onClick={() => this.handleRemove(entry)}>
                        Remove
                    </Button>
                </Card.Body>         
            </Card>          
        ));
        
        return(
            <div className="Edit_css">
                <br/>
                <Form className="entryForm">
                    <DatePicker
                    selected={startDate}
                    onChange={this.handleDateChange}
                    minDate={new Date()}
                    showTimeSelect
                    />
                    
                    <Form.Group>
                        <Form.Control
                            onChange={(e) => {this.handleTitleChange(e)}} 
                            placeholder="Enter Title"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            onChange={(e) => {this.handleDetailsChange(e)}} 
                            placeholder="Enter Details" 
                        />
                    </Form.Group>
                    
                    {eventTitle !== "" && eventDetails !== "" && 
                    (startDate.getMinutes() === 0 || startDate.getMinutes() === 30)
                    ? <Button 
                    variant="secondary" 
                    onClick={() => this.handleFormSubmit(currentEntries)}>
                        Submit
                    </Button>

                    : <br/>
                    }
                    <br/>
                </Form>

                { listEntries }

                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addNewCalendarEntry: state => dispatch(addNewCalendarEntry(state)),
    handleDetailsChange: state => dispatch(handleDetailsChange(state)),
    handleTitleChange: state => dispatch(handleTitleChange(state)),
    handleDateChange: state => dispatch(handleDateChange(state))
})

const mapStateToProps = state => ({
    myCalendar: selectors.getMyCalendar(state),
    eventDetails: selectors.getEventDetails(state),
    eventTitle: selectors.getEventTitle(state),
    startDate: selectors.getStartDate(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);