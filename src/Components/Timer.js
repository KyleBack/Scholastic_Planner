import React, { Component } from 'react';
import '/Users/backk/OneDrive/Documents/Documents/Visual Studio Workspaces/OIT Spring 2020/my-app/src/App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Dropdown, DropdownButton, Button, ToggleButton, ButtonGroup } from "react-bootstrap";

var breakTime=0;
var divisionMinutes=0;
var divisionSeconds=0;

class Timer extends Component {
    
    state = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        break_minutes:0,
        break_seconds:0,
        division_minutes:0,
        division_seconds:0,
        breaks: 0,
        started: false,
        studyTime_set: false,
        breaks_set: false,
        breakTime_set:false
    }

    divisionDidMount() {
        this.setState({
            division_seconds: divisionSeconds,
            division_minutes: divisionMinutes
        })
        this.myDivisionInterval = setInterval(this.tickDivision, 1000);
    }
      
    divisionWillUnmount() {
        clearInterval(this.myStudyInterval);
        clearInterval(this.myDivisionInterval)
        this.breakDidMount()
    }

    tickDivision = () => {
        const { division_minutes, division_seconds } = this.state;
        if (division_seconds > 0){
            this.setState({
                division_seconds: division_seconds - 1
            })
        }
        
        if (division_seconds === 0){
            if (division_minutes === 0){
                this.divisionWillUnmount();
            } else {
                this.setState({
                    division_minutes: division_minutes - 1,
                    division_seconds: 59
                })
            }
        }
    }

    breakDidMount() {
        this.setState({
            break_minutes: breakTime
        })
        this.myBreakInterval = setInterval(this.tickBreak, 1000);
    }
      
    breakWillUnmount() {
        this.studyDidMount()
        clearInterval(this.myBreakInterval);
        this.divisionDidMount()
    }

    tickBreak = () => {
        const { break_minutes, break_seconds } = this.state;
        if (break_seconds > 0){
            this.setState({
                break_seconds: break_seconds - 1
            })
        }
        
        if (break_seconds === 0){
            if (break_minutes === 0){
                this.breakWillUnmount();
            } else {
                this.setState({
                    break_minutes: break_minutes - 1,
                    break_seconds: 59
                })
            }
        }
    }

    studyDidMount() {
        this.myStudyInterval = setInterval(this.tickStudy, 1000);
    }
      
    studyWillUnmount() {
        clearInterval(this.myStudyInterval);
    }

    tickStudy = () => {
        const { hours, minutes, seconds } = this.state;
        if (seconds > 0){
            this.setState({
                seconds: seconds - 1
            })
        }
        
        if (seconds === 0){
            if (minutes === 0){
                if (hours === 0){
                    this.studyWillUnmount();
                } else {
                    this.setState({
                        hours: hours - 1,
                        minutes: 59,
                        seconds: 59
                    })
                }
            } else {
                this.setState({
                    minutes: minutes - 1,
                    seconds: 59
                })
            }
        }
    }

    optionsSet() {

        this.setState({
            started: true
        })

        const { hours, minutes, breaks } = this.state
        var studyTimeDivisions=(hours*60+minutes)/(breaks+1);
        divisionMinutes = Math.floor(studyTimeDivisions)
        divisionSeconds = (60*(studyTimeDivisions-Math.floor(studyTimeDivisions)))

        this.setState({
            division_minutes: Math.floor(studyTimeDivisions),
            division_seconds: (60*(studyTimeDivisions-Math.floor(studyTimeDivisions)))
        })

        this.studyDidMount()
        this.divisionDidMount()
    }

    resetTimer() {
        clearInterval(this.myStudyInterval);
        clearInterval(this.myBreakInterval);
        clearInterval(this.myDivisionInterval);
        this.setState({
            studyTime_set: false,
            breakTime_set:false,
            division_minutes: 0,
            division_seconds: 0,
            breaks_set: false,
            break_minutes:0,
            break_seconds:0,
            started: false,
            minutes: 0,
            seconds: 0,
            breaks: 0,
            hours: 0
        })
    }

    studyTimeClick(hrs, mins) {
        this.setState({
            hours: hrs,
            minutes: mins,
            studyTime_set: true
        })
    }

    breaksClick(num) {
        this.setState({
            breaks: num,
            breaks_set: true
        })
    }

    breakTimeClick(mins) {
        breakTime = mins;
        this.setState({
            break_minutes: mins,
            breakTime_set: true
        })
    }

    render() {
        const { hours, minutes, seconds, started, studyTime_set, breaks_set, breakTime_set, break_minutes, break_seconds, breaks } = this.state
        return(
            <div className="Timer_css">
                <h1>Work Timer</h1>
                <h2 style={{color: "red"}}> {hours}:{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</h2>
                <h2 style={{color: "blue"}}> {break_minutes}:{break_seconds<10?`0${break_seconds}`:break_seconds}</h2>
                <br />

                {!started
                ?   <DropdownButton 
                    id="dropdown-study-time" 
                    title="Study Time">
                        <Dropdown.Item onClick={() => this.studyTimeClick(0,1)}>
                            1 minute
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.studyTimeClick(1,0)}>
                            60 minutes
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.studyTimeClick(1,30)}>
                            90 minutes
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.studyTimeClick(2,0)}>
                            120 minutes
                        </Dropdown.Item>
                    </DropdownButton>

                :   <br/>
                }

                <br/>

                {!started && studyTime_set 
                ?   <DropdownButton 
                    id="dropdown-break" 
                    title="Breaks">
                        <Dropdown.Item onClick={() => this.breaksClick(0)}>
                            0
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.breaksClick(1)}>
                            1
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.breaksClick(2)}> 
                            2
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.breaksClick(3)}>
                            3
                        </Dropdown.Item>
                    </DropdownButton>

                :   <br/>
                }

                <br/>

                {!started && breaks_set && breaks>0
                ?   <DropdownButton 
                    id="dropdown-break-time" 
                    title="Break Time">
                        <Dropdown.Item onClick={() => this.breakTimeClick(1)}>
                            1 minute
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.breakTimeClick(10)}>
                            10 minutes
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => this.breakTimeClick(15)}>
                            15 minutes
                        </Dropdown.Item>
                    </DropdownButton>
                
                :   <br/>
                }

                <br/>

                {!started && breakTime_set || (!started && breaks_set && breaks==0)
                ? <Button onClick={() => this.optionsSet()}>Start Timer</Button>

                : <br/>
                }


                <Button onClick={() => this.resetTimer()}>
                    Reset
                </Button>

            </div>
        );
    }
}

export default Timer;