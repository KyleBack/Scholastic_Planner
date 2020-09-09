import React from 'react';
import '/Users/backk/OneDrive/Documents/Documents/Visual Studio Workspaces/OIT Spring 2020/my-app/src/App.css';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import selectors from '/Users/backk/OneDrive/Documents/Documents/Visual Studio Workspaces/OIT Spring 2020/my-app/src/Selectors';
import Edit from './Edit';
import Timer from './Timer';
import { switchToEdit, switchToTimer } from '../actions/homeActions';

class Home extends Component { 

    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
        isTimer: PropTypes.bool.isRequired,
        switchToTimer: PropTypes.func.isRequired,
        switchToEdit: PropTypes.func.isRequired
    } 

    switchToEdit = () => {
        this.props.switchToEdit();
    }

    switchToTimer = () => {
        this.props.switchToTimer();
    }
    
    formatDate =(date)=> {
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return date.getDate() + " | " + dayOfWeek[date.getDay()];
    }

    getEntries =(date)=> {
        const { myCalendar } = this.props;
        let entries = [];
        for (const [key, value] of Object.entries(myCalendar)) {
            let currentDate = value.date;
            if (currentDate.getFullYear() === date.getFullYear() &&
            currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate()) {
                entries.push(value);
            }
        }
        return entries;
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

    listDayEntries =(day, entries)=> {
        const dayEntries = entries.map(entry => (    
            <Card.Title>
                ({this.formatTime(entry.date)}) - {entry.title}
            </Card.Title>      
        ));

        return <Card style={{ width: '20%' }}>   
            <Card.Body>     
                <Card.Title className="cardHead">{this.formatDate(day)}</Card.Title>     
                { dayEntries }   
            </Card.Body> 
        </Card>
    }

    render() {

        const day1 = new Date();
        const day2 = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        const day3 = new Date(new Date().getTime() + 2*24 * 60 * 60 * 1000);
        const day4 = new Date(new Date().getTime() + 3*24 * 60 * 60 * 1000);
        const day5 = new Date(new Date().getTime() + 4*24 * 60 * 60 * 1000);

        const { myCalendar, update } = this.props;

        const entries1 = this.listDayEntries(day1, this.getEntries(day1));
        const entries2 = this.listDayEntries(day2, this.getEntries(day2));
        const entries3 = this.listDayEntries(day3, this.getEntries(day3));
        const entries4 = this.listDayEntries(day4, this.getEntries(day4));
        const entries5 = this.listDayEntries(day5, this.getEntries(day5));
        
        return(

            <div>
                <div className = "Home_Top">
                    <button 
                        className="Home_Buttons"
                        onClick={this.switchToEdit}
                    >
                        EDIT
                    </button>
                    <div className = "divider"/>
                    <button 
                        className="Home_Buttons"
                        onClick={this.switchToTimer}
                    >
                        TIMER
                    </button>
                </div>
                <br/>
                <div>
                    {(this.props.isEdit && (
                        <Edit 
                        addNewCalendarEntry={this.props.addNewCalendarEntry}
                        myCalendar={this.props.myCalendar}
                        toggleUpdate={this.props.toggleUpdate}
                        />
                    ))}
                    {(this.props.isTimer && (
                        <Timer />
                    ))}
                </div>

                {(!this.props.isEdit && (
                    <div className = "Home_Bottom">
                        { entries1 }
                        { entries2 }
                        { entries3 }
                        { entries4 }
                        { entries5 }
                </div>
                ))}

                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    switchToTimer: state => dispatch(switchToTimer(state)),
    switchToEdit: state => dispatch(switchToEdit(state))
})

const mapStateToProps = state => ({
    myCalendar: selectors.getMyCalendar(state),
    isEdit: selectors.getIsEdit(state),
    isTimer: selectors.getIsTimer(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

